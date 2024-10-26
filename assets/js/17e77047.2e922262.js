"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2745],{25986:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>a});var r=t(74848),i=t(28453);const o={},s=void 0,c={id:"\u968f\u7b14/img_if-sv",title:"img_if-sv",description:"",source:"@site/docs/\u968f\u7b14/img_if-sv.md",sourceDirName:"\u968f\u7b14",slug:"/\u968f\u7b14/img_if-sv",permalink:"/docs/\u968f\u7b14/img_if-sv",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/\u968f\u7b14/img_if-sv.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"img_env-sv",permalink:"/docs/\u968f\u7b14/img_env-sv"},next:{title:"img_model-sv",permalink:"/docs/\u968f\u7b14/img_model-sv"}},d={},a=[];function u(e){const n={code:"code",pre:"pre",...(0,i.R)(),...e.components};return(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"`ifndef IMG_INTERFACE\r\n`define IMG_INTERFACE\r\n\r\n`define IMG_DATA_WIDTH 16\r\n`define IMG_CHN_NUM 8\r\n\r\ninterface img_if(input clk, rst);\r\n    logic newframe;\r\n    logic img_vld;\r\n    logic [`IMG_DATA_WIDTH*`IMG_CHN_NUM-1:0] img_data;\r\n\r\n    clocking cb_drv @(posedge clk);\r\n        default input #1ns output #0ns;\r\n        output newframe, img_vld, img_data;\r\n    endclocking\r\n\r\n    clocking cb_mon @(posedge clk);\r\n        default input #1ns output #0ns;\r\n        input newframe, img_vld, img_data;\r\n    endclocking\r\n\r\nendinterface\r\n\r\n`endif\n"})})}function m(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var r=t(96540);const i={},o=r.createContext(i);function s(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);