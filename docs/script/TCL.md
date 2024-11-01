### 特点
* 语法简单
* 代码紧凑，便于维护
* 任何东西都是一条命令。包括if和for
* 所有数据类型都可以看作字符串
### 变量
变量赋值 `set a 10`
变量替换 `set $k +10`
命令替换 `set a [expr $k +10]`
反斜杠替换，即转义
* 数组
```
set animal(name) dog
set animal(name) cat
```
其中animal是数组名，name是元素名
* 多维数组
```
set matrix(1,1) 10
set matrix(1,2) 20
set i 1; set j 2
set cell $matrix($i,$j)
``` 
* 查询数组元素
array size 返回数组元素的个数
array name 返回数组元素列表
* incr 和 append
```
set a 22
incr a 10 ;# a = 32
```
append 将文本添加到一个变量的结尾

### 表达式
![](TCL.assets\23495115-1d2bb051eba0ce21.png)
![](TCL.assets\23495115-258a68cc251c22fd.png)
* string 命令
![](TCL.assets\23495115-0a6f4b9272a8d0d9.png)
![](TCL.assets\23495115-5f044fba03ef44d2.png)
![](TCL.assets\23495115-0216bc3b3fa44806.png)
![](TCL.assets\23495115-1602c9219556c702.png)
![](TCL.assets\23495115-471379c912ecced3.png)

* regexp命令
![](TCL.assets\23495115-972af5f632843fd1.png)
![](TCL.assets\23495115-a1edc2d0a7138d04.png)

### 列表
* lindex命令
![](TCL.assets\23495115-148e7666c8e84694.png)
* llength命令
返回列表中元素的个数
![](TCL.assets\23495115-5f5419cb8dd1c334.png)
![](TCL.assets\23495115-edc8bdd668fd70e0.png)
![](TCL.assets\23495115-c50810c10493cb90.png)
![](TCL.assets\23495115-9e253364bd0c17dd.png)

### 字典
![](TCL.assets\23495115-eb9500638a0e540f.png)
![](TCL.assets\23495115-19bc3ce254a72d86.png)
![](TCL.assets\23495115-150947b890e7291a.png)
![](TCL.assets\23495115-adbb9aec636f72e1.png)
![](TCL.assets\23495115-11cf3279a8af93e9.png)
![](TCL.assets\23495115-ccf990d4f4a44339.png)

### 流程控制
* if
```
if {$x < 0} {
  set x 0
}

if {$x < 0} {
} elseif {}{
} else {
}
```
* switch
```
switch $x {a {incr t1} b {incr t2} c{incr t3}}

switch -regexp -- $i {
  a           {incr t1}
  ^[0-9]    {incr t2}
  default  {incr t3}
}
```
* while
```
set b ()
set i [expr {[llength $a] -1 }]
while {$i >= 0} {
  lappend b {lindex $a $i}
  incr i -1
}
```
* for
```
for {set i 10} {$i < 15} {incr i} {
+ echo $i
+ }
```
* foreach
```
foreach {x y} {a b c d} {
  puts "<$x><$y>"
}
```
* break & continue
与c一样

* eval
用于创建和运行tcl脚本的通用构造模块

### 过程
* proc return
```
proc plus {a b} {
  set c [expr $a + $b]
  return $c
}
```

### 访问文件
* file join
返回unix样式的文件路径
* file split
* file dirname
* file extension
* file rootname
* pwd
* cd
* glob
获取一个或多个模式参数，返回与这些模式匹配的文件列表
* file mkdir
* file delete
* file copy
* file rename
### 基本I/O
```
set f [open info.rpt r]
while {[gets $f line] >= 0} {
  puts $line
}
close $f

set f [open info.rpt w]
puts $ff "aaa"
close $f
```

### 注释
使用`#`进行注释，在命令行后面添加注释时一定要用`;#`,不然注释会被当作命令
