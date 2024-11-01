```
`ifndef IMG_SCOREBOARD__SV
`define IMG_SCOREBOARD__SV

class img_scoreboard extends uvm_scoreboard;
    img_transaction expect_queue[$];
    uvm_blocking_get_port#(img_transaction) exp_port;
    uvm_blocking_get_port#(img_transaction) act_port;

    function new(string name, uvm_component parent);
        super.new(name, parent);
    endfunction : new

    extern function void build_phase(uvm_phase phase);
    extern virtual task main_phase(uvm_phase phase);

    `uvm_component_utils(img_scoreboard)
endclass : img_scoreboard

function void img_scoreboard::build_phase(uvm_phase phase);
    super.build_phase(phase);
    exp_port = new("exp_port", this);
    act_port = new("act_port", this);
endfunction : build_phase

task img_scoreboard::main_phase(uvm_phase phase);
    img_transaction get_expect, get_acture, tmp_tr;
    bit result;
    fork
        while(1) begin
            exp_port.get(get_expect);
            expect_queue.push_back(get_expect);
        end
        while(1) begin
            act_port.get(get_acture);
            if(expect_queue.size() > 0) begin
                tmp_tr = expect_queue.pop_front();
                result = get_acture.compare(tmp_tr);
                if(result) begin
                    `uvm_info("img_scoreboard", "Compare SUCCESSFULL", UVM_LOW);
                end
                else begin
                    `uvm_error("img_scoreboard", "Compare FAILED");
                    $display("the expect transaction is:");
                    tmp_tr.print();
                    $display("the acture transaction is:");
                    tmp_tr.print();
                end
            end
            else begin
                `uvm_error("img_scoreboard", "Receiver form DUT, while Expect Queue is empty");
                $display("the unexpected pkt is:");
                get_acture.print();
            end
        end
    join
endtask : main_phase

`endif
```
