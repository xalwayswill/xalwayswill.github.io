Linux是一个多用户的操作系统。每个用户登录系统后，都会有一个专用的运行环境。通常每个用户默认的环境都是相同的，这个默认环境实际上就是一组环境 变量的定义。用户可以对自己的运行环境进行定制，其方法就是修改相应的系统**环境变量**。

**什么是**环境变量****

**环境变量**是一个具有特定名字的对象，它包含了一个或者多个应用程序所将使用到的信息。许多用户（特别是那些刚接触Linux的新手）发现这些变量有些怪异或者难以控制。其实，这是个误会：通过使用**环境变量**，你可以很容易的修改一个牵涉到一个或多个应用程序的配置信息。



**常见的环境变量**

 对于 PATH和HOME等**环境变量**大家都不陌生。

PATH 能够指定命令的搜索路径，
LD_LIBRARY_PATH 用于指定命令或者程序执行时搜索动态链接库的路径
经常看到有些变量如 LD_LIBRARY_PATH,LIBPATH,CLASSPATH等，他们之间有什么不同和关系？

除此之外，还有下面一些常见**环境变量**。

◆ HISTSIZE是指保存历史命令记录的条数。

◆ LOGNAME是指当前用户的登录名。

◆ HOSTNAME是指主机的名称，许多应用程序如果要用到主机名的话，通常是从这个**环境变量**中来取得的。

◆ SHELL是指当前用户用的是哪种Shell。

◆ LANG/LANGUGE是和语言相关的**环境变量**，使用多种语言的用户可以修改此**环境变量**。

◆ MAIL是指当前用户的邮件存放目录。

◆ PS1是基本提示符，对于root用户是#，对于普通用户是$。PS2是附属提示符，默认是“>”。可以通过修改此**环境变量**来修改当前的命令符，比 如下列命令会将提示符修改成字符串“Hello,My NewPrompt  ”。

`PS1=" Hello,My NewPrompt <wbr> "`

Hello,My NewPrompt



除了这些常见的**环境变量**，许多应用程序在安装时也会增加 一些**环境变量**，比如使用Java就要设置JAVA_HOME和CLASSPATH等，而安装五笔输入法会增加**环境变量**"XMODIFIERS=@im=fcitx"等。


**定制环境变量**

**环境变量**是和Shell紧密相关的，用户登录系统后就启动了一个Shell。对于Linux来说一般是bash，但也可以重新设 定或切换到其它的 Shell。**环境变量**是通过Shell命令来设置的，设置好的**环境变量**又可以被所有当前用户所运行的程序所使用。对于bash这个Shell程序来说，可 以通过变量名来访问相应的**环境变量**，通过export来设置**环境变量**。下面通过几个实例来说明。

##1. 显示**环境变量**HOME

 **echo** $HOME

/home/terry

##2. 设置一个新的**环境变量**WELCOME

**export** WELCOME="Hello!"

 echo $WELCOME

Hello!

##3. 使用**env**命令显示所有的**环境变量**

env

HOSTNAME=terry.mykms.org

PVM_RSH=/usr/bin/rsh

SHELL=/bin/bash

TERM=xterm

HISTSIZE=1000


##4. 使用**set**命令显示所有本地定义的Shell变量

set

BASH=/bin/bash

BASH_VERSINFO=([0]="2"[1]="05b"[2]="0"[3]="1"[4]="release"[5]="i386-redhat-linux-gnu")

BASH_VERSION='2.05b.0(1)-release'

COLORS=/etc/DIR_COLORS.xterm

COLUMNS=80

DIRSTACK=()

DISPLAY=:0.0


## 5. 使用**unset**命令来清除**环境变量**

set可以设置某个**环境变量**的值。清除**环境变量**的值用unset命令。如果未指定值，则该变量值将被 设为NULL。示例如下：
```

export TEST="Test..." #增加一个**环境变量**TEST

env | grep TEST #此命令有输入，证明**环境变量**TEST已经存在了

TEST=Test...

unset $TEST #删除**环境变量**TEST

env | grep TEST #此命令没有输出，证明**环境变量**TEST已经存在了
```

6. 使用**readonly**命令设置只读变量

