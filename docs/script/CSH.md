### Reference
* [Wike C shell](https://en.wikipedia.org/wiki/C_shell)
* Zoulas, Christos (24 November 2016). ["tcsh-6.20.00 is now available!"](https://web.archive.org/web/20161125044614/http://mx.gw.com/pipermail/tcsh/2016-November/005021.html#). *mx.gw.com*. Archived from [the original](http://mx.gw.com/pipermail/tcsh/2016-November/005021.html) on 25 November 2016. Retrieved 24 November 2016.
* [*An Introduction to the C shell*](http://www.kitebird.com/csh-tcsh-book/csh-intro.pdf) by [Bill Joy](https://en.wikipedia.org/wiki/Bill_Joy "Bill Joy").
* [An Introduction to the C shell](https://docs-legacy.freebsd.org/44doc/usd/04.csh/paper.pdf)
* [[Cshell]Cshell基本語法 --- 從入門到精通](https://blog.csdn.net/gsjthxy/article/details/88363489?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165763221916782350814087%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165763221916782350814087&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-4-88363489-null-null.142%5Ev32%5Eexperiment_2_v1,185%5Ev2%5Econtrol&utm_term=C%20shell&spm=1018.2226.3001.4187&login=from_csdn)

### 算数运算
```
# C shell groups from the right
@ i = 10 / 5 * 2
echo $i # prints 1
@ i = 7 - 4 + 2
echo $i # prints 1
@ i = ( 2 >> 1 << 4 )
echo $i # prints 0
```
### 数组
定义数组myarr, 通过`$myarr[index]`来访问数组中的值，注意**index是从1开始的**。通过`$myarr`或`$myarr[*]`来访问数组所有的元素。通过`$#myarr`来查看元素的个数。
```
set myarr = (str1 str2 str3) ##初始化數組，各個Value之間用空格隔開
 
echo $myarr[2]    # echo $myarr  echo $myarr[*] 
 
foreach obj ($myarr)
  echo $obj
end
 
set array = (2 3 4 5 6)
set cnt   = 4
 
foreach obj ($array)
  if($obj >= $cnt) then
    echo "check pass!"
  else
    echo "check fail!"
  endif
```
### 命令行参数
通过`$argv[1]`，`$argv[2]`或`$1`，`$2`来访问命令行参数。命令行参数的个数为`$#argv`。

### 判断
```
#!/bin/csh
if ( $days > 365 ) then
   echo This is over a year.
endif
if (expr) then
   . . .
else if (expr2) then
   . . .
else
   . . .
endif
```
```
switch("$value")
 
  case pattern1: 
                commands1  
                breaksw
 
  case pattern2: 
                commands2  
                breaksw
 
  default: 
                commands  
                breaksw
endsw
```

### 循环
语法
语法如下：

while(condition) command1 command2 end
csh Shellwhile循环示例
csh while循环：
```
#!/bin/csh
set i = 2
set j = 1
while ( $j <= 10 )
   echo '2 **' $j = $i
   @ i *= 2
   @ j++
end
```
csh foreach循环示例
```
#!/bin/csh
foreach i ( d* )
   switch ( $i )
      case d?:
         echo $i is short
         breaksw
      default:
         echo $i is long
   endsw
end
```
对foreach使用通配符：
```
#!/bin/csh
foreach i (*)
        if (-f $i) then
            echo "$i is a file."
        endif
        if (-d $i) then
             echo "$i is a directory."
        endif
end
```
