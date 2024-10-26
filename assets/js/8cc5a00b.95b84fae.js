"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[233],{45409:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var r=t(74848),s=t(28453);const a={},o=void 0,i={id:"\u968f\u7b14/base_test-sv",title:"base_test-sv",description:"",source:"@site/docs/\u968f\u7b14/base_test-sv.md",sourceDirName:"\u968f\u7b14",slug:"/\u968f\u7b14/base_test-sv",permalink:"/docs/\u968f\u7b14/base_test-sv",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/\u968f\u7b14/base_test-sv.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ImageData-sv",permalink:"/docs/\u968f\u7b14/ImageData-sv"},next:{title:"filelist-py",permalink:"/docs/\u968f\u7b14/filelist-py"}},u={},c=[];function p(e){const n={code:"code",pre:"pre",...(0,s.R)(),...e.components};return(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'`ifndef BASE_TEST__SV\r\n`define BASE_TEST__SV\r\n\r\n\r\nclass base_test extends uvm_test;\r\n\r\n    img_env env;\r\n\r\n    function new(string name = "base_test", uvm_component parent = null);\r\n        super.new(name, parent);\r\n    endfunction : new\r\n\r\n    extern virtual function void build_phase(uvm_phase phase);\r\n    extern virtual function void report_phase(uvm_phase phase);\r\n\r\n    `uvm_component_utils(base_test)\r\nendclass\r\n\r\nfunction void base_test::build_phase(uvm_phase phase);\r\n    super.build_phase(phase);\r\n    env = img_env::type_id::create("env", this);\r\nendfunction : build_phase\r\n\r\nfunction void base_test::report_phase(uvm_phase phase);\r\n    uvm_report_server server;\r\n    int err_num;\r\n    super.report_phase(phase);\r\n\r\n    server = get_report_server();\r\n    err_num = server.get_severity_count(UVM_ERROR);\r\n\r\n    if(err_num != 0) begin\r\n        $display("TEST CASE FAILED");\r\n    end\r\n    else begin\r\n        $display("TEST CASE PASSED");\r\n    end\r\n\r\nendfunction : report_phase\r\n\r\n`endif\n'})})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>i});var r=t(96540);const s={},a=r.createContext(s);function o(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);