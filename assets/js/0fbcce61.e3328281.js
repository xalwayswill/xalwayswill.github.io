"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9303],{29284:(r,e,n)=>{n.r(e),n.d(e,{assets:()=>_,contentTitle:()=>c,default:()=>d,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var t=n(74848),i=n(28453);const s={},c=void 0,a={id:"FPGA-IC/\u5f02\u6b65FIFO",title:"\u5f02\u6b65FIFO",description:"Reference",source:"@site/docs/FPGA-IC/\u5f02\u6b65FIFO.md",sourceDirName:"FPGA-IC",slug:"/FPGA-IC/\u5f02\u6b65FIFO",permalink:"/docs/FPGA-IC/\u5f02\u6b65FIFO",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/FPGA-IC/\u5f02\u6b65FIFO.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u57fa\u7840\u77e5\u8bc6",permalink:"/docs/FPGA-IC/\u57fa\u7840\u77e5\u8bc6"},next:{title:"\u603b\u7ebf\u8de84K\u5904\u7406",permalink:"/docs/FPGA-IC/\u603b\u7ebf\u8de84K\u5904\u7406"}},_={},l=[{value:"Reference",id:"reference",level:3}];function o(r){const e={a:"a",code:"code",h1:"h1",h3:"h3",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.R)(),...r.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h3,{id:"reference",children:"Reference"}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.a,{href:"https://blog.csdn.net/weixin_39950083/article/details/111586325",children:"https://blog.csdn.net/weixin_39950083/article/details/111586325"}),"\r\n",(0,t.jsx)(e.a,{href:"https://blog.csdn.net/icxiaoge/article/details/88925743",children:"blog.csdn.net/icxiaoge/article/details/88925743"})]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:n(51211).A+"",width:"1200",height:"883"})}),"\n",(0,t.jsx)(e.hr,{}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"//BIN_TO_GRAY\r\nassign wptr_gray_r[FIFO_AW:0] = (wptr_bin_w_nxt>>1) ^ wptr_bin_w_nxt;\r\n//GRAY_TO_BIN\r\nalways@(*) begin\r\n    for(i=FIFO_AW;i>=0;i=i-1) begin: GRAY_TO_BIN\r\n        wptr_bin_r[i] = ^(wptr_gray_r>>i);\r\n    end\r\nend\n"})}),"\n",(0,t.jsx)(e.hr,{}),"\n",(0,t.jsx)(e.h1,{id:"\u600e\u4e48\u7ea6\u675f",children:"\u600e\u4e48\u7ea6\u675f\uff1f"}),"\n",(0,t.jsx)(e.p,{children:"\u9664\u4e86\u4e24\u4e2a\u65f6\u949f\u57df\u7684set_clock_groups\u5916\u8fd8\u9700\u8981\u7ea6\u675fgray\u7801\u7684\u6700\u5927\u5ef6\u65f6\uff0c\u907f\u514d\u5404\u4e2abit\u4e4b\u95f4\u7684\u5ef6\u65f6\u8fc7\u5927\u6216\u8005\u5dee\u5f02\u8fc7\u5927\u5bfc\u81f4performance\u964d\u4f4e\u751a\u81f3\u529f\u80fd\u51fa\u9519\r\nset_max_delay \u6216\u8005 set_multicycle_path"}),"\n",(0,t.jsx)(e.p,{children:"Vivado \u7684\u5f02\u6b65FIFO SDC\u7ea6\u675f"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"#set wr_clock          [get_clocks -of_objects [get_ports wr_clk]]\r\n#set rd_clock          [get_clocks -of_objects [get_ports rd_clk]]\r\n#set wr_clk_period     [get_property PERIOD $wr_clock]\r\n#set rd_clk_period     [get_property PERIOD $rd_clock]\r\n#set skew_value [expr {(($wr_clk_period < $rd_clk_period) ? $wr_clk_period : $rd_clk_period)} ]\r\n \r\n# Set max delay on cross-clock domain path for Block/Distributed RAM-based FIFO\r\n\r\n## set_max_delay -from [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*rd_pntr_gc_reg[*]] -to [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*gsync_stage[1].wr_stg_inst/Q_reg_reg[*]] -datapath_only [get_property -min PERIOD $rd_clock]\r\n## set_bus_skew -from [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*rd_pntr_gc_reg[*]] -to [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*gsync_stage[1].wr_stg_inst/Q_reg_reg[*]] $skew_value\r\n## set_max_delay -from [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*wr_pntr_gc_reg[*]] -to [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*gsync_stage[1].rd_stg_inst/Q_reg_reg[*]] -datapath_only [get_property -min PERIOD $wr_clock]\r\n## set_bus_skew -from [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*wr_pntr_gc_reg[*]] -to [get_cells inst_fifo_gen/gconvfifo.rf/grf.rf/gntv_or_sync_fifo.gcx.clkx/*gsync_stage[1].rd_stg_inst/Q_reg_reg[*]] $skew_value\r\n#set_false_path -from [get_cells -hierarchical -filter {NAME =~ *gsckt_wrst.gic_rst.sckt_wrst_i_reg}] -to [get_cells -hierarchical -filter {NAME =~ *gsckt_wrst.gic_rst.garst_sync_ic[1].rd_rst_inst/Q_reg_reg[0]}]\r\n#set_false_path -from [get_cells -hierarchical -filter {NAME =~ *gsckt_wrst.gic_rst.garst_sync_ic[3].rd_rst_inst/Q_reg_reg[0]}] -to [get_cells -hierarchical -filter {NAME =~ *gsckt_wrst.gic_rst.garst_sync_ic[1].rd_rst_wr_inst/Q_reg_reg[0]}]\n"})}),"\n",(0,t.jsx)(e.h1,{id:"\u590d\u4f4d",children:"\u590d\u4f4d"}),"\n",(0,t.jsx)(e.p,{children:"\u5f02\u6b65FIFO\u5bf9\u4e8e\u590d\u4f4d\u6709\u8981\u6c42\uff0c\u53ea\u590d\u4f4d\u5355\u72ec\u4e00\u4e2a\u65f6\u949f\u57df\u4f1a\u5bfc\u81f4\u8bfb\u5199\u6307\u9488\u9519\u8bef\uff0c\u4ee5\u53ca\u7a7a\u6ee1\u6807\u5fd7\u9519\u8bef\uff0c\u9700\u8981\u4e00\u8d77\u590d\u4f4d\u3002\r\n\u6839\u636edesignware DW_fifo_2c_df \u7684\u5904\u7406\u65b9\u5f0f\uff0c\u9700\u8981\u4e24\u8fb9\u7684\u590d\u4f4d\u6216\u8005init\u4fe1\u53f7\u8fdb\u884c\u540c\u6b65\uff0c\r\n\u4f8b\u5982\uff0cclrs\uff0cclrd \u4e24\u4e2a\u540c\u6b65\u590d\u4f4d\uff08\u5f02\u6b65\u590d\u4f4d\u4e5f\u53ef\u4ee5\u8f6c\u5316\u4e3a\u540c\u6b65\u590d\u4f4d\u540e\u505a\u4e0b\u8ff0\u64cd\u4f5c\uff09\uff0c\u4fdd\u8bc1\u8bfb\u590d\u4f4d\u5148\u91ca\u653e\uff0c\u5199\u590d\u4f4d\u518d\u91ca\u653e\uff0c\u4e3a\u4e86\u4fdd\u8bc1\u8bfb\u65f6\u949f\u57df\u5728\u5199\u65f6\u949f\u57df\u80fd\u591f\u53d1\u9001\u6570\u636e\u524d\u5df2\u7ecf\u63d0\u524d\u51c6\u5907\u597d\u63a5\u6536"}),"\n",(0,t.jsxs)(e.ol,{children:["\n",(0,t.jsx)(e.li,{children:"clr_s \u62c9\u8d77\u7684\u65f6\u5e8f\r\nIn this case clr_s is a single clk_s cycle, but the length of clr_s assertions are not restricted. The clearing-related signals are grouped at the bottom of the timing diagram.\r\nWhen clr_s is asserted it gets synchronized at the destination domain (based on f_sync_type) which activates the clr_in_prog_d . clr_in_prog_d is useful for destination sequential logic in that it can be used to initialize circuits knowing that the source domain is not scheduled to push any data packets until the clearing sequence is complete. The event that produces the clr_in_prog_d assertion is then fed back to the source domain where it is synchronized (based on r_sync_type) to generate the clr_sync_s pulse. On the heals of the clr_sync_s pulse, the clr_in_prog_s signal gets activated. Similar to the clr_in_prog_d signal, clr_in_prog_s and/or clr_sync_s can be used to initialize source domain sequential logic since\r\nit's implied that no destination domain popping will be occurring until the clearing sequence is completed.\r\nThe clr_sync_s event is then sent back for synchronization in the destination domain to de-activate clr_in_prog_d and generate the clr_cmplt_d indicating to the destination domain that the source domain has been cleared and it can be in the \u201cwaiting\u201d state for popping.\r\nNow that the destination domain perceives that its clear sequence is done, that event is sent back to the source domain for synchronization which, in turn, de-activates clr_in_prog_s and produces a clr_cmplt_s pulse. The de-activation of clr_in_prog_s and subsequent clr_cmplt_s pulse indicates to\r\nthe source domain that the destination domain logic has been cleared and all is ready for more pushing of data."}),"\n",(0,t.jsx)(e.li,{children:"clr_d \u62c9\u8d77\u7684\u65f6\u5e8f\r\nThe clr_d initiated clearing sequence is similar to the clr_s initiated clearing sequence with fewer synchronization feedback paths from\r\nbeginning to completion.\r\nWhen clr_d is asserted it triggers the clr_in_prog_d to activate. This event then gets synchronized by the source domain (based on r_sync_type) and produces the clr_sync_s pulse and activation of clr_in_prog_s . The clr_sync_s pulse is then feedback, synchronized by the destination domain (based on f_sync_type), and de-activates the clr_in_prog_d signal. This is followed by active pulses of clr_sync_d and clr_cmplt_d . Finally, the clr_sync_d pulse is feedback to the source domain where it gets synchronized and de-activates the clr_in_prog_s signal followed by an asserted pulse of clr_cmplt_s"}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"\u975e2n\u60c5\u51b5\u4e0b\u600e\u4e48\u8bbe\u8ba1",children:"\u975e2^n\u60c5\u51b5\u4e0b\u600e\u4e48\u8bbe\u8ba1"}),"\n",(0,t.jsx)(e.p,{children:"\u7531\u4e8e\u683c\u96f7\u7801\u7684\u5bf9\u79f0\u6027\uff0c\u53ea\u4f7f\u7528\u4e2d\u95f4\u90e8\u5206\u7684gray\u7801\uff0c\u53ca\u65f6\u4ece\u4e24\u6b21\u8fdb\u884c\u8df3\u8f6c\uff08\u4ece\u4e0b\u8fb9\u754c\u8df3\u8f6c\u5230\u4e0a\u8fb9\u754c\uff09\u4e5f\u53ea\u6709\u6700\u9ad8\u4f4d\u4e0d\u540c"}),"\n",(0,t.jsx)(e.h1,{id:"\u4ee3\u7801\u793a\u4f8b",children:"\u4ee3\u7801\u793a\u4f8b"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"module ASYNC_FIFO #(\r\n    parameter   DATA_WIDRH  =   16,\r\n    parameter   DATA_DEPTH  =   1024,\r\n    parameter   ADDR_WIDTH  =   10\r\n)\r\n(\r\n    input                           wclk,\r\n    input                           wrst,\r\n    input                           wen,\r\n    input   [DATA_WIDRH - 1 : 0]    wData,\r\n    input                           rclk,\r\n    input                           rrst,\r\n    input                           ren,\r\n    output  [DATA_WIDRH - 1 : 0]    rData,\r\n    output  reg                     full,\r\n    output  reg                     empty\r\n);\r\nreg     [DATA_WIDRH - 1 : 0]    mem     [0 : DATA_DEPTH - 1];\r\nwire    [ADDR_WIDTH - 1 : 0]    raddr;\r\nwire    [ADDR_WIDTH - 1 : 0]    waddr;\r\nreg     [ADDR_WIDTH     : 0]    rptr, rptr_w1, rptr_w2;                 //\u7f16\u7801\u5730\u5740\u6bd4RAM\u5730\u5740\u591a\u4e00\u4f4d,\u76ee\u7684\u662f\u65b9\u4fbf\u4f7f\u7528\u683c\u96f7\u7801\u5224\u65ad\u7a7a\u6ee1\u4fe1\u53f7\r\nreg     [ADDR_WIDTH     : 0]    wptr, wptr_r1, wptr_r2;\r\nreg     [ADDR_WIDTH     : 0]    wbin, rbin;\r\nwire    [ADDR_WIDTH     : 0]    wbinnext, rbinnext, wgraycode, rgraycode;\r\nwire                            empty_val, full_val;\r\n//RAM\r\nassign raddr = rbin[ADDR_WIDTH - 1 : 0];\r\nassign waddr = wbin[ADDR_WIDTH - 1 : 0];\r\nassign rData = mem[raddr];\r\nalways @(posedge wclk) begin\r\n    if (wen & (!full))\r\n        mem[waddr] <= wData;\r\nend\r\n//address generate\r\nassign wbinnext = wbin + (wen & (!full));\r\nassign rbinnext = rbin + (ren & (!empty));\r\nassign wgraycode = (wbinnext >> 1) ^ wbinnext;\r\nassign rgraycode = (rbinnext >> 1) ^ rbinnext;\r\n\r\nalways @(posedge wclk) begin\r\n    if (wrst) begin\r\n        {wbin, wptr} <= {2*(ADDR_WIDTH+1){1'b0}};\r\n    end\r\n    else begin\r\n        {wbin, wptr} <= {wbinnext, wgraycode};\r\n    end\r\nend\r\nalways @(posedge rclk) begin\r\n    if (rrst) begin\r\n        {rbin, rptr} <= {2*(ADDR_WIDTH+1){1'b0}};\r\n    end\r\n    else begin\r\n        {rbin, rptr} <= {rbinnext, rgraycode};\r\n    end\r\nend\r\nalways @(posedge wclk) begin\r\n    if (wrst) {rptr_w2, rptr_w1} <= {2*(ADDR_WIDTH+1){1'b0}};\r\n    else {rptr_w2, rptr_w1} <= {rptr_w1, rptr};\r\nend\r\nalways @(posedge rclk) begin\r\n    if (rrst) {wptr_r2, wptr_r1} <= {2*(ADDR_WIDTH+1){1'b0}};\r\n    else {wptr_r2, wptr_r1} <= {wptr_r1, wptr};\r\nend\r\n//generate empty and full\r\nassign empty_val = (rgraycode == wptr_r2);\r\nassign full_val = (wgraycode == {{~rptr_w2[ADDR_WIDTH : ADDR_WIDTH - 1]}, rptr_w2[ADDR_WIDTH - 2 : 0]});\r\nalways @(posedge wclk) begin\r\n    if (wrst) full <= 1'b0;\r\n    else full <= full_val;   // the timing of full and empty is right\r\nend\r\nalways @(posedge rclk) begin\r\n    if (rrst) empty <= 1'b1;\r\n    else empty <= empty_val;\r\nend\r\nendmodule\r\n\r\nmodule ASYN_FIFO_tb (\r\n\r\n);\r\nparameter   CLK_PERIOD  =   10;\r\nparameter   RESET_HOLD  =   30;\r\nparameter   DATA_WIDTH  =   16;\r\nparameter   DATA_DEPTH  =   1024;\r\nparameter   ADDR_WIDTH  =   10;\r\n\r\nreg                             wclk;\r\nreg                             rclk;\r\nreg                             wrst;\r\nwire                            wen;\r\nreg                             rrst;\r\nreg                             ren;\r\nreg     [DATA_WIDTH - 1 : 0]    iData   =   0;\r\nwire    [DATA_WIDTH - 1 : 0]    oData;\r\nwire                            full;\r\nwire                            empty;\r\n\r\ninitial begin\r\n    rrst = 1;\r\n    wrst = 1;\r\n    # RESET_HOLD;\r\n    rrst = 0;\r\n    wrst = 0;\r\nend\r\n\r\nalways begin\r\n    wclk = 0;\r\n    #(CLK_PERIOD/2);\r\n    wclk = 1;\r\n    #(CLK_PERIOD/2);\r\nend\r\n\r\nalways begin\r\n    rclk = 0;\r\n    #(CLK_PERIOD);\r\n    rclk = 1;\r\n    #(CLK_PERIOD);\r\nend\r\n\r\nalways @(posedge wclk) begin\r\n    if (wrst) begin\r\n        ren <= 0;\r\n    end\r\n    else begin\r\n        ren <= ($random % 2);\r\n    end\r\nend\r\n\r\nalways @(posedge wclk) begin\r\n    if (wrst) begin\r\n        iData <= 16'd0;\r\n    end\r\n    else if (full) begin\r\n        iData <= iData;\r\n    end\r\n    else begin\r\n        iData <= iData + 1'b1;\r\n    end\r\nend\r\nassign wen = (!full);\r\n\r\nASYN_FIFO #(\r\n    .DATA_WIDRH(16  ),\r\n    .DATA_DEPTH(1024),\r\n    .ADDR_WIDTH(10  )\r\n)\r\nFIFO(\r\n    .wclk   (wclk   ),\r\n    .wrst   (wrst   ),\r\n    .wen    (wen    ),\r\n    .wData  (iData  ),\r\n    .rclk   (rclk   ),\r\n    .rrst   (rrst   ),\r\n    .ren    (ren    ),\r\n    .rData  (oData  ),\r\n    .full   (full   ),\r\n    .empty  (empty  )\r\n);\r\n\r\nendmodule\n"})})]})}function d(r={}){const{wrapper:e}={...(0,i.R)(),...r.components};return e?(0,t.jsx)(e,{...r,children:(0,t.jsx)(o,{...r})}):o(r)}},51211:(r,e,n)=>{n.d(e,{A:()=>t});const t=n.p+"assets/images/23495115-cae2fe5c28575936-71d33c306d26fd3ba53964154be1d316.png"},28453:(r,e,n)=>{n.d(e,{R:()=>c,x:()=>a});var t=n(96540);const i={},s=t.createContext(i);function c(r){const e=t.useContext(s);return t.useMemo((function(){return"function"==typeof r?r(e):{...e,...r}}),[e,r])}function a(r){let e;return e=r.disableParentContext?"function"==typeof r.components?r.components(i):r.components||i:c(r.components),t.createElement(s.Provider,{value:e},r.children)}}}]);