```
//////////////////////////////////////////////////////////////////////////////////
// Company: Hikvision
// Engineer: xuyinghao
// Create Date: 2021.01.28
// Module Name: tb
// Description:
//  This module is the top of the testbench
//
// Revision:
//   Revision 0.01 - File Created
//
//////////////////////////////////////////////////////////////////////////////////
`timescale 1ns / 1ps

`include "uvm_macros.svh"
`include "img_if.sv"
import uvm_pkg::*;
import img_pkg::*;

module tb(
);

//============================================
// clock and reset
//============================================
parameter CLK_PERIOD = 10ns;
parameter RESET_HOLD = 100ns;
logic clk;
logic rst;
initial begin
    rst = 1'b1;
    #RESET_HOLD
    rst = 1'b0;
end
initial begin
    clk = 1'b0;
    forever #(CLK_PERIOD/2) clk = ~clk;
end

//============================================
// interface and configuration
//============================================
img_if img_if_drv(clk, rst);
img_if img_if_mon(clk, rst);

initial begin
img_config img_conf;
    img_conf = img_config::type_id::create("img_conf");
    uvm_config_db #(virtual img_if)::set(null, "uvm_test_top.env.img_agt_i.drv", "img_vif", img_if_drv);
    uvm_config_db #(virtual img_if)::set(null, "uvm_test_top.env.img_agt_i.mon", "img_vif", img_if_drv);
    uvm_config_db #(virtual img_if)::set(null, "uvm_test_top.env.img_agt_o.mon", "img_vif", img_if_mon);
    uvm_config_db #(img_config)::set(null, "uvm_test_top.env.img_agt_i", "img_conf", img_conf);
    uvm_config_db #(img_config)::set(null, "uvm_test_top.env.img_agt_o", "img_conf", img_conf);
    uvm_config_db #(img_config)::set(null, "uvm_test_top", "img_conf", img_conf);
end
//============================================
// dut
//============================================
dut dut_inst (
    .clk         (clk                ), // Clock
    .rst         (rst                ), // Clock Enable
    .newframe    (img_if_drv.newframe),
    .data_in     (img_if_drv.img_data),
    .din_vld     (img_if_drv.img_vld ),
    .newframe_out(img_if_mon.newframe),
    .data_out    (img_if_mon.img_data),
    .dout_vld    (img_if_mon.img_vld )
);
//============================================
// testcase
//============================================
initial begin
    run_test();
end;



endmodule
```
