"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7256],{10543:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>f,frontMatter:()=>i,metadata:()=>d,toc:()=>l});var t=s(74848),r=s(28453);const i={},a=void 0,d={id:"FPGA-IC/AXI4\u7b80\u8bb0",title:"AXI4\u7b80\u8bb0",description:"Reference",source:"@site/docs/FPGA-IC/AXI4\u7b80\u8bb0.md",sourceDirName:"FPGA-IC",slug:"/FPGA-IC/AXI4\u7b80\u8bb0",permalink:"/docs/FPGA-IC/AXI4\u7b80\u8bb0",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/FPGA-IC/AXI4\u7b80\u8bb0.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"APB",permalink:"/docs/FPGA-IC/APB"},next:{title:"[CRC Generator](http://outputlogic.com/)",permalink:"/docs/FPGA-IC/CRC\u751f\u6210-LFSR\u7535\u8def"}},c={},l=[{value:"Reference",id:"reference",level:3},{value:"Burst address",id:"burst-address",level:2},{value:"\u7a84\u4f20\u8f93\uff08Narrow transfer\uff09",id:"\u7a84\u4f20\u8f93narrow-transfer",level:2},{value:"\u975e\u5bf9\u9f50\u4f20\u8f93",id:"\u975e\u5bf9\u9f50\u4f20\u8f93",level:2},{value:"byte Invarience",id:"byte-invarience",level:2},{value:"wrap\u6709\u4ec0\u4e48\u7528\uff1f",id:"wrap\u6709\u4ec0\u4e48\u7528",level:2},{value:"Outstanding",id:"outstanding",level:2},{value:"Interleave",id:"interleave",level:2}];function h(e){const n={a:"a",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h3,{id:"reference",children:"Reference"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://www.eeeknow.com/open/6475924312632066049/detail",children:"\u516c\u5f00\u8bfe \u8ba9AMBA\u603b\u7ebf\u98de\u8d77\u6765\u2014\u6210\u4e3aSOC\u4e13\u5bb6\u5fc5\u987b\u4e86\u89e3\u7684"}),"\r\nAMBA spec"]}),"\n",(0,t.jsx)(n.p,{children:"AXI4\u662f\u7531ARM\u63d0\u51fa\u7684AMBA\u603b\u7ebf\u4e2d\u975e\u5e38\u91cd\u8981\u7684\u4e00\u90e8\u5206\uff0c\u57fa\u4e8eburst\u4f20\u8f93\uff0c\u662f\u4e00\u79cd\u9762\u5411\u9ad8\u6027\u80fd\u3001\u9ad8\u5e26\u5bbd\u3001\u4f4e\u5ef6\u8fdf\u7684\u7247\u5185\u603b\u7ebf\u3002AXI\u80fd\u591f\u8fbe\u5230\u8fd9\u6837\u7684\u6027\u80fd\u6307\u6807\u7684\u4e00\u4e2a\u4e3b\u8981\u539f\u56e0\u5c31\u662f\u5176\u5355\u901a\u9053\u4f53\u7cfb\u7ed3\u6784\u3002\u5730\u5740\uff0c\u63a7\u5236\uff0c\u6570\u636e\u76f8\u4f4d\u5206\u79bb\uff0c\u652f\u6301\u975e\u5bf9\u9f50\u7684\u6570\u636e\u4f20\u8f93\uff0c\u652f\u6301burst\u4f20\u8f93\uff0c\u5e76\u4e14\u5728burst\u4f20\u8f93\u65f6\u53ea\u9700\u8981\u9996\u5730\u5740\uff0c\u652f\u6301outstanding\u4f20\u8f93\u8bbf\u95ee\u548c\u4e71\u5e8f\uff08AXI4\u53bb\u6389\u4e86WID\uff0c\u4e0d\u652f\u6301\u4e71\u5e8f\uff0c\u53ea\u80fd\u987a\u5e8f\uff09\uff0c\u66f4\u5bb9\u6613\u8fdb\u884c\u65f6\u5e8f\u6536\u655b\u3002"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.img,{src:s(12169).A+"",width:"833",height:"308"}),"\r\nBurst length\uff1aThe total number of data transfers within a burst (ARLEN[7:0], for read / write transfers)"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4e0d\u80fd\u8de8\u8d8a4KB\u5730\u5740\u8fb9\u754c"}),"\n",(0,t.jsx)(n.li,{children:"\u4e0d\u80fd\u63d0\u524d\u7ec8\u6b62\u4e00\u6b21burst\uff0c\u4f46\u662fmaster\u53ef\u4ee5\u901a\u8fc7WSTRB\u6307\u660e\u90a3\u4e2abyte lanes\u6709\u6548"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"burst-address",children:"Burst address"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Start_Address: The start address that is issued by the master."}),"\n",(0,t.jsx)(n.li,{children:"Number_Bytes: The maximum number of bytes in each data transfer."}),"\n",(0,t.jsx)(n.li,{children:"Data_Bus_Bytes: The number of byte lanes in the data bus."}),"\n",(0,t.jsx)(n.li,{children:"Aligned_Address: The aligned version of the start address."}),"\n",(0,t.jsx)(n.li,{children:"Burst_Length: The rotal number of data transfers within a burst."}),"\n",(0,t.jsx)(n.li,{children:"Address_N: The address of transfer N in a burst. N is 1 for the first transfer in a burst."}),"\n",(0,t.jsx)(n.li,{children:"Wrap_Boundary: The lowest address within a wrapping burst."}),"\n",(0,t.jsx)(n.li,{children:"Lower_Byte_Lane: The byte lane of the lowest addressed byte of a transfer."}),"\n",(0,t.jsx)(n.li,{children:"Upper_Byte_Lane: The byte lane of the highest addressed byte of a transfer."}),"\n",(0,t.jsx)(n.li,{children:"INT(x): The rounded-down integer value of x."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.img,{src:s(24351).A+"",width:"778",height:"295"}),"\r\n",(0,t.jsx)(n.img,{src:s(14741).A+"",width:"828",height:"789"}),"\r\n",(0,t.jsx)(n.em,{children:"Byte Lanes\u8868\u793a\u591a\u4e2abyte\u901a\u9053\uff0c\u4f8b\u598232bits\u4fe1\u53f7\u53ef\u8868\u793a\u4e3abyte1 byte2 byte3 byte4\uff0c\u6bcf\u4e2abyte\u5bf9\u5e94\u4e00\u4e2abyte lane"})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["AXI \u8bfb\u64cd\u4f5c\u4f20\u8f93\u4f9d\u8d56\u5173\u7cfb\r\n",(0,t.jsx)(n.img,{src:s(31362).A+"",width:"982",height:"614"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["AXI3 \u5199\u64cd\u4f5c\u4f20\u8f93\u4f9d\u8d56\u5173\u7cfb\r\n",(0,t.jsx)(n.img,{src:s(66296).A+"",width:"958",height:"745"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["AXI4\u548c5 \u5199\u64cd\u4f5c\u4f20\u8f93\u4f9d\u8d56\u5173\u7cfb\r\nAXI4\u548cAXI5\u5b9a\u4e49\u4e86\u989d\u5916\u7684\u5199\u76f8\u5e94\u4f9d\u8d56\u9879\r\n",(0,t.jsx)(n.img,{src:s(73812).A+"",width:"1007",height:"866"}),"\r\n",(0,t.jsx)(n.strong,{children:"\u4ece\u63e1\u624b\u6765\u770b\u6570\u636e\u53ef\u4ee5\u5728\u5730\u5740\u4e4b\u524d\u4f20\u8f93\uff0cslave\u80fd\u4e0d\u80fd\u6b63\u786e\u63a5\u6536\u5e94\u8be5\u770bslave\uff08\u6216interconnector\uff09\u662f\u5426\u652f\u6301\u8be5\u6a21\u5f0f\uff0c\u662f\u5426\u80fd\u591f\u5bf9\u6570\u636e\u8fdb\u884c\u7f13\u5b58\u3002"}),"\r\n",(0,t.jsx)(n.strong,{children:"AXI4\u589e\u52a0\u7684\u989d\u5916\u4f9d\u8d56\u9879\u4fdd\u8bc1slave\u4e0d\u4f1a\u50cfAXI3\u90a3\u6837\u5728\u63a5\u6536\u5230\u5199\u6570\u636e\u800c\u6ca1\u6709\u63a5\u6536\u5230\u5199\u5730\u5740\u65f6\u5c31\u8fd4\u56de\u5199\u54cd\u5e94\uff0cAXI3\u7684slave\u4e0eAXI4\u7684master\u76f8\u8fde\u9700\u8981\u989d\u5916\u7684wrapper\uff0c\u6765\u4fdd\u8bc1\u5176\u5199\u54cd\u5e94\u4fe1\u53f7\u4e00\u5b9a\u662f\u5728\u63a5\u6536\u5230\u5199\u5730\u5740\u540e\u518d\u8fd4\u56de\u3002"}),"\r\n",(0,t.jsx)(n.strong,{children:"AXI4\u53d6\u6d88\u4e86WID\uff0c\u5199\u5730\u5740\u548c\u5199\u6570\u636e\u7684\u987a\u5e8f\u9700\u8981\u5bf9\u5e94"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u7a84\u4f20\u8f93narrow-transfer",children:"\u7a84\u4f20\u8f93\uff08Narrow transfer\uff09"}),"\n",(0,t.jsx)(n.p,{children:"\u672c\u6b21\u4f20\u8f93\u4e2d\u6570\u636e\u4f4d\u5bbd\u5c0f\u4e8e\u901a\u9053\u672c\u8eab\u7684\u6570\u636e\u4f4d\u5bbd\r\n\u5728\u7a84\u4f20\u8f93\u8fc7\u7a0b\u4e2d\uff0c\u4e3b\u673a\u9700\u8981\u544a\u8bc9\u4ece\u673a\u6570\u636e\u901a\u9053\u4e2d\u90a3\u4e9b\u5b57\u8282\u662f\u6709\u6548\u7684\uff0c\u9700\u8981\u4f7f\u7528WSTRB\u4fe1\u53f7\u3002\r\n\u8be6\u89c1AXI\u534f\u8bae\u4e2d\u7684\u4f8b\u5b50"}),"\n",(0,t.jsx)(n.h2,{id:"\u975e\u5bf9\u9f50\u4f20\u8f93",children:"\u975e\u5bf9\u9f50\u4f20\u8f93"}),"\n",(0,t.jsxs)(n.p,{children:["AXI\u534f\u8bae\u652f\u6301\u975e\u5bf9\u9f50\u7684\u6570\u636e\u4f20\u8f93\uff0c\u5141\u8bb8\u7a81\u53d1\u4f20\u8f93\u7684\u9996\u5b57\u8282\u5730\u5740\uff0c\u5373\u8d77\u59cb\u5730\u5740\u4e0e",(0,t.jsx)(n.strong,{children:"\u7a81\u53d1\u4f4d\u5bbd"}),"\u4e0d\u5bf9\u9f50\u3002\u4f8b\u5982\uff0c\u7a81\u53d1\u4f20\u8f93\u4f4d\u5bbd\u4e3a32bit\uff0c\u800c\u4f20\u8f93\u8d77\u59cb\u5730\u5740\u4e3a0x1002\uff0c\u5219\u4ea7\u751f\u4e86\u975e\u5bf9\u9f50\u7684\u73b0\u8c61\uff0c\u4e0e32bit\u4f4d\u5bbd\u5bf9\u9f50\u7684\u8d77\u59cb\u5730\u5740\u9700\u8981\u80fd\u591f\u88ab4\u6574\u9664\u3002\r\n\u6ce8\u610f\uff1a\u5bf9\u9f50\u5e94\u8be5\u662f\u53d6\u51b3\u4e8e\u7a81\u53d1\u4f20\u8f93\u7684\u5bbd\u5ea6\uff0c\u800c\u4e0d\u662f\u603b\u7ebf\u4f4d\u5bbd\u3002\r\n\u5bf9\u4e8e\u975e\u5bf9\u9f50\u4f20\u8f93\uff0c\u4e3b\u673a\u4f1a\u8fdb\u884c\u4e24\u9879\u64cd\u4f5c\uff1a"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"\u53ca\u65f6\u8d77\u59cb\u5730\u5740\u975e\u5bf9\u9f50\uff0c\u4e5f\u4fdd\u8bc1\u6240\u6709\u4f20\u8f93\u662f\u5bf9\u9f50\u7684"}),"\n",(0,t.jsxs)(n.li,{children:["\u5728\u9996\u4e2atransfer\u4e2d\u589e\u52a0\u586b\u5145\u6570\u636e\uff0c\u5c06",(0,t.jsx)(n.strong,{children:"\u9996\u6b21\u4f20\u8f93\u586b\u5145\u81f3\u5bf9\u9f50"}),"\uff0c\u586b\u5145\u6570\u636e\u4f7f\u7528WSTRB\u4fe1\u53f7\u8fdb\u884c\u6807\u8bb0\r\n\u4f8b1\r\n",(0,t.jsx)(n.img,{src:s(99496).A+"",width:"720",height:"238"}),"\r\n\u8d77\u59cb\u5730\u5740\u4e3a0x1\uff0c\u975e\u5bf9\u9f50\uff0c\u4f46\u4e3b\u673a\u901a\u8fc7\u6dfb\u52a0\u4e00\u5b57\u8282\u7684\u586b\u5145\u6570\u636e\u5c061st transfer\u7684\u5b9e\u9645\u5730\u5740\u8c03\u6574\u4e3a\u5bf9\u9f50\u76840x0\uff0c\u5e76\u7528WSTRB 4'b1110\u6807\u8bc6\u51fa\u6700\u4f4e\u5b57\u8282\u4e0a\u7684\u65e0\u6548\u586b\u5145\u6570\u636e\u3002\u4ece\u673a\u6309\u7167\u540c\u6837\u7684\u539f\u5219\u5b9e\u73b0\u5bf9\u9f50\u3002\r\n\u4f8b2\r\n",(0,t.jsx)(n.img,{src:s(13925).A+"",width:"720",height:"159"}),"\r\n\u4e0a\u56fe\u4e3a\u975e\u5bf9\u9f50\u52a0\u7a84\u4f20\u8f93\u7684\u4f8b\u5b50\uff0c\u9996\u5148\u8d77\u59cb\u5730\u5740\u4e3a0x7\uff0cburst\u4f4d\u5bbd\u4e3a32bit\uff0c\u5c06\u53d1\u9001\u6570\u636e\u586b\u5145\u81f3\u7a81\u53d1\u4f4d\u5bbd32bit\u5bf9\u9f50\uff0c\u4e4b\u540e\u7531\u4e8e\u603b\u7ebf\u6570\u636e\u4f4d\u5bbd\u4e3a64bit\uff0c\u518d\u6309\u7167\u7a84\u4f20\u8f93\u7684\u65b9\u5f0f\u586b\u51454byte\u6570\u636e\uff0c\u5b8c\u62101st transfer\uff0c\u540e\u7eed\u7684transfer\u5747\u6309\u7167\u7a84\u4f20\u8f93\u7684\u65b9\u5f0f\u8fdb\u884c\u4f20\u8f93\u5373\u53ef\u3002"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"byte-invarience",children:"byte Invarience"}),"\n",(0,t.jsx)(n.p,{children:"\u4e3a\u4e86\u80fd\u591f\u4f7f\u5927\u5c0f\u7aef\u6a21\u5f0f\u5728\u5b58\u50a8\u4e2d\u5171\u5b58\uff0cAXI\u534f\u8bae\u8bbe\u8ba1\u4e86\u4e00\u79cd\u5b57\u8282\u987a\u5e8f\u6052\u5b9a\u7684\u5927\u5c0f\u7aef\u4f20\u8f93\u65b9\u6848\uff1a"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u65e0\u8bba\u5927\u5c0f\u7aef\u6a21\u5f0f\uff0c\u6bcf\u4e2a\u6570\u636e\u7ed3\u6784\u5b58\u50a8\u7a7a\u95f4\u7684\u5206\u914d\u65b9\u5f0f\u662f\u76f8\u540c\u7684"}),"\n",(0,t.jsx)(n.li,{children:"\u8be5\u6570\u636e\u7ed3\u6784\u6309\u7167\u5176\u5927\u5c0f\u7aef\u6a21\u5f0f\u51b3\u5b9a\u5b57\u8282\u5b58\u50a8\u7684\u5730\u652f\u987a\u5e8f"}),"\n",(0,t.jsx)(n.li,{children:"\u5728\u4f20\u8f93\u8fc7\u7a0b\u4e2d\u4e0d\u8003\u8651\u6570\u636e\u7ed3\u6784\u7684\u5927\u5c0f\u7aef\uff0c\u6309\u7167\u5b57\u8282\u539f\u5148\u5b58\u50a8\u7684\u987a\u5e8f\uff0c\u539f\u6837\u4f20\u8f93\u5e76\u5b58\u653e\u81f3\u5bf9\u7aef\r\n\u8be5\u6a21\u5f0f\u7684\u610f\u4e49\u5728\u4e8e\u4f20\u8f93\u53cc\u65b9\u5747\u4e0d\u5bf9\u6570\u636e\u7ed3\u6784\u7684\u5927\u5c0f\u7aef\u8fdb\u884c\u89e3\u6790\u8f6c\u6362\uff0c\u4e25\u683c\u6309\u7167\u5b57\u8282\u7684\u5b58\u50a8\u987a\u5e8f\u8fdb\u884c\u4f20\u8f93\u5e76\u8f6c\u5b58\uff0c\u9632\u6b62\u5927\u5c0f\u7aef\u5171\u5b58\u4ea7\u751f\u6570\u636e\u8986\u76d6\u3002"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"wrap\u6709\u4ec0\u4e48\u7528",children:"wrap\u6709\u4ec0\u4e48\u7528\uff1f"}),"\n",(0,t.jsxs)(n.p,{children:["\u7531\u4e8eCPU\u586b\u5145cacheline\u7684\u65f6\u5019\uff0c\u7b2c\u4e00\u4e2a\u8bbf\u95ee\u7684\u5730\u5740\u662f0x90\uff0c\u52a0\u52309c\u4e4b\u540e\uff0c\u4f1a\u4ececacheline\u7684\u8d77\u59cb\u5730\u5740\u7ee7\u7eed\u4f20\u8f93\uff0c\u5bf9cache\u7684\u8bbf\u95ee\u4e0d\u5e94\u8be5\u8de8\u8fc7cacheline\u7684\u8fb9\u754c\u3002\r\n\u5982\u4f55\u8ba1\u7b97\u56de\u73af\u5230\u4e86\u8fb9\u754c\u5462\uff1f\u4ee5\u56fe 7\u4e3a\u4f8b\uff0cHSIZE\u662fWord\uff0c\u4e5f\u5c31\u662f4\u4e2aByte\uff0cHBURST\u662fWRAP8\uff0c\u4e5f\u5c31\u662f\u8bf4\u56de\u73af\u8fb9\u754c\u4e3a4x8=32\u3002\u4ece0x90\u5f00\u59cb\u4f20\u8f93\u52300x9C\uff0c\u518d\u7ee7\u7eed\u7d2f\u52a0\u4e00\u4e2aword\u7684\u8bdd\u5c31\u53d8\u62100xA0\uff0c0xA0\u662f32\u7684\u6574\u6570\u500d\uff0c\u4e5f\u5c31\u662f\u5230\u4e86\u56de\u73af\u8fb9\u754c\u4e86\uff0c0xA0\u51cf\u53bb32\u7b49\u4e8e0x80\uff0c\u6240\u4ee50x9C\u7684\u4e0b\u4e00\u4e2a\u5730\u5740\u53d8\u4e3a0x80\u3002\r\n",(0,t.jsx)(n.img,{src:s(87712).A+"",width:"425",height:"181"})]}),"\n",(0,t.jsx)(n.h2,{id:"outstanding",children:"Outstanding"}),"\n",(0,t.jsxs)(n.p,{children:["1\uff09\u8bfb\u64cd\u4f5c\uff1a",(0,t.jsx)(n.strong,{children:"\u6bcf\u4e2amaster"}),"\u53ef\u4ee5\u8fde\u7eed\u53d1N\u4e2a\u8bfb\u5730\u5740\u547d\u4ee4\uff0c\u8fd9\u671f\u95f4\u5982\u679c\u8bfb\u6570\u636e\u6ca1\u6709\u8fd4\u56de\uff0c\u5219\u9700\u8981\u7b49\u5f85\u8bfb\u6570\u636e\u8fd4\u56de\uff0c\u5982\u679c\u6709\u8bfb\u6570\u636e\u8fd4\u56de\uff0c\u5219\u8fd4\u56de\u4e86\u51e0\u4e2a\uff0c\u90a3\u4e48\u4ecd\u7136\u53ef\u4ee5\u63a5\u7740\u53d1\u51e0\u4e2a\u3002\u4e5f\u5c31\u662f\u8bf4\uff0c\u201c\u5728\u8def\u4e0a\u201d \u7684\u8bfb\u547d\u4ee4\uff08\u6216\u8005\u8bfb\u6570\u636e\uff09\u6700\u591a\u53ef\u4ee5\u662fN\u3002\r\n2\uff09\u5199\u64cd\u4f5c\uff1a",(0,t.jsx)(n.strong,{children:"\u6bcf\u4e2amaster"}),"\u53ef\u4ee5\u8fde\u7eed\u53d1\u51faN\u7ec4\u5199\u5730\u5740\uff08\u5199\u6570\u636e\uff09\u547d\u4ee4\uff0c\u8fd9\u671f\u95f4\u5982\u679c\u5199\u54cd\u5e94\u6ca1\u6709\u8fd4\u56de\uff0c\u5219\u5fc5\u987b\u7b49\u5f85\u5199\u54cd\u5e94\u8fd4\u56de\u624d\u80fd\u63a5\u7740\u53d1\u5199\u5730\u5740\uff08\u5199\u6570\u636e\uff09\u547d\u4ee4\uff0c\u5982\u679c\u6709\u5199\u54cd\u5e94\u8fd4\u56de\uff0c\u5219\u8fd4\u56de\u4e86\u51e0\u4e2a\uff0c\u90a3\u4e48\u4ecd\u7136\u53ef\u4ee5\u63a5\u7740\u53d1\u51e0\u7ec4\u3002\u4e5f\u5c31\u662f\u8bf4\uff0c\u201c\u5728\u8def\u4e0a\u201d \u7684\u5199\u54cd\u5e94\u6700\u591a\u53ef\u4ee5\u662fN\u3002\r\noutstanding\u7684\u6570\u91cf\u662f\u5bf9\u4e8e\u6bcf\u4e2amaster\u800c\u8a00\u7684\uff0c\u800c\u4e0d\u662f\u8bf4\u603b\u7ebf\u4e0a\u6709\u591a\u5c11\u4e2a\u4f20\u8f93\u547d\u4ee4\r\n\u6362\u79cd\u8bf4\u6cd5\uff0coutsatanding\u662f\u5bf9\u5730\u5740\u800c\u8a00\uff0c\u4e00\u6b21\u7a81\u53d1\u8fd8\u6ca1\u7ed3\u675f\uff0c\u5c31\u53ef\u4ee5\u53d1\u9001\u4e0b\u4e00\u4e2a\u5730\u5740\u3002\u800c\u4e71\u5e8f\u548c\u4ea4\u7ec7\u5219\u662f\u76f8\u5bf9\u4e8e\u4f20\u8f93\u4e8b\u52a1\uff0cout-of-order\u8bf4\u7684\u662f\u53d1\u9001transaction\u548c\u63a5\u6536\u7684cmd\u4e4b\u95f4\u7684\u987a\u5e8f\u6ca1\u6709\u5173\u7cfb\uff0c\u5982\u5148\u63a5\u5230A\u7684cmd\uff0c\u518d\u63a5\u5230B\u7684cmd\uff0c\u5219\u53ef\u4ee5\u5148\u53d1B\u7684\u6570\u636e\uff0c\u518d\u53d1A\u7684\u6570\u636e\uff1b\u4ea4\u7ec7\u6307\u7684\u662fA\u7684\u6570\u636e\u548cB\u7684\u6570\u636e\u53ef\u4ee5\u4ea4\u9519\uff0c\u5982A0->B0->A1->B1->B2->B3\u3002\r\n",(0,t.jsx)(n.img,{src:s(44437).A+"",width:"1078",height:"518"})]}),"\n",(0,t.jsx)(n.h2,{id:"interleave",children:"Interleave"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.img,{src:s(26403).A+"",width:"1004",height:"554"}),"\r\n\u4ea4\u7ec7\u5bb9\u6613\u6b7b\u9501\r\n",(0,t.jsx)(n.strong,{children:"\u9700\u8981\u6ce8\u610f\u540c\u4e00\u4e2aID\u65e2\u4e0d\u80fd\u652f\u6301ooo\u3002\u4e5f\u4e0d\u80fd\u652f\u6301interleave"})]})]})}function f(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},73812:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/23495115-20b8543476d053fb-b390e298fc318013bc9eb3cb5a4630bf.png"},87712:(e,n,s)=>{s.d(n,{A:()=>t});const t="data:image/png;base64,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"},14741:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/23495115-575d3593aa4d0a5c-e4b9c5aafc559d6c50804bf15d05baf6.png"},44437:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/23495115-a8026690929cbad8-b9c3b4512bfccea1b4e5fa294bd7d55b.png"},26403:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/23495115-ae7c5329dfa0128a-08d5f2b8705bceb95494416c45d2642f.png"},12169:(e,n,s)=>{s.d(n,{A:()=>t});const t="data:image/png;base64,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"},99496:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/23495115-c37fb760fa2247c2-59afb866e27e369825a6c41666cba494.png"},24351:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/23495115-e355e6afd9174f76-e70fdac2064cc527d72bcea73d1b319c.png"},31362:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/23495115-f6cb9ea2522b1c4f-3036201129211beda3a4d91da2b97c42.png"},66296:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/23495115-fe37898d234524f1-2dd07a4ba0cc365cc0cf537a6c32575f.png"},13925:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/23495115-ff50af4411c07758-385cf2f522480a08379f69e1f0839577.png"},28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>d});var t=s(96540);const r={},i=t.createContext(r);function a(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);