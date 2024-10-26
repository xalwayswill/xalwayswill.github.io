"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2288],{61401:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>o,contentTitle:()=>m,default:()=>d,frontMatter:()=>t,metadata:()=>s,toc:()=>c});var r=i(74848),_=i(28453);const t={},m=void 0,s={id:"\u968f\u7b14/img_driver-sv",title:"img_driver-sv",description:"",source:"@site/docs/\u968f\u7b14/img_driver-sv.md",sourceDirName:"\u968f\u7b14",slug:"/\u968f\u7b14/img_driver-sv",permalink:"/docs/\u968f\u7b14/img_driver-sv",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/\u968f\u7b14/img_driver-sv.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"img_config-sv",permalink:"/docs/\u968f\u7b14/img_config-sv"},next:{title:"img_env-sv",permalink:"/docs/\u968f\u7b14/img_env-sv"}},o={},c=[];function g(n){const e={code:"code",pre:"pre",...(0,_.R)(),...n.components};return(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:'`ifndef IMG_DRIVER__SV\r\n`define IMG_DRIVER__SV\r\n\r\nclass img_driver extends uvm_driver#(img_transaction);  // transaction must be set\r\n\r\n    virtual img_if img_vif;\r\n    img_config img_conf;\r\n\r\n    `uvm_component_utils(img_driver)\r\n    function new(string name = "img_driver", uvm_component parent = null);\r\n        super.new(name, parent);\r\n    endfunction : new\r\n\r\n    virtual function void build_phase (uvm_phase phase);\r\n        super.build_phase(phase);\r\n        if(!uvm_config_db#(virtual img_if)::get(this, "", "img_vif", img_vif))\r\n            `uvm_fatal("img_driver", "Virtual interface must be set!!!");\r\n    endfunction :  build_phase\r\n\r\n    extern virtual task main_phase(uvm_phase phase);\r\n    extern virtual task send_one_line(img_transaction tr);\r\n\r\nendclass\r\n\r\ntask img_driver::main_phase(uvm_phase phase);\r\n    int line_cnt;\r\n    line_cnt = 0;\r\n    img_vif.cb_drv.img_vld <= 1\'b0;\r\n    img_vif.cb_drv.img_data <= 8\'d0;\r\n    img_vif.cb_drv.newframe <= 1\'b0;\r\n    forever fork\r\n        begin: driver_block\r\n            while(1) begin\r\n                seq_item_port.get_next_item(req);\r\n                if(line_cnt == 0) begin\r\n                    repeat(img_conf.img_vb_num_before_frame*img_conf.img_line_length/img_conf.img_chn_num)  // vertical direction blanking line\r\n                        @(posedge img_vif.clk);\r\n                    img_vif.cb_drv.newframe <= 1\'b1;\r\n                    @(posedge img_vif.clk)\r\n                        img_vif.cb_drv.newframe <= 1\'b0;\r\n                    repeat(img_conf.img_OB_num*img_conf.img_line_length/img_conf.img_chn_num);  // vertical direction effective OB line\r\n                        @(posedge img_vif.clk);\r\n                end\r\n                send_one_line(req);\r\n                if(line_cnt == img_conf.img_high-1) begin\r\n                    line_cnt = 0;\r\n                    repeat(img_conf.img_vb_num_after_frame*img_conf.img_line_length/img_conf.img_chn_num) begin\r\n                        @(posedge img_vif.clk);\r\n                    end\r\n                end\r\n                else\r\n                    line_cnt++;\r\n                seq_item_port.item_done(req);\r\n            end\r\n        end: driver_block\r\n\r\n        begin: reset_block\r\n            wait(img_vif.rst);\r\n            disable driver_block;\r\n            `uvm_info("img_driver", {{20{"="}}, "Reset the DUT.", {20{"="}}}, UVM_LOW);\r\n            while(img_vif.rst)\r\n                @(posedge img_vif.clk);\r\n            `uvm_info("img_driver", {{20{"="}}, "Reset is done.", {20{"="}}}, UVM_LOW);\r\n        end: reset_block\r\n    join\r\nendtask : main_phase\r\n\r\ntask img_driver::send_one_line(img_transaction tr);\r\n    `uvm_info(get_type_name(), "begin to send one line", UVM_LOW);\r\n\r\n    for(int i = 0; i < img_conf.img_wide/img_conf.img_chn_num; i++) begin\r\n        @(posedge img_vif.clk)\r\n        for (int j = 0; j < `IMG_CHN_NUM; j++) begin\r\n            img_vif.cb_drv.img_data[j*`IMG_DATA_WIDTH+:`IMG_DATA_WIDTH] <= tr.img_data[i*`IMG_CHN_NUM+j];\r\n            // `uvm_info(get_full_name(), $sformatf("drv data is %0d", tr.img_data[i*`IMG_CHN_NUM+j]), UVM_LOW);\r\n        end\r\n        img_vif.cb_drv.img_vld <= 1\'b1;\r\n    end\r\n    img_vif.cb_drv.img_vld <= 1\'b0;\r\n    `uvm_info(get_full_name(), "end send one line", UVM_LOW);\r\n    repeat(img_conf.img_hb_num)\r\n        @(posedge img_vif.clk);\r\nendtask : send_one_line\r\n\r\n`endif\n'})})}function d(n={}){const{wrapper:e}={...(0,_.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(g,{...n})}):g(n)}},28453:(n,e,i)=>{i.d(e,{R:()=>m,x:()=>s});var r=i(96540);const _={},t=r.createContext(_);function m(n){const e=r.useContext(t);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(_):n.components||_:m(n.components),r.createElement(t.Provider,{value:e},n.children)}}}]);