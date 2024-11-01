### Reference
[https://blog.csdn.net/weixin_39950083/article/details/111586325](https://blog.csdn.net/weixin_39950083/article/details/111586325)
[blog.csdn.net/icxiaoge/article/details/88925743](https://blog.csdn.net/icxiaoge/article/details/88925743)

![](异步FIFO.assets\23495115-cae2fe5c28575936.png)
***
```
//BIN_TO_GRAY
assign wptr_gray_r[FIFO_AW:0] = (wptr_bin_w_nxt>>1) ^ wptr_bin_w_nxt;
//GRAY_TO_BIN
always@(*) begin
    for(i=FIFO_AW;i>=0;i=i-1) begin: GRAY_TO_BIN
        wptr_bin_r[i] = ^(wptr_gray_r>>i);
    end
end
```
***
# 怎么约束？
除了两个时钟域的set_clock_groups外还需要约束gray码的最大延时，避免各个bit之间的延时过大或者差异过大导致performance降低甚至功能出错
set_max_delay 或者 set_multicycle_path

Vivado 的异步FIFO SDC约束
```
#set wr_clock          [get_clocks -of_objects [get_ports wr_clk]]
#set rd_clock          [get_clocks -of_objects [get_ports rd_clk]]
#set wr_clk_period     [get_property PERIOD $wr_clock]
#set rd_clk_period     [get_property PERIOD $rd_clock]
#set skew_value [expr {(($wr_clk_period < $rd_clk_period) ? $wr_clk_period : $rd_clk_period)} ]
 
# Set max delay on cross-clock domain path for Block/Distributed RAM-based FIFO

## set_max_delay -from [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*rd_pntr_gc_reg[*]] -to [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*gsync_stage[1].wr_stg_inst/Q_reg_reg[*]] -datapath_only [get_property -min PERIOD $rd_clock]
## set_bus_skew -from [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*rd_pntr_gc_reg[*]] -to [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*gsync_stage[1].wr_stg_inst/Q_reg_reg[*]] $skew_value
## set_max_delay -from [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*wr_pntr_gc_reg[*]] -to [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*gsync_stage[1].rd_stg_inst/Q_reg_reg[*]] -datapath_only [get_property -min PERIOD $wr_clock]
## set_bus_skew -from [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*wr_pntr_gc_reg[*]] -to [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*gsync_stage[1].rd_stg_inst/Q_reg_reg[*]] $skew_value
#set_false_path -from [get_cells -hierarchical -filter {NAME =~ *gsckt_wrst.gic_rst.sckt_wrst_i_reg}] -to [get_cells -hierarchical -filter {NAME =~ *gsckt_wrst.gic_rst.garst_sync_ic[1].rd_rst_inst/Q_reg_reg[0]}]
#set_false_path -from [get_cells -hierarchical -filter {NAME =~ *gsckt_wrst.gic_rst.garst_sync_ic[3].rd_rst_inst/Q_reg_reg[0]}] -to [get_cells -hierarchical -filter {NAME =~ *gsckt_wrst.gic_rst.garst_sync_ic[1].rd_rst_wr_inst/Q_reg_reg[0]}]
```

# 复位
异步FIFO对于复位有要求，只复位单独一个时钟域会导致读写指针错误，以及空满标志错误，需要一起复位。
根据designware DW_fifo_2c_df 的处理方式，需要两边的复位或者init信号进行同步，
例如，clrs，clrd 两个同步复位（异步复位也可以转化为同步复位后做下述操作），保证读复位先释放，写复位再释放，为了保证读时钟域在写时钟域能够发送数据前已经提前准备好接收
1. clr_s 拉起的时序
In this case clr_s is a single clk_s cycle, but the length of clr_s assertions are not restricted. The clearing-related signals are grouped at the bottom of the timing diagram.
When clr_s is asserted it gets synchronized at the destination domain (based on f_sync_type) which activates the clr_in_prog_d . clr_in_prog_d is useful for destination sequential logic in that it can be used to initialize circuits knowing that the source domain is not scheduled to push any data packets until the clearing sequence is complete. The event that produces the clr_in_prog_d assertion is then fed back to the source domain where it is synchronized (based on r_sync_type) to generate the clr_sync_s pulse. On the heals of the clr_sync_s pulse, the clr_in_prog_s signal gets activated. Similar to the clr_in_prog_d signal, clr_in_prog_s and/or clr_sync_s can be used to initialize source domain sequential logic since
it's implied that no destination domain popping will be occurring until the clearing sequence is completed.
The clr_sync_s event is then sent back for synchronization in the destination domain to de-activate clr_in_prog_d and generate the clr_cmplt_d indicating to the destination domain that the source domain has been cleared and it can be in the “waiting” state for popping.
Now that the destination domain perceives that its clear sequence is done, that event is sent back to the source domain for synchronization which, in turn, de-activates clr_in_prog_s and produces a clr_cmplt_s pulse. The de-activation of clr_in_prog_s and subsequent clr_cmplt_s pulse indicates to
the source domain that the destination domain logic has been cleared and all is ready for more pushing of data.
2. clr_d 拉起的时序
The clr_d initiated clearing sequence is similar to the clr_s initiated clearing sequence with fewer synchronization feedback paths from
beginning to completion.
When clr_d is asserted it triggers the clr_in_prog_d to activate. This event then gets synchronized by the source domain (based on r_sync_type) and produces the clr_sync_s pulse and activation of clr_in_prog_s . The clr_sync_s pulse is then feedback, synchronized by the destination domain (based on f_sync_type), and de-activates the clr_in_prog_d signal. This is followed by active pulses of clr_sync_d and clr_cmplt_d . Finally, the clr_sync_d pulse is feedback to the source domain where it gets synchronized and de-activates the clr_in_prog_s signal followed by an asserted pulse of clr_cmplt_s

# 非2^n情况下怎么设计
由于格雷码的对称性，只使用中间部分的gray码，及时从两次进行跳转（从下边界跳转到上边界）也只有最高位不同

# 代码示例
```
module ASYNC_FIFO #(
    parameter   DATA_WIDRH  =   16,
    parameter   DATA_DEPTH  =   1024,
    parameter   ADDR_WIDTH  =   10
)
(
    input                           wclk,
    input                           wrst,
    input                           wen,
    input   [DATA_WIDRH - 1 : 0]    wData,
    input                           rclk,
    input                           rrst,
    input                           ren,
    output  [DATA_WIDRH - 1 : 0]    rData,
    output  reg                     full,
    output  reg                     empty
);
reg     [DATA_WIDRH - 1 : 0]    mem     [0 : DATA_DEPTH - 1];
wire    [ADDR_WIDTH - 1 : 0]    raddr;
wire    [ADDR_WIDTH - 1 : 0]    waddr;
reg     [ADDR_WIDTH     : 0]    rptr, rptr_w1, rptr_w2;                 //编码地址比RAM地址多一位,目的是方便使用格雷码判断空满信号
reg     [ADDR_WIDTH     : 0]    wptr, wptr_r1, wptr_r2;
reg     [ADDR_WIDTH     : 0]    wbin, rbin;
wire    [ADDR_WIDTH     : 0]    wbinnext, rbinnext, wgraycode, rgraycode;
wire                            empty_val, full_val;
//RAM
assign raddr = rbin[ADDR_WIDTH - 1 : 0];
assign waddr = wbin[ADDR_WIDTH - 1 : 0];
assign rData = mem[raddr];
always @(posedge wclk) begin
    if (wen & (!full))
        mem[waddr] <= wData;
end
//address generate
assign wbinnext = wbin + (wen & (!full));
assign rbinnext = rbin + (ren & (!empty));
assign wgraycode = (wbinnext >> 1) ^ wbinnext;
assign rgraycode = (rbinnext >> 1) ^ rbinnext;

always @(posedge wclk) begin
    if (wrst) begin
        {wbin, wptr} <= {2*(ADDR_WIDTH+1){1'b0}};
    end
    else begin
        {wbin, wptr} <= {wbinnext, wgraycode};
    end
end
always @(posedge rclk) begin
    if (rrst) begin
        {rbin, rptr} <= {2*(ADDR_WIDTH+1){1'b0}};
    end
    else begin
        {rbin, rptr} <= {rbinnext, rgraycode};
    end
end
always @(posedge wclk) begin
    if (wrst) {rptr_w2, rptr_w1} <= {2*(ADDR_WIDTH+1){1'b0}};
    else {rptr_w2, rptr_w1} <= {rptr_w1, rptr};
end
always @(posedge rclk) begin
    if (rrst) {wptr_r2, wptr_r1} <= {2*(ADDR_WIDTH+1){1'b0}};
    else {wptr_r2, wptr_r1} <= {wptr_r1, wptr};
end
//generate empty and full
assign empty_val = (rgraycode == wptr_r2);
assign full_val = (wgraycode == {{~rptr_w2[ADDR_WIDTH : ADDR_WIDTH - 1]}, rptr_w2[ADDR_WIDTH - 2 : 0]});
always @(posedge wclk) begin
    if (wrst) full <= 1'b0;
    else full <= full_val;   // the timing of full and empty is right
end
always @(posedge rclk) begin
    if (rrst) empty <= 1'b1;
    else empty <= empty_val;
end
endmodule

module ASYN_FIFO_tb (

);
parameter   CLK_PERIOD  =   10;
parameter   RESET_HOLD  =   30;
parameter   DATA_WIDTH  =   16;
parameter   DATA_DEPTH  =   1024;
parameter   ADDR_WIDTH  =   10;

reg                             wclk;
reg                             rclk;
reg                             wrst;
wire                            wen;
reg                             rrst;
reg                             ren;
reg     [DATA_WIDTH - 1 : 0]    iData   =   0;
wire    [DATA_WIDTH - 1 : 0]    oData;
wire                            full;
wire                            empty;

initial begin
    rrst = 1;
    wrst = 1;
    # RESET_HOLD;
    rrst = 0;
    wrst = 0;
end

always begin
    wclk = 0;
    #(CLK_PERIOD/2);
    wclk = 1;
    #(CLK_PERIOD/2);
end

always begin
    rclk = 0;
    #(CLK_PERIOD);
    rclk = 1;
    #(CLK_PERIOD);
end

always @(posedge wclk) begin
    if (wrst) begin
        ren <= 0;
    end
    else begin
        ren <= ($random % 2);
    end
end

always @(posedge wclk) begin
    if (wrst) begin
        iData <= 16'd0;
    end
    else if (full) begin
        iData <= iData;
    end
    else begin
        iData <= iData + 1'b1;
    end
end
assign wen = (!full);

ASYN_FIFO #(
    .DATA_WIDRH(16  ),
    .DATA_DEPTH(1024),
    .ADDR_WIDTH(10  )
)
FIFO(
    .wclk   (wclk   ),
    .wrst   (wrst   ),
    .wen    (wen    ),
    .wData  (iData  ),
    .rclk   (rclk   ),
    .rrst   (rrst   ),
    .ren    (ren    ),
    .rData  (oData  ),
    .full   (full   ),
    .empty  (empty  )
);

endmodule
```


