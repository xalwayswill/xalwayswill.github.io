"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8384],{78871:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var t=r(74848),o=r(28453);const i={},a=void 0,s={id:"work-log---arm-china/YNR-\u4f18\u5316",title:"YNR-\u4f18\u5316",description:"\u7b97\u6cd5\u7b80\u4ecb\uff1aYNR\u7684\u7a97\u53e3\u5927\u5c0f\u4e3a13x13\uff0c\u5148\u4ece\u5185\u90e85x5\u7684\u7a97\u53e3\u901a\u8fc7MeanFilter\u8ba1\u7b97lum\uff0c\u4e5f\u5c31\u662f\u5747\u503c\u6ee4\u6ce2\u53bb\u4f30\u8ba1\u566a\u58f0\uff0c\u5e76\u4e14\u5c06mv\u4fe1\u606f\u5e26\u5165\uff0c\u5982\u679c\u8fd0\u52a8\u5219noise\\*nlmmotionr\uff0c\u4e4b\u540e\u518d\u57285x5\u7684\u7a97\u5185\u5bfb\u627e\u6700\u5927\u503c\u548c\u6700\u5c0f\u503c\uff0c\u901a\u8fc7max-min\u5f97\u5230contrast\uff0c\u7136\u540e\u901a\u8fc7\u66f2\u7ebf\u62df\u5408\uff0c\u4f30\u8ba1Freq\u3002",source:"@site/docs/work-log---arm-china/YNR-\u4f18\u5316.md",sourceDirName:"work-log---arm-china",slug:"/work-log---arm-china/YNR-\u4f18\u5316",permalink:"/docs/work-log---arm-china/YNR-\u4f18\u5316",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/work-log---arm-china/YNR-\u4f18\u5316.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"SDE\u4f18\u5316",permalink:"/docs/work-log---arm-china/SDE\u4f18\u5316"},next:{title:"YUV2RGB",permalink:"/docs/work-log---arm-china/YUV2RGB"}},l={},c=[];function m(e){const n={li:"li",p:"p",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"\u7b97\u6cd5\u7b80\u4ecb\uff1aYNR\u7684\u7a97\u53e3\u5927\u5c0f\u4e3a13x13\uff0c\u5148\u4ece\u5185\u90e85x5\u7684\u7a97\u53e3\u901a\u8fc7MeanFilter\u8ba1\u7b97lum\uff0c\u4e5f\u5c31\u662f\u5747\u503c\u6ee4\u6ce2\u53bb\u4f30\u8ba1\u566a\u58f0\uff0c\u5e76\u4e14\u5c06mv\u4fe1\u606f\u5e26\u5165\uff0c\u5982\u679c\u8fd0\u52a8\u5219noise*nlm_motion_r\uff0c\u4e4b\u540e\u518d\u57285x5\u7684\u7a97\u5185\u5bfb\u627e\u6700\u5927\u503c\u548c\u6700\u5c0f\u503c\uff0c\u901a\u8fc7max-min\u5f97\u5230contrast\uff0c\u7136\u540e\u901a\u8fc7\u66f2\u7ebf\u62df\u5408\uff0c\u4f30\u8ba1Freq\u3002\r\n13x13\u7684\u7a97\u5185\u90e8\u8fdb\u884cnlm\u8ba1\u7b97\uff0cblock match\u7684size\u4e3a3x3\uff0c\u5171\u8ba1\u7b9711x11\u4e2a3x3\u7a97\u53e3\u7684sad\uff0c\u7136\u540e\u6839\u636eSAD\u53bb\u67e5\u8868\uff08\u5bc4\u5b58\u5668\u53ef\u914d\uff09\u83b7\u5f97\u6bcf\u4e2amatch block \u4e2d\u5fc3\u50cf\u7d20\u7684\u6743\u91cd\uff0c\u7136\u540e\u5bf9\u6bcf\u4e2a\u4e2d\u5fc3\u50cf\u7d20\u8fdb\u884c\u52a0\u6743\u5e73\u5747"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u95ee\u98981\uff1aYNR\u4e2d\u901a\u8fc7\u572813*13\u7684\u7a97\u53e3\u5185\u505anlm\uff0c\u5728nlm\u4e4b\u524d\u4f1a\u6839\u636e5*5\u7684\u7a97\u505a\u4e00\u4e2a\u5747\u503c\u6765\u83b7\u5f97\u566a\u58f0\uff0c\u4e4b\u540e\u83b7\u5f97\u7684\u566a\u58f0\u4f1a\u53c2\u4e0enlm\u8fd0\u7b97\uff0c\u539f\u6765\u7684\u4ee3\u7801\u662f\u76f4\u63a5\u751f\u621013*13\u7684\u7a97\u53e3\uff0c\u7136\u540e\u622a\u53d65*5\u7684\u7a97\u53e3\uff0c\u5bfc\u81f4\u4f1a\u5bf913*13*10\u7684\u7a97\u53e3\u6253\u62cd\u597d\u591a\u6b21\u3002\r\n\u4f18\u5316\u601d\u8def\uff1a\u4fee\u6539\u751f\u6210\u50cf\u7d20\u7a97\u7684\u6a21\u5757\uff0c\u8ba95*5\u7684\u7a97\u53e3\u63d0\u524d\u51fa\u6765\uff0c\u8fd9\u6837\u539f\u676513*13\u7684\u7a97\u53e3\u8f93\u51fa\u9700\u89816\u884cline delay\u4ee5\u53ca6\u4e2apixel\u7684delay\uff0c\u4fee\u6539\u540e5*5\u7684\u7a97\u53e3\u53ea\u9700\u89812\u4e2acycle\u7684delay\u51fa\u6765\uff0c\u76f8\u5bf9\u4e8e\u539f\u8bbe\u8ba1\u8282\u77014\u62cd\u7684\u6253\u62cd\u903b\u8f91\uff0c\u8282\u7ea64*13*13*10\u4e2abit\u7684reg\u3002"}),"\n",(0,t.jsx)(n.li,{children:"\u95ee\u98982\uff1aYNR\u8f93\u5165\u50cf\u7d20\u8fd8\u6709mv\u6570\u636e\uff0c\u4e3a\u4e86\u4fdd\u6301mv\u4e0e\u62fc\u7a97\u540e\u7684\u6570\u636e\u4fdd\u6301\u65f6\u5e8f\u540c\u6b65\uff0c\u5bf9mv\u6570\u636e\u4e5f\u5199\u5165\u5230sram\u4e2d\u8fdb\u884c\u62fc\u7a97\uff0c\u4f46\u662f\u51fa\u6765\u7684\u6570\u636emv\u7a97\u53e3\u4e0d\u7528\uff0c\u53ea\u53d6\u4e2d\u95f4\u50cf\u7d20\u7684\u503c\uff0c\u8fd9\u6837\u5c31\u9020\u6210\u4e86sram\u7684\u6d6a\u8d39\uff0c\u4f8b\u5982\u5bf9\u4e8e4k(3840)\u7684\u56fe\u50cf\uff0c\u5171\u9700\u898112\u884cline buffer\uff0cmv\u5171\u7528\u4e863840x12=46080bit\u7684sram\u7a7a\u95f4\uff0c\u4f46\u662f\u5b9e\u9645\u9700\u6c42\u53ea\u662f\u8981\u5c06mv delay6\u884c\uff0c\u4e5f\u5c31\u662f\u53ea\u9700\u89816\u884c\u7684line buffer\u5373\u53ef\uff0c\u4ece\u800c\u80fd\u591f\u8282\u7ea63840*6=23040bit\u7684\u5b58\u50a8\u7a7a\u95f4\u3002\r\n\u4f18\u5316\u601d\u8def\uff1a\u5c06mv\u5355\u72ec\u8fdb\u884cdelay\u64cd\u4f5c\u3002"}),"\n",(0,t.jsx)(n.li,{children:"\u95ee\u98983\uff1a\u57285x5\u7a97\u5185\u5bfb\u627e\u6700\u5927\u503c\u548c\u6700\u5c0f\u503c\uff0c\u539f\u6765\u7684\u65b9\u6cd5\u65e0\u8bba\u662f\u4e94\u7ea7\u4e24\u8f93\u5165\u6bd4\u8f83\u5668(12+6+3+2+1)*2=48\u8fd8\u662fsh\u7684\u90a3\u4e2a\u4e09\u8f93\u5165\u6700\u540e\u8981\u7528\u52306\u7ea7\u4e24\u8f93\u5165\u6bd4\u8f83\u7684\u8822\u65b9\u6cd5\uff0c\u6700\u540e\u90fd\u8981\u7528\u523048\u4e2a\u4e24\u8f93\u5165\u6bd4\u8f83\u5668\u3002\u56e0\u4e3a\u65e2\u8981\u627e\u6700\u5927\u503c\uff0c\u4e5f\u8981\u627e\u6700\u5c0f\u503c\u3002\r\n\u4f18\u5316\u601d\u8def\uff1a\u901a\u8fc7\u5148\u5bf925\u4e2a\u6570\u636e\u4e24\u4e24\u6bd4\u8f83\uff0c\u5f97\u5230\u4e24\u4e2a\u4e2d\u7684max\u548cmin\uff0c\u7136\u540e12\u4e2amax\u52a0\u4e0a\u5269\u4e0b\u7684\u90a3\u4e2a\u53bb\u627e\u6700\u5927\u503c\uff0c12\u4e2amin\u548c\u5269\u4e0b\u7684\u90a3\u4e2a\u53bb\u627e\u6700\u5c0f\u503c\uff0c\u4e24\u90e8\u5206\u5206\u522b\u90fd\u8981\u7528\u5230\u56db\u7ea76+3+2+1=12\u4e2a\u4e24\u8f93\u5165\uff0c\u5171\u8ba124\u4e2a\uff0c\u5728\u52a0\u4e0a\u7b2c\u4e00\u7ea7\u768412\u4e2a\u4e24\u8f93\u5165\u6bd4\u8f83\u5668\uff0c\u603b\u5171\u53ea\u9700\u898136\u4e2a\u4e24\u8f93\u5165\u6bd4\u8f83\u5668\uff0c\u80fd\u591f\u8282\u770112\u4e2a\u4e24\u8f93\u5165\u6bd4\u8f83\u5668\u3002"}),"\n",(0,t.jsx)(n.li,{children:"\u4f18\u5316\u7ed3\u679c\r\nYNR\u539f\u6765\u7248\u672c\u9762\u79ef\u5927\u7ea6179670 -> 171721 (TSMC16FCLL)"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(m,{...e})}):m(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>s});var t=r(96540);const o={},i=t.createContext(o);function a(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);