## 摘要：
`$test$plusargs和$value$plusargs`作为进行Verilog和SystemVerilog仿真运行时调用的系统函数，可以在仿真命令直接进行赋值，并且不局限于不同仿真器对于参数在仿真命令中定义格式不同的限制，也避免了调换参数带来的频繁编译等问题。使用这两条函数对于搭建测试平台有一定的便利，同时对于理解Factory中用例是如何传递进Proxy Class有一定的帮助。
1.`$test$plusargs`
    在运行（run）仿真时指定要选择的条件，即只需要在仿真运行命令（run-options）中指定参数需要选择的条件即可，例如下例中，如果要将test01.dat、test02.dat、test03.dat分别load到各自的men中，仅需要如下命令在运行命令中加入`<+test01+test02+test03>`即可，当仿真运行时，$test$plusargs会在命令行中搜索指定的字符，若找到相应字符，在函数返回“1”，否则返回“0”。如果下次仿真时不需要test01时，仅需要将test01从运行命令中删除即可。
![](Systemverilog-运行时传递参数.assets\23495115-dc9ae4beb160a40e.png)
2. `$value$plusargs`可以将运行命令（run-options）中的参数值传递给指定的信号或者字符，其语法格式如下：

`Integer=$value$plusargs(“string”,signalname);`

其中string=”plusarg_format”+”format_string”,”plusarg_format”`指定了用户定义的要进行传递的值，”format_string”指定了要传递的值的格式（类似$display中定义的%s、%h、etc.），并且string中”plusarg_format”和”format_string”格式应该为”plusarg_format”（=/+）”format_string”。如果转换后的位宽和传递的值不一致，则按照如下规则转换：

|plusarg位宽与sigalname的关系 | Signalname值|
| - | - |
| | |
`<` | plusarg左补零
`>` | plusarg截位
plusarg为负数 | 按照正数处理
不匹配 | 若为指定默认值，则reg类型为x

`$value$plusargs`使用示例如下：

![](Systemverilog-运行时传递参数.assets\23495115-4dcd5dda2219acb1.png)

若使用的运行命令如下：

    `<run-options>+FINISH=10000+TESTNAME=this_test+FREQ=5.6666`

则上例的运行结果为：

    stop_clk ： 10000
    testname：this_test
    frequency：5.6666（如果run-options中没有增加“FREQ=5.6666”，那么frequency为8.333333）。


 3. 应用实例
通过makefile根据时间生成seed，然后传递到环境内部

makefile
```
SEED       = $(shell date +%N)
ARMISP_ARGS += seed=$(SEED)
$(addprefix +, $(ARMISP_ARGS))
```
env
```
int seed;
initial begin
    if($value$plusargs("seed=%0d",seed)) begin
        $display({100{"="}});
        $display("*MEM_TEST* [%10t] INFO: Test begin, the seed is %0d.", $time, seed);
        $display({100{"-"}});
    end
end
```
