"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6119],{17360:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>d});var i=r(74848),t=r(28453);const s={},o=void 0,a={id:"System-Verilog/\u7ebf\u7a0b\u3001\u8fdb\u7a0b\u53ca\u901a\u4fe1",title:"\u7ebf\u7a0b\u3001\u8fdb\u7a0b\u53ca\u901a\u4fe1",description:"SV\u4e2d\u4f7f\u7528fork...joinnone \u548c fork ... joinany\u521b\u5efa\u7ebf\u7a0b\uff0c\u4e00\u822c\u4e0d\u9002\u7528fork ...join\u56e0\u4e3a\u9700\u8981\u5185\u90e8\u6240\u6709\u8bed\u53e5\u6267\u884c\u5b8c\u6210\u624d\u8fd0\u884c\u540e\u9762\u7684\u8bed\u53e5",source:"@site/docs/System-Verilog/\u7ebf\u7a0b\u3001\u8fdb\u7a0b\u53ca\u901a\u4fe1.md",sourceDirName:"System-Verilog",slug:"/System-Verilog/\u7ebf\u7a0b\u3001\u8fdb\u7a0b\u53ca\u901a\u4fe1",permalink:"/docs/System-Verilog/\u7ebf\u7a0b\u3001\u8fdb\u7a0b\u53ca\u901a\u4fe1",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/System-Verilog/\u7ebf\u7a0b\u3001\u8fdb\u7a0b\u53ca\u901a\u4fe1.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6570\u636e\u7c7b\u578b",permalink:"/docs/System-Verilog/\u6570\u636e\u7c7b\u578b"},next:{title:"\u7ebf\u7a0b\u548c\u901a\u4fe1",permalink:"/docs/System-Verilog/\u7ebf\u7a0b\u548c\u901a\u4fe1"}},l={},d=[{value:"\u7981\u7528\u7ebf\u7a0b",id:"\u7981\u7528\u7ebf\u7a0b",level:2},{value:"\u8fdb\u7a0b\u95f4\u7684\u901a\u4fe1",id:"\u8fdb\u7a0b\u95f4\u7684\u901a\u4fe1",level:2},{value:"Events",id:"events",level:3},{value:"Semaphores",id:"semaphores",level:3},{value:"Mailboxes",id:"mailboxes",level:3}];function c(e){const n={code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"SV\u4e2d\u4f7f\u7528fork...join_none \u548c fork ... join_any\u521b\u5efa\u7ebf\u7a0b\uff0c\u4e00\u822c\u4e0d\u9002\u7528fork ...join\u56e0\u4e3a\u9700\u8981\u5185\u90e8\u6240\u6709\u8bed\u53e5\u6267\u884c\u5b8c\u6210\u624d\u8fd0\u884c\u540e\u9762\u7684\u8bed\u53e5\r\njoin_none\u540e\u9762\u7684\u8bed\u53e5\u5728\u540c\u4e00\u65f6\u523b\u8981\u65e9\u4e8efork ... join_none\u5185\u90e8\u8bed\u53e5\u7684\u6267\u884c\uff0c\u53ef\u901a\u8fc7\u5728\u540e\u9762\u8bed\u53e5\u589e\u52a0#0\u6765\u963b\u585e\u540e\u9762\u8bed\u53e5\u7684\u6267\u884c\u3002"}),"\n",(0,i.jsx)(n.p,{children:"SV\u4e2d\u5f53\u6240\u6709initial \u5757\u6267\u884c\u5b8c\u6210\u540e\u5c31\u9000\u51fa\u4eff\u771f\uff0c\u6b64\u65f6\u5b50\u7ebf\u7a0b\u53ef\u80fd\u4ecd\u5728\u8fd0\u884c\uff0c\u56e0\u6b64\u5e94\u8be5\u4f7f\u7528wait fork\u7b49\u5f85\u6240\u6709\u7684\u5b50\u7ebf\u7a0b\u3002"}),"\n",(0,i.jsx)(n.p,{children:"\u5982\u679c\u4f60\u5fd8\u8bb0\u58f0\u660e\u53d8\u91cf\uff0c\u5219SV\u4f1a\u5728\u66f4\u9ad8\u7684\u4f5c\u7528\u57df\u5185\u641c\u7d22\u8be5\u53d8\u91cf\uff0c\u8fd9\u4f1a\u5bfc\u81f4\u591a\u4e2a\u8fdb\u7a0b\u5171\u4eab\u4e00\u4e2a\u53d8\u91cf\uff0c\u4ece\u800c\u51fa\u73b0\u95ee\u9898\uff0c\u5e94\u8be5\u5728\u6700\u5c0f\u7684\u4f5c\u7528\u57df\u5185\u58f0\u660e\u53d8\u91cf\uff0c\u5bf9\u4e8e\u904d\u5386\u6700\u597d\u4f7f\u7528foreach"}),"\n",(0,i.jsx)(n.h2,{id:"\u7981\u7528\u7ebf\u7a0b",children:"\u7981\u7528\u7ebf\u7a0b"}),"\n",(0,i.jsx)(n.p,{children:"\u4f7f\u7528verilog\u7684disable\u7981\u7528\u7ebf\u7a0b\uff0c\u5982\u4e0b\u793a\u4f8b"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'parameter TIME_OUT = 1000ns;\r\ntask check_trans(input Transaction tr);\r\n  fork\r\n    begin\r\n      //wait for response, or some maximun delay\r\n      fork:timeout_block\r\n        begin\r\n          wait (bus.cb.data == tr.data);\r\n          $display("@%0t: data match %d", $time, tr.data);\r\n        end\r\n      join_any\r\n      disable timeout_block;\r\n  join_none  // spawn thread, don\'t block\r\nendtask\n'})}),"\n",(0,i.jsx)(n.p,{children:"\u7981\u7528\u591a\u4e2a\u7ebf\u7a0b\r\n\u4f7f\u7528disable fork\u7981\u7528\u8be5\u8bed\u53e5\u6240\u5728\u4f5c\u7528\u57df\u5185\u7684\u6240\u6709\u7ebf\u7a0b\u3002\r\n\u6216\u8005\u5c06\u6240\u6709\u7ebf\u7a0b\u5378\u8f7dbegin end\u4e2d\uff0c\u5e76\u8bbe\u7f6e\u5757\u540d\uff0cdisable\u8be5\u5757"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"begin : b_name\r\n  thread 1\r\n  thread 2\r\nend\r\ndisable b_name\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u7981\u7528\u4e00\u4e2a\u591a\u6b21\u8c03\u7528\u7684\u7ebf\u7a0b\r\n\u5728\u4e00\u4e2atask\u5185\u90e8\u7981\u7528\u8be5task\u4f1a\u6740\u6389\u6240\u6709\u8be5task\u4ea7\u751f\u7684\u7ebf\u7a0b"}),"\n",(0,i.jsx)(n.h2,{id:"\u8fdb\u7a0b\u95f4\u7684\u901a\u4fe1",children:"\u8fdb\u7a0b\u95f4\u7684\u901a\u4fe1"}),"\n",(0,i.jsx)(n.p,{children:"\u6240\u6709\u7ebf\u7a0b\u4e4b\u95f4\u6570\u636e\u548c\u63a7\u5236\u7684\u540c\u6b65\u79f0\u4e3a\u8fdb\u7a0b\u95f4\u901a\u4fe1\uff08interprocess communication\uff0cIPC\uff09\uff0c\u5728SV\u4e2d\u901a\u8fc7event\uff0csemaphore \u548c mailboxes\u5b9e\u73b0\u3002\r\nIPC\u4e00\u822c\u7531\u4e09\u90e8\u5206\u7ec4\u6210\uff1a\u4e00\u4e2a\u7528\u4e8e\u751f\u6210\u4fe1\u606f\u7684\u53d1\u9001\u8005\uff0c\u4e00\u4e2a\u63a5\u53d7\u4fe1\u606f\u7684\u63a5\u6536\u7aef\uff0c\u4ee5\u53ca\u4e00\u4e2a\u4f20\u8f93\u4fe1\u606f\u7684\u901a\u9053\u3002\u53d1\u9001\u8005\u548c\u63a5\u6536\u8005\u5206\u5c5e\u4e8e\u4e0d\u540c\u7684\u7ebf\u7a0b\u3002"}),"\n",(0,i.jsx)(n.h3,{id:"events",children:"Events"}),"\n",(0,i.jsx)(n.p,{children:"\u4f7f\u7528events\u8fdb\u884c\u901a\u4fe1\uff0c->\u8868\u793a\u89e6\u53d1\u8be5event\uff0c\u4f7f\u7528wait\u6216\u8005@\u53bb\u63a5\u6536\u3002event\u53ef\u4ee5\u88ab\u4f5c\u4e3a\u53c2\u6570\u4f20\u8f93\uff0c\u9700\u8981\u63a5\u6536\u591a\u4e2aevent\u65f6\u53ef\u91c7\u7528\u591a\u7ebf\u7a0b\u89e6\u53d1\uff0c\u7136\u540ewait fork\u7684\u65b9\u5f0f\uff0c\u6216\u8005\u901a\u8fc7\u8ba1\u6570\u7684\u65b9\u5f0f\u7edf\u8ba1\u89e6\u53d1\u7684\u4e2a\u6570\uff0c\u6216\u8005\u7edf\u8ba1\u6b63\u5728\u8fd0\u884c\u7684\u7ebf\u7a0b\u7684\u4e2a\u6570"}),"\n",(0,i.jsx)(n.h3,{id:"semaphores",children:"Semaphores"}),"\n",(0,i.jsx)(n.p,{children:"Semaphores\u53ef\u4ee5\u63a7\u5236\u4f60\u5bf9\u8d44\u6e90\u7684\u8bbf\u95ee\uff0c\u53ef\u7528\u4e8e\u4f60\u7684\u6d4b\u8bd5\u5e73\u53f0\u4e2d\u53ea\u6709\u4e00\u4e2a\u8d44\u6e90\uff0c\u4f46\u662f\u6709\u591a\u4e2a\u8bbf\u95ee\u8005\u65f6\uff0c\u540c\u4e00\u65f6\u523b\u53ea\u80fd\u6709\u4e00\u4e2a\u8bbf\u95ee\u8005\u8bbf\u95ee\u3002\r\n\u521b\u5efasemaphore\u53d8\u91cf\uff0c\u8bbe\u7f6ekey\u4e2a\u6570\uff0c\u901a\u8fc7get()\uff0cput()\u53d6\u51fa\u6216\u8005\u653e\u56dekey\uff0cget()\u4e3a\u963b\u585e\u8bed\u53e5\uff0c\u53ef\u4f7f\u7528try_get()\u975e\u963b\u585e\u8bed\u53e5\u3002"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5728\u4f7f\u7528semaphores\u65f6\u6709\u4e24\u70b9\u9700\u8981\u6ce8\u610f\uff1a"}),"\n"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"\u653e\u56de\u7684key\u7684\u6570\u91cf\u53ef\u4ee5\u6bd4\u53d6\u51fa\u7684\u591a"}),"\n",(0,i.jsx)(n.li,{children:"\u5982\u679c\u4e00\u4e2aget\u8bf7\u6c42\u4e24\u4e2akey\u800c\u6b64\u65f6\u53ea\u6709\u4e00\u4e2a\uff0c\u90a3\u4e48\u8be5\u7ebf\u7a0b\u88ab\u963b\u585e\uff0c\u540e\u9762\u5982\u679c\u6709\u8bf7\u6c42\u4e00\u4e2akey\u7684\u7ebf\u7a0b\uff0c\u8be5\u7ebf\u7a0b\u4f1a\u8de8\u8fc7FIFO\u5e8f\u4f18\u5148\u83b7\u5f97key"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"mailboxes",children:"Mailboxes"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.img,{src:r(16900).A+"",width:"850",height:"189"}),"\r\n\u4f7f\u7528put(), get(). try_put(), try_get()\u5411mailbox\u4e2d\u5b58\u653e\u6216\u8005\u8bfb\u53d6\u6570\u636e\u3002put\u5728\u4fe1\u7bb1\u6ee1\u65f6\u963b\u585e\uff0cget\u5728\u7a7a\u65f6\u963b\u585e\uff0c\u4f7f\u7528peek() task\u83b7\u5f97\u4fe1\u7bb1\u5185\u6570\u636e\u7684\u62f7\u8d1d\u3002\u4fe1\u7bb1\u5185\u90e8\u5b58\u50a8\u7684\u90fd\u662f\u7b80\u5355\u7684\u503c\uff0c\u4e0d\u5305\u542b\u5bf9\u8c61\u3002\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u4fe1\u7bb1\u6ca1\u6709\u6307\u5b9a\u7c7b\u578b\uff0c\u53ef\u4ee5\u5b58\u653e\u6df7\u5408\u6570\u636e\uff0c\u4f46\u907f\u514d\u8fd9\u6837\u4f7f\u7528\uff0c\u5e94\u8be5\u901a\u8fc7\u53c2\u6570\u4f20\u9012\u7c7b\u578b\u3002"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Producter\u548cConsumer\u4e4b\u95f4\u7684\u540c\u6b65\u6709\u591a\u79cd\u65b9\u6cd5\uff1a"}),"\n"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"\u4f7f\u7528\u4e00\u4e2aBounded Mailbox \u548c Peek task\u5b8c\u6210\u540c\u6b65"}),"\n",(0,i.jsx)(n.li,{children:"\u4f7f\u7528mailbox\u548cevent\u8fdb\u884c\u540c\u6b65"}),"\n",(0,i.jsx)(n.li,{children:"\u4f7f\u7528\u4e24\u4e2a\u4e0d\u540c\u65b9\u5411\u7684mailboxes\u8fdb\u884c\u540c\u6b65"}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},16900:(e,n,r)=>{r.d(n,{A:()=>i});const i="data:image/png;base64,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"},28453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>a});var i=r(96540);const t={},s=i.createContext(t);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);