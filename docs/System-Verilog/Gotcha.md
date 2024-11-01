* 命名
用户自定义类型：with_t
枚举变量类型：with_e
低有效信号类型： with_n
常量和枚举标签：全大写
类定义： 大驼峰

* automatic
动态变量会在调用时动态分配内存，并在退出时自动释放内存，对于多次调用的任务和函数需要使用automatic来修饰，不然会调用同一个内存空间。
automatic 变量不会输出到Value Change Dump（VCD）文件中，并且不能使用层级路径来进行引用。（因为静态变量层级路径是固定的，而动态变量是在仿真过程中来来去去的），因此使用层级路径是需要先检查变量类型是静态还是动态，并且动态变量不输出到VCD文件中可能会丢失部分重要信息。
* 尽量使用packet而非$uint来区分不同命名空间内的变量或者函数
* 使用automatic修饰program使得自动分配存储空间，更像C/C++。然而这种方式只能改变tasks，functions和过程块中的变量，在program块层的变量仍然默认是静态的。
* 过程块中声明的变量如果过程块没有命名则没有层级结构
* 变量位宽不匹配赋值时高位填充0还是符号位取决于右侧变量类型
* SV再module中传输real类型，output可直接定义为real类型，**input只能为var real**
* 使用@(*)能够包含always中所使用的敏感变量，但是如果always中调用了function，则函数中的变量额外的变量不会添加到敏感变量列表中，可能会导致逻辑错误。SV提供了 always_comb, always_latch自动包含内部使用的敏感变量，不再需要@，但是不能包含task
* 使用begin...end 可能会导致可复位顺序逻辑出现错误
* 在生成分频时钟时，应该使用阻塞赋值而不是非阻塞赋值，避免后级使用该时钟触发时会出现竞争
* 在组合逻辑中应该避免使用非阻塞赋值，由于非阻塞赋值的clock-to-Q delta，如果敏感变量在该时间内变化可能会出现问题 例如`m <= m + n`
* casez 和 casex允许在表达式两边设置掩码（表示不考虑该bit位，如4’b1???），如果输入为4‘bxxxx，则会直接匹配case表达式的第一个分支，而不是default。SV中的always_comb 中的case inside可以避免该操作。
![](Gotcha.assets\23495115-4fb09444d948de23.png)
在综合时尽量不要使用casex（实际三个综合出来结果一样的），一般使用?来表示不考虑的z值，在进行比较时忽略该位的比较。
* 使用枚举类型设置状态机应该注意没枚举类型默认变量值从0开始，如果cs ns默认初始值均为0，则ns状态（case(cs)）无法切换，状态机锁死
* 操作符位宽匹配是根据**操作符两侧的最大位宽**，而符号扩展值取决于右侧表达式是否包含有符号数。有符号加无符号结果为无符号
* ++i 和 i++前置后置运算符号，前置先加再赋值，后置先赋值再加
* 注意逻辑非`!`与bit翻转`~`运算符的区别，在逻辑判断时不能使用`~`
* 不要使用#0
Designers are often tempted to use #0 to avoid race conditions between two procedural blocks. A #0 in a procedural block forces that block to stop and be rescheduled after all other blocks. The problem happens when you have multiple blocks that all want to execute last. Who should win?
This itself can become a new race condition and its resolution could vary from run to run and from the simulator to simulator. In short, multiple threads using #0 delays can cause non-deterministic execution behavior.
Besides, it makes your code hard to read and also non-synthesizable.
# 使用#1
Reference ：Verilog Nonblocking Assignments With Delays, Myths & Mysteries
## General programming Gotchas
* 尽量不要在0时刻进行复位，应该在所有的过程块都正常工作后再复位。或者在给时钟赋初值时采用非阻塞赋值，而复位信号采用阻塞赋值
* SV中的program块有特殊的时间调度机制，能够帮助避免大多数类型的验证到设计之间的竞争状态。
* 来自设计的信号进行判断时最好使用===，!==，避免XZ导致的问题
* SV中增加了`->>`(阻塞触发)以及`wait`(trigger.triggered)两种方式避免verilog中的`->` trigger没有被接收到
* 在使用semaphore时，如果`get()`所需求的key不够，则会将请求存入FIFO中，但是如果后面的`get()`需求的key能够被满足，则会直接该`get()`则会直接被响应，而不会等到FIFO中的请求被响应之后再响应。因此应该再每次都是用`get(1)`，当需要多个key时使用repeate调用多个`get(1)`，保证同步。
* mailbox由于能够存入任何类型的数据，可能会因为从里面读出的数据类型不匹配而导致出现错误，可使用try_get()来判断读取结果是否正确。另一种方法是使用指定类型的mailbox（`mailbox #(data_type) mbox1 = new;`）
## Object Oriented and Multi-Threaded Programming Gotchas
* 动态变量内部不能包含静态变量，如类内不能实例化interface，interface为表示硬件接口的结构组件，在类内可实例化的为interface的指针，即虚接口，虚接口的作用是允许动态变量拥有静态实例变量的句柄，从而能够在静态变量和动态变量之间传递数据。
```
class driver;
  virtual interface arb;
  function new(virtual arb_ifc arb)
    this.arb = arb;
  endfunction
endclass
```
* 通过input输入的变量都会通过拷贝传入方法中，并不会返回修改后的值，如果在调用该方法的位置获得返回值，可通过ref传入变量
* 对象数组只能单独实例化数组内的每个变量，不能一起进行实例化
```
Transaction trans[8]
foreach (trans[i])
  trans[i] = new()
```
* verilog 和 systemverilog 中 function 和 task 默认为静态（static）的，不同于C语言中默认为动态（automatic）的，静态函数和任务每次调用都共享内存空间，在多次调用时可能会导致出现错误，后面的调用会覆盖前面的调用，因此可在声明函数和任务时修饰为automatic
```
task automatic watchdog(...)
```
另外在SV中automatic可用于修饰module、interface以及program，可通过修饰program，使得program内部的所有函数和任务默认都是automatic
```
program automatic test(...)
  task watchdog ()
```
* **静态类型内部变量初始化时只会在其创建时初始化一次**（因为其内存空间已经固定），及时多次调用也只会保持第一次初始化的值，无法改变
* 使用disable禁用block时需要块名，然而只有静态变量存在固定的块名，要使用disable关闭多个并发线程中的一个，只能在module例化层面进行task的多线程并发，且task必须是静态的。
* program不需要连续执行，当运行到program块的结尾时，仿真自动停止。但是可能会导致verilog仿真模型或者program中的一些线程（fork join_any/join_none）没有运行完毕就终止仿真。
## Randomization, Coverage and Assertion Gotchas
* 包含随机变量的类，其句柄和子类也应该声明为rand才能进行随机化
* 关闭断言（$assertoff）会同时关闭其内部的randomize
* 约束中一次只执行一个运算符（`a<b<c`会理解成`(a<b)<c`）
* 关于覆盖率部分没有阅读，因为不会87、88、89、90、91
## Tool Compatibility Gotchas
不同工具对语法的支持不一致，应该尽量使用所有工具都支持的，避免使用非官方语法及关键字，狮子啊不能兼容使用宏定义分类

## 负数的截位
负数在系统中通过二进制补码进行表示，但二进制补码直接截位会带来数值的改变，需要进行四舍五入截位。
正数直接截位是向0舍入，而负数补码直接截位会出现向负无穷舍入。

