FPGA内部资源主要包括：**可编程逻辑单元，可编程输入输出单元，嵌入块状RAM，完整的时钟管理，布线资源，内嵌的底层功能单元和内嵌硬件模块**
![](FPGA内部结构.assets\23495115-85fe04adbd8853f1.png)
## 1. 可配置逻辑单元
可配置逻辑单元（Configurable Logic Block）,在FPGA内部最丰富，内部包含两个slice，slice分为slicel和slicem
![](FPGA内部结构.assets\23495115-2c1dcb63ce63caf1.png)
放大slicel可查看内部结构，包括4个LUT-6，3个数据选择器(MUX)，一个进位链和8个FF
![](FPGA内部结构.assets\23495115-f15aa67ceedb6ded.png)
### 1.1 6输入查找表（LUT6）
每个LUT6相当于一个64×1的存储器（宽度1深度64），当RAM的深度大于64会消耗额外的MUX，（F7AMUX，F7BMUX，F8MUX，即一个SLICE中的那3个MUX）。
slicel和slicem的主要区别在于查找表
![](FPGA内部结构.assets\23495115-36e6b22d65cf9a1b.png)
slicel内部的LUT可用于逻辑函数发生器，ROM等，而slicem内部的LUT还能够实现分布式RAM和32bit的移位寄存器（4个级联可实现128bit移位寄存器，并且需要多消耗3个MUX，地址选择共7bit）
[移位寄存器详解](https://blog.csdn.net/weiaipan1314/article/details/104328475)

## 1.2 数据选择器（MUX）
slice中的MUX（F7AMUX, F7BMUX, F8MUX）可以与LUT结合实现更大的MUX，一个LUT6可以实现一个四选一的MUX(两地址四输入)，一个MUX与旁边的两个LUT可以实现一个8选1的MUX，因此一个slice可以实现两个8选1的MUX
## 1.3 进位链
进位链用于实现加法和减法运算，内部包含4个MUX和4个两输入异或门。
异或运算是二进制加减法必不可少的
CARRY4实际上实现了4bit的超前进位
[https://zhuanlan.zhihu.com/p/92385125](https://zhuanlan.zhihu.com/p/92385125)
注意进位链的两个输入S和D，S为a,b异或后的结果，D为a,b中任意一个（通过异或结果和其中一个加数便可得到其需要的各位结果及进位值）
## 1.4 Flip-Flop
每个slice中包含8个FF，4个只能配置为边沿触发的D触发器，4个既可以配置为边沿触发的D触发器也可以配置为电平触发的锁存器（Flop&latch）。**当后者被配置为锁存器时前面4个寄存器将无法使用**（因此应该避免锁存器的产生，浪费资源）。
![](FPGA内部结构.assets\23495115-7524a6df01b0db72.png)
当8个FF均用作D触发器时，他们的控制端口包括使能端CE、置位/复位端S/R和时钟端口CLK是对应共享的，也就是说共用的。在具体的设计中控制集种类越少越好，这样才能提高除法器利用率。
S/R端口可配置为同步/异步置位或同步/异步复位，且**高有效**。
| 原语|功能描述|
|--|--|
|FDCE|同步使能，异步复位|
|FDPE|同步使能，异步置位|
|FDRE|同步使能，同步复位|
|FDSE|同步使能，同步置位|
