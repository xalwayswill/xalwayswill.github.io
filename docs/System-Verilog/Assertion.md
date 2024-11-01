【转载】[SystemVerilog - 断言Assertion语法简单介绍](https://www.cnblogs.com/gujiangtaoFuture/articles/10321384.html)
### Reference
[SVA: The Power of Assertions in SystemVerilog](https://www.pdfdrive.com/systemverilog-assertions-and-functional-coverage-d33631297.html)
SystemVerilog Assertions and Functional Coverage
**https://blog.csdn.net/zhajio/article/details/80047924**
https://blog.csdn.net/bleauchat/article/details/90415146
https://www.cnblogs.com/littleMa/p/5832111.html
https://www.bilibili.com/read/cv12116755
https://zhuanlan.zhihu.com/p/439261818
[assume，用于EDA验证为断言，用于Formal验证为约束](https://cloud.tencent.com/developer/article/1802185)

![](Assertion.assets\23495115-f7959f52ffd754fa.png)


## 断言分类：

### 　　1、即时断言：

　　  即时断言基于事件的变化，表达式的计算就像Verilog中的组合逻辑赋值一样，是立即被求值的，而不是时序相关的。
```
always_comb
    immi_a: assert (a && b); 
```
![](Assertion.assets\23495115-d02b938d35cc1c79.png)

### 　　2、并发断言：

　　并发断言的计算基于时钟周期，在时钟边沿根据变量的采样值计算表达式。进行时序检查时，通常使用并发断言，而很少使用即时断言。
![](Assertion.assets\23495115-592d0bcdf0f119b8.png)


![](Assertion.assets\23495115-848e61db7f56feae.png)
从上述断言的构建流程可以看出，即时断言跟并发断言在语法结构上最显著的区别在于，即时断言不存在于property，而并发断言构建的过程中依赖于property。 作者：IC修真院 

　　SVA提供了3个内嵌函数，用于检查信号的边沿变化。

![](Assertion.assets\23495115-85dd9e8fe8c372d9.png)


```
sequence rose_s;
    @(posedge sclk) $rose(a);
endsequence

sequence fell_s;
　　@(posedge sclk) $fell(a);
endsequence

sequence stable_s;
    @(posedge sclk) $stable(a);
endsequence
```

上面的sequence会在每个sclk上升边沿检查断言，虽然这些断言是良性的，但它会在一段时间内产生大量的错误信息。

为了避免这种错误的产生，**SVA提供了“蕴含”操作符（implication，|->）**。其形式为：a |-> b，

当先行算子匹配（成功）时，后序算子才能被计算。如果先行算子不成功，那么整个属性就被默认成功，

蕴含操作符分为两类：**交叠蕴含操作符（overlapped implication，|->）**表示如果先行算子匹配，后序算子在**同一个时钟周期**开始计算。

和**非交叠蕴含操作符（non_overlapped implication，|=>）**如果先行算子匹配，后序算子在**下一个时钟周期**开始计算。

序列的重复操作符分为3类：

**连续重复**：a[*3]”表示a被连续重复3次，“a[*1:3]”表示a被连续重复1～3次。连续重复的相邻两次重复之间只有一个时钟间隔。

**跳转重复**：a[->3]”表示a被跳转重复3次，“a[->1:3]”表示a被跳转重复1～3次。跳转重复的相邻两次重复之间可以有任意时钟间隔。

**非连续重复**：a[=3]”表示a被非连续重复3次，“a[=1:3]”表示a被非连续重复1～3次。非连续重复的相邻两次重复之间有任意多个时钟间隔。最后一次也可以有任意时间间隔

## 断言应用：
断言assertion被放在verilog设计中，方便在仿真时查看异常情况。当异常出现时，断言会报警。一般在数字电路设计中都要加入断言，断言占整个设计的比例应不少于30%。以下是断言的语法：

1. SVA的插入位置：在一个.v文件中：
```
module ABC ();
 rtl 代码
 SVA断言
endmodule
 ```
   注意：不要将SVA写在enmodule外面。
 
2. 断言编写的一般格式是：
   【例】
``` 
断言名称1：assert property(事件1)       //没有分号
          display("........",time);             //有分号
          else
          display("........",time);             //有分号
 
断言名称2：assert property(事件2)
          display("........",time);
          else
          display("........",time);
 ```
   断言的目的是：断定“事件1”和“事件2”会发生，如果发生了，就记录为pass，如果没发生，就记录为fail。注意：上例中没有if，只有else，断言本身就充当if的作用。
 
   上例中，事件1和事件2可以用两种方式来写：
   (1) 序列块： sequence name;
                      。。。。。。。。。; 
                endsequence
 
   (2) 属性块： property name;
                      。。。。。。。。。;
                endsequence
 
从定义来讲，sequence块用于定义一个事件（砖），而property块用于将事件组织起来，形成更复杂的一个过程（楼）。sequence块的内容不能为空，你写乱字符都行，但不能什么都没有。sequence也可以包含另一个sequence, 如：
```
sequence s1;
     s2(a,b);
endsequence  //s1和s2都是sequence块
 ```
    sequence块和property块都有name，使用assert调用时都是：“assert property(name);”
    在SVA中，sequence块一般用来定义组合逻辑断言，而property一般用来定义一个有时间观念的断言，它会常常调用sequence，一些时序操作如“|->”只能用于property就是这个原因。
     
   注：以下介绍的SVA语法，既可以写在sequence中，也可以写在property中，语法是通用的。
 
3. 带参数的property、带参数的sequence
   property也可以带参数，参数可以是事件或信号，调用时写成：assert property (p1(a,b))
   被主sequence调用的从sequence也能带参数，例如从sequence名字叫s2，主sequence名字叫s1:
```
sequence s1;
    s2(a,b);
endsequence
 ```
4. property内部可以定义局部变量，像正常的程序一样。
```
property p1;
   int cnt;
   .....................
endproperty
 ```
【注】在介绍语法之前，先强调写断言的一般格式：
    一般，断言是基于时序逻辑的，单纯进行组合逻辑的断言很少见，因为太费内存（时序逻辑是每个时钟周期判断一次，而组合逻辑却是每个时钟周期内判断多次，内存吃不消）。
    因此，写断言的一般规则是： time + event，要断定发生什么event，首先要指定发生event的时间，例如
每个时钟上升沿 + 发生某事
                某信号下降时 + 发生某事
 
5. 语法1：信号（或事件）间的“组合逻辑”关系：
   (1) 常见的有：&&, ||, !, ^
   (2) a和b哪个成立都行，但如果都成立，就认为是a成立：firstmatch(a||b)，与“||”基本相同，不同点是当a和b都成立时，认为a成立。
   (3) a ? b:c ———— a事件成功后，触发b，a不成功则触发c
 
6. 语法2：在“时序逻辑”中判断独立的一根信号的行为：
    @ (posedge clk) A事件; ———— 当clk上升沿时，如果发生A事件，断言将报警。
   边沿触发内置函数：(假设存在一个信号a)
     $rose( a );———— 信号上升
     $fell( a );———— 信号下降
     $stable( a );———— 信号值不变
 
7. 语法3：在“时序逻辑”中判断多个事件/信号的行为关系：
```
   (1) intersect(a,b)———— 断定a和b两个事件同时产生，且同时结束。
   (2) a within b    ———— 断定b事件发生的时间段里包含a事件发生的时间段。
   (3) a ##2 b       ———— 断定a事件发生后2个单位时间内b事件一定会发生。
       a ##[1:3] b   ———— 断定a事件发生后1~3个单位时间内b事件一定会发生。
       a ##[3:$] b   ———— 断定a事件发生后3个周期时间后b事件一定会发生。
   (4) c throughout (a ##2 b)    ———— 断定在a事件成立到b事件成立的过程中，c事件“一直”成立。
   (5) @ (posedge clk) a |-> b   ———— 断定clk上升沿后，a事件“开始发生”，同时，b事件发生。
   (6) @ (posedge clk) a.end |-> b ———— 断定clk上升沿后，a事件执行了一段时间“结束”后，同时，b事件发生。
```
   注："a |-> b" 在逻辑上是一个判断句式，即：
                    if a
                       b;
                    else
                       succeed;
 
   因此，一旦 a 发生，b 必须发生，断言才成功。如果a没发生，走else，同样成功。    
 ```
   (7) @ (posedge clk) a |=> b   ———— 断定clk上升沿后，a事件开始发生，下一个时钟沿后，b事件开始发生。      
   (8) @ (posedge clk) a |=>##2b ———— 断定clk上升沿后，a事件开始发生，下三个时钟沿后，b事件开始发生。
   (9) @ (posedge clk) $past(a,2) == 1'b1 ———— 断定a信号在2个时钟周期“以前”，其电平值是1。
   (10) @ (posedge clk) a [*3] ———— 断定“@ (posedge clk) a”在连续3个时钟周期内都成立。
        @ (posedge clk) a [*1:3] ———— 断定“@ (posedge clk) a”在连续1~3个时钟周期内都成立。
        @ (posedge clk) a [->3] ———— 断定“@ (posedge clk) a”在非连续的3个时钟周期内都成立。
 ```
   举一个复杂点的例子：
```
property ABC;
    int tmp;
    @(posedge clk) ($rose(a),tmp = b) |-> ##4 (c == (tmp*tmp+1)) ##3 d[*3];
endproperty 
 ```  
上例的一个property说明：当clk上升沿时，断言开始。首先断定信号a由低变高，将此时的信号b的值赋给变量tmp，4个时钟周期后，断定信号c的值是4个周期前b^2+1，再过3个周期，断定信号d一定会起来，再过3个周期，信号d又起来一次。。。。。。。只有这些断定都成功，该句断言成功。otherwise，信号a从一开始就没起来，则断言也成功。
 
8. 语法4：多时钟域联合断言：一句断言可以表示多个时钟域的信号关系，例如：
                @ （posedge clk1） a |-> ##1 @ (posedge clk2) b
   当clk1上升沿时，事件a发生，紧接着如果过来第二个时钟clk2的上升沿，则b发生。“##1”在跨时钟时不表示一个时钟周期，只表示等待最近的一个跨时钟事件。所以此处不能写成##2或其他。但是可以写成：
                @ （posedge clk1） a |=> @ (posedge clk2) b
 
9. 语法5：总线的断言函数
   总线就是好多根bit线，共同表示一个数。SVA提供了多bit状态一起判断的函数，即总线断言函数：
```
   (1) $onehot(BUS)      ————BUS中有且仅有1 bit是高，其他是低。
   (2) $onehot0(BUS)     ————BUS中有不超过1 bit是高，也允许全0。
   (3) $isunknown(BUS)   ————BUS中存在高阻态或未知态。
   (4) countones(BUS)==n ————BUS中有且仅有n bits是高，其他是低。
 ```
10. 语法6：屏蔽不定态
    当信号被断言时，如果信号是未复位的不定态，不管怎么断言，都会报告：“断言失败”，为了在不定态不报告问题，在断言时可以屏蔽。
    如：
``` 
@(posedge clk) (q == $past(d))，当未复位时报错，屏蔽方法是将该句改写为：
@(posedge clk) disable iff (!rst_n) (q == $past(d))  //rst是低电平有效
 ```
10. 语法6：断言覆盖率检测：
name: cover property (func_name)
 
11. 在modelsim中开启断言编译和显示功能：
    （1）【编译verilog代码时按照system verilog进行编译】  vlog -sv abc.v
    （2）【仿真命令加一个-assertdebug】   vsim -assertdebug -novopt testbench
    （3）【如果想看断言成功与否的分析，使用打开断言窗口的命令】 view assertions
 
12. 在VCS中加入断言编译和显示功能：
    在fsdb文件中加一句话：`$fsdbDumpSVA`
    在VCS编译参数：system "vcs $VCS_SIMULATION" 中加入一些options:
           -assert enable_diag\
           -assert vpiSeqBeginTime\
           -assert vpiSeqFail\
           -assert report=路径\
           -assert finish_maxfail=100
 
***********************************************************************************************
【经验】以下是一些编写断言的经验：
1. 断言的目的：传统的验证方法是通过加激励，观察输出。这种方法对案例的依赖严重，案例设计不好，问题不便于暴露。而断言是伴随RTL代码的，不依赖测试案例，而是相对“静态”。例如：我们要测试一个串行数据读写单元，数据线只有一根，先传四位地址，再传数据。
（1）案例验证法：写一个地址，再写一段数据，然后读取该地址，看输出的是不是刚才写的数据。
（2）断言法：不需要专门设计地址和数据，当发起写时，在地址传输的时间里将地址存储到一个变量里，在数据传输的时间里将数据存储到一个变量里，观察RAM中该地址是否存在该数据就可以了。
    断言设计相当于在电脑上把RTL实现的功能再实现一遍。
 
2. 断言中可以包含function和task。而且function经常用于断言，因为有的处理很复杂，而断言又是“一句式”的，无法分成好几句进行表达，所以需要function替断言分担工作。
 
3. 断言允许规定同时发生的事件，就是组合逻辑，你可以写成：a && b，也可以写成 a ##0 b，不能写 ##0.5，不支持小数。
 
4. 断言是用电脑模仿RTL的运行过程，当RTL功能复杂时，你必须用到变量。断言中支持C语言的int和数组声明，但在赋值时“不能”写成：##4 var = Signal，其中var是断言中的变量，和RTL无关，Signal是RTL中的一个信号。本句是想在第4周期将Signal的值赋给var，以便在后面使用该值。但本句只有变量赋值，没有对RTL信号的任何断言，就会报错，解决方法是：##4 (“废话”，var = Signal)，一定要有断言的话我们就写“废话”，例如:data == data 等。如果有多个变量要赋值也可以，##4 （废话，变量1赋值，变量2赋值...........）
 
5. 关于断言的表达风格：语法介绍的 “a |-> b”，实际上是 “if a, then b”的逻辑，当a不发生，b也不会被判断，该断言自然成功。但当我们的逻辑是
```
        if a1
        {
           if a2 
              then b
        }
```
该如何用断言表达？？？？ 或许可以写成：`a1 |-> a2 |-> b`，也可以，但常用的表达是：
       `a1 && a2 |-> b` 或者 `a1 ##3 a2 |-> b`
 
6. 关于断言的时序：时序逻辑的断言需要注意的一个问题：
   例如：假设当clk上升沿到来时，`b<=a`。将上述逻辑写成断言时，如果写成`@(posedge clk) b==a`，看起来和 `b<=a`一样，但实际上是错的。因为当时钟上升时，b还没有得到a的值，a还需要一段保持时间。即，断言中的信号值实际上是时钟沿到来之前的值，而不是时钟沿到来后他们将要编程的值。所以，`b<=a`逻辑的断言应该是：`@ (posedge clk) (a==a,tmp=a) |=> (b==tmp);`
 
针对上述几点，举一个复杂的例子：
断言wr的功能是检查串行地址输入是否正确，串行地址输入线是 DataIn 。time返回值以0.1ns为单位（因为我在testbench中的单位规定是‘timescale1ns/100ps，精度是100ps=0.1ns），所以time/10才是ns。
``` 
/////////////////////////////////////////////////////////////////////////////
    wr: assert property(wr_p)
    display("succeed：",time/10);
    else
        display("error:",time/10);
/////////////////////////////////////////////////////////////////////////////
//断言可以声明一个int数组arr[4]，
//“@(posedge clk) !vld_pulse_r[0] && !DataIn”是真实的预备条件
//“##4 (read==read, arr[0] = DataIn)”只是为了在特定时间内赋值，有用的语句是“arr[0] = DataIn”，//“read==read”是废话，为了编译通过。
//arr赋值完毕后，进入function进行处理，判断实际地址addr跟junc处理过的数据是否相同。
//“addr == junc(arr[0],arr[1],arr[2],arr[3]);”就是junction调用。
    property wr_p;
        int arr[4];
        @(posedge clk) !vld_pulse_r[0] && !DataIn   
            ##4 (read==read, arr[0] = DataIn) 
            ##1 (read==read, arr[1] = DataIn) 
            ##1 (read==read, arr[2] = DataIn) 
            ##1 (read==read, arr[3] = DataIn) |=>
            addr == junc(arr[0],arr[1],arr[2],arr[3]);
    endproperty
//////////////////////////////////////////////////////////////////////////
    function [3:0] junc;
        input a,b,c,d;
        reg [3:0] a1;
        reg [3:0] b1;
        reg [3:0] c1;
        reg [3:0] d1;
 
        a1 = {3'b0,a};
        b1 = {3'b0,b};
        c1 = {3'b0,c};
        d1 = {3'b0,d};
        junc = a1+(b1<<1)+(c1<<2)+(d1<<3);
        $display(junc);
    endfunction
////////////////////////////////////////////////////////////////////////
 ```
7. 如果想在SVA中使用类似`for(){....}`的功能，别忘了语法中介绍的`[*3]`，这是在断言中实现for的唯一方式。
                ##4 (废话, cnt = 0, arr[cnt] = DataIn, cnt++)   //初始化一下，
                ##1 (read==read, arr[cnt] = DataIn, cnt++)[*3]  //循环3次
 
8. 每句断言都是一个小程序：如上例，在##4时间点上，(废话, cnt = 0, arr[cnt] = DataIn, cnt++)就是一个小程序，信号断言必须是第一句，其他运算按照顺序进行。
 
9. 断言的变量除了可用C语言中的int，float外，还可以是reg [n:0]等数字电路类型。
 
10. 注意：
像这种写法：
```
    property ept_p;
        @(posedge rd_clk)   ((rd_num == 0) |-> rd_ept)
                         && (rd_ept |-> (rd_num == 0));
    endproperty
```
**是错误的，写了|->，就不能再用 && 等事件组合逻辑了**。
解决方法是使用2个断言，没更好的方法。


11. 跟随重复运算符[->]和非跟随重复运算符[=]
跟随重复和非跟随重复都是非连续运算符号，但是跟随重复需要在满足条件后紧跟着后续序列，非跟随重复则不需要立即跟随后续重复。
```
property p25;
  @(posedge clk) $rose(start) |-> ## 2 (a[->3]) ##1 stop;
endproperty
property p26;
  @(posedge clk) $rose(start) |-> ## 2 (a[=3]) ##1 stop ##1 stop;
endproperty
```
p25需要在检测到a高三个cycle后，stop立即拉高，p26则不需要在a高三个cycle后便立即拉高，后续拉高就可以。

Reference Code:
可将assertion另外写到module中，便于多次调用，并发断言不能写到function 或者 task中，必须存在于
```
module sig_dly_no_less_assert #(parameter ck_name = "vsw")(
  input logic clk,
  input logic rst_n,
  input logic en,
  input logic sig_a,
  input logic sig_b,
  input logic [32-1:0] hsize,
  input int v,
  input int h
);
  property p02;
    int count;
    int h_size;
    @(posedge clk) disable iff(!rst_n) ($rose(sig_a)&&en, h_size=hsize, count=v*h_size+h) |-> (sig_a, count--)[*] ##1 ($rose(sig_b)&&count<=0);
//需要注意，上述sequence [*] 表示循环不定次数，直到##1后面的条件满足
  endproperty
  a01: assert property(p02)
  else $display("[%0t] ERROR: %s is less than %0d(v) %0d(h)!!!", $time, ck_name, v, h);
  //else $display("ERROR: %s is less than %0d cycles!!!", ck_name, length);
endmodule

module sig_dly_assert #(parameter ck_name = "vsw")(
  input logic clk,
  input logic rst_n,
  input logic en,
  input logic sig_a,
  input logic sig_b,
  input logic [32-1:0] hsize,
  input int v,
  input int h
);
  property p02;
    int count;
    int h_size;
    @(posedge clk) disable iff(!rst_n) ($rose(sig_a)&&en, h_size=hsize, count=v*h_size+h) |-> (sig_a, count--)[*] ##1 ($rose(sig_b)&&count==0);
  endproperty
  a01: assert property(p02)
  else $display("[%0t] ERROR: %s is less than %0d(v) %0d(h)!!!", $time, ck_name, v, h);
  //else $display("ERROR: %s is less than %0d cycles!!!", ck_name, length);
endmodule
````
