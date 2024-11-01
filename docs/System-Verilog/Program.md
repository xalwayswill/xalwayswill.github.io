## Program
Program用于包含测试，当program内initial块中的最后一条语句执行完毕，被视为测试结束。
当有多个program时，仿真会在最后一个program完成时结束。可以通过$exit终止program，或者使用$finish结束仿真，但是在存在多个program时可能会出现问题。
然而，一个module或者program可以有一个final块包含一些语句在仿真结束后运行，如用于关闭文件或者打印错误。

### 在Program中不能使用always
always会在仿真开始的每个上升沿触发，而测试平台有初始化、激励、响应设计、结束模拟等步骤，一个连续运行的always块将不能够正常工作。

### 不要在program中创建时钟，应该在module中创建。 避免在0时刻产生上升沿，测试平台只描述DUT的行为，时序分析应该使用静态时序分析工具。

SV编译器不允许在单个module或者program的接口列表中使用interface

可以使用$root调用top-level scope内的变量

### Program-module Interactions
program可以读取module内的信号，但module不能读取program内的信号

### assertion
使用断言来保证程序运行正确。
断言可自定义输出
可设置当前断言，输入采样时钟
断言还有许多作用，例如在接口中使用断言来检查协议是否正确。
