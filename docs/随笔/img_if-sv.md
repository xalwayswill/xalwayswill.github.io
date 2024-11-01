```
`ifndef IMG_INTERFACE
`define IMG_INTERFACE

`define IMG_DATA_WIDTH 16
`define IMG_CHN_NUM 8

interface img_if(input clk, rst);
    logic newframe;
    logic img_vld;
    logic [`IMG_DATA_WIDTH*`IMG_CHN_NUM-1:0] img_data;

    clocking cb_drv @(posedge clk);
        default input #1ns output #0ns;
        output newframe, img_vld, img_data;
    endclocking

    clocking cb_mon @(posedge clk);
        default input #1ns output #0ns;
        input newframe, img_vld, img_data;
    endclocking

endinterface

`endif
```
