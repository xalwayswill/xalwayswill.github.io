```
`ifndef IMG_DRIVER__SV
`define IMG_DRIVER__SV

class img_driver extends uvm_driver#(img_transaction);  // transaction must be set

    virtual img_if img_vif;
    img_config img_conf;

    `uvm_component_utils(img_driver)
    function new(string name = "img_driver", uvm_component parent = null);
        super.new(name, parent);
    endfunction : new

    virtual function void build_phase (uvm_phase phase);
        super.build_phase(phase);
        if(!uvm_config_db#(virtual img_if)::get(this, "", "img_vif", img_vif))
            `uvm_fatal("img_driver", "Virtual interface must be set!!!");
    endfunction :  build_phase

    extern virtual task main_phase(uvm_phase phase);
    extern virtual task send_one_line(img_transaction tr);

endclass

task img_driver::main_phase(uvm_phase phase);
    int line_cnt;
    line_cnt = 0;
    img_vif.cb_drv.img_vld <= 1'b0;
    img_vif.cb_drv.img_data <= 8'd0;
    img_vif.cb_drv.newframe <= 1'b0;
    forever fork
        begin: driver_block
            while(1) begin
                seq_item_port.get_next_item(req);
                if(line_cnt == 0) begin
                    repeat(img_conf.img_vb_num_before_frame*img_conf.img_line_length/img_conf.img_chn_num)  // vertical direction blanking line
                        @(posedge img_vif.clk);
                    img_vif.cb_drv.newframe <= 1'b1;
                    @(posedge img_vif.clk)
                        img_vif.cb_drv.newframe <= 1'b0;
                    repeat(img_conf.img_OB_num*img_conf.img_line_length/img_conf.img_chn_num);  // vertical direction effective OB line
                        @(posedge img_vif.clk);
                end
                send_one_line(req);
                if(line_cnt == img_conf.img_high-1) begin
                    line_cnt = 0;
                    repeat(img_conf.img_vb_num_after_frame*img_conf.img_line_length/img_conf.img_chn_num) begin
                        @(posedge img_vif.clk);
                    end
                end
                else
                    line_cnt++;
                seq_item_port.item_done(req);
            end
        end: driver_block

        begin: reset_block
            wait(img_vif.rst);
            disable driver_block;
            `uvm_info("img_driver", {{20{"="}}, "Reset the DUT.", {20{"="}}}, UVM_LOW);
            while(img_vif.rst)
                @(posedge img_vif.clk);
            `uvm_info("img_driver", {{20{"="}}, "Reset is done.", {20{"="}}}, UVM_LOW);
        end: reset_block
    join
endtask : main_phase

task img_driver::send_one_line(img_transaction tr);
    `uvm_info(get_type_name(), "begin to send one line", UVM_LOW);

    for(int i = 0; i < img_conf.img_wide/img_conf.img_chn_num; i++) begin
        @(posedge img_vif.clk)
        for (int j = 0; j < `IMG_CHN_NUM; j++) begin
            img_vif.cb_drv.img_data[j*`IMG_DATA_WIDTH+:`IMG_DATA_WIDTH] <= tr.img_data[i*`IMG_CHN_NUM+j];
            // `uvm_info(get_full_name(), $sformatf("drv data is %0d", tr.img_data[i*`IMG_CHN_NUM+j]), UVM_LOW);
        end
        img_vif.cb_drv.img_vld <= 1'b1;
    end
    img_vif.cb_drv.img_vld <= 1'b0;
    `uvm_info(get_full_name(), "end send one line", UVM_LOW);
    repeat(img_conf.img_hb_num)
        @(posedge img_vif.clk);
endtask : send_one_line

`endif
```
