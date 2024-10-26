"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9966],{33989:(e,n,c)=>{c.r(n),c.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>d});var t=c(74848),s=c(28453);const i={},r=void 0,a={id:"FPGA-IC/\u95e8\u63a7\u65f6\u949f",title:"\u95e8\u63a7\u65f6\u949f",description:"Reference",source:"@site/docs/FPGA-IC/\u95e8\u63a7\u65f6\u949f.md",sourceDirName:"FPGA-IC",slug:"/FPGA-IC/\u95e8\u63a7\u65f6\u949f",permalink:"/docs/FPGA-IC/\u95e8\u63a7\u65f6\u949f",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/FPGA-IC/\u95e8\u63a7\u65f6\u949f.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u8de8\u65f6\u949f\u57df(CDC)",permalink:"/docs/FPGA-IC/\u8de8\u65f6\u949f\u57df(CDC)"},next:{title:"\u9664\u6cd5\u8fd0\u7b97",permalink:"/docs/FPGA-IC/\u9664\u6cd5\u8fd0\u7b97"}},l={},d=[{value:"Reference",id:"reference",level:3},{value:"Hierarchical Clock Gating",id:"hierarchical-clock-gating",level:3},{value:"\u65f6\u949f\u95e8\u63a7\u7535\u8def",id:"\u65f6\u949f\u95e8\u63a7\u7535\u8def",level:3},{value:"\u95e8\u63a7\u65f6\u949f\u7684\u7ea6\u675f",id:"\u95e8\u63a7\u65f6\u949f\u7684\u7ea6\u675f",level:3}];function o(e){const n={a:"a",code:"code",h3:"h3",img:"img",li:"li",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h3,{id:"reference",children:"Reference"}),"\n",(0,t.jsxs)(n.p,{children:["[1] ",(0,t.jsx)(n.a,{href:"https://www.cnblogs.com/hxing/p/14509169.html",children:"https://www.cnblogs.com/hxing/p/14509169.html"})]}),"\n",(0,t.jsx)(n.h3,{id:"hierarchical-clock-gating",children:"Hierarchical Clock Gating"}),"\n",(0,t.jsx)(n.p,{children:"\u65f6\u949f\u95e8\u63a7\u5206\u4e3a\u4e00\u6b21\u4e09\u4e2a\u5c42\u7ea7\uff1a"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Coarse-Grained Gating (CGCG)\r\nGate the sub-system/block(root) level clock according to the system scenario(e.g. sleep)"}),"\n",(0,t.jsx)(n.li,{children:"Medium-Grained Clock Gating (MGCG)\r\nGate the IP/sub-module (trunk) level clock according to activity (e.g. Bus idle)"}),"\n",(0,t.jsx)(n.li,{children:"Fine-Grained Clock Gating (FGCG)\r\nGate the register level (leaf) clock with synthesis tools"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"\u65f6\u949f\u95e8\u63a7\u7535\u8def",children:"\u65f6\u949f\u95e8\u63a7\u7535\u8def"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u7b80\u5355\u7684\u95e8\u63a7\u65f6\u949f\r\n",(0,t.jsx)(n.img,{src:c(53010).A+"",width:"289",height:"166"}),"\r\n\u4e0a\u8ff0\u7535\u8def\u4e2d\uff0c\u5c06\u63a7\u5236\u4fe1\u53f7EN\u548c\u65f6\u949f\u4fe1\u53f7CLK\u76f4\u63a5\u8fdb\u884c\u4e0e\u64cd\u4f5c\uff0c\u6765\u5b8c\u6210\u95e8\u63a7\uff0c\u5bf9\u5e94\u7684\u6ce2\u5f62\u5982\u4e0b\uff1a\r\n",(0,t.jsx)(n.img,{src:c(60958).A+"",width:"452",height:"206"}),"\r\n\u53ef\u4ee5\u770b\u5230\uff0c\u5982\u679cEN\u4fe1\u53f7\u4e0d\u52a0\u63a7\u5236\uff0c\u4f1a\u5bfc\u81f4\u95e8\u63a7\u65f6\u949f\u51fa\u73b0\u5f88\u591a\u6bdb\u523a\uff0c\u65f6\u949f\u4fe1\u53f7\u4e0a\u7684\u6bdb\u523a\u662f\u975e\u5e38\u5371\u9669\u7684\uff0c\u56e0\u6b64\u4e0a\u8ff0\u7535\u8def\u6240\u793a\u7684\u95e8\u63a7\u65b9\u6cd5\u5f88\u5c11\u91c7\u7528\u3002"]}),"\n",(0,t.jsxs)(n.li,{children:["\u57fa\u4e8e\u9501\u5b58\u5668\u7684\u95e8\u63a7\u65f6\u949f\u65b9\u6848\r\n\u4e3a\u4e86\u907f\u514d\u4e0a\u8ff0\u7b80\u5355\u903b\u8f91\u4e0e\u6240\u5e26\u6765\u7684\u6bdb\u523a\u95ee\u9898\uff0c\u5f15\u5165\u57fa\u4e8e\u9501\u5b58\u5668\u7684\u95e8\u63a7\u65f6\u949f\u65b9\u6848\uff0c\u5982\u4e0b\u56fe\u6240\u793a\uff1a\r\n",(0,t.jsx)(n.img,{src:c(94997).A+"",width:"554",height:"211"}),"\r\n\u5bf9\u5e94\u7684\u65f6\u5e8f\u56fe\u5982\u4e0b:\r\n",(0,t.jsx)(n.img,{src:c(7538).A+"",width:"467",height:"148"}),"\r\n\u53ef\u4ee5\u770b\u5230\uff0c\u8fd9\u79cd\u65b9\u5f0f\u57fa\u4e8e\u9501\u5b58\u56680\u4fdd\u63011\u901a\u8fc7\u7684\u7279\u6027\uff0c\u4fdd\u8bc1\u5728clk\u7684\u4f4e\u7535\u5e73\u9636\u6bb5\u8fdb\u884cclk\u4f7f\u80fd\u7684\u5207\u6362\uff0c\u518d\u5c06\u9501\u5b58\u5668\u8f93\u51fa\u7684EN\u4fe1\u53f7\u4e0e\u539f\u59cb\u7684CLK\u4fe1\u53f7\u76f8\u4e0e\uff0c\u5b8c\u6210\u65f6\u949f\u7684\u95e8\u63a7\u3002\r\n\u4e0d\u8fc7\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u5728\u5b9e\u9645\u7684\u7535\u8def\u4e2d\uff0c\u5982\u679c\u9501\u5b58\u5668\u7684\u4e24\u4e2a\u8f93\u5165\u4fe1\u53f7\u76f8\u9694\u5f88\u8fdc\uff0c\u5230\u8fbe\u9501\u5b58\u5668\u548c\u4e0e\u95e8\u7684\u65f6\u949fskew\u5f88\u5927\u65f6\uff0c\u4e5f\u4f1a\u5bfc\u81f4\u6bdb\u523a\u7684\u51fa\u73b0\uff0c\u5982\u4e0b\u56fe\u6240\u793a\uff1a\r\n",(0,t.jsx)(n.img,{src:c(10002).A+"",width:"781",height:"431"}),"\r\n\u4e0a\u8ff0\u7684\u53f3\u4e0a\u56fe\u4e2d\uff0cB\u70b9\u7684\u65f6\u949f\u6bd4A\u65f6\u949f\u8fdf\u5230\uff0c\u5e76\u4e14Skew \u5927\u4e8e delay\uff0c\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u4ea7\u751f\u4e86\u6bdb\u523a\u3002\u4e3a\u4e86\u6d88\u9664\u6bdb\u523a\uff0c\u8981\u63a7\u5236Clock Skew\uff0c\u4f7f\u5b83\u6ee1\u8db3Skew\u5c0f\u4e8eLatch delay\uff08\u4e5f\u5c31\u662f\u9501\u5b58\u5668\u7684clk-q\u7684\u5ef6\u65f6\uff09\u3002\u4e0a\u8ff0\u7684\u53f3\u4e0b\u56fe\u4e2d\uff0cB\u70b9\u7684\u65f6\u949f\u6bd4A\u65f6\u949f\u65e9\u5230\uff0c\u5e76\u4e14|Skew|\u5927\u4e8eENsetup \u4e00 (D->Q)\uff0c\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u4e5f\u4ea7\u751f\u4e86\u6bdb\u523a\u3002\u4e3a\u4e86\u6d88\u9664\u6bdb\u523a\uff0c\u8981\u63a7\u5236Clock Skew\uff0c\u4f7f\u5b83\u6ee1\u8db3",(0,t.jsx)(n.code,{children:"|Skew|< ENsetup\u4e00(D->Q)"}),"\u3002\r\n\u5e38\u89c1\u7684\u662f\u7b2c\u4e00\u79cd\u6bdb\u523a\uff0c\u4e0d\u8fc7\u6211\u4eec\u53ef\u4ee5\u5c06\u8fd9\u4e2a\u903b\u8f91\u505a\u6210\u4e00\u4e2a\u5355\u5143\uff08ICG\uff1aIntegrated Clock Gating cell\uff09\uff0c\u8fd9\u6837\u5c31\u57fa\u672c\u4e0a\u80fd\u6d88\u9664\u4e0a\u9762\u7684\u90a3\u4e24\u79cd\u6bdb\u523a\u4e86\uff0c\u5373\uff1a\r\n",(0,t.jsx)(n.img,{src:c(66443).A+"",width:"476",height:"226"})]}),"\n",(0,t.jsxs)(n.li,{children:["\u907f\u514d\u65f6\u949f\u95e8\u63a7\u4fe1\u53f7\u5b58\u5728\u6bdb\u523a\u7684\u65f6\u949f\u95e8\u63a7\u65b9\u6848\uff08FPGA\u65b9\u6848\uff09\r\n\u5982\u679c\u9001\u5230latch\u7684en\u4fe1\u53f7\u662f\u7ec4\u5408\u903b\u8f91\u8f93\u51fa\uff0c\u5728latch\u524d\u4e5f\u53ef\u80fd\u5b58\u5728\u6bdb\u523a\uff0c\u4e3a\u4e86\u66f4\u52a0\u5b89\u5168\u7684\u6ee4\u6389\u6bdb\u523a\u6216\u8005\u5c16\u5cf0\uff0c\u53ef\u4ee5\u4f7f\u7528clock\u7684\u4e0b\u964d\u6cbf\u5bf9en\u4fe1\u53f7\u8fdb\u884c\u91c7\u6837\uff0c\u518d\u5c06DFF\u91c7\u6837\u540e\u7684en\u4fe1\u53f7\u9001\u5230latch\u9501\u5b58\uff0c\u907f\u514d\u6bdb\u523a\u4ea7\u751f\r\n",(0,t.jsx)(n.a,{href:"https://www.intel.cn/content/www/cn/zh/docs/programmable/683082/20-3/recommended-clock-gating-methods.html",children:"https://www.intel.cn/content/www/cn/zh/docs/programmable/683082/20-3/recommended-clock-gating-methods.html"})]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"\u95e8\u63a7\u65f6\u949f\u7684\u7ea6\u675f",children:"\u95e8\u63a7\u65f6\u949f\u7684\u7ea6\u675f"}),"\n",(0,t.jsxs)(n.p,{children:["\u4e00\u822c\u7efc\u5408\u5e93\u91cc\u9762\u90fd\u4f1a\u6709\u95e8\u63a7\u65f6\u949f\u5355\u5143\u7684\u7ea6\u675f\uff0c\u5982\u679c\u662f\u81ea\u5df1\u4f7f\u7528\u903b\u8f91\u5b9e\u73b0\u7684\u95e8\u63a7\u65f6\u949f\uff0c\u5219\u9700\u8981\u589e\u52a0\u76f8\u5e94\u7684sdc\u7ea6\u675f\r\n",(0,t.jsx)(n.code,{children:"set_clock_gating_check"})]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},53010:(e,n,c)=>{c.d(n,{A:()=>t});const t=c.p+"assets/images/23495115-48494528f09713c8-a3740762c4639d48860e7577c7feac1a.png"},60958:(e,n,c)=>{c.d(n,{A:()=>t});const t=c.p+"assets/images/23495115-80ad4cdb6b095052-d04635a185e53d92b1c48b7a29e0b3e2.png"},7538:(e,n,c)=>{c.d(n,{A:()=>t});const t=c.p+"assets/images/23495115-a31f084503f4e007-05152d723c7bf395d94981d4842c0df4.png"},94997:(e,n,c)=>{c.d(n,{A:()=>t});const t=c.p+"assets/images/23495115-bab47c51d70792d2-96b52d55be800c152b6b8435b765417b.png"},10002:(e,n,c)=>{c.d(n,{A:()=>t});const t=c.p+"assets/images/23495115-e2da98d83aae9eea-8fb7b74a71eddec9b8a66f240fea086b.png"},66443:(e,n,c)=>{c.d(n,{A:()=>t});const t=c.p+"assets/images/23495115-edc382a58529850f-5424a2647c1e94279d6e313688aab5f5.png"},28453:(e,n,c)=>{c.d(n,{R:()=>r,x:()=>a});var t=c(96540);const s={},i=t.createContext(s);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);