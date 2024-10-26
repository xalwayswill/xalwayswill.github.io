"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[884],{50261:(n,r,e)=>{e.r(r),e.d(r,{assets:()=>m,contentTitle:()=>s,default:()=>g,frontMatter:()=>o,metadata:()=>_,toc:()=>c});var t=e(74848),i=e(28453);const o={},s=void 0,_={id:"\u968f\u7b14/tb-sv",title:"tb-sv",description:"",source:"@site/docs/\u968f\u7b14/tb-sv.md",sourceDirName:"\u968f\u7b14",slug:"/\u968f\u7b14/tb-sv",permalink:"/docs/\u968f\u7b14/tb-sv",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/\u968f\u7b14/tb-sv.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"rand_case-sv",permalink:"/docs/\u968f\u7b14/rand_case-sv"},next:{title:"test_img_case-sv",permalink:"/docs/\u968f\u7b14/test_img_case-sv"}},m={},c=[];function a(n){const r={code:"code",pre:"pre",...(0,i.R)(),...n.components};return(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:'//////////////////////////////////////////////////////////////////////////////////\r\n// Company: Hikvision\r\n// Engineer: xuyinghao\r\n// Create Date: 2021.01.28\r\n// Module Name: tb\r\n// Description:\r\n//  This module is the top of the testbench\r\n//\r\n// Revision:\r\n//   Revision 0.01 - File Created\r\n//\r\n//////////////////////////////////////////////////////////////////////////////////\r\n`timescale 1ns / 1ps\r\n\r\n`include "uvm_macros.svh"\r\n`include "img_if.sv"\r\nimport uvm_pkg::*;\r\nimport img_pkg::*;\r\n\r\nmodule tb(\r\n);\r\n\r\n//============================================\r\n// clock and reset\r\n//============================================\r\nparameter CLK_PERIOD = 10ns;\r\nparameter RESET_HOLD = 100ns;\r\nlogic clk;\r\nlogic rst;\r\ninitial begin\r\n    rst = 1\'b1;\r\n    #RESET_HOLD\r\n    rst = 1\'b0;\r\nend\r\ninitial begin\r\n    clk = 1\'b0;\r\n    forever #(CLK_PERIOD/2) clk = ~clk;\r\nend\r\n\r\n//============================================\r\n// interface and configuration\r\n//============================================\r\nimg_if img_if_drv(clk, rst);\r\nimg_if img_if_mon(clk, rst);\r\n\r\ninitial begin\r\nimg_config img_conf;\r\n    img_conf = img_config::type_id::create("img_conf");\r\n    uvm_config_db #(virtual img_if)::set(null, "uvm_test_top.env.img_agt_i.drv", "img_vif", img_if_drv);\r\n    uvm_config_db #(virtual img_if)::set(null, "uvm_test_top.env.img_agt_i.mon", "img_vif", img_if_drv);\r\n    uvm_config_db #(virtual img_if)::set(null, "uvm_test_top.env.img_agt_o.mon", "img_vif", img_if_mon);\r\n    uvm_config_db #(img_config)::set(null, "uvm_test_top.env.img_agt_i", "img_conf", img_conf);\r\n    uvm_config_db #(img_config)::set(null, "uvm_test_top.env.img_agt_o", "img_conf", img_conf);\r\n    uvm_config_db #(img_config)::set(null, "uvm_test_top", "img_conf", img_conf);\r\nend\r\n//============================================\r\n// dut\r\n//============================================\r\ndut dut_inst (\r\n    .clk         (clk                ), // Clock\r\n    .rst         (rst                ), // Clock Enable\r\n    .newframe    (img_if_drv.newframe),\r\n    .data_in     (img_if_drv.img_data),\r\n    .din_vld     (img_if_drv.img_vld ),\r\n    .newframe_out(img_if_mon.newframe),\r\n    .data_out    (img_if_mon.img_data),\r\n    .dout_vld    (img_if_mon.img_vld )\r\n);\r\n//============================================\r\n// testcase\r\n//============================================\r\ninitial begin\r\n    run_test();\r\nend;\r\n\r\n\r\n\r\nendmodule\n'})})}function g(n={}){const{wrapper:r}={...(0,i.R)(),...n.components};return r?(0,t.jsx)(r,{...n,children:(0,t.jsx)(a,{...n})}):a(n)}},28453:(n,r,e)=>{e.d(r,{R:()=>s,x:()=>_});var t=e(96540);const i={},o=t.createContext(i);function s(n){const r=t.useContext(o);return t.useMemo((function(){return"function"==typeof n?n(r):{...r,...n}}),[r,n])}function _(n){let r;return r=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:s(n.components),t.createElement(o.Provider,{value:r},n.children)}}}]);