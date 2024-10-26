"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9405],{4744:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>r,default:()=>p,frontMatter:()=>c,metadata:()=>a,toc:()=>d});var s=n(74848),i=n(28453);const c={},r=void 0,a={id:"FPGA-IC/SPI\u56db\u79cd\u5de5\u4f5c\u6a21\u5f0f",title:"SPI\u56db\u79cd\u5de5\u4f5c\u6a21\u5f0f",description:"https://www.cnblogs.com/liujinggang/p/9609739.html",source:"@site/docs/FPGA-IC/SPI\u56db\u79cd\u5de5\u4f5c\u6a21\u5f0f.md",sourceDirName:"FPGA-IC",slug:"/FPGA-IC/SPI\u56db\u79cd\u5de5\u4f5c\u6a21\u5f0f",permalink:"/docs/FPGA-IC/SPI\u56db\u79cd\u5de5\u4f5c\u6a21\u5f0f",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/FPGA-IC/SPI\u56db\u79cd\u5de5\u4f5c\u6a21\u5f0f.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Register",permalink:"/docs/FPGA-IC/Register"},next:{title:"STA",permalink:"/docs/FPGA-IC/STA"}},o={},d=[];function P(t){const e={a:"a",img:"img",p:"p",...(0,i.R)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.a,{href:"https://www.cnblogs.com/liujinggang/p/9609739.html",children:"https://www.cnblogs.com/liujinggang/p/9609739.html"}),"\r\nCPOL \u65f6\u949f\u6781\u6027\uff08clock polarity\uff09\uff1a\u51b3\u5b9a\u7a7a\u95f2\u65f6\u523bSCK\u7535\u5e73\r\nCPHA \u65f6\u949f\u76f8\u4f4d\uff08clock phase\uff09\uff1a\u51b3\u5b9a\u65f6\u949f\u91c7\u6837\u6cbf\uff080\uff1a\u7b2c\u4e00\u4e2a\u6cbf\u91c7\u6837\uff0c\u4e0d\u533a\u5206\u4e0a\u5347\u4e0b\u964d\uff0c1\uff1a\u7b2c\u4e8c\u4e2a\u6cbf\u91c7\u6837\uff0c\u4e0d\u533a\u5206\u4e0a\u5347\u4e0b\u964d\uff09\r\n",(0,s.jsx)(e.img,{src:n(14639).A+"",width:"788",height:"377"})]}),"\n",(0,s.jsx)(e.p,{children:"SPI\u603b\u7ebf\u662fMotorola\u516c\u53f8\u63a8\u51fa\u7684\u4e09\u7ebf\u540c\u6b65\u63a5\u53e3\uff0c\u540c\u6b65\u4e32\u884c3\u7ebf\u65b9\u5f0f\u8fdb\u884c\u901a\u4fe1:\u4e00\u6761\u65f6\u949f\u7ebfSCK\uff0c\u4e00\u6761\u6570\u636e\u8f93\u5165\u7ebfMOSI\uff0c\u4e00\u6761\u6570\u636e\u8f93\u51fa\u7ebfMISO\uff1b\u7528\u4e8e CPU\u4e0e\u5404\u79cd\u5916\u56f4\u5668\u4ef6\u8fdb\u884c\u5168\u53cc\u5de5\u3001\u540c\u6b65\u4e32\u884c\u901a\u8baf\u3002SPI\u4e3b\u8981\u7279\u70b9\u6709:\u53ef\u4ee5\u540c\u65f6\u53d1\u51fa\u548c\u63a5\u6536\u4e32\u884c\u6570\u636e\uff1b\u53ef\u4ee5\u5f53\u4f5c\u4e3b\u673a\u6216\u4ece\u673a\u5de5\u4f5c\uff1b\u63d0\u4f9b\u9891\u7387\u53ef\u7f16\u7a0b\u65f6\u949f\uff1b\u53d1\u9001\u7ed3\u675f\u4e2d\u65ad\u6807\u5fd7\uff1b\u5199\u51b2\u7a81\u4fdd\u62a4\uff1b\u603b\u7ebf\u7ade\u4e89\u4fdd\u62a4\u7b49\u3002"}),"\n",(0,s.jsx)(e.p,{children:"SPI\u603b\u7ebf\u6709\u56db\u79cd\u5de5\u4f5c\u65b9\u5f0f(SP0, SP1, SP2, SP3)\uff0c\u5176\u4e2d\u4f7f\u7528\u7684\u6700\u4e3a\u5e7f\u6cdb\u7684\u662fSPI0\u548cSPI3\u65b9\u5f0f\u3002SPI\u6a21\u5757\u4e3a\u4e86\u548c\u5916\u8bbe\u8fdb\u884c\u6570\u636e\u4ea4\u6362\uff0c\u6839\u636e\u5916\u8bbe\u5de5\u4f5c\u8981\u6c42\uff0c\u5176\u8f93\u51fa\u4e32\u884c\u540c\u6b65\u65f6\u949f\u6781\u6027\u548c\u76f8\u4f4d\u53ef\u4ee5\u8fdb\u884c\u914d\u7f6e\uff0c\u65f6\u949f\u6781\u6027(CPOL)\u5bf9\u4f20\u8f93\u534f\u8bae\u6ca1\u6709\u91cd\u5927\u7684\u5f71\u54cd\u3002\u5982\u679cCPOL=0\uff0c\u4e32\u884c\u540c\u6b65\u65f6\u949f\u7684\u7a7a\u95f2\u72b6\u6001\u4e3a\u4f4e\u7535\u5e73\uff1b\u5982\u679cCPOL=1\uff0c\u4e32\u884c\u540c\u6b65\u65f6\u949f\u7684\u7a7a\u95f2\u72b6\u6001\u4e3a\u9ad8\u7535\u5e73\u3002\u65f6\u949f\u76f8\u4f4d(CPHA)\u80fd\u591f\u914d\u7f6e\u7528\u4e8e\u9009\u62e9\u4e24\u79cd\u4e0d\u540c\u7684\u4f20\u8f93\u534f\u8bae\u4e4b\u4e00\u8fdb\u884c\u6570\u636e\u4f20\u8f93\u3002\u5982\u679c CPHA=0\uff0c\u5728\u4e32\u884c\u540c\u6b65\u65f6\u949f\u7684\u7b2c\u4e00\u4e2a\u8df3\u53d8\u6cbf(\u4e0a\u5347\u6216\u4e0b\u964d)\u6570\u636e\u88ab\u91c7\u6837\uff1b\u5982\u679cCPHA=1\uff0c\u5728\u4e32\u884c\u540c\u6b65\u65f6\u949f\u7684\u7b2c\u4e8c\u4e2a\u8df3\u53d8\u6cbf(\u4e0a\u5347\u6216\u4e0b\u964d)\u6570\u636e\u88ab\u91c7\u6837\u3002SPI\u4e3b\u6a21\u5757\u548c\u4e0e\u4e4b\u901a\u4fe1\u7684\u5916\u8bbe\u97f3\u65f6\u949f\u76f8\u4f4d\u548c\u6781\u6027\u5e94\u8be5\u4e00\u81f4\u3002SPI\u65f6\u5e8f\u8be6\u89e3---SPI\u63a5\u53e3\u5728\u6a21\u5f0f0\u4e0b\u8f93\u51fa\u7b2c\u4e00\u4f4d\u6570\u636e\u7684\u65f6\u523bSPI\u63a5\u53e3\u6709\u56db\u79cd\u4e0d\u540c\u7684\u6570\u636e\u4f20\u8f93\u65f6\u5e8f\uff0c\u53d6\u51b3\u4e8eCPOL\u548cCPHL\u8fd9\u4e24\u4f4d\u7684\u7ec4\u5408\u3002\u56fe1\u4e2d\u8868\u73b0\u4e86\u8fd9\u56db\u79cd\u65f6\u5e8f\uff0c\u65f6\u5e8f\u4e0eCPOL\u3001CPHL\u7684\u5173\u7cfb\u4e5f\u53ef\u4ee5\u4ece\u56fe\u4e2d\u770b\u51fa\u3002"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:n(40137).A+"",width:"657",height:"432"})}),"\n",(0,s.jsx)(e.p,{children:"\u56fe1"}),"\n",(0,s.jsx)(e.p,{children:"CPOL\u662f\u7528\u6765\u51b3\u5b9aSCK\u65f6\u949f\u4fe1\u53f7\u7a7a\u95f2\u65f6\u7684\u7535\u5e73\uff0cCPOL\uff1d0\uff0c\u7a7a\u95f2\u7535\u5e73\u4e3a\u4f4e\u7535\u5e73\uff0cCPOL\uff1d1\u65f6\uff0c\u7a7a\u95f2\u7535\u5e73\u4e3a\u9ad8\u7535\u5e73\u3002CPHA\u662f\u7528\u6765\u51b3\u5b9a\u91c7\u6837\u65f6\u523b\u7684\uff0cCPHA=0\uff0c\u5728\u6bcf\u4e2a\u5468\u671f\u7684\u7b2c\u4e00\u4e2a\u65f6\u949f\u6cbf\u91c7\u6837\uff0cCPHA\uff1d1\uff0c\u5728\u6bcf\u4e2a\u5468\u671f\u7684\u7b2c\u4e8c\u4e2a\u65f6\u949f\u6cbf\u91c7\u6837\u3002\u7531\u4e8e\u6211\u4f7f\u7528\u7684\u5668\u4ef6\u5de5\u4f5c\u5728\u6a21\u5f0f0\u8fd9\u79cd\u65f6\u5e8f\uff08CPOL\uff1d0\uff0cCPHA\uff1d0\uff09\uff0c\u6240\u4ee5\u5c06\u56fe1\u7b80\u5316\u4e3a\u56fe2\uff0c\u53ea\u5173\u6ce8\u6a21\u5f0f0\u7684\u65f6\u5e8f\u3002"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:n(71262).A+"",width:"654",height:"276"})}),"\n",(0,s.jsx)(e.p,{children:"\u56fe2"}),"\n",(0,s.jsx)(e.p,{children:"\u6211\u4eec\u6765\u5173\u6ce8SCK\u7684\u7b2c\u4e00\u4e2a\u65f6\u949f\u5468\u671f\uff0c\u5728\u65f6\u949f\u7684\u524d\u6cbf\u91c7\u6837\u6570\u636e\uff08\u4e0a\u5347\u6cbf\uff0c\u7b2c\u4e00\u4e2a\u65f6\u949f\u6cbf\uff09\uff0c\u5728\u65f6\u949f\u7684\u540e\u6cbf\u8f93\u51fa\u6570\u636e\uff08\u4e0b\u964d\u6cbf\uff0c\u7b2c\u4e8c\u4e2a\u65f6\u949f\u6cbf\uff09\u3002\u9996\u5148\u6765\u770b\u4e3b\u5668\u4ef6\uff0c\u4e3b\u5668\u4ef6\u7684\u8f93\u51fa\u53e3\uff08MOSI\uff09\u8f93\u51fa\u7684\u6570\u636ebit1\uff0c\u5728\u65f6\u949f\u7684\u524d\u6cbf\u88ab\u4ece\u5668\u4ef6\u91c7\u6837\uff0c\u90a3\u4e3b\u5668\u4ef6\u662f\u5728\u4f55\u65f6\u523b\u8f93\u51fabit1\u7684\u5462\uff1fbit1\u7684\u8f93\u51fa\u65f6\u523b\u5b9e\u9645\u4e0a\u5728SCK\u4fe1\u53f7\u6709\u6548\u4ee5\u524d\uff0c\u6bd4SCK\u7684\u4e0a\u5347\u6cbf\u8fd8\u8981\u65e9\u534a\u4e2a\u65f6\u949f\u5468\u671f\u3002bit1\u7684\u8f93\u51fa\u65f6\u523b\u4e0eSSEL\u4fe1\u53f7\u6ca1\u6709\u5173\u7cfb\u3002\u518d\u6765\u770b\u4ece\u5668\u4ef6\uff0c\u4e3b\u5668\u4ef6\u7684\u8f93\u5165\u53e3MISO\u540c\u6837\u662f\u5728\u65f6\u949f\u7684\u524d\u6cbf\u91c7\u6837\u4ece\u5668\u4ef6\u8f93\u51fa\u7684bit1\u7684\uff0c\u90a3\u4ece\u5668\u4ef6\u53c8\u662f\u5728\u4f55\u65f6\u523b\u8f93\u51fabit1\u7684\u5462\u3002\u4ece\u5668\u4ef6\u662f\u5728SSEL\u4fe1\u53f7\u6709\u6548\u540e\uff0c\u7acb\u5373\u8f93\u51fabit1\uff0c\u5c3d\u7ba1\u6b64\u65f6SCK\u4fe1\u53f7\u8fd8\u6ca1\u6709\u8d77\u6548\u3002"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:n(76773).A+"",width:"760",height:"451"})}),"\n",(0,s.jsx)(e.p,{children:"\u4ece\u8fd9\u5f20\u56fe\u5c31\u53ef\u4ee5\u5f88\u6e05\u695a\u7684\u770b\u51fa\u4e3b\u4ece\u5668\u4ef6\u7684bit1\u662f\u600e\u6837\u8f93\u51fa\u7684"})]})}function p(t={}){const{wrapper:e}={...(0,i.R)(),...t.components};return e?(0,s.jsx)(e,{...t,children:(0,s.jsx)(P,{...t})}):P(t)}},14639:(t,e,n)=>{n.d(e,{A:()=>s});const s=n.p+"assets/images/23495115-39af4f29f672f558-81d87fa5883b0a2749dd86dfc71d8c15.png"},76773:(t,e,n)=>{n.d(e,{A:()=>s});const s=n.p+"assets/images/23495115-76aafab705830088-72c433c1424af30bb8582c55d0653555.png"},40137:(t,e,n)=>{n.d(e,{A:()=>s});const s=n.p+"assets/images/23495115-a0d7b2db9d20e027-3b4ad8afae85bf310239a78307c89595.png"},71262:(t,e,n)=>{n.d(e,{A:()=>s});const s=n.p+"assets/images/23495115-bc0d768ffbfab66c-f9119830a49a29605870e3776e5eb9c9.png"},28453:(t,e,n)=>{n.d(e,{R:()=>r,x:()=>a});var s=n(96540);const i={},c=s.createContext(i);function r(t){const e=s.useContext(c);return s.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:r(t.components),s.createElement(c.Provider,{value:e},t.children)}}}]);