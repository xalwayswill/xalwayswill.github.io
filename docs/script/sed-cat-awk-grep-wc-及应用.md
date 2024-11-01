下述参数并不完全，详细可通过 cmd --help查看
# [cat](https://www.runoob.com/linux/linux-comm-cat.html)
cat\(英文全拼：concatenate\)命令用于连接文件并打印到标准输出设备上。
* 语法格式
`cat [-AbeEnstTuv] [--help] [--version] fileName`
* 参数说明：
-n 或 --number：由 1 开始对所有输出的行数编号。
-b 或 --number-nonblank：和 -n 相似，只不过对于空白行不编号。
-s 或 --squeeze-blank：当遇到有连续两行以上的空白行，就代换为一行的空白行。
-v 或 --show-nonprinting：使用 ^ 和 M- 符号，除了 LFD 和 TAB 之外。
-E 或 --show-ends : 在每行结束处显示 $。
-T 或 --show-tabs: 将 TAB 字符显示为 ^I。
-A, --show-all：等价于 -vET。
-e：等价于"-vE"选项；
-t：等价于"-vT"选项；


# [sed](https://www.runoob.com/linux/linux-comm-sed.html)
Linux sed 命令是利用脚本来处理文本文件。
sed 可依照脚本的指令来处理、编辑文本文件。
Sed 主要用来自动编辑一个或多个文件、简化对文件的反复操作、编写转换程序等。
* 语法
`sed [-hnV][-e<script>][-f<script文件>][文本文件]`
* 参数说明：
```
-e<script>或--expression=<script> 以选项中指定的script来处理输入的文本文件。
-f<script文件>或--file=<script文件> 以选项中指定的script文件来处理输入的文本文件。
-h或--help 显示帮助。
-n或--quiet或--silent 仅显示script处理后的结果。
-V或--version 显示版本信息。
* 动作说明：
a ：新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～
c ：取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！
d ：删除，因为是删除啊，所以 d 后面通常不接任何东东；
i ：插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；
p ：打印，亦即将某个选择的数据印出。通常 p 会与参数 sed -n 一起运行～
s ：取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 1,20s/old/new/g 就是啦！
```
sed -i 可以直接修改文件内容

