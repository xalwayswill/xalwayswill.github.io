Reference:
1. https://www.cnblogs.com/shiningrise/archive/2012/02/21/2361889.html
* Linux变量说明
PATH这个变量包含了一系列由冒号分隔开的目录，系统就从这些目录里寻找可执行文件。如果你输入的可执行文件（例如ls、rc-update或者emerge）不在这些目录中，系统就无法执行它（除非你输入这个命令的完整路径，如/bin/ls）。
ROOTPATH这个变量的功能和PATH相同，但它只罗列出超级用户（root）键入命令时所需检查的目录。
LDPATH这个变量包含了一系列用冒号隔开的目录，动态链接器将在这些目录里查找库文件。
MANPATH这个变量包含了一系列用冒号隔开的目录，命令man会在这些目录里搜索man页面。
INFODIR这个变量包含了一系列用冒号隔开的目录，命令info将在这些目录里搜索info页面。
PAGER这个变量包含了浏览文件内容的程序的路径（例如less或者more）。
EDITOR这个变量包含了修改文件内容的程序（文件编辑器）的路径（比如nano或者vi）。
KDEDIRS这个变量包含了一系列用冒号隔开的目录，里面放的是KDE相关的资料。
CONFIG_PROTECT这个变量包含了一系列用空格隔开的目录，它们在更新的时候会被Portage保护起来。
CONFIG_PROTECT_MASK这个变量包含了一系列用空格隔开的目录，它们在更新的时候不会被Portage保护起来。
.cshrc
```
set user_cshrc="$HOME/.cshrc.$user"

#in the end
if (-r "${user_tcshrc}") then
      source "${user_tcshrc}"
endif
```
.cshrc.username
```
# $FreeBSD: releng/10.3/etc/root/dot.cshrc 243893 2012-12-05 13:56:39Z eadler $
#
# .cshrc - csh resource script, read at beginning of execution by each shell
#
# see also csh(1), environ(7).
# more examples available at /usr/share/examples/csh/
#

alias h     history 25
alias j     jobs -l
alias la	ls -aF
alias lf	ls -FA
alias ll	ls -lAF
alias cd    'chdir \!* && ls'
alias ..    'cd ..'
alias ...   'cd ../..'

# A righteous umask
umask 22

# depend on yourself
set path = (/sbin /bin /usr/sbin /usr/bin /usr/games /usr/local/sbin /usr/local/bin $HOME/bin $PATH) # don't forget the $path, and set path should before module load, otherwise the loaded tools will be overwritten

setenv	EDITOR	nano
setenv	PAGER	less
setenv	BLOCKSIZE	K

if ($?prompt) then
    # An interactive shell -- set some stuff up
    set     red="%{\033[1;31m%}"
    set   green="%{\033[0;32m%}"
    set  yellow="%{\033[1;33m%}"
    set    blue="%{\033[1;34m%}"
    set magenta="%{\033[1;35m%}"
    set    cyan="%{\033[1;36m%}"
    set   white="%{\033[0;37m%}"
    set     end="%{\033[0m%}" # This is needed at the end... :(

    set prompt="${white}%P${blue}[${magenta}%n${blue}@%m ${white}%~${blue}]${cyan}#${end} "
    #set prompt="\n%B%{\033[34m%}[%h] %d %D.%w.%Y %P\n%{\033[37m%}[%n]@[%m][%~]\n%{\033[30m%}%b" 
    #Above, a more fancy prompt than the original, for colors variations see comments 
    set promptchars = "%#"

    set filec
    set history = 1000
    set savehist = (1000 merge)
    set autolist = ambiguous
    # Use history to aid expansion
    set autoexpand
    set autorehash
    set mail = (/var/mail/$USER)
    if ( $?tcsh ) then
    	bindkey "^W" backward-delete-word
        bindkey -k up history-search-backward
        bindkey -k down history-search-forward
        #bindkey -k xxx beginning-of-line
        #bindkey -k xxx end-of-line
    endif

endif
setenv LS_COLORS 'no=00:fi=00:di=01;33:ln=01;36:pi=40;33:so=01;35:bd=40;33;01:cd=40;33;01:or=01;05;37;41:mi=01;05;37;41:ex=01;35:*.cmd=01;35:*.exe=01;35:*.com=01;35:*.btm=01;35:*.bat=01;35:*.sh=01;35:*.csh=01;35:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.gz=01;31:*.bz2=01;31:*.bz=01;31:*.tz=01;31:*.rpm=01;31:*.cpio=01;31:*.jpg=01;35:*.gif=01;35:*.bmp=01;35:*.xbm=01;35:*.xpm=01;35:*.png=01;35:*.tif=01;35:'
```


http://www.understudy.net/custom.html#C_shell
#修改shell提示符
提供了两种格式，需要注意bash与csh set语法的区别，实际shell中应用是两种方法，一种如上文cshrc中的方法，另外一种使用alias setprompt 的方法在cd的时候修改
```
# Add these lines to your ~/.cshrc.mine file on the linux grace machines...
# don't worry too much about what they mean.

# Colors!
set     red="%{\033[1;31m%}"
set   green="%{\033[0;32m%}"
set  yellow="%{\033[1;33m%}"
set    blue="%{\033[1;34m%}"
set magenta="%{\033[1;35m%}"
set    cyan="%{\033[1;36m%}"
set   white="%{\033[0;37m%}"
set     end="%{\033[0m%}" # This is needed at the end... :(

# Setting the actual prompt.  I made two separate versions for you to try, pick
# whichever one you like better, and change the colors as you want.  Just don't
# mess with the ${end} guy in either line...  Comment out or delete the prompt you don't use.

# Format1
alias setprompt 'set prompt "${white}%P${blue}[${magenta}%n${blue}@%m ${white}%~${blue}]${cyan}#${end} "'
# Format2
# set prompt="\n%B%{\033[34m%}[%h] %d %D.%w.%Y %P\n%{\033[37m%}[%n]@[%m][%~]\n%{\033[30m%}%b" 

# Clean up after ourselves...
# unset red green yellow blue magenta cyan yellow white end
```
