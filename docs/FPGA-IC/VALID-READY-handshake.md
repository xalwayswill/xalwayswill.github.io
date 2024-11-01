#### 参考AXI协议规定
* It is **not permitted** to wait until READY is asserted before asserting VALID (But it is **permitted** to wait VALID to be asserted before the corresponding READY is asserted.)
* Once VALID is asserted, it must remain asserted until the handshake occurs.
* If READY is asserted, it is permitted to deassert READY before VALID is asserted.

Advanced Extensible Interface(AXI)
* suitable for high-bandwidth and low-latency designs.
* provide high-frequency operation without complex bridges.
* separate address/control and data phases.
* Burst-based transations with only start address is used.
* support for unaligned data transfers using byte strobes.

#### Out-of-order
the data for different ids can be out of order, but the data for a single id must be in order.
the pipe of src_vld can not relay on itself, like DFF_EN = src_vld & dst_rdy, otherwise the src_vld can not transfer forward.

#### vld rdy pipe
![](VALID-READY-handshake.assets\23495115-1ec73dada0e6479d.png)
```
//=================================================================================
//-buf_vld update
//=================================================================================
assign dst_vld_upd = src_rdy;

//=================================================================================
//-buf_vld
//=================================================================================
cbb_rw_reg #(
    .RST_EN      ( 1'b1  ),
    .BIT_RST_VAL ( 1'b0  ),
    .DWIDTH      ( 1     )
) u_buf_vld_upd (
    .clk      ( clk         ),
    .rst_n    ( rst_n       ),
    .clr      ( clr         ),

    .en       ( dst_vld_upd ),
    .data_in  ( src_vld     ),
    .data_out ( dst_vld     )
);

//=================================================================================
//-buf_data update
//=================================================================================
assign dst_data_upd = dst_vld_upd & src_vld; //handshake

//=================================================================================
//-buf_data
//=================================================================================
cbb_rw_reg #(
    .RST_EN      ( RST_EN      ),
    .BIT_RST_VAL ( BIT_RST_VAL ),
    .DWIDTH      ( DWIDTH      )
) u_buf_data_upd (
    .clk      ( clk                  ),
    .rst_n    ( rst_n                ),
    .clr      ( clr                  ),

    .en       ( dst_data_upd         ),
    .data_in  ( src_data[DWIDTH-1:0] ),
    .data_out ( dst_data[DWIDTH-1:0] )
);
assign src_rdy = ~dst_vld | dst_rdy; //remove the bubble
```
![](VALID-READY-handshake.assets\23495115-5e55620ca3bb649c.png)
```
assign buf_vld_upd = buf_vld | (src_vld & ~dst_rdy); //slave backpressure: dst_rdy == 0
assign buf_vld_in  = dst_vld & ~dst_rdy;
cbb_rw_reg #(
    .RST_EN      ( 1'b1 ),
    .BIT_RST_VAL ( 1'b0 ),
    .DWIDTH      ( 1    )
) u_buf_vld_upd (
    .clk      ( clk         ),
    .rst_n    ( rst_n       ),
    .clr      ( clr         ),

    .en       ( buf_vld_upd ),
    .data_in  ( buf_vld_in  ),
    .data_out ( buf_vld     )
);

//=================================================================================
//-buf_data update
//=================================================================================
assign buf_data_upd = (~buf_vld) & src_vld & (~dst_rdy); //slave backpressure: dst_rdy == 0
//=================================================================================
//-buf_data: no reset
//=================================================================================
cbb_rw_reg #(
    .RST_EN      ( RST_EN      ),
    .BIT_RST_VAL ( BIT_RST_VAL ),
    .DWIDTH      ( DWIDTH      )
) u_buf_data_upd (
    .clk      ( clk                  ),
    .rst_n    ( rst_n                ),
    .clr      ( clr                  ),

    .en       ( buf_data_upd         ),
    .data_in  ( src_data[DWIDTH-1:0] ),
    .data_out ( buf_data[DWIDTH-1:0] )
);
assign dst_vld = buf_vld | src_vld;
assign dst_data = buf_vld ? buf_data : src_data;

always@(posedge clk or negedge rst_n)
begin
    if(i_rst_n==1'b0)begin
        src_rdy <= 1'b1;
    end 
    else begin
        if(clr == 1'b1) begin
            src_rdy <= 1'b1;
        end
        else begin
            if(dst_vld == 1'b1) begin
                src_rdy <= dst_rdy;
            end
        end
    end
end

```
