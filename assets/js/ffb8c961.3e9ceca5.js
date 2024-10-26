"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8450],{90019:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var r=t(74848),n=t(28453);const s={},c=void 0,l={id:"\u73af\u5883\u914d\u7f6e/git",title:"git",description:"Reference\uff1a",source:"@site/docs/\u73af\u5883\u914d\u7f6e/git.md",sourceDirName:"\u73af\u5883\u914d\u7f6e",slug:"/\u73af\u5883\u914d\u7f6e/git",permalink:"/docs/\u73af\u5883\u914d\u7f6e/git",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/\u73af\u5883\u914d\u7f6e/git.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"csh\u914d\u7f6e",permalink:"/docs/\u73af\u5883\u914d\u7f6e/csh\u914d\u7f6e"},next:{title:"vcs+verdi",permalink:"/docs/\u73af\u5883\u914d\u7f6e/vcs+verdi"}},o={},d=[{value:"log",id:"log",level:3},{value:"Diff",id:"diff",level:3},{value:"pull",id:"pull",level:3},{value:"git\u5f3a\u5236\u4f7f\u7528\u670d\u52a1\u5668\u6587\u4ef6\u8986\u76d6\u672c\u5730",id:"git\u5f3a\u5236\u4f7f\u7528\u670d\u52a1\u5668\u6587\u4ef6\u8986\u76d6\u672c\u5730",level:3},{value:"Reset",id:"reset",level:3},{value:"linux\u4e0b git \u4fdd\u5b58\u8d26\u53f7\u5bc6\u7801",id:"linux\u4e0b-git-\u4fdd\u5b58\u8d26\u53f7\u5bc6\u7801",level:3},{value:"blame",id:"blame",level:3},{value:"Push",id:"push",level:3},{value:"git cherry-pick",id:"git-cherry-pick",level:3}];function a(e){const i={a:"a",code:"code",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(i.p,{children:["Reference\uff1a\r\n",(0,r.jsx)(i.a,{href:"https://www.runoob.com/git/git-tutorial.html",children:"https://www.runoob.com/git/git-tutorial.html"}),"\r\n",(0,r.jsx)(i.a,{href:"https://backlog.com/git-tutorial/cn/intro/intro1_1.html",children:"https://backlog.com/git-tutorial/cn/intro/intro1_1.html"}),"\r\n",(0,r.jsx)(i.a,{href:"https://www.cnblogs.com/wenxuehai/p/12357898.html",children:"Gerrit\u4f7f\u7528\u8bf4\u660e"})]}),"\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.img,{src:t(85678).A+"",width:"717",height:"597"})}),"\n",(0,r.jsx)(i.p,{children:"workspace\uff1a\u5de5\u4f5c\u533a\r\nstaging area\uff1a\u6682\u5b58\u533a/\u7f13\u5b58\u533a\r\nlocal repository\uff1a\u7248\u672c\u5e93\u6216\u672c\u5730\u4ed3\u5e93\r\nremote repository\uff1a\u8fdc\u7a0b\u4ed3\u5e93"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"Git checkout -- <filename>\r\nGit checkout HEAD <filename>\n"})}),"\n",(0,r.jsx)(i.h3,{id:"log",children:"log"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"git blame <file>\r\ngit show commit_id\n"})}),"\n",(0,r.jsx)(i.p,{children:".gitconfig"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"    st = status -uno\r\n    dog = log --all --decorate --oneline --graph\r\n    lg1 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all\r\n    lg2 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all\n"})}),"\n",(0,r.jsx)(i.h3,{id:"diff",children:"Diff"}),"\n",(0,r.jsx)(i.p,{children:"git diff\uff1a\u662f\u67e5\u770b workspace \u4e0e index \u7684\u5dee\u522b\u7684\u3002Changes in the working tree not yet staged for the next commit.\r\ngit diff --cached\uff1a\u662f\u67e5\u770b index \u4e0e local repositorty \u7684\u5dee\u522b\u7684\u3002 Changes between the index and your last commit; what you would be committing if you run git commit without -a option\r\ngit diff HEAD -- xxx\uff1a\u662f\u67e5\u770b workspace \u548c local repository \u7684\u5dee\u522b\u7684\u3002\uff08HEAD \u6307\u5411\u7684\u662f local repository \u4e2d\u6700\u65b0\u63d0\u4ea4\u7684\u7248\u672c\uff09Changes in the working tree since your last commit; what you would be committing if you run 'git commit -a'"}),"\n",(0,r.jsx)(i.p,{children:"git diff --stat \u672c\u5730\u5206\u652f \u8fdc\u7a0b\u5206\u652f  (\u611f\u89c9\u6ca1\u5565\u6548\u679c\uff0c\u771f\u8981diff\u4e0d\u5982\u628a\u8fdc\u7a0b\u7684\u76f4\u63a5pull\u4e0b\u6765\u5c31\u77e5\u9053\u5dee\u5f02)\r\ngit diff --stat master origin/master \u672c\u5730master\u5206\u652f\u548c\u8fdc\u7a0bmaster\u5206\u652f\u4e4b\u95f4\u7684\u5dee\u5f02\r\n\u540c\u6837\u53ef\u4ee5\u6bd4\u8f83\u672c\u5730\u4e24\u4e2a\u5206\u652f\u4e4b\u95f4\u7684\u5dee\u5f02\r\ngit diff --stat master dev"}),"\n",(0,r.jsx)(i.p,{children:"git diff xxx\r\ngit diff HEAD xxx"}),"\n",(0,r.jsx)(i.h3,{id:"pull",children:"pull"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"1\u3001\u66f4\u65b0\u672c\u5730\u7684\u8fdc\u7a0b\u5206\u652f\r\ngit fetch origin\r\n\u4e0a\u9762\u547d\u4ee4\u662fgit pull\u7684\u5176\u4e2d\u4e00\u90e8\u5206\uff1a git pull = git fetch  +  git merge\r\n\u53ea\u62c9\u53bb\u8fdc\u7a0b\u5206\u652f\u5230\u672c\u5730\u8fdc\u7a0b\u5206\u652f\uff0c\u800c\u4e0d\u8ddf\u672c\u5730\u5206\u652fmerge\r\n2\u3001\u672c\u5730\u4e0e\u8fdc\u7a0b\u7684\u5dee\u96c6 :\uff08\u663e\u793a\u8fdc\u7a0b\u6709\u800c\u672c\u5730\u6ca1\u6709\u7684commit\u4fe1\u606f\uff09\r\ngit log master..origin/master\r\n3\u3001\u67e5\u770b\u5dee\u5f02\r\ngit diff <local branch> <remote>/<remote branch>\r\ngit diff --statmaster origin/master\n"})}),"\n",(0,r.jsx)(i.h3,{id:"git\u5f3a\u5236\u4f7f\u7528\u670d\u52a1\u5668\u6587\u4ef6\u8986\u76d6\u672c\u5730",children:"git\u5f3a\u5236\u4f7f\u7528\u670d\u52a1\u5668\u6587\u4ef6\u8986\u76d6\u672c\u5730"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"git fetch --all\r\ngit reset --hard origin/master \r\ngit pull\n"})}),"\n",(0,r.jsx)(i.h3,{id:"reset",children:"Reset"}),"\n",(0,r.jsx)(i.p,{children:"\u5df2\u7ecfcommit\u5230\u7248\u672c\u5e93\u7684\u6587\u4ef6\uff0c\u9700\u8981\u64a4\u4e0breset\uff0c\u4f7f\u7528"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"`git reset HEAD file`\uff08\u6709--soft --hard\u7b49\u9009\u9879\uff0c\u53ef\u4ee5\u9009\u62e9\u662f\u5426\u5e26\u7740\u6682\u5b58\u533a\u4e00\u8d77reset\uff0c\u8be6\u7ec6\u53ef\u67e5\u770bgit reset --help\uff0c\u5927\u81f4soft\u64a4\u9500commit\uff0c\u4f46\u662fmodify\u8fd8\u5728\u5373add\u8fd8\u5728\uff0cmixed\u64a4\u9500commit\u548cadd\uff0chard\u5168\u90e8\u64a4\u9500\u5e76\u4e14\u672c\u5730\u4fee\u6539\u5220\u9664\uff09\n"})}),"\n",(0,r.jsx)(i.h3,{id:"linux\u4e0b-git-\u4fdd\u5b58\u8d26\u53f7\u5bc6\u7801",children:"linux\u4e0b git \u4fdd\u5b58\u8d26\u53f7\u5bc6\u7801"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"1. \u5728\xa0\u670d\u52a1\u5668 \uff0c\u8f93\u5165\u547d\u4ee4\r\n`git config --global credential.helper store`\r\n2. \u67e5\u770b\u4fdd\u5b58\u7684\u5bc6\u7801\r\n`cat ~/.git-credentials`\r\n3. \u67e5\u770b\u5f53\u524d\u670d\u52a1\u5668\u7684git\u5bc6\u7801\u914d\u7f6e\u65b9\u5f0f\r\n`cat ~/.gitconfig` \n"})}),"\n",(0,r.jsx)(i.h3,{id:"blame",children:"blame"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"git blame filename\n"})}),"\n",(0,r.jsx)(i.h3,{id:"push",children:"Push"}),"\n",(0,r.jsxs)(i.p,{children:["\u5728\u4f7f\u7528 Gerrit \u65f6\u5019\uff0cpush\u5230gerrit\u4f1a\u63d0\u793a ",(0,r.jsx)(i.code,{children:"missing change-id"}),",\u4e3b\u8981\u539f\u56e0\u662f\u5728pull\u65f6\u5019\u7ecf\u5e38\u4f1a\u51fa\u73b0\u81ea\u52a8merge\uff0c\u81ea\u52a8merge\u7684commit\u4f1a\u6ca1\u6709change id\uff0c\u4fee\u590d\u95ee\u9898\u7684\u65b9\u6cd5\u53ef\u4ee5\u901a\u8fc7",(0,r.jsx)(i.a,{href:"https://rickys.blog.csdn.net/article/details/80990375?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-80990375-blog-80136064.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-80990375-blog-80136064.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=2",children:"missing change id"}),"\u63d0\u5230\u7684\u65b9\u6cd5\uff0c\u4e3b\u8981\u662f\u7ed9merge \u7684log\u589e\u52a0change id\u3002\u5bf9\u4e8e\u51fa\u73b0\u8fd9\u79cd\u95ee\u9898\u6709\u4e24\u79cd\u89e3\u51b3\u65b9\u6cd5\uff1a"]}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:"\u65b9\u6cd51\uff1a\u6bcf\u6b21pull\u65f6\u5982\u679c\u51fa\u73b0merge\uff0c\u5219\u7acb\u5373git commit --amend\u7136\u540e\u9000\u51fa\uff0c\u6765\u5bf9\u8be5\u6b21commit\u589e\u52a0change id\uff0c\u8fd9\u6837\u672c\u5730\u518d\u6709push\u5c31\u4e0d\u4f1a\u51fa\u73b0missing change id\u7684\u60c5\u51b5\uff0c\u4f46\u662f\u4f1a\u589e\u52a0\u4e00\u6b21commit\u4fe1\u606f\uff0c\u5728\u5c06\u4ee3\u7801\u8fdb\u884cpush\u65f6\u4f1a\u5c06merge\u7684commit\u4e5fpush\u4e0a\u53bb\u3002"}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:"\u65b9\u6cd52\uff1a\u6bcf\u6b21\u81ea\u52a8merge\u540e\uff0c\u901a\u8fc7git reset --soft \u5c06commit\u4fe1\u606f\u64a4\u9500\uff0c\u540c\u65f6\u4e0d\u6539\u53d8\u672c\u5730\u4ee3\u7801"}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsxs)(i.p,{children:["\u65b9\u6cd53\uff1a\u5728\u7f3a\u5c11change id\u7684\u60c5\u51b5\u4e0bpush\uff0cgit\u4f1a\u63d0\u4f9b\u5efa\u8bae\u7684command\u4f8b\u5982",(0,r.jsx)(i.code,{children:"gitdir=$(git rev-parse --git-dir); scp -p -P 29418 user@host:hooks/commit-msg ${gitdir}/hooks/ then git commit --amend --no-edit"}),"\uff0c\u6309\u7167\u63d0\u793a\u8fdb\u884c\u64cd\u4f5c\uff0c\u5176\u4e2d\u7b2c\u4e00\u4e2a\u547d\u4ee4\u662f\u83b7\u53d6gitdir\u5e76\u8bbe\u7f6e\u73af\u5883\u53d8\u91cf\uff0c\u76f4\u63a5\u8fd0\u884c\u4f1a\u62a5\u9519\uff0c\u4e00\u822c\u9ed8\u8ba4dir\u4e3a.git\uff0c\u4e5f\u53ef\u4ee5\u6267\u884c",(0,r.jsx)(i.code,{children:"git rev-parse --git-dir"}),"\u6765\u83b7\u53d6git\u8def\u5f84"]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsx)(i.p,{children:"git\u5f3a\u5236\u4f7f\u7528\u5e93\u4e0a\u6587\u4ef6\u8986\u76d6\u672c\u5730\u4ee3\u7801\r\ngit fetch --all\r\ngit reset --hard origin/master\r\ngit pull"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.h3,{id:"git-cherry-pick",children:"git cherry-pick"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"\u57fa\u672c\u4f7f\u7528"}),"\n"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"git cherry-pick \u7684\u4f7f\u7528\u573a\u666f\u5c31\u662f\u5c06\u4e00\u4e2a\u5206\u652f\u4e2d\u7684\u90e8\u5206\u7684\u63d0\u4ea4\u5408\u5e76\u5230\u5176\u4ed6\u5206\u652f\r\ngit checkout master \r\ngit cherry-pick <commitHash>\u590d\u5236\u4ee3\u7801\r\n\u4f7f\u7528\u4ee5\u4e0a\u547d\u4ee4\u4ee5\u540e\uff0c\u8fd9\u4e2a\u63d0\u4ea4\u5c06\u4f1a\u5904\u5728master\u7684\u6700\u524d\u9762\r\n\r\n* \u5408\u5e76\u591a\u4e2a\u63d0\u4ea4\r\ngit cherry-pick <hashA> <hashB>     // \u5408\u5e76\u4e24\u4e2a\u63d0\u4ea4\r\ngit cherry-pick <hashA>..<hashB>    // \u5408\u5e76\u4eceA\u5230B\u4e24\u4e2a\u63d0\u4ea4\u4e2d\u5230\u6240\u6709\u63d0\u4ea4\uff0c\u4f46\u4e0d\u5305\u542bAgit cherry-pick <hashA>^..<hashB>   // \u5408\u5e76\u4eceA\u5230B\u4e24\u4e2a\u63d0\u4ea4\u4e2d\u5230\u6240\u6709\u63d0\u4ea4\uff0c\u5305\u542bA\u590d\u5236\u4ee3\u7801\r\n\r\n* pick\u4ee5\u540e\u4ea7\u751f\u4e86\u51b2\u7a81\r\n\u5f53\u6267\u884c\u4e86cherry-pick \u547d\u4ee4\u5982\u679c\u6709\u51b2\u7a81\uff0c\u5c31\u4f1a\u62a5\u51b2\u7a81\u9519\u8bef\r\ngit cherry-pick --continue// 1. \u89e3\u51b3\u5b8c\u51b2\u7a81\u4ee5\u540e\uff0c\u7ee7\u7eed\u4e0b\u4e00\u4e2a \r\ncherry-pickgit cherry-pick --abort// 2. \u5982\u679c\u4e0d\u60f3\u89e3\u51b3\u51b2\u7a81\uff0c\u8981\u653e\u5f03\u5408\u5e76\uff0c\u7528\u6b64\u547d\u4ee4\u56de\u5230\u64cd\u4f5c\u4ee5\u524d\r\ngit cherry-pick --quit// 3. \u4e0d\u60f3\u89e3\u51b3\u51b2\u7a81\uff0c\u653e\u5f03\u5408\u5e76\uff0c\u4e14\u4fdd\u6301\u73b0\u6709\u60c5\u51b5\uff0c\u4e0d\u56de\u5230\u64cd\u4f5c\u4ee5\u524d\n"})})]})}function h(e={}){const{wrapper:i}={...(0,n.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},85678:(e,i,t)=>{t.d(i,{A:()=>r});const r=t.p+"assets/images/23495115-2c12a462a8a3a314-34b76b027f349d07d9362e5ea8d7dd1c.png"},28453:(e,i,t)=>{t.d(i,{R:()=>c,x:()=>l});var r=t(96540);const n={},s=r.createContext(n);function c(e){const i=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),r.createElement(s.Provider,{value:i},e.children)}}}]);