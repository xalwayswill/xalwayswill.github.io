### Reference：
[SRAM的性能及结构](https://aijishu.com/a/1060000000123289)
#### SRAM 介绍
SRAM它也由晶体管组成。接通代表1，断开表示0，并且状态会保持到接收了一个改变信号为止。这些晶体管不需要刷新，但停机或断电时，它们同DRAM一样，会丢掉信息。SRAM的速度非常快，通常能以20ns或更快的速度工作。静态ram中所谓的“静态”，是指这种存储器只要保持通电，里面储存的数据就可以恒常保持。SRAM不需要刷新电路即能保存它内部存储的数据。因此SRAM具有较高的性能，

SoC随着工艺进步设计复杂度增加，embeded sram也越来越多。在40nm SoC产品Sram一般在20Mbits左右，当工艺发展到28nm时Sram就增加到100Mbits。如果考虑AI产品，Sram估计更多。如何更好的测试Sram就成为量产测试的重中之重。


#### ARM SRAM compiler
SRAM在生成LIB文件时具有众多的feature可供选择，包括ATF，Bit-write mask，Extra Margin Adjustment(EMA)，flexible_bank，redundancy，Power gating，Multi-votage，Write-through等。对于前端设计而言，在选择SRAM时主要关注width，depth以及bit mask三个参数，而width和depth又与SRAM的bank，multiplexer等属性相关联。因此，本文主要通过bank和multiplxer的选择对SRAM结构，面积及功耗进行分析
![](memory-compiler.assets\23495115-3f8db392980efc0e.png)
![](memory-compiler.assets\23495115-86dcbb2f2a39cdf5.png)

register file类型相对sram类型的速度更快些，但是可生成的size范围不会太大

相关参数说明
hdf： High density 
SER： soft error repair
EMA： Extra Marigin Adjustment


#### SRAM分类
Single-port：只有一组地址和数据端口，每个cycle只能选择读或者写操作，接口列表如图1所示，可通过CEN和GWEN来选择读或者写操作
Two-port：有两组地址和数据端口，port A 仅用于读操作，Port B仅用于写操作，两组端口工作在统一时钟域下，接口列表如图2所示，由于每个端口只能进行单一的读或者写操作，相对于Single-port而言减少了GWEN端口，增加了一组地址端口（ARM 的memory compiler中rf_2p类型的sram是有独立的读写时钟的，但是每个通道还是只能读或者写，sram类型的2p读写通道是只有一组时钟）
Dual-port：由两组独立的地址和数据端口，port A和port B均可独立进行读写操作，两组端口可工作在不同时钟域下，接口列表如图3所示，相对于Signle-port而言使能，地址和数据端口均增加了一倍。
![](memory-compiler.assets\23495115-11626f0f65c3db8f.png)
![](memory-compiler.assets\23495115-1c222898d3df1391.png)
![](memory-compiler.assets\23495115-1d0c3ffa0ab239df.png)
* 当在生成SRAM是使能write mask功能，还将多出一组mask信号WEN[n-1:0]，与数据位宽一致，用于对每一bit数据进行write mask。
* RET1N属于SRAM的低功耗特性，能够在SRAM保持低电压或powergating的情况下仍然保存数据
* EMA: Extra Margin Enable, provide the option of adding delays into internal timing pulses. Such delays add extra time for read and write operations by slowing down the memory access. The fastest setting is 000 and 111 is the slowest setting.
* EMAW add delay for write cycles, the do not affect access time during a read operation. The write cycle time is the sum of EMA and EMAW.
每个工艺下面的SRAM都有一个常规电压下的推荐EMA配置，EMA需要在SRAM工作前稳定住，如果EMA配置低于推荐值，一定不能吧EMA端口tie死，保证能够在SRAM工作出问题时可以通过其他方式修改EMA值。另外，如果将EMA接到寄存器可配的话，收timing应该通过set_case_analysis将EMA tie到default值，否则工具会将所有的EMA组合都进行timing检查，111的情况会导致timing violation，111和000之间的ck2q大约相差一倍。
* COLLDISN：只有dual-port SRAM才有的端口，用来决定当port_A 和port_B对同一地址操作时，如何应对冲突

#### Bank
* bank：
Flexible banking allows you to set a fixed number of memory banks for the wanted performance and area tradeoff. A bank is a row of one or more arrays. Implementing fewer banks can provide an area advantage but can reduce performance. Implementing more banks can provide a performance advantage but can increase the area with the need for more control and word line driver space. This feature divides the memory array rows equally between the banks.
SRAM内部划分为多个bank，一个bank对应一行或多行存储阵列，不同的bank有不同的供电和driver以及IO，由bank address对不同的bank使能，在一个bank内Row address会选择一个完整的wordline。图4至图6展示了不同bank数目下的SRAM内部结构。
![](memory-compiler.assets\23495115-acdae09b224a5720.png)
![](memory-compiler.assets\23495115-72c0a5cfb546cd7a.png)
![](memory-compiler.assets\23495115-ff2e49a66ac4f1eb.png)
* Bank对于SRAM性能的影响
可以看到，bank数越少I/O及相应的驱动和控制单元越少，对应的SRAM面积也就越小，但由于众多Bit cells共用驱动和控制逻辑，SRAM的性能也会相对降低。相应的增大bank数能够有效的提升SRAM性能，但同时也会带来面积的增加。因此，可通过bank数目的设置来实现性能和面积之间的平衡。


#### multiplexer：
Multiplexer可以简单理解为每bit对应存放阵列空间的水平宽度或者说水平方向的MUX，该参数会影响SRAM的长宽比例。如图7所示，`D<0>`代表数据的bit0，bit0对应的存储空间共有r行m列，其中m即对应multiplexer的值，而总的行数`row = depth/multiplexer`，这也就是multiplexer能够影响SRAM长宽比的原因。在读写SRAM时，address会被划分为AAx和AAy，AAx用于对wordline进行选择，AAy用于对每个bit的水平方向进行译码。整个SRAM的bit数以及水平垂直宽度可由如下公式计算：
```
Total memory bits = (word width) * (word depth)
Rows = word_depth / multiplexer
Columns = word_width * multiplexer
例如：
Number of words: 取决于Multiplexer， increment = multiplexer * bank *4
Number of bits: 取决于Multiplexer， increment = 1 or 2
Rows in memory matrix: Total = word depth / multiplexer
Columns in memory matrix: Total = word width * multiplexer
```

`D<0>`代表输出数据的bit0，各个bit分开存放，每个bit由m列的存储单元进行存储，所以总的列数为 word_width*Multiplexer（不包含column redundancy），分bank是为了分开供电驱动，提高性能，但是会增大面积，地址每两行切换一次bank

* Multiplexer 对SRAM面积和性能的影响：
Multiplexer越大，memory的读写速度就越高，因为row address位宽越小，译码越快
Multiplexer越大，memory的面积就越大（cell和cell的横向距离远大于纵向距离，multiplexer增大会增加每条wordline的bit数，减少纵向的wordline数，但横向尺寸的增大大于纵向）
Multiplexer越大，每次row地址选择的cell就越多，功耗也会随之增加

![](memory-compiler.assets\23495115-7a93301dc8f3dc34.png)
![](memory-compiler.assets\23495115-2f5e0ac31b8b450f.png)

#### bank和multiplexer对于SRAM深度和位宽的约束
由于bank及multiplexer对SRAM结构的影响，SRAM的深度和位宽的配置也存在一定的约束条件，以Single-port的SRAM为例，下表描述了不同bank及multiplexer下可配置的depth和width，这也就是某些深度和位宽所对应的SRAM无法生成的原因，一般是通过增加额外的depth来满足生成限制。
例如下面为某SRAM compiler的生成约束
![](memory-compiler.assets\23495115-9c3adf947bf8f3c0.png)


#### Coulum redundancy是为了避免在流片制造过程中出现列损坏，通过用redundancy的列对坏列进行替换。
![](memory-compiler.assets\23495115-17f6caa5aa682421.png)

### [SRAM的性能及结构](https://aijishu.com/a/1060000000123289)【转载】
·memory compiler的选择
对于一个memory size大小确定的memory block，Column Mux越大，Row address位宽越小：

*   memory读写的访问速度就高 （row译码选择快）
*   memory的面积大（cell和cell的横向距离大于纵向距离，column mux增加很增加bits per wordline--横向，减少wordline数--纵向，横向尺寸增加远大于纵向）
*   因为一次选择的row地址对应的cell多，功耗也会增加

电流功耗
总电流功耗包括dynamic power和leakage power。不同的sram cell单元（比如HPC，HDC等等）功耗指标不同，体系结构设计需要在面积，速度和功耗之间寻找平衡。

-leakage current是永远存在的

Poweroff模式(cell+periphery off)< Retention模式(cell ON+periphery OFF) < Standby模式（cell+periphery on）

1Mbits memory的standby/Ret leakage电流在0.2mA左右，poweroff leakage电流在0.03mA左右。

-dynamic current：column mux，读写速度，读写辅助电路等都会影响动态电流

如果在常温状态下leakage current比较大，在高温或者大的dynamic current时必须注意thermal runaway的风险，因为温度升高leakage current会增加很快，总功耗的增加会进一步增加温度，形成正反馈。

SRAM的其他特性
SRAM的读写时间可以做成self-timing，当读写被时钟上升沿trigger以后，SRAM内有dummy bitline+dummy driver来驱动计时器得到读写的时间。得到读写时间后，用该时间访问实际sram cell保证读写时间ok。

SRAM的结构
一个6T(transistor) sram cell的经典结构如图所示：

![](memory-compiler.assets\23495115-21da63cd58a53fc0.png)
6T表示 sram 一个bit需要6个晶体管

这些SRAM cell集合成如下图的多个bank的memory block，每个bank有bank address使能；在一个bank内Row address选择一个完整的wordline，Column address选择某组IO bitlines。
举个例子说明如下：

一个memory block是4096x32 cm16，该memory size = 4096*32= 128k bits, row address is 8bits (4096/16 = 256 wordlines), column address is 4 bits(0~15), Wordline bits = 32*16 = 512 bits.
![](memory-compiler.assets\23495115-7de51c8165e022d2.png)

![](memory-compiler.assets\23495115-814003cc7d83bd80.png)
![](memory-compiler.assets\23495115-b32d7c3d2f83d0c7.png)
