"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5630],{80381:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>h,frontMatter:()=>l,metadata:()=>t,toc:()=>o});var r=i(74848),d=i(28453);const l={},s=void 0,t={id:"System-Verilog/Randomization",title:"Randomization",description:"\u53d7\u9650\u968f\u673a\u6d4b\u8bd5\uff08constrained-random test\uff0c CRT\uff09\u7531\u4e24\u90e8\u5206\u7ec4\u6210\uff1a\u4ea7\u751f\u8f93\u5165\u5230DUT\u7684\u968f\u673a\u503c\u7684\u6d4b\u8bd5\u4ee3\u7801\uff0c\u4ee5\u53ca\u4e00\u4e2a\u4f2a\u968f\u673a\u6570\u751f\u6210\u5668\uff08pseudo-random number generator\uff0cPRNG\uff09\u7684\u79cd\u5b50",source:"@site/docs/System-Verilog/Randomization.md",sourceDirName:"System-Verilog",slug:"/System-Verilog/Randomization",permalink:"/docs/System-Verilog/Randomization",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/System-Verilog/Randomization.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Program",permalink:"/docs/System-Verilog/Program"},next:{title:"Systemverilog-\u8fd0\u884c\u65f6\u4f20\u9012\u53c2\u6570",permalink:"/docs/System-Verilog/Systemverilog-\u8fd0\u884c\u65f6\u4f20\u9012\u53c2\u6570"}},a={},o=[{value:"\u5728\u7c7b\u4e2d\u5b9a\u4e49\u968f\u673a\u53d8\u91cf",id:"\u5728\u7c7b\u4e2d\u5b9a\u4e49\u968f\u673a\u53d8\u91cf",level:3},{value:"\u68c0\u67e5\u968f\u673a\u5316\u7684\u7ed3\u679c",id:"\u68c0\u67e5\u968f\u673a\u5316\u7684\u7ed3\u679c",level:3},{value:"\u53ef\u8fdb\u884c\u968f\u673a\u5316\u7684\u53d8\u91cf",id:"\u53ef\u8fdb\u884c\u968f\u673a\u5316\u7684\u53d8\u91cf",level:3},{value:"\u7ea6\u675f",id:"\u7ea6\u675f",level:2},{value:"\u7b80\u5355\u8868\u8fbe\u5f0f",id:"\u7b80\u5355\u8868\u8fbe\u5f0f",level:3},{value:"\u7b49\u4ef7\u8868\u8fbe\u5f0f",id:"\u7b49\u4ef7\u8868\u8fbe\u5f0f",level:3},{value:"\u6743\u91cd\u5206\u5e03",id:"\u6743\u91cd\u5206\u5e03",level:3},{value:"\u8bbe\u7f6e\u6210\u5458\u53ca\u5185\u90e8\u64cd\u4f5c\u7b26",id:"\u8bbe\u7f6e\u6210\u5458\u53ca\u5185\u90e8\u64cd\u4f5c\u7b26",level:3},{value:"\u4ece\u6570\u7ec4\u4e2d\u9009\u62e9",id:"\u4ece\u6570\u7ec4\u4e2d\u9009\u62e9",level:4},{value:"\u53cc\u5411\u7ea6\u675f",id:"\u53cc\u5411\u7ea6\u675f",level:3},{value:"\u9690\u542b\u7684\u7ea6\u675f",id:"\u9690\u542b\u7684\u7ea6\u675f",level:3},{value:"\u7b49\u4ef7\u64cd\u4f5c(\u540c\u6216)",id:"\u7b49\u4ef7\u64cd\u4f5c\u540c\u6216",level:3},{value:"Solution Probabilities",id:"solution-probabilities",level:2},{value:"\u591a\u4e2a\u7ea6\u675f\u5757\u4e4b\u95f4\u7684\u63a7\u5236",id:"\u591a\u4e2a\u7ea6\u675f\u5757\u4e4b\u95f4\u7684\u63a7\u5236",level:2},{value:"\u6709\u6548\u7ea6\u675f",id:"\u6709\u6548\u7ea6\u675f",level:2},{value:"\u5185\u8054\u7ea6\u675f",id:"\u5185\u8054\u7ea6\u675f",level:2},{value:"pre_randomize and post_randomize",id:"pre_randomize-and-post_randomize",level:2},{value:"\u968f\u673a\u6570\u51fd\u6570",id:"\u968f\u673a\u6570\u51fd\u6570",level:2},{value:"\u7ea6\u675f\u6280\u5de7\u548c\u6280\u672f",id:"\u7ea6\u675f\u6280\u5de7\u548c\u6280\u672f",level:2},{value:"\u4f7f\u7528\u53d8\u91cf\u4f5c\u4e3a\u53c2\u6570",id:"\u4f7f\u7528\u53d8\u91cf\u4f5c\u4e3a\u53c2\u6570",level:3},{value:"\u4f7f\u7528\u975e\u968f\u673a\u5316\u503c",id:"\u4f7f\u7528\u975e\u968f\u673a\u5316\u503c",level:3},{value:"\u4f7f\u7528\u7ea6\u675f\u68c0\u9a8c\u503c\u662f\u5426\u6b63\u786e",id:"\u4f7f\u7528\u7ea6\u675f\u68c0\u9a8c\u503c\u662f\u5426\u6b63\u786e",level:3},{value:"\u968f\u673a\u5316\u4e2a\u522b\u53d8\u91cf",id:"\u968f\u673a\u5316\u4e2a\u522b\u53d8\u91cf",level:3},{value:"\u5f00\u542f\u6216\u5173\u95ed\u7ea6\u675f",id:"\u5f00\u542f\u6216\u5173\u95ed\u7ea6\u675f",level:3},{value:"\u4f7f\u7528\u5185\u8054\u7ea6\u675f\u6765\u6307\u5b9a\u7ea6\u675f\u6761\u4ef6",id:"\u4f7f\u7528\u5185\u8054\u7ea6\u675f\u6765\u6307\u5b9a\u7ea6\u675f\u6761\u4ef6",level:3},{value:"\u4f7f\u7528external constraint",id:"\u4f7f\u7528external-constraint",level:3},{value:"\u6269\u5c55\u7c7b",id:"\u6269\u5c55\u7c7b",level:3},{value:"\u8fed\u4ee3\u548c\u6570\u7ec4\u7ea6\u675f",id:"\u8fed\u4ee3\u548c\u6570\u7ec4\u7ea6\u675f",level:2}];function c(e){const n={code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",...(0,d.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"\u53d7\u9650\u968f\u673a\u6d4b\u8bd5\uff08constrained-random test\uff0c CRT\uff09\u7531\u4e24\u90e8\u5206\u7ec4\u6210\uff1a\u4ea7\u751f\u8f93\u5165\u5230DUT\u7684\u968f\u673a\u503c\u7684\u6d4b\u8bd5\u4ee3\u7801\uff0c\u4ee5\u53ca\u4e00\u4e2a\u4f2a\u968f\u673a\u6570\u751f\u6210\u5668\uff08pseudo-random number generator\uff0cPRNG\uff09\u7684\u79cd\u5b50"}),"\n",(0,r.jsx)(n.h3,{id:"\u5728\u7c7b\u4e2d\u5b9a\u4e49\u968f\u673a\u53d8\u91cf",children:"\u5728\u7c7b\u4e2d\u5b9a\u4e49\u968f\u673a\u53d8\u91cf"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"class packet\uff1b\r\n  // The random variables\r\n  rand bit [31 : 0] src, dst, data[8];\r\n  randc bit [7 : 0] kind;\r\n  // limit the values for src\r\n  constraint c {src > 10;\r\n                      src < 15;}\r\nendclass\r\n\r\nPacket p;\r\ninitial begin\r\n  p = new(); // Create a packet\r\n  if (!p.randomize())\r\n    $finish;\r\n  transmit(p);\r\nend\n"})}),"\n",(0,r.jsx)(n.h3,{id:"\u68c0\u67e5\u968f\u673a\u5316\u7684\u7ed3\u679c",children:"\u68c0\u67e5\u968f\u673a\u5316\u7684\u7ed3\u679c"}),"\n",(0,r.jsx)(n.p,{children:"\u5982\u679c\u4ee3\u7801\u4e2d\u5b58\u5728\u51b2\u7a81\u7684\u7ea6\u675f\u4f1a\u5bfc\u81f4\u968f\u673a\u5316\u5931\u8d25\uff0c\u6240\u4ee5\u9700\u8981\u968f\u65f6\u5bf9\u968f\u673a\u5316\u72b6\u6001\u8fdb\u884c\u68c0\u6d4b\uff0c\u53ef\u901a\u8fc7\u5b8f\u5b9a\u4e49\u7684\u65b9\u5f0f\u5b9a\u4e49\u968f\u673a\u5316\u68c0\u6d4b"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'`define SV_RAND_CHECK(r) \\\r\n  do begin \\\r\n    if (!(r)) begin \\\r\n      $display("%s:%0d: Randomization failed \\"%s\\"", \\ `__FILE__, `__LINE__, ``"r`"); \\\r\n      $finish;\r\n    end\r\n  end while(0)\r\n\r\ninitial begin\r\n  Packet p = new();     // Create a packet\r\n  `SV_RAND_CHECK(p.randomize());  // Randomize it\r\nend\n'})}),"\n",(0,r.jsx)(n.h3,{id:"\u53ef\u8fdb\u884c\u968f\u673a\u5316\u7684\u53d8\u91cf",children:"\u53ef\u8fdb\u884c\u968f\u673a\u5316\u7684\u53d8\u91cf"}),"\n",(0,r.jsx)(n.p,{children:"SV\u4ec5\u652f\u6301\u5305\u542b\u4f4d\u7684\u96c6\u5408\u7684\u53d8\u91cf\u8fdb\u884c\u968f\u673a\u5316\uff0c\u5305\u62ec\u4e8c\u503c\u53ca\u56db\u503c\u7c7b\u578b\uff0c\u867d\u7136\u968f\u673a\u5316\u53ea\u751f\u6210\u4e8c\u503c\u3002\u53ef\u4ee5\u751f\u6210integers\uff0cbit vectors\u7b49\uff0c\u4f46\u4e0d\u80fd\u662f\u968f\u673a\u5b57\u7b26\u4e32\u6216\u8005\u7ea6\u675f\u4e2d\u7684\u53e5\u67c4\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"\u7ea6\u675f",children:"\u7ea6\u675f"}),"\n",(0,r.jsx)(n.h3,{id:"\u7b80\u5355\u8868\u8fbe\u5f0f",children:"\u7b80\u5355\u8868\u8fbe\u5f0f"}),"\n",(0,r.jsx)(n.p,{children:"\u7ea6\u675f\u4e2d\u4e00\u6761\u8bed\u53e5\u6700\u591a\u53ea\u80fd\u4f7f\u7528\u4e00\u4e2a\u8fd0\u7b97\u7b26\uff0cA>B\u53ef\u4ee5\uff0cA>B>C\u4e0d\u652f\u6301\uff0c\u56e0\u4e3aA>B\u7684\u8fd4\u56de\u7ed3\u679c\u4e3a0\u62161"}),"\n",(0,r.jsx)(n.h3,{id:"\u7b49\u4ef7\u8868\u8fbe\u5f0f",children:"\u7b49\u4ef7\u8868\u8fbe\u5f0f"}),"\n",(0,r.jsx)(n.p,{children:"\u4e0d\u80fd\u5728\u7ea6\u675f\u4e2d\u4f7f\u7528\u590d\u5236\uff0c\u5982\u679c\u8981\u590d\u5236\u5e94\u8be5\u4f7f\u7528\u76f8\u7b49\u8fd0\u7b97\u7b26 =="}),"\n",(0,r.jsx)(n.h3,{id:"\u6743\u91cd\u5206\u5e03",children:"\u6743\u91cd\u5206\u5e03"}),"\n",(0,r.jsx)(n.p,{children:"\u4f7f\u7528dist\u5173\u952e\u5b57\u7ed3\u5408 :/ \u6216\u8005 :=\u64cd\u4f5c\u7b26\uff0c:= \u64cd\u4f5c\u7b26\u8bbe\u7f6e\u6743\u91cd\u4e3a\u6307\u5b9a\u503c\uff0c:/ \u64cd\u4f5c\u7b26\u8bbe\u7f6e\u6743\u91cd\u5747\u5300\u5206\u5e03\u5728\u6240\u6709\u7684\u503c\u4e0a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"constraint c_dist {\r\n  src dist {0 := 40, [1:3] := 60};  // 0 weight = 40/220. 1/2/3 weight = 60/220\r\n  dst dist {0 : /40, [1:3] :/ 60};  // 0 weight = 40/100, 1/2/3 weight = 20/100\r\n}\n"})}),"\n",(0,r.jsx)(n.h3,{id:"\u8bbe\u7f6e\u6210\u5458\u53ca\u5185\u90e8\u64cd\u4f5c\u7b26",children:"\u8bbe\u7f6e\u6210\u5458\u53ca\u5185\u90e8\u64cd\u4f5c\u7b26"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"class Ranges;\r\n  rand bit [31:0] c;\r\n  bit [31:0] lo, hi;\r\n  constraint c_range {\r\n    c inside {[lo:hi]};  // lo <= c && c <= hi\r\n    // !(c inside{[lo:hi]});  // c < lo or c > hi\r\n}\r\nendclass\n"})}),"\n",(0,r.jsx)(n.h4,{id:"\u4ece\u6570\u7ec4\u4e2d\u9009\u62e9",children:"\u4ece\u6570\u7ec4\u4e2d\u9009\u62e9"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"bit [7:0] vals[] = '{1,2,3,5,8};\r\nconstraint c_fib {\r\n  f inside vals;\r\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u53ef\u4ee5\u4f7f\u7528randc \u4ea7\u751f\u6570\u636e\u7684\u4e0b\u6807\u7528\u4e8e\u4ece\u6570\u7ec4\u4e2d\u968f\u673a\u9009\u62e9\u5143\u7d20"}),"\n",(0,r.jsx)(n.h3,{id:"\u53cc\u5411\u7ea6\u675f",children:"\u53cc\u5411\u7ea6\u675f"}),"\n",(0,r.jsx)(n.p,{children:"\u7ea6\u675f\u5757\u5e76\u4e0d\u662f\u8fd0\u884c\u4ee3\u7801\uff0c\u800c\u662f\u58f0\u660e\u4ee3\u7801\u3002\r\nSV\u7684\u7ea6\u675f\u662f\u53cc\u5411\u6267\u884c\u7684\uff0c\u6240\u6709\u968f\u673a\u53d8\u91cf\u7684\u7ea6\u675f\u90fd\u662f\u540c\u65f6\u88ab\u89e3\u91ca\u7684\u3002"}),"\n",(0,r.jsx)(n.h3,{id:"\u9690\u542b\u7684\u7ea6\u675f",children:"\u9690\u542b\u7684\u7ea6\u675f"}),"\n",(0,r.jsx)(n.p,{children:"A -> B\u7b49\u4ef7\u4e8e(!A || B)\uff0c\u5f53B\u6210\u7acb\uff0cA\u662f\u5426\u6210\u7acb\u90fd\u53ef\u4ee5\uff0c\u5f53A\u6210\u7acb\uff0cB\u5fc5\u987b\u6210\u7acb"}),"\n",(0,r.jsx)(n.h3,{id:"\u7b49\u4ef7\u64cd\u4f5c\u540c\u6216",children:"\u7b49\u4ef7\u64cd\u4f5c(\u540c\u6216)"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"<->"})," \u7b49\u4ef7\u4e8e ",(0,r.jsx)(n.code,{children:"((A->B) && (B->A))"})]}),"\n",(0,r.jsx)(n.h2,{id:"solution-probabilities",children:"Solution Probabilities"}),"\n",(0,r.jsx)(n.p,{children:"\u5f53\u4e24\u4e2a\u968f\u673a\u53d8\u91cf\u5b58\u5728\u4f9d\u8d56\u5173\u7cfb\u65f6\uff0c\u4e0d\u540c\u7684\u4f18\u5148\u7ea7\u4f1a\u5bfc\u81f4\u4e0d\u540c\u7684\u968f\u673a\u5206\u5e03\uff0c\u53ef\u4f7f\u7528solve ... before ... \u5b9a\u4e49\u4f18\u5148\u7ea7"}),"\n",(0,r.jsx)(n.h2,{id:"\u591a\u4e2a\u7ea6\u675f\u5757\u4e4b\u95f4\u7684\u63a7\u5236",children:"\u591a\u4e2a\u7ea6\u675f\u5757\u4e4b\u95f4\u7684\u63a7\u5236"}),"\n",(0,r.jsx)(n.p,{children:"\u53ef\u4f7f\u7528constraint_mode\u63a7\u5236\u7ea6\u675f\u5757\u7684\u542f\u7528\uff0c\u4f7f\u7528handle.constraint.constraint_mode(arg)\u63a7\u5236\u5355\u4e2a\u7ea6\u675f\u5757\uff0c\u4f7f\u7528handle.constraint_mode(arg)\u63a7\u5236\u5bf9\u8c61\u5185\u6240\u6709\u7684\u7ea6\u675f\u5757\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"\u6709\u6548\u7ea6\u675f",children:"\u6709\u6548\u7ea6\u675f"}),"\n",(0,r.jsx)(n.p,{children:"\u4e00\u4e2a\u6709\u6548\u7684\u7ea6\u675f\u6280\u5de7\u662f\u521b\u5efa\u4e00\u4e9b\u7ea6\u675f\u6765\u4fdd\u8bc1\u968f\u673a\u6fc0\u52b1\u7684\u6b63\u786e\u6027\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"\u5185\u8054\u7ea6\u675f",children:"\u5185\u8054\u7ea6\u675f"}),"\n",(0,r.jsxs)(n.p,{children:["\u4f7f\u7528with ","\u5728\u539f\u7ea6\u675f\u4e0a\u589e\u52a0\u989d\u5916\u7684\u7ea6\u675f\r\n",(0,r.jsx)(n.code,{children:"t.randomize() with {}"})]}),"\n",(0,r.jsx)(n.h2,{id:"pre_randomize-and-post_randomize",children:"pre_randomize and post_randomize"}),"\n",(0,r.jsx)(n.p,{children:"\u5728\u7c7b\u4e2d\u4f7f\u7528pre_randomize \u548c post_randomize\u5728\u968f\u673a\u5316\u524d\u540e\u8fd0\u884c\u51fd\u6570"}),"\n",(0,r.jsx)(n.h2,{id:"\u968f\u673a\u6570\u51fd\u6570",children:"\u968f\u673a\u6570\u51fd\u6570"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:i(6884).A+"",width:"995",height:"287"})}),"\n",(0,r.jsx)(n.h2,{id:"\u7ea6\u675f\u6280\u5de7\u548c\u6280\u672f",children:"\u7ea6\u675f\u6280\u5de7\u548c\u6280\u672f"}),"\n",(0,r.jsx)(n.h3,{id:"\u4f7f\u7528\u53d8\u91cf\u4f5c\u4e3a\u53c2\u6570",children:"\u4f7f\u7528\u53d8\u91cf\u4f5c\u4e3a\u53c2\u6570"}),"\n",(0,r.jsx)(n.h3,{id:"\u4f7f\u7528\u975e\u968f\u673a\u5316\u503c",children:"\u4f7f\u7528\u975e\u968f\u673a\u5316\u503c"}),"\n",(0,r.jsx)(n.p,{children:"\u901a\u8fc7\u4f7f\u7528rand_mode\u5173\u95ed\u6216\u5f00\u542f\u5bf9\u5e94\u53d8\u91cf\u7684\u968f\u673a\u5316"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"p.length.rand_mode(0);  // make length nonrandom\r\np.length = 42;  // set it to constant value\n"})}),"\n",(0,r.jsx)(n.h3,{id:"\u4f7f\u7528\u7ea6\u675f\u68c0\u9a8c\u503c\u662f\u5426\u6b63\u786e",children:"\u4f7f\u7528\u7ea6\u675f\u68c0\u9a8c\u503c\u662f\u5426\u6b63\u786e"}),"\n",(0,r.jsx)(n.p,{children:"\u5982\u679c\u4f60\u4fee\u6539\u4e86\u90e8\u5206\u968f\u673a\u53d8\u91cf\uff0c\u4f7f\u7528handle.randomize(null)\u5c06\u6240\u6709\u53d8\u91cf\u89c6\u4e3a\u975e\u968f\u53d8\u91cf\uff0c\u5982\u679c\u7ea6\u675f\u4e0d\u6ee1\u8db3\uff0c\u5219\u8fd4\u56de0"}),"\n",(0,r.jsx)(n.h3,{id:"\u968f\u673a\u5316\u4e2a\u522b\u53d8\u91cf",children:"\u968f\u673a\u5316\u4e2a\u522b\u53d8\u91cf"}),"\n",(0,r.jsx)(n.p,{children:"\u4f7f\u7528randomize(variables)  // \u968f\u673a\u5316 variables\uff0c\u53ca\u65f6variables\u5e76\u4e0d\u662f\u968f\u673a\u5316\u53d8\u91cf\uff0c\u8be5\u65b9\u6cd5\u4e0d\u5efa\u8bae\u5728testbench\u4e2d\u4f7f\u7528\uff0c\u53ea\u7528\u4e8e\u5bfb\u627ebug"}),"\n",(0,r.jsx)(n.h3,{id:"\u5f00\u542f\u6216\u5173\u95ed\u7ea6\u675f",children:"\u5f00\u542f\u6216\u5173\u95ed\u7ea6\u675f"}),"\n",(0,r.jsx)(n.p,{children:"constraint_mode()"}),"\n",(0,r.jsx)(n.h3,{id:"\u4f7f\u7528\u5185\u8054\u7ea6\u675f\u6765\u6307\u5b9a\u7ea6\u675f\u6761\u4ef6",children:"\u4f7f\u7528\u5185\u8054\u7ea6\u675f\u6765\u6307\u5b9a\u7ea6\u675f\u6761\u4ef6"}),"\n",(0,r.jsx)(n.h3,{id:"\u4f7f\u7528external-constraint",children:"\u4f7f\u7528external constraint"}),"\n",(0,r.jsx)(n.p,{children:"\u53ef\u4ee5\u5728\u7c7b\u5b9a\u4e49\u4e4b\u5916\u5b9a\u4e49\u7ea6\u675f\u7684\u4e3b\u4f53\uff0c\u8be5\u7ea6\u675f\u7684\u4e3b\u4f53\u53ef\u4ee5\u5728test\u4e2d\u7f16\u5199"}),"\n",(0,r.jsx)(n.h3,{id:"\u6269\u5c55\u7c7b",children:"\u6269\u5c55\u7c7b"}),"\n",(0,r.jsx)(n.h2,{id:"\u8fed\u4ee3\u548c\u6570\u7ec4\u7ea6\u675f",children:"\u8fed\u4ee3\u548c\u6570\u7ec4\u7ea6\u675f"}),"\n",(0,r.jsx)(n.p,{children:"\u8be6\u89c1 SystemVerilog for Verification 3rd Edition"})]})}function h(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},6884:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/23495115-99a5f598536a3e6b-60927f630e9a70b161b33a8923638576.png"},28453:(e,n,i)=>{i.d(n,{R:()=>s,x:()=>t});var r=i(96540);const d={},l=r.createContext(d);function s(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:s(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);