如果使用了readonly命令的话，变量就不可以被修改或清除了。示例如下：
```

 $ export TEST="Test..." #增加一个**环境变量**TEST

$ readonly TEST #将**环境变量**TEST设为只读

 $ unset TEST #会发现此变量不能被删除

-bash: unset: TEST: cannot unset: readonly variable

$ TEST="New" #会发现此也变量不能被修改

-bash: TEST: readonly variable
```

7. 用**C程序**来访问和设置**环境变量**

对于C程序 的用户来说，可以使用下列三个函数来设置或访问一个**环境变量**。

◆ getenv()访问一个**环境变量**。输入参数是需要访问的变量名字，返回值是一个字符串。如果所访问的**环境变量**不存在，则会返回NULL。

◆ setenv()在程序里面设置某个**环境变量**的函数。

◆ unsetenv()清除某个特定的**环境变量**的函数。

 另外， 还有一个指针变量environ，它指向的是包含所有的**环境变量**的一个列表。下面的程序可以打印出当前运行环境里面的所有**环境变量**：
```

#include <stdio.h>

 extern char** environ;

 int main ()

{

char**var;

for (var =environ;*var !=NULL;++var)

  printf ("%s \n ",*var);

return 0;

}
```

还可以通过修改一些相关的环境定义文件来修改 **环境变量**，比如对于Red Hat等Linux发行版本，与环境相关的文件有/etc/profile和~/.bashrc等。修改完毕后重新登录一次就生效了。



**重要的例子**

下表罗列了一些Linux系统使用的变量并说明了它们的用处。在表格后面将列举一些变量例值。

```
变量 说明
PATH 这个变量包含了一系列由冒号分隔开的目录，系统shell就从这些目录里寻找可执行文件。
如果你输入的可执行文件（例如ls、rc-update或者emerge） 不在这些目录中，系统就无法执行它（除非你输入这个命令的完整路径，如/bin/ls）。
ROOTPATH 这个变量的功能和PATH相同，但它只罗列出超级用户（root）键入命令时所需检查的目录。
LDPATH 这个变量包含了一系列用冒号隔开的目录，动态链接器将在这些目录里查找库文件。
MANPATH 这个变量包含了一系列用冒号隔开的目录，命令man会在这些目录里搜索man页面。 <wbr>
INFODIR 这个变量包含了一系列用冒号隔开的目录，命令info将在这些目录里搜索info页面。 <wbr>
PAGER 这个变量包含了浏览文件内容的程序的路径（例如less或者more）。 <wbr>
EDITOR 这个变量包含了修改文件内容的程序（文件编辑器）的路径（比如nano或者vi）。 <wbr>
KDEDIRS 这个变量包含了一系列用冒号隔开的目录，里面放的是KDE相关的资料。
CONFIG_PROTECT 这个变量包含了一系列用空格隔开的目录，它们在更新的时候会被Portage保护起来。
CONFIG_PROTECT_MASK 这个变量包含了一系列用空格隔开的目录，它们在更新的时候不会被Portage保护起来。
HOME：当前用户主目录
MAIL：是指当前用户的邮件存放目录。
SHELL：是指当前用户用的是哪种Shell。
HISTSIZE：是指保存历史命令记录的条数
LOGNAME：是指当前用户的登录名。
HOSTNAME：是指主机的名称，许多应用程序如果要用到主机名的话，通常是从这个**环境变量**中来取得的。
LANG/LANGUGE：是和语言相关的**环境变量**，使用多种语言的用户可以修改此**环境变量**。
PS1：是基本提示符，对于root用户是#，对于普通用户是$。
PS2：是附属提示符，默认是“>”。可以通过修改此**环境变量**来修改当前的命令符，比如下列命令会将提示符修改成字符串“Hello,My NewPrompt :) ”。
PS1=" Hello,My NewPrompt :) "
```

**对于 bash shell**

**关于**环境变量**命令介绍：** 1.echo 显示某个**环境变量**值 echo $PATH
2.export 设置一个新的**环境变量** export HELLO="hello" (可以无引号)
3.env 显示所有**环境变量**
4.set 显示本地定义的shell变量
5.unset 清除**环境变量** unset HELLO
6.readonly 设置只读**环境变量** readonly HELLO



使用修改.bashrc文件进行**环境变量**的编辑，只对当前用户有用。

使用修改 /etc/profile 文件进行**环境变量**的编辑，是对所有用户有用。大家一定要注意区别。
