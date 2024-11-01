Reference：
https://www.runoob.com/git/git-tutorial.html
https://backlog.com/git-tutorial/cn/intro/intro1_1.html
[Gerrit使用说明](https://www.cnblogs.com/wenxuehai/p/12357898.html)

![](git.assets\23495115-2c12a462a8a3a314.png)

workspace：工作区
staging area：暂存区/缓存区
local repository：版本库或本地仓库
remote repository：远程仓库


```
Git checkout -- <filename>
Git checkout HEAD <filename>
```

### log
```
git blame <file>
git show commit_id
```
.gitconfig
```
    st = status -uno
    dog = log --all --decorate --oneline --graph
    lg1 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all
    lg2 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all
```
### Diff
git diff：是查看 workspace 与 index 的差别的。Changes in the working tree not yet staged for the next commit.
git diff --cached：是查看 index 与 local repositorty 的差别的。 Changes between the index and your last commit; what you would be committing if you run git commit without -a option
git diff HEAD -- xxx：是查看 workspace 和 local repository 的差别的。（HEAD 指向的是 local repository 中最新提交的版本）Changes in the working tree since your last commit; what you would be committing if you run 'git commit -a'

git diff --stat 本地分支 远程分支  (感觉没啥效果，真要diff不如把远程的直接pull下来就知道差异)
git diff --stat master origin/master 本地master分支和远程master分支之间的差异
同样可以比较本地两个分支之间的差异
git diff --stat master dev

git diff xxx 
git diff HEAD xxx

### pull
```
1、更新本地的远程分支
git fetch origin
上面命令是git pull的其中一部分： git pull = git fetch  +  git merge
只拉去远程分支到本地远程分支，而不跟本地分支merge
2、本地与远程的差集 :（显示远程有而本地没有的commit信息）
git log master..origin/master
3、查看差异
git diff <local branch> <remote>/<remote branch>
git diff --statmaster origin/master
```

### git强制使用服务器文件覆盖本地
```
git fetch --all
git reset --hard origin/master 
git pull
```


### Reset
已经commit到版本库的文件，需要撤下reset，使用
```
`git reset HEAD file`（有--soft --hard等选项，可以选择是否带着暂存区一起reset，详细可查看git reset --help，大致soft撤销commit，但是modify还在即add还在，mixed撤销commit和add，hard全部撤销并且本地修改删除）
```

### linux下 git 保存账号密码
```
1. 在 服务器 ，输入命令
`git config --global credential.helper store`
2. 查看保存的密码
`cat ~/.git-credentials`
3. 查看当前服务器的git密码配置方式
`cat ~/.gitconfig` 
```

### blame
```
git blame filename
```

### Push
在使用 Gerrit 时候，push到gerrit会提示 `missing change-id`,主要原因是在pull时候经常会出现自动merge，自动merge的commit会没有change id，修复问题的方法可以通过[missing change id](https://rickys.blog.csdn.net/article/details/80990375?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-80990375-blog-80136064.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-80990375-blog-80136064.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=2)提到的方法，主要是给merge 的log增加change id。对于出现这种问题有两种解决方法：
* 方法1：每次pull时如果出现merge，则立即git commit --amend然后退出，来对该次commit增加change id，这样本地再有push就不会出现missing change id的情况，但是会增加一次commit信息，在将代码进行push时会将merge的commit也push上去。
* 方法2：每次自动merge后，通过git reset --soft 将commit信息撤销，同时不改变本地代码
* 方法3：在缺少change id的情况下push，git会提供建议的command例如`gitdir=$(git rev-parse --git-dir); scp -p -P 29418 user@host:hooks/commit-msg ${gitdir}/hooks/ then git commit --amend --no-edit`，按照提示进行操作，其中第一个命令是获取gitdir并设置环境变量，直接运行会报错，一般默认dir为.git，也可以执行`git rev-parse --git-dir`来获取git路径

* git强制使用库上文件覆盖本地代码
git fetch --all 
git reset --hard origin/master 
git pull

### git cherry-pick
* 基本使用
```
git cherry-pick 的使用场景就是将一个分支中的部分的提交合并到其他分支
git checkout master 
git cherry-pick <commitHash>复制代码
使用以上命令以后，这个提交将会处在master的最前面

* 合并多个提交
git cherry-pick <hashA> <hashB>     // 合并两个提交
git cherry-pick <hashA>..<hashB>    // 合并从A到B两个提交中到所有提交，但不包含Agit cherry-pick <hashA>^..<hashB>   // 合并从A到B两个提交中到所有提交，包含A复制代码

* pick以后产生了冲突
当执行了cherry-pick 命令如果有冲突，就会报冲突错误
git cherry-pick --continue// 1. 解决完冲突以后，继续下一个 
cherry-pickgit cherry-pick --abort// 2. 如果不想解决冲突，要放弃合并，用此命令回到操作以前
git cherry-pick --quit// 3. 不想解决冲突，放弃合并，且保持现有情况，不回到操作以前
```
