## tmux介绍
tmux（terminal multiplexer）时linux上的终端复用工具。
##安装
### 对于root用户安装方法
```sodu apt-get install tmux```
### 对于非root用户，需要下载源码安装，源码路径如下：
```
https://github.com/tmux/tmux/releases/download/3.0a/tmux-3.0a.tar.gz
https://github.com/libevent/libevent/releases/download/release-2.1.11-stable/libevent-2.1.11-stable.tar.gz
https://ftp.gnu.org/gnu/ncurses/ncurses-6.2.tar.gz
```
#### 1. 解压
```
tar -xzvf tmux-3.0a.tar.gz
tar -xzvf libevent-2.1.11-stable.tar.gz
tar -xzvf ncurses-6.2.tar.gz
```
#### 2. 源码安装
```
# 安装依赖包
# libevent
cd  libevent-2.1.11-stable
./configure --prefix=$HOME/myapps/tmux_depend --disable-shared  # 安装路径可根据个人喜好自己选择
make && make install

# ncurses
cd ncurses-6.2
./configure --prefix=$HOME//myapps/tmux_depend
make && make install

# tmux
cd tmux-3.1
./configure CFLAGS="-I/my/path/tmux_depend/include -I/my/path/tmux_depend/include/ncurses" LDFLAGS="-L/my/path/tmux_depend/lib -L/my/path/tmux_depend/include/ncurses -L/my/path/tmux_depend/include" 
make
cp tmux $HOME/tmux_depend/bin
```
#### 3. 设置环境变量
此处以csh为例在个人用户目录下的.cshrc文件中添加如下环境变量
```
setenv PATH "$HOME/myapps/tmux_depend/bin:"$PATH
```
#### 4. 安装过程中出现的问题
启动tmux提示缺少动态链接库
在tmux_depend/bin目录下使用```ldd ./tmux```查找程序启动过程中依赖库的调用，若缺少的库文件在tmux_depend/lib目录下，可将该库动态链接到lib64目录下
```ln -s $HOME/myapps/tmux_depend/lib/libevent-2.1.so.7 /lib64```
或者在环境变量中增加动态链接库目录如下
```
setenv LD_LIBRARY_PATH $LD_LIBRARY_PATH":$HOME/myapps/tmux_depend/lib/"
```
## 使用
为了防止命令冲突，tmux 规定了一个命令前缀 `Ctrl + b`，要想向 tmux 发送命令，必须首先按一次 Ctrl 和 B 两个键。

### 创建及切换窗口

按命令前缀 `Ctrl + b` 后，再按 `c` 键即可创建新窗口（类似新开的 tab 页）。

按命令前缀 `Ctrl + b` 后，再按 0-9 数字键即可跳转到对应的窗口。

### 分屏、切换光标、删除分屏

#### 水平分屏 - 双引号

启动 tmux 后，按命令前缀 `Ctrl + b` 后，再按一次双引号 `"` 即可将当前屏幕分为上下两块。

#### 垂直分屏 - 百分号

启动 tmux 后，按命令前缀 `Ctrl + b` 后，再按一次百分号 `%` 即可将当前屏幕分为左右两块。

#### 切换光标

分屏后，通过方向键可以在不同分屏之间切换光标。记得每次切换前仍需要命令前缀 `Ctrl + b`。

#### 组合分屏

通过 tmux 分屏后，可以对某一个分屏再次进行分屏，从而得到上二下一、左一右二等各种样式的分屏。

#### 调整 pane 大小

按下命令前缀后，按住ctrl 然后用方向键改变分屏大小。注意不要松开 Ctrl。

#### 删除 pane

启动 tmux 后，按命令前缀 `Ctrl + b` 后，再按一次 `x` 即可将当前 pane 删除。

### 后台运行 tmux

按下命令前缀 `Ctrl + b` 后，再按一次 `d` 键，返回主 shell。此时 tmux 中的命令保持在运行状态。可以通过 `tmux ls` 命令查看后台运行的 tmux 客户端。

### 查看帮助

按下命令前缀 `Ctrl + b` 后，再按一次 `?` 键，可以查看 tmux 的帮助文档。

*   C-b t //显示时钟
*   C-b & // 确认后退出 tmux

### 启用鼠标操作
tmux在安装之后无法使用鼠标进行窗口的选择和历史信息的滚动查看，需要开启鼠标操作
`tmux set mouse on `

### 拷贝

按下命令前缀 `Ctrl + b` 后，再按一次 `[` 键进入拷贝模式。空格开始拷贝，回车结束拷贝。Ctrl + b后 ']'粘贴`[` 键退出拷贝模式。

### 其他用法
(1) 会话命令
| 命令 | 功能 |
| ------ | ------ |
|tmux new|创建默认名称的会话 |
|tmux new -s mysession　　|创建名为mysession的会话
|tmux ls　　|显示会话列表
|tmux a　　|连接上一个会话
|tmux a -t mysession　　|连接指定会话
|tmux rename -t s1 s2　　|重命名会话s1为s2
|tmux kill-session　　|关闭上次打开的会话
|tmux kill-session -t s1　　|关闭会话s1
|tmux kill-session -a -t s1　　|关闭除s1外的所有会话
|tmux kill-server　　|关闭所有会话
|tmux list-key　　|列出所有绑定的键，等同于prefix ?
|tmux list-command　　|列出所有命令
常用快捷键：prefix后按

s　　列出会话，可进行切换
$　　重命名会话
d　　分离当前会话
D　　分离指定会话
（2）窗口命令
常用快捷键：prefix后按
| 命令 | 功能 |
| ------ | ------ |
|c　　|创建一个新窗口
|,　　|重命名当前窗口
|w　　|列出所有窗口，可进行切换
|n　　|进入下一个窗口
|p　　|进入上一个窗口
|l　　|进入之前操作的窗口
|0~9　　|选择编号0~9对应的窗口
|.　　|修改当前窗口索引编号
|'　　|切换至指定编号（可大于9）的窗口
|f　　|根据显示的内容搜索窗格
|&　　|关闭当前窗口
（3）窗格命令
常用快捷键：prefix后按
| 命令 | 功能 |
| ------ | ------ |
|%　　|水平方向创建窗格
|"　　|垂直方向创建窗格
|Up/Down/Left/Right　　|根据箭头方向切换窗格
|q　　|显示窗格编号
|o　　|顺时针切换窗格
|\}　　|与下一个窗格交换位置
|\{　　|与上一个窗格交换位置
|x　　|关闭当前窗格
|space(空格键)　　|重新排列当前窗口下的所有窗格
|!　　|将当前窗格置于新窗口
|Ctrl+o　　|逆时针旋转当前窗口的窗格
|t　　|在当前窗格显示时间
|z　　|放大当前窗格(再次按下将还原)
|i　　|显示当前窗格信息