# [awk](https://www.runoob.com/linux/linux-comm-awk.html)
[awk 命令详解](https://www.cnblogs.com/ggjucheng/archive/2013/01/13/2858470.html)
[The GNU Awk User’s Guide](https://www.gnu.org/software/gawk/manual/gawk.html)
[shell编程之awk命令详解](https://tianchi.aliyun.com/forum/postDetail?postId=33368)
[The_AWK_Programming_Language](https://github.com/wuzhouhui/awk)
AWK 是一种处理文本文件的语言，是一个强大的文本分析工具。
之所以叫 AWK 是因为其取了三位创始人 Alfred Aho，Peter Weinberger, 和 Brian Kernighan 的 Family Name 的首字符。
* **语法**
`awk [选项参数] 'script' var=value file(s)`
或
`awk [选项参数] -f scriptfile var=value file(s)`
* **参数说明：**
-F fs or --field-separator fs
指定输入文件折分隔符，fs是一个字符串或者是一个正则表达式，如-F:。
-v var=value or --asign var=value
赋值一个用户定义变量。
-f scripfile or --file scriptfile
从脚本文件中读取awk命令。
-mf nnn and -mr nnn
对nnn值设置内在限制，-mf选项限制分配给nnn的最大块数目；-mr选项限制记录的最大数目。这两个功能是Bell实验室版awk的扩展功能，在标准awk中不适用。
-W compact or --compat, -W traditional or --traditional
在兼容模式下运行awk。所以gawk的行为和标准的awk完全一样，所有的awk扩展都被忽略。
-W copyleft or --copyleft, -W copyright or --copyright
打印简短的版权信息。
-W help or --help, -W usage or --usage
打印全部awk选项和每个选项的简短说明。
-W lint or --lint
打印不能向传统unix平台移植的结构的警告。
-W lint-old or --lint-old
打印关于不能向传统unix平台移植的结构的警告。
-W posix
打开兼容模式。但有以下限制，不识别：/x、函数关键字、func、换码序列以及当fs是一个空格时，将新行作为一个域分隔符；操作符**和**=不能代替^和^=；fflush无效。
-W re-interval or --re-inerval
允许间隔正则表达式的使用，参考(grep中的Posix字符类)，如括号表达式[[:alpha:]]。
-W source program-text or --source program-text
使用program-text作为源代码，可与-f命令混用。
-W version or --version
打印bug报告信息的版本。

* **awk命令形式：**
`awk [-F|-f|-v] ‘BEGIN{} //{command1; command2} END{}’ file`
 [-F|-f|-v]   大参数，-F指定分隔符，-f调用脚本，-v定义变量 var=value
'  '          引用代码块（**注意单引号**）
BEGIN   初始化代码块，在对每一行进行处理之前，初始化代码，主要是引用全局变量，设置FS分隔符
//           匹配代码块，可以是字符串或正则表达式
{}           命令代码块，包含一条或多条命令
；          多条命令使用分号分隔
END      结尾代码块，在对每一行进行处理之后再执行的代码块，主要是进行最终计算或输出结尾摘要信息
* **特殊要点:**
$0           表示整个当前行
$1           每行第一个字段
NF          字段数量变量
NR          每行的记录号，多文件记录递增
FNR        与NR类似，不过多文件记录不递增，每个文件都从1开始
\t            制表符
\n           换行符
FS          BEGIN时定义分隔符
RS       输入的记录分隔符， 默认为换行符(即文本是按一行一行输入)
~            匹配，与==相比不是精确比较
!~           不匹配，不精确比较
==         等于，必须全部相等，精确比较
!=           不等于，精确比较
&&　     逻辑与
||             逻辑或
\+            匹配时表示1个或1个以上
/[0-9][0-9]+/   两个或两个以上数字
/[0-9][0-9]*/    一个或一个以上数字
FILENAME 文件名
OFS      输出字段分隔符， 默认也是空格，可以改为制表符等
ORS        输出的记录分隔符，默认为换行符,即处理结果也是一行一行输出到屏幕
-F'[:#/]'   定义三个分隔符

* **print & $0**
print 是awk打印指定内容的主要命令

* **match**
内置match函数可进行正则表达式的匹配
```
awk '{print}'  /etc/passwd   ==   awk '{print $0}'  /etc/passwd  
awk '{print " "}' /etc/passwd                                           //不输出passwd的内容，而是输出相同个数的空行，进一步解释了awk是一行一行处理文本
awk '{print "a"}'   /etc/passwd                                        //输出相同个数的a行，一行只有一个a字母
awk -F":" '{print $1}'  /etc/passwd 
awk -F: '{print $1; print $2}'   /etc/passwd                   //将每一行的前二个字段，分行输出，进一步理解一行一行处理文本
awk  -F: '{print $1,$3,$6}' OFS="\t" /etc/passwd        //输出字段1,3,6，以制表符作为分隔符
awk '$0 ~/pattern/ {print $0}'  //正则表达式匹配整行
```

# [grep](https://www.runoob.com/linux/linux-comm-grep.html)
Linux grep 命令用于查找文件里符合条件的字符串。
grep 指令用于查找内容包含指定的范本样式的文件，如果发现某文件的内容符合所指定的范本样式，预设 grep 指令会把含有范本样式的那一列显示出来。若不指定任何文件名称，或是所给予的文件名为 -，则 grep 指令会从标准输入设备读取数据。
* 语法
`grep [-abcEFGhHilLnqrsvVwxy][-A<显示行数>][-B<显示列数>][-C<显示列数>][-d<进行动作>][-e<范本样式>][-f<范本文件>][--help][范本样式][文件或目录...]`
* 参数：
```
-a 或 --text : 不要忽略二进制的数据。
-A<显示行数> 或 --after-context=<显示行数> : 除了显示符合范本样式的那一列之外，并显示该行之后的内容。
-b 或 --byte-offset : 在显示符合样式的那一行之前，标示出该行第一个字符的编号。
-B<显示行数> 或 --before-context=<显示行数> : 除了显示符合样式的那一行之外，并显示该行之前的内容。
-c 或 --count : 计算符合样式的列数。
-C<显示行数> 或 --context=<显示行数>或-<显示行数> : 除了显示符合样式的那一行之外，并显示该行之前后的内容。
-d <动作> 或 --directories=<动作> : 当指定要查找的是目录而非文件时，必须使用这项参数，否则grep指令将回报信息并停止动作。
-e<范本样式> 或 --regexp=<范本样式> : 指定字符串做为查找文件内容的样式。
-E 或 --extended-regexp : 将样式为延伸的正则表达式来使用。
-f<规则文件> 或 --file=<规则文件> : 指定规则文件，其内容含有一个或多个规则样式，让grep查找符合规则条件的文件内容，格式为每行一个规则样式。
-F 或 --fixed-regexp : 将样式视为固定字符串的列表。
-G 或 --basic-regexp : 将样式视为普通的表示法来使用。
-h 或 --no-filename : 在显示符合样式的那一行之前，不标示该行所属的文件名称。
-H 或 --with-filename : 在显示符合样式的那一行之前，表示该行所属的文件名称。
-i 或 --ignore-case : 忽略字符大小写的差别。
-l 或 --file-with-matches : 列出文件内容符合指定的样式的文件名称。
-L 或 --files-without-match : 列出文件内容不符合指定的样式的文件名称。
-n 或 --line-number : 在显示符合样式的那一行之前，标示出该行的列数编号。
-o 或 --only-matching : 只显示匹配PATTERN 部分。
-q 或 --quiet或--silent : 不显示任何信息。
-r 或 --recursive : 此参数的效果和指定"-d recurse"参数相同。
-s 或 --no-messages : 不显示错误信息。
-v 或 --invert-match : 显示不包含匹配文本的所有行。
-V 或 --version : 显示版本信息。
-w 或 --word-regexp : 只显示全字符合的列。
-x --line-regexp : 只显示全列符合的列。
-y : 此参数的效果和指定"-i"参数相同。
-P --perl-regexp         PATTERN is a Perl regular expression
```
# [WC](https://www.runoob.com/linux/linux-comm-wc.html)
Linux wc命令用于计算字数。
利用wc指令我们可以计算文件的Byte数、字数、或是列数，若不指定文件名称、或是所给予的文件名为"-"，则wc指令会从标准输入设备读取数据。

* 语法
wc [-clw][--help][--version][文件...]
* 参数：
-c或--bytes或--chars 只显示Bytes数。
-l或--lines 显示行数。
-w或--words 只显示字数。
--help 在线帮助。
--version 显示版本信息。

#应用举例
* log抓取
通过sed 和 awk抓取log
例如抓取log中Warning信息
`awk '{if ($1=="Warning") {print $0; getline; while (($1==":")||($1=="Warning")) {print $0; if(getline<=0) {exit};};}}' test.log`
通过正则表达式抓取Warning
`awk '{if (match($1, "Warning.*")) {print $0; getline; while (match($1,"Warning.*|:")) {print $0; if(getline<=0) {exit};};}}' test.log`
通过正则表达式抓取指定类型的Warning，例如LBR类型
`awk '{if (match($1, "Warning.*")&&match($NF,".*LBR.*")) {print $0; getline; while (match($1,":")||(match($1, "Warning.*")&&match($NF,".*LBR.*"))) {print $0; if(getline<=0) {exit};};}}' LINLON_ISP_TOP.i31_1202.gs_syn.log > warning.log`
模糊匹配
grep -o "keyword" filename |wc -l
精确匹配
grep -wo "keyword" filename |wc -l
 
* 统计关键词
包含关键字的行数（一行存在多个关键字，计数1）
grep -c "keyword" filename
