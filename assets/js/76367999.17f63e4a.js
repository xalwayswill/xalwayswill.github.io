"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6661],{68761:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>a});var r=n(74848),s=n(28453);const i={},c="DDR3\u4eff\u771f\u8c03\u8bd5",o={id:"FPGA-IC/DDR3-\u7b80\u8bb0",title:"DDR3-\u7b80\u8bb0",description:"DDR3\u63d0\u9ad8\u4f20\u8f93\u901f\u7387\u7684\u539f\u56e0",source:"@site/docs/FPGA-IC/DDR3-\u7b80\u8bb0.md",sourceDirName:"FPGA-IC",slug:"/FPGA-IC/DDR3-\u7b80\u8bb0",permalink:"/docs/FPGA-IC/DDR3-\u7b80\u8bb0",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/FPGA-IC/DDR3-\u7b80\u8bb0.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DC\u7b80\u660e\u6559\u7a0b",permalink:"/docs/FPGA-IC/DC\u7b80\u660e\u6559\u7a0b"},next:{title:"DesignWire",permalink:"/docs/FPGA-IC/DesignWire"}},d={},a=[];function D(e){const t={em:"em",h1:"h1",header:"header",img:"img",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.img,{src:n(62442).A+"",width:"1392",height:"801"}),"\r\n",(0,r.jsx)(t.strong,{children:"DDR3\u63d0\u9ad8\u4f20\u8f93\u901f\u7387\u7684\u539f\u56e0"}),"\r\nDDR2\u662f4bit Prefetch DDR3\u4e3a",(0,r.jsx)(t.strong,{children:"8n Prefetch"}),"\uff08n\u4e3aDDR\u63a5\u53e3\u7684\u7269\u7406\u5bbd\u5ea6\uff09\u30028n-prefetch\u67b6\u6784\u7ed3\u5408DDR\u53cc\u6cbf\u91c7\u6837\u7684\u63a5\u53e3\u8bbe\u8ba1\uff0c\u80fd\u591f\u4f7f",(0,r.jsx)(t.strong,{children:"DDR3\u7684\u5185\u90e8\u65f6\u949f\u4e3a\u63a5\u53e3\u65f6\u949f\u7684\u56db\u5206\u4e4b\u4e00"}),"\uff0c\u8fd9\u4e5f\u662fPrefetch\u7684\u6839\u672c\u610f\u4e49\u6240\u5728\u3002"]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.em,{children:"The DDR3 SDRAM uses a 8n prefetch architecture to achieve high-speed operation. The 8n prefetch architecture is combined with an interface designed to transfer two data words per clock cycle at the I/O pins. A single read or write operation for the DDR3 SDRAM consists of a single 8n-bit wide, four clock data transfer at the internal DRAM core and two corresponding n-bit wide, one-half clock cycle data transfers at the I/O pins."}),"\r\n8bit\u9884\u53d6\u7ed3\u5408IO\u7ba1\u811a\u5904\u4e00\u4e2a\u65f6\u949f\u4f20\u8f932\u4e2a\u6570\u636e\u4f4d\u5bbd\u7684\u63a5\u53e3\u8bbe\u8ba1\uff08DDR\uff09\uff0c\u5355\u6b21\u8bfb\u5199\u64cd\u4f5c\u75318n-bits \u5bbd\u5ea6\uff0c DRAM\u6838\u5185\u90e8\u56db\u4e2a\u65f6\u949f\u7684\u6570\u636e\u4f20\u8f93\u4ee5\u53ca\u4e24\u4e2a\r\n\u5b8c\u6210\u5355\u6b218n-bits\u6570\u636e\u7684\u8bfb\u5199\u64cd\u4f5c\uff0cDRAM\u5185\u90e8\u9700\u89814\u6b21\u6570\u636e\u4f20\u8f93\u4e14IO\u63a5\u53e3\u5b8c\u6210\u4e24\u6b21\u91c7\u6837\uff08\u4e0a\u4e0b\u6cbf\uff09\uff0cIO\u7ba1\u53e3\u65f6\u949f\u5468\u671f\u51cf\u5c11\u4e00\u534a\u3002\r\n\u5982\u4e0a\u56fe\u6240\u793a\u7269\u7406\u4f4d\u5bbd\u4e3a16bits\uff0cprefetch\u4e3a8\uff0cprefetch\u6570\u636e\u4f4d\u5bbd\u4e3a8(Burst length) * 16bits(\u7269\u7406\u4f4d\u5bbd) = 128bits\r\n\u8be5DDR3\u4e00\u4e2a\u5185\u90e8\u65f6\u949f\u5468\u671f\u53ef\u4ee5\u4f20\u8f93128bits\u6570\u636e\u3002\uff08DDR\u5185\u90e8\u65f6\u949f\u4e3a\u5916\u90e8\u65f6\u949f\u7684\u56db\u5206\u4e4b\u4e00\uff0c\u56e0\u4e3a\u5916\u90e8\u65f6\u949f\u5982CPU\u80fd\u8dd1\u5f88\u9ad8\uff0c\u6240\u4ee5\u4e3b\u8981\u4ee5DDR\u5185\u90e8\u65f6\u949f\u4e3a\u53c2\u8003\u8868\u793a\u4f20\u8f93\u901f\u7387\uff09\r\n\u4e0a\u56fe\u4e2d\uff0cDDR3\u5185\u90e8\u9884\u53d6128bit\u6570\u636e\u5230READ FIFO\uff0c\u5728\u6bcf\u4e2aIO\u65f6\u949f\u7684\u4e0a\u4e0b\u6cbf\u5747\u4f20\u8f9316bit\u6570\u636e\u8f93\u51fa\u3002"]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"BC and BL"}),"\r\nDDR3 \u7a81\u53d1\u6a21\u5f0f\u4e0bBL\uff08Burst Length\uff09= 8\uff0c\u4f46\u662f\u4e3a\u4e86\u5411\u4e0b\u517c\u5bb9\uff0c\u9488\u5bf94bits\u7a81\u53d1\u4f20\u8f93\u65f6\u5e76\u7b14\u8c03\u540e\u9762\u76844bits\u6570\u636e\uff0c\u8fd9\u79cd\u53eb\u505aBC4\uff08Burst chop 4 mode\uff09\r\n",(0,r.jsx)(t.img,{src:n(73068).A+"",width:"1252",height:"587"}),"\r\n\u672c\u5e94\u4f20\u8f938bits\u7684\u6570\u636e\uff0c\u7ed3\u679c\u5728\u4f20\u8f93\u4e864bits\u540e\u5c31\u7ec8\u6b62\u4e86\u3002\u8fd9\u6837\u5c31\u6d6a\u8d39\u4e86\u88ab\u5c4f\u853d\u6389\u7684\u4f20\u8f93\u65f6\u95f4\u3002\u4f46\u662fDDR3\u662f8bits\u9884\u53d6\u7684\uff0c\u4e00\u4e2a\u65f6\u949f\u90018bits\u7684\u6570\u636e\u5230\u4f20\u8f93buffer\u5185\uff0c\u5e94\u8be5\u4e0d\u80fd\u4fee\u6539\u4e3aBL4"]}),"\n",(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"ddr3\u4eff\u771f\u8c03\u8bd5",children:"DDR3\u4eff\u771f\u8c03\u8bd5"})}),"\n",(0,r.jsx)(t.p,{children:"\u901a\u8fc7VIVADO\u751f\u6210\u6240\u9700\u8981\u7684IP\uff0c\u7136\u540e\u9009\u62e9IP\u53f3\u952e\u6253\u5f00\u53c2\u8003\u6a21\u578b\u5373\u53ef\u521b\u5efa\u5e76\u6253\u5f00XILINX\u63d0\u4f9b\u7684DDR3\u4eff\u771f\u5de5\u7a0b\uff0c\u5185\u542bDDR3\u7684sv model\u3002\r\nDDR3\u4eff\u771f\u8c03\u8bd5\uff0cddr3 init_calib_completed \u4fe1\u53f7\u6ca1\u6709\u62c9\u9ad8\u3002\r\n\u540e\u9762\u5206\u6790\u4e86\u534a\u5929\u53d1\u73b0\u53c8\u662fsb\u95ee\u9898\uff0cstupid\uff0c\u7ed9\u5230ddr3\u7684cs\u4fe1\u53f7\u547d\u540d\u9519\u8bef\uff08ddr\u5199\u6210DDR\uff09\r\n\u867d\u7136\u56e0\u4e3a\u81ea\u5df1\u7684\u667a\u969c\u8e29\u4e86\u5751\uff0c\u4f46\u662f\u603b\u4f53\u800c\u8a00\u8fd8\u662f\u5b66\u5230\u4e86\u5f88\u591a\uff0c\u4eff\u771f\u65f6\u7684\u6253\u5370\uff0c\u95ee\u9898\u7684\u89e3\u51b3\u3002\u901a\u8fc7\u4eff\u771f\u65e5\u5fd7\u67e5\u770b\u95ee\u9898\uff0c\u67e5\u770b\u54ea\u4e2a\u6a21\u5757\u7684\u8fdb\u884c\u7684\u6253\u5370\u4ece\u800c\u5b9a\u4f4d\u95ee\u9898\u3002\u4eff\u771f\u65f6\u591a\u6253\u5370\uff0c\u5728\u5173\u952e\u4f4d\u7f6e\u6dfb\u52a0\u4e00\u4e9b\u6709\u6807\u5fd7\u6027\u7684\u6253\u5370\u3002\r\nMIG\u5728\u4eff\u771f\u8fc7\u7a0b\u4e2d\u4f1a\u548cDDR\u8fdb\u884c\u901a\u4fe1\u7684\uff0cMIG\u521d\u59cb\u5316\u5b8c\u6210\u540e\u5c31\u4f1a\u53bb\u63a7\u5236DDR\u6a21\u578b\u3002DDR3\u6a21\u578b\u662fsv\u5199\u7684\uff0c\u5185\u90e8\u5199\u6cd5\u53ef\u4ee5\u53c2\u8003\u3002\u901a\u8fc7task\u548cfunction\u5b9e\u73b0\u529f\u80fd\u3002"})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(D,{...e})}):D(e)}},73068:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/23495115-1cfd88ed6f407bb5-14dd0f0c3a9fd1d3d632d4056ceb62f6.png"},62442:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/23495115-6c3d902e8779d2b4-2d44d55a6bb646fe5c3ce09b88ab32ab.png"},28453:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>o});var r=n(96540);const s={},i=r.createContext(s);function c(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);