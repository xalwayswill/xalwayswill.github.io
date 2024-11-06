"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8691],{83496:(n,e,c)=>{c.r(e),c.d(e,{assets:()=>s,contentTitle:()=>t,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>a});var i=c(74848),l=c(28453);const r={},t=void 0,o={id:"FPGA-IC/common-lib",title:"common-lib",description:"clogb2(ceiling of the log base 2) -- \u8ba1\u7b97\u4fe1\u53f7\u4f4d\u5bbd (same as the systemverilog build in function $clog2)",source:"@site/docs/FPGA-IC/common-lib.md",sourceDirName:"FPGA-IC",slug:"/FPGA-IC/common-lib",permalink:"/docs/FPGA-IC/common-lib",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/FPGA-IC/common-lib.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Verilog_X_Bugs",permalink:"/docs/FPGA-IC/Verilog_X_Bugs"},next:{title:"gotcha",permalink:"/docs/FPGA-IC/gotcha"}},s={},a=[{value:"clogb2(ceiling of the log base 2) -- \u8ba1\u7b97\u4fe1\u53f7\u4f4d\u5bbd (same as the systemverilog build in function $clog2)",id:"clogb2ceiling-of-the-log-base-2----\u8ba1\u7b97\u4fe1\u53f7\u4f4d\u5bbd-same-as-the-systemverilog-build-in-function-clog2",level:4},{value:"\u65e0\u6bdb\u523a\u5207\u6362",id:"\u65e0\u6bdb\u523a\u5207\u6362",level:4}];function u(n){const e={code:"code",h4:"h4",img:"img",p:"p",pre:"pre",...(0,l.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h4,{id:"clogb2ceiling-of-the-log-base-2----\u8ba1\u7b97\u4fe1\u53f7\u4f4d\u5bbd-same-as-the-systemverilog-build-in-function-clog2",children:"clogb2(ceiling of the log base 2) -- \u8ba1\u7b97\u4fe1\u53f7\u4f4d\u5bbd (same as the systemverilog build in function $clog2)"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"// This example defines a function called clogb2 that returns an integer which has the value of the ceiling of the log base 2.\r\nfunction automatic integer clogb2;\r\n  input [31:0] value;\r\n  begin\r\n    value = value - 1;\r\n    for (clogb2 = 0; value > 0; clogb2 = clogb2 + 1)\r\n      value = value >> 1;\r\n    end\r\nendfunction\n"})}),"\n",(0,i.jsx)(e.p,{children:"####bin2gray"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"input integer value;\r\nbegin\r\n  bin2gray = (value ^ (value >> 1))\r\nend\n"})}),"\n",(0,i.jsx)(e.p,{children:"####gray2bin"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"  begin\r\n    func_i = 2;\r\n    func_v = func_value;\r\n    func_result = 0;\r\n    while (func_v != 0) begin\r\n      if((func_v & 1) == 1) func_result = func_result ^ (func_i - 1)\r\n      func_v = func_v >>>1;\r\n      func_i = func_i <<<1;\r\n    end\r\n    gray2bin = func_result; \r\n  end\n"})}),"\n",(0,i.jsxs)(e.p,{children:["####minus\r\n\u5bf9\u4e8e\u4e00\u4e2anbit\u7684\u6570\uff0c",(0,i.jsx)(e.code,{children:"2^n - a = ~a + 1"}),"\uff0c\u56e0\u4e3a ",(0,i.jsx)(e.code,{children:"a+~a={n{1}}"})]}),"\n",(0,i.jsx)(e.p,{children:"####abs"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"function automatic integer abs;\r\n  input [n-1:0] value;\r\n  begin\r\n    abs = value[n-1] ? ~value + 1'b1 : value;\r\n  end\r\nendfunction\n"})}),"\n",(0,i.jsx)(e.p,{children:"####clock gate"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"module mali_tx300_clock_gate (clk_in, clk_en, dftclkdisable, dftclkenable, clk_out);\r\n\r\n  input wire  clk_in;\r\n  input wire  clk_en;\r\n  input wire  dftclkdisable;\r\n  input wire  dftclkenable;\r\n  output wire clk_out;\r\n\r\n  reg    clk_enable_lat;\r\n  wire   clk_enable_nxt;\r\n\r\n  assign clk_enable_nxt = !dftclkdisable && (clk_en | dftclkenable);\r\n\r\n  \r\n  always @ (clk_in or clk_enable_nxt) begin\r\n    if (~clk_in)\r\n      clk_enable_lat <= clk_enable_nxt;\r\n  end\r\n\r\n\r\n  assign clk_out = clk_in & clk_enable_lat;\r\nendmodule\n"})}),"\n",(0,i.jsx)(e.h4,{id:"\u65e0\u6bdb\u523a\u5207\u6362",children:"\u65e0\u6bdb\u523a\u5207\u6362"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{src:c(79581).A+"",width:"1200",height:"371"})})]})}function d(n={}){const{wrapper:e}={...(0,l.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(u,{...n})}):u(n)}},79581:(n,e,c)=>{c.d(e,{A:()=>i});const i=c.p+"assets/images/23495115-63c7fe7f43744d40-f5cd02c78a5d8750d4796aca05c3029e.png"},28453:(n,e,c)=>{c.d(e,{R:()=>t,x:()=>o});var i=c(96540);const l={},r=i.createContext(l);function t(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:t(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);