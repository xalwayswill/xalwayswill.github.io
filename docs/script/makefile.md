##常用函数
* addprefix
函数功能：为“NAMES…”中的每一个文件名添加前缀“PREFIX”。参数“NAMES…”是空格分割的文件名序列，将“SUFFIX”添加到此序列的每一个文件名之前。
返回值：以单空格分割的添加了前缀“PREFIX”的文件名序列。
示例：`$(addprefix src/,foo bar)`
返回值: `“src/foo src/bar”`。
* 不同赋值
= 是最基本的赋值
:= 是覆盖之前的值
?= 是如果没有被赋值过就赋予等号后面的值
+= 是添加等号后面的值
* 产生随机数
通过调用python的方式
`PARAMETER := $(shell python -c "from random import randint; print randint(0,10)")` 
`SEED = $(shell date +%N)`
* .PHONY all clean
主要作用是如果不加.PHONY的话make时候如果目录里面有跟命令一样的文件名，就不会执行命令
https://www.cnblogs.com/idorax/p/9306528.html
