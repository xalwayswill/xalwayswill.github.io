"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[31],{88398:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>a,contentTitle:()=>o,default:()=>u,frontMatter:()=>d,metadata:()=>c,toc:()=>i});var n=t(74848),s=t(28453);const d={},o=void 0,c={id:"FPGA-IC/\u603b\u7ebf\u8de84K\u5904\u7406",title:"\u603b\u7ebf\u8de84K\u5904\u7406",description:"\u4f20\u8f93\u8de8\u8d8a4k\u8fb9\u754c\u9700\u8981\u62c6\u5206\u6210\u4e24\u4e2aburst",source:"@site/docs/FPGA-IC/\u603b\u7ebf\u8de84K\u5904\u7406.md",sourceDirName:"FPGA-IC",slug:"/FPGA-IC/\u603b\u7ebf\u8de84K\u5904\u7406",permalink:"/docs/FPGA-IC/\u603b\u7ebf\u8de84K\u5904\u7406",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/FPGA-IC/\u603b\u7ebf\u8de84K\u5904\u7406.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5f02\u6b65FIFO",permalink:"/docs/FPGA-IC/\u5f02\u6b65FIFO"},next:{title:"\u76f4\u65b9\u56fe\u7edf\u8ba1",permalink:"/docs/FPGA-IC/\u76f4\u65b9\u56fe\u7edf\u8ba1"}},a={},i=[];function _(e){const r={code:"code",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:"\u4f20\u8f93\u8de8\u8d8a4k\u8fb9\u754c\u9700\u8981\u62c6\u5206\u6210\u4e24\u4e2aburst"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:"addr_plus_len = {{AXI_BUS_AW-12}{1'b0}}, i_rd_c_addr[11:0]} + {{(AXI_BUS_AW-10){1'b0}}}, i_rd_c_len};\r\ncross_4k = addr_plus_len[12] & (|addr_plus_len[11:0]);\r\nbyte_before_4k = cross_4k ? ~i_rd_c_addr[11:0] + 12'b1 : i_rd_c_len;  // A[n:0]+(~A[n:0])+1 = {1'b1, {n{1'b0}}}\r\nbyte_after_4k = addr_plus_len[11:0];\r\naddr_before_4k = i_rd_c_addr;\r\naddr_after_4k = {i_rd_c_addr[AXI_BUS_AW-1:12]+1'b1, 12'b0};\n"})})]})}function u(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(_,{...e})}):_(e)}},28453:(e,r,t)=>{t.d(r,{R:()=>o,x:()=>c});var n=t(96540);const s={},d=n.createContext(s);function o(e){const r=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(d.Provider,{value:r},e.children)}}}]);