### Reference
[公开课 让AMBA总线飞起来—成为SOC专家必须了解的](https://www.eeeknow.com/open/6475924312632066049/detail)
AMBA spec


AXI4是由ARM提出的AMBA总线中非常重要的一部分，基于burst传输，是一种面向高性能、高带宽、低延迟的片内总线。AXI能够达到这样的性能指标的一个主要原因就是其单通道体系结构。地址，控制，数据相位分离，支持非对齐的数据传输，支持burst传输，并且在burst传输时只需要首地址，支持outstanding传输访问和乱序（AXI4去掉了WID，不支持乱序，只能顺序），更容易进行时序收敛。



![](AXI4简记.assets\23495115-bb5eda04fe0d8a7d.png)
Burst length：The total number of data transfers within a burst (ARLEN[7:0], for read / write transfers)
* 不能跨越4KB地址边界
* 不能提前终止一次burst，但是master可以通过WSTRB指明那个byte lanes有效

## Burst address
* Start_Address: The start address that is issued by the master.
* Number_Bytes: The maximum number of bytes in each data transfer.
* Data_Bus_Bytes: The number of byte lanes in the data bus.
* Aligned_Address: The aligned version of the start address.
* Burst_Length: The rotal number of data transfers within a burst.
* Address_N: The address of transfer N in a burst. N is 1 for the first transfer in a burst.
* Wrap_Boundary: The lowest address within a wrapping burst.
* Lower_Byte_Lane: The byte lane of the lowest addressed byte of a transfer.
* Upper_Byte_Lane: The byte lane of the highest addressed byte of a transfer.
* INT(x): The rounded-down integer value of x.

![](AXI4简记.assets\23495115-e355e6afd9174f76.png)
![](AXI4简记.assets\23495115-575d3593aa4d0a5c.png)
*Byte Lanes表示多个byte通道，例如32bits信号可表示为byte1 byte2 byte3 byte4，每个byte对应一个byte lane*

* AXI 读操作传输依赖关系
![](AXI4简记.assets\23495115-f6cb9ea2522b1c4f.png)
* AXI3 写操作传输依赖关系
![](AXI4简记.assets\23495115-fe37898d234524f1.png)

* AXI4和5 写操作传输依赖关系
AXI4和AXI5定义了额外的写相应依赖项
![](AXI4简记.assets\23495115-20b8543476d053fb.png)
**从握手来看数据可以在地址之前传输，slave能不能正确接收应该看slave（或interconnector）是否支持该模式，是否能够对数据进行缓存。**
**AXI4增加的额外依赖项保证slave不会像AXI3那样在接收到写数据而没有接收到写地址时就返回写响应，AXI3的slave与AXI4的master相连需要额外的wrapper，来保证其写响应信号一定是在接收到写地址后再返回。**
**AXI4取消了WID，写地址和写数据的顺序需要对应**
## 窄传输（Narrow transfer）
本次传输中数据位宽小于通道本身的数据位宽
在窄传输过程中，主机需要告诉从机数据通道中那些字节是有效的，需要使用WSTRB信号。
详见AXI协议中的例子
## 非对齐传输
AXI协议支持非对齐的数据传输，允许突发传输的首字节地址，即起始地址与**突发位宽**不对齐。例如，突发传输位宽为32bit，而传输起始地址为0x1002，则产生了非对齐的现象，与32bit位宽对齐的起始地址需要能够被4整除。
注意：对齐应该是取决于突发传输的宽度，而不是总线位宽。
对于非对齐传输，主机会进行两项操作：
1. 及时起始地址非对齐，也保证所有传输是对齐的
2. 在首个transfer中增加填充数据，将**首次传输填充至对齐**，填充数据使用WSTRB信号进行标记
例1
![](AXI4简记.assets\23495115-c37fb760fa2247c2.png)
起始地址为0x1，非对齐，但主机通过添加一字节的填充数据将1st transfer的实际地址调整为对齐的0x0，并用WSTRB 4'b1110标识出最低字节上的无效填充数据。从机按照同样的原则实现对齐。
例2
![](AXI4简记.assets\23495115-ff50af4411c07758.png)
上图为非对齐加窄传输的例子，首先起始地址为0x7，burst位宽为32bit，将发送数据填充至突发位宽32bit对齐，之后由于总线数据位宽为64bit，再按照窄传输的方式填充4byte数据，完成1st transfer，后续的transfer均按照窄传输的方式进行传输即可。
## byte Invarience
为了能够使大小端模式在存储中共存，AXI协议设计了一种字节顺序恒定的大小端传输方案：
* 无论大小端模式，每个数据结构存储空间的分配方式是相同的
* 该数据结构按照其大小端模式决定字节存储的地支顺序
* 在传输过程中不考虑数据结构的大小端，按照字节原先存储的顺序，原样传输并存放至对端
该模式的意义在于传输双方均不对数据结构的大小端进行解析转换，严格按照字节的存储顺序进行传输并转存，防止大小端共存产生数据覆盖。
## wrap有什么用？
由于CPU填充cacheline的时候，第一个访问的地址是0x90，加到9c之后，会从cacheline的起始地址继续传输，对cache的访问不应该跨过cacheline的边界。
如何计算回环到了边界呢？以图 7为例，HSIZE是Word，也就是4个Byte，HBURST是WRAP8，也就是说回环边界为4x8=32。从0x90开始传输到0x9C，再继续累加一个word的话就变成0xA0，0xA0是32的整数倍，也就是到了回环边界了，0xA0减去32等于0x80，所以0x9C的下一个地址变为0x80。
![](AXI4简记.assets\23495115-50ce7bceb20e41b3.png)
## Outstanding
1）读操作：**每个master**可以连续发N个读地址命令，这期间如果读数据没有返回，则需要等待读数据返回，如果有读数据返回，则返回了几个，那么仍然可以接着发几个。也就是说，“在路上” 的读命令（或者读数据）最多可以是N。
2）写操作：**每个master**可以连续发出N组写地址（写数据）命令，这期间如果写响应没有返回，则必须等待写响应返回才能接着发写地址（写数据）命令，如果有写响应返回，则返回了几个，那么仍然可以接着发几组。也就是说，“在路上” 的写响应最多可以是N。
outstanding的数量是对于每个master而言的，而不是说总线上有多少个传输命令
换种说法，outsatanding是对地址而言，一次突发还没结束，就可以发送下一个地址。而乱序和交织则是相对于传输事务，out-of-order说的是发送transaction和接收的cmd之间的顺序没有关系，如先接到A的cmd，再接到B的cmd，则可以先发B的数据，再发A的数据；交织指的是A的数据和B的数据可以交错，如A0->B0->A1->B1->B2->B3。
![](AXI4简记.assets\23495115-a8026690929cbad8.png)
## Interleave
![](AXI4简记.assets\23495115-ae7c5329dfa0128a.png)
交织容易死锁
**需要注意同一个ID既不能支持ooo。也不能支持interleave**
