#### Reference：
[1] ARM官方数据手册：[https://www.arm.com/architecture/system-architectures/amba/amba-specifications](https://www.arm.com/architecture/system-architectures/amba/amba-specifications)
[2] https://www.cnblogs.com/xianyuIC/p/17301009.html
[3] [cmsdk](https://developer.arm.com/documentation/ddi0479/c/)

#### AMBA介绍
* Bus interface performance
![](AMBA-APB-AHB-AXI.assets\23495115-4a76b1c7b218ee48.png)
* 基础概念
1.  什么是`slave interface`？

    我们通常说AXI是点对点的协议，`slave interface`是slave上的接口，用来连接对应master上的`master interface`。

2.  什么是`master interface`？

    我们通常说AXI是点对点的协议，`master interface`是master上的接口，用来连接对应slave上的`slave interface`。
    ![](AMBA-APB-AHB-AXI.assets\23495115-7ed5e9b0641e414c.png)


3.  什么是`transaction`和`transfer`？

    transaction是包含整个burst的传输，它包含地址传输，数据传输，以及响应。而transfer指的但是单个信息传输，它可以一个地址传输，一个数据传输等等

4.  什么是`bus matrix`和`bus interconnection`？

    bus matrix和bus interconnection都是用来连接bus的master和slave， 本质是一样的，只是叫法不同而已

5.  什么是`burst`？

    在AXI协议中，是transaction的单位，一个transaction是以一个`burst`为单位的传输的，一个burst可以包含多个transfer.

6.  什么是`outstanding transaction`？

    指一个transaction已经发出，但是还没有得到response。

7.  什么是`read/write issue capability`？

    指某个cpu/master可以发出最大数目的`read/write outstanding transaction`数目。
#### Memory model 和 memory type
![](AMBA-APB-AHB-AXI.assets\23495115-a2f0f90b668fd2f4.png)
![](AMBA-APB-AHB-AXI.assets\23495115-4be77acf29ddb424.png)
![](AMBA-APB-AHB-AXI.assets\23495115-27dc13eefdca8958.png)

CPU发送Nornal Memory的访问命令，bus interconnection可以先将命令暂存在内部，并返回response给cpu，当下一次访问到来时，interconnection继续返回response，当多个访问的到来时，将多个访问的burst的进行合并发送给normal memory，normal memory再返回response给interconnection。
CPU发送Device Memory的访问命令，interconnection收到命令立即返回给cpu response，然后interconnection发送请求给Device memory，然后device memory再返回response
CPU发送strongly-ordered memory的访问命令时，interconnection不会立即返回response，并将请求发送给strongly-ordered memory，strongl-orderd memory 返回response给interconnection后，interconnection再返回response给cpu，此时cpu才会认为strongly-ordered memory 的访问结束了，因此CPU访问此类memory的效率最低。
感觉cacheable就是说一次传输可以被缓存下来，然后将多个传输合并为一个命令，再发送给目的端。而bufferable则是指命令可以被缓存下来，但是不能将多个命令合并传输。
#### Secure and Non-secure
![](AMBA-APB-AHB-AXI.assets\23495115-e016a6554b26a368.png)
![](AMBA-APB-AHB-AXI.assets\23495115-ba98a2c89d9f3bfb.png)
#### Cache
![](AMBA-APB-AHB-AXI.assets\23495115-f3ea0062dffc5d1c.png)
![](AMBA-APB-AHB-AXI.assets\23495115-0288ee0edeaba9d6.png)
![](AMBA-APB-AHB-AXI.assets\23495115-1eb29f4e8689a539.png)
![](AMBA-APB-AHB-AXI.assets\23495115-349e75782bde19a9.png)
![](AMBA-APB-AHB-AXI.assets\23495115-bfcdc7a4594006fe.png)
![](AMBA-APB-AHB-AXI.assets\23495115-61b8ae73235a276e.png)
![](AMBA-APB-AHB-AXI.assets\23495115-c15b43ca915f1972.png)
![](AMBA-APB-AHB-AXI.assets\23495115-e5cd6fabb7b50747.png)
#### APB
* The advantage of APB
The protocol is simple -- Easy to design APB-related modules, e.g. APB slave, APB MUX
Power consumption is lower -- APB clock frequency usually is low
Gate counts is also lower -- Design is simple
* PENABLE 是否是多余的？
如果APB slave 有 PCLK输入，PENABLE确实可以不要，但是如果slave使用纯组合逻辑，则需要使用PENABLE来区分setup stage 和 access stage
* APB2 为何定义两个clock cycle的读写操作
定义两个stage其实就相当于定义两个时钟周期。因为APB的slave通常来说对应peripheral的registers，访问这些slave registers（control，status，write/read data）两个clock cycle就够了。对于status register而言是软件轮询的方式（每次访问同样是两个clock cycle）
* APB3 引入了PREADY信号来插入wait state，同时引入PSLVERR信号来指示Error信息（**注意PSLVERR需要和PREADY同时返回，这样才能保证master采样到，如果slave内部没有完成PSLVERR的判断，需要将pready拉低等待slave判断传输时候成功**）
* APB4 引入了PPROT[2:0]信号和PSTRB

#### AHB
AHB和AHB-Lite最大的区别就是AHB是支持多个master，AHB-Lite不支持多个master
![](AMBA-APB-AHB-AXI.assets\23495115-e552e19c130b3191.png)
![](AMBA-APB-AHB-AXI.assets\23495115-12a10e9a9573dd47.png)
AHB是可以支持pipeline的，address phase 和 data phase是overlap的
![](AMBA-APB-AHB-AXI.assets\23495115-c6f87b65183b89a5.png)
![](AMBA-APB-AHB-AXI.assets\23495115-30b0d177eca51d36.png)
注意HTRANS和HBURST的区别，**HSIZE在一个burst期间要保持不变**，表示的是每次传输的数据大小，HSIZE设置的传输大小必须≤数据总线的位宽，HSIZE和HBURST共同决定了wrap burst的传输的地址边界，例如WRAP4，HSIZE=4byte，则传输的地址边界位 16 byte
![](AMBA-APB-AHB-AXI.assets\23495115-4832663e246b9156.png)
![](AMBA-APB-AHB-AXI.assets\23495115-90ae6fbc8911b268.png)
![](AMBA-APB-AHB-AXI.assets\23495115-024eeb479f50a60a.png)
* 地址对齐
  - AHB协议在突发时必须地址对齐。
    - 例如word传输表示每次传输的数据量是32 bit，每个地址能存放8 bit数据，因此传输一个32 bit数据就需要消耗4个地址，二进制描述就是消耗HADDR[1:0]。所谓对齐到地址边界，就是说HADDR的值的低2bit必须是0，即HADDR[1:0] = 2’b00，转成16进制就是只允许HADDR的最低位为0、4、8、C（很多寄存器地址也都是048C的地址顺序），word传输也是实际工作中最常用到的SIZE。
    - 如果是16bit的half-word传输，同理传输一个16bit数据就需要消耗2个地址，二进制描述就是消耗HADDR[0]，转成16进制就是只允许HADDR的最低位为0、2、4、6、8、a、c、e。
    - IDLE传输的地址也最好对齐，否则在仿真时，监视器可能会报warning。
——注意——

    - APB不能突发传输，因此没有对齐和非对齐的说法，或者认为支持非突发的非对齐操作。
    - AHB要实现非对齐操作，不能使用突发传输，可以采用非突发的单拍传输，AXI可以通过窄传输实现
    - AXI也有突发传输，并且通过掩码方式实现了突发传输中的非对齐操作。
  - AHB协议中，Master禁止跨越1KB地址边界的递增突发。

    - 因为slave在设计的时候是以1KB为单位的，如果跨过了1KB就有可能访问到另一个slave。
    - AXI协议中进制跨越4KB地址边界，也是为了避免一笔burst交易访问两个slave（每个slave的地址空间是4K/1K对齐的），4K对齐最大原因是系统中定义一个page大小是4K，而所谓的4K边界是指低12bit为0的地址。
![](AMBA-APB-AHB-AXI.assets\23495115-f5090a63ee675057.png)
![](AMBA-APB-AHB-AXI.assets\23495115-074a6a637d21192e.png)
![](AMBA-APB-AHB-AXI.assets\23495115-93be269df0e74469.png)
**OKAY相应只需要一个周期，而Error response必须是两个cycle**，应该在hready的上升沿。**因为总线的流水线特性，所以要求这种两个时钟周期的响应机制**。当Slave开始发出一个ERROR响应的时候，下一个传输的地址已经发布在总线上，这种**两周期响应机制为Master提供了足够的时间通过驱动HTRANS[1:0]为IDLE状态来取消下一拍总线访问**，如上面几图所示。如果Slave需要超过两个时钟周期的时间提供ERROR响应信号，则从传输开始需要额外插入等待状态。此时 HREADY为低电平，响应必须驱动为OKAY。
当 Slave 响应了 ERROR 响应，Master 可以取消掉一个 Burst 中剩余的传输。然而这并不是严格的要求，Master 仍然可以继续 Burst 的剩余传输。
![](AMBA-APB-AHB-AXI.assets\23495115-62dbf65faa4a6f2e.png)
![](AMBA-APB-AHB-AXI.assets\23495115-48179388f2d38023.png)
![](AMBA-APB-AHB-AXI.assets\23495115-2f2f8ce8c5cf6b05.png)
![](AMBA-APB-AHB-AXI.assets\23495115-aa41848397a4bd74.png)
HREADY 和 HREADYOUT 用于表示上一个是transfer是否完成，只有当上一个transfer完成之后，才会开始采样新的地址和命令。
![](AMBA-APB-AHB-AXI.assets\23495115-c6a2d17f7a4bf27f.png)
示例中Locked Transfer用于保证先读后写的原子操作
#### AHB2APB Bridge
![](AMBA-APB-AHB-AXI.assets\23495115-4c6d7c359c59f487.png)
#### AHB2SRAM
#### Bus Matrix Design

### AXI
![](AMBA-APB-AHB-AXI.assets\23495115-f43540f6f7b4361f.png)
上面第三条是说写地址和写数据没有严格的依赖关系，写数据可以早于写地址发出，但是需要slave或者interconnection具有缓存能力。
AXI的burst操作只需要给出每一笔burst的首地址和对应属性，不需要像AHB一样给出每一笔transfer的地址。
**一次传输叫做一个transfer，一个transaction可视为一次完整的传输，例如一个burst**，一个transaction包含多个transfer
valid不能等待ready，但是ready可以等待valid到来之后再拉高
![](AMBA-APB-AHB-AXI.assets\23495115-1fdfd1fd3b714d45.png)
![](AMBA-APB-AHB-AXI.assets\23495115-264b8fe423bf3dd2.png)
![](AMBA-APB-AHB-AXI.assets\23495115-27c11e1a2bcadada.png)
![](AMBA-APB-AHB-AXI.assets\23495115-542b5a2ddaf8d2eb.png)
![](AMBA-APB-AHB-AXI.assets\23495115-172f1eefe9594786.png)
WRAP最典型的是对cacheline进行操作
![](AMBA-APB-AHB-AXI.assets\23495115-2585cacff555d877.png)
Cache support
**cache support主要是为了early response**
之前曾经想过cacheable或者bufferable类型的传输如果到了中层级已经返回了response但是从中间的buffer传输到memory的过程中失败的话会怎样，其实中间层级就是一级缓存，类似于cache，只要成功写到了中间层级，即使最后没有成功写道memory中，下次对地址进行读取的时候也可以直接从中间层级得到对应的数据，数据并不会丢失，master只要确保自己写的数据能够读到就可以，读的时候不需要考虑数据从中间层级还是最终的memory来的。
![](AMBA-APB-AHB-AXI.assets\23495115-a5561afc439e7cb1.png)
当 AxCACHE[0]（AXI4） 置高时，表示该传输事务在传输至目的地的途中，可以被 interconnect 或者任意的 AXI 组件缓存，延迟若干个周期。一般应用于写传输事务。
cacheable代表了是不是要去这个cache中查找自己需要的数据。要不要更新cache。利用cache来提高性能，有些操作是要求绝对non-cacheable的，比如device 内部寄存器的访问，这些都是MMR。只能使用non-cachable。

对于Response， AXI3和AXI4有区别，**AXI3只需要收到WDATA就可以回复response，AXI4则需要收到WDATA和AW都收到后才能回response**
![](AMBA-APB-AHB-AXI.assets\23495115-f99f0d7eaafe4533.png)
![](AMBA-APB-AHB-AXI.assets\23495115-0b406218564dc673.png)
![](AMBA-APB-AHB-AXI.assets\23495115-ff050a596edbad09.png)
Lock transaction 锁的是总线，对总线性能影响比较大，只有早期的CPU会使用这种传输，现在新的都是使用exclusive类型的transaction，monitor会检测地址是否已经被某个master占用，当master发现所访问的地址被占用时，会进入类型低功耗模式等待，当占用的master使用完毕后，会能够产生唤醒的信号，来唤醒等待的master
![](AMBA-APB-AHB-AXI.assets\23495115-11b6705c33e159e0.png)
![](AMBA-APB-AHB-AXI.assets\23495115-1274a0e3e79cff27.png)
![](AMBA-APB-AHB-AXI.assets\23495115-26dee86b92a7dccc.png)
![](AMBA-APB-AHB-AXI.assets\23495115-93b0b7e85bf733df.png)
AXI4 去掉了WDATA的interleaving，降低总线设计复杂度，减少slave的缓存量。
![](AMBA-APB-AHB-AXI.assets\23495115-e8abfd5e3ae84d1a.png)
![](AMBA-APB-AHB-AXI.assets\23495115-4de644a9adb9d94f.png)
Atomic
![](AMBA-APB-AHB-AXI.assets\23495115-5fb1649652a3a1e3.png)
Locked Access - AXI3
![](AMBA-APB-AHB-AXI.assets\23495115-f5363cf6c3998669.png)
![](AMBA-APB-AHB-AXI.assets\23495115-416067522a4540b5.png)
Exclusive accesses
![](AMBA-APB-AHB-AXI.assets\23495115-837b845a0d3c5bed.png)
![](AMBA-APB-AHB-AXI.assets\23495115-2b92cf34f4fd39b4.png)
exclusive accesses必须返回EXOKAY才是更新成功，OKAY表示更新失败。例如当M0进行exclusive accesse的时候，如果M1也在这个时候对同一个地址进行访问，则会返回OKAY表示没有成功更新。
Exclusive accesses 并不是单独的读或者写，而是搭配的一套操作，例如发送一个Exclusive Read 然后又发起一个 Exclusive Write
![](AMBA-APB-AHB-AXI.assets\23495115-4f283cd732b72030.png)
![](AMBA-APB-AHB-AXI.assets\23495115-aa1db9d41cf35512.png)
Monitor会记录地址信息，ID信息也可能记录，ID1的Exclusive Write访问没有成功是因为ID0之前的exclusive accesses已经完成，对应地址已经被写入修改，monitor清掉了当前地址的flag，当ID1进行Exclusive Write访问的时候，在monitor中查询不到对应地址，所以就返回OKAY，memory更新不成功。这种独占访问实现非阻塞的行为，与LOCK访问相比，能够提供更好的减少总线性能的损失。

* Transfer ID
master和slave尽量在内部实现缓存，避免通过反压总线对其他master的影响
![](AMBA-APB-AHB-AXI.assets\23495115-fc9519bf36896b80.png)

* Write ordering rules
write interleaving -- AXI3 only
![](AMBA-APB-AHB-AXI.assets\23495115-4e3363d736cdddc7.png)
不同ID可以支持out-of-order（WDATA的interleav只有AXI3支持，但是response都可以ooo），相同ID必须保证in-order
通过interconnection保证in-order
* Read ordering rules
![](AMBA-APB-AHB-AXI.assets\23495115-4aacf42fa12fa129.png)
* Read/Write Ordering
![](AMBA-APB-AHB-AXI.assets\23495115-259bad410584adf3.png)
* Unaligned transfer
![](AMBA-APB-AHB-AXI.assets\23495115-576b23567f7d98c9.png)
* Endianness support
![](AMBA-APB-AHB-AXI.assets\23495115-9ac34fc1da8b4366.png)
* Write interface attribute
![](AMBA-APB-AHB-AXI.assets\23495115-ce7658449fc937bd.png)
 * Read interface attribute
![](AMBA-APB-AHB-AXI.assets\23495115-80a1ff1b778aa380.png)
* Interconnect Memory Map
![](AMBA-APB-AHB-AXI.assets\23495115-0cf9b49ecf4ac8a4.png)
* Bridging
![](AMBA-APB-AHB-AXI.assets\23495115-c5c067411684a24a.png)
* AXI ID Use
![](AMBA-APB-AHB-AXI.assets\23495115-870f3684f72e5289.png)
![](AMBA-APB-AHB-AXI.assets\23495115-7e123ea5dcc06c8e.png)
![](AMBA-APB-AHB-AXI.assets\23495115-fddc4a9572c438c4.png)
* Deadlock
![](AMBA-APB-AHB-AXI.assets\23495115-a1a2ebbc1d085ea8.png)
![](AMBA-APB-AHB-AXI.assets\23495115-a8da179cd654f15e.png)
single slave模式是说总线会判断当前master发送的操作是发往与上一个相同的slave还是不同的slave，如果是不同的slave，则会先block住当前命令，知道上一个命令从slave返回之后，在发送出去，避免出现返回的两个命令被re-ordered，造成read-deadlock
![](AMBA-APB-AHB-AXI.assets\23495115-2b3463d8518c6e2f.png)
![](AMBA-APB-AHB-AXI.assets\23495115-df3cad297eb0d473.png)
![](AMBA-APB-AHB-AXI.assets\23495115-a39d2d28acc15065.png)
![](AMBA-APB-AHB-AXI.assets\23495115-5758cc4a797d3ef9.png)
![](AMBA-APB-AHB-AXI.assets\23495115-ccc14c0da790825a.png)
![](AMBA-APB-AHB-AXI.assets\23495115-4e7d0f69f2a7acfc.png)
![](AMBA-APB-AHB-AXI.assets\23495115-85a2d0b6bc0326f9.png)
#### AXI Streaming
* Memory-mapped
AXI3 & AXI4 & AXI-Lite
地址映射型
* Streaming
面向高速数据流
数据流单方向，无地址
无限制burst
* 应用场景
Signal Processing
Video Processing
### AXI设计的关键问题
#### AXI设计要点
前面我们在视频讲解课程里面，讲到有关AXI设计需要注意的一些点，这里我们再来看看在设计一个master或者slave，需要事先考虑的知识点：

1. AXI的哪些特性是不需要支持的？
    - Memory的属性需不需要支持，比如secure/non-secure，bufferable/non-bufferable
    - Lock（AXI3）和 exclusive访问要不要支持
    - 是否支持Write Strobe
    - 是否支持QoS的使用

不是所有的AXI信号都是必须的，有些信号是可选的，对于Slave来说，以上输入信号可以悬空；对于master来说，AxCache信号输出为0b0000，AxLock信号输出为0，AxQOS信号输出为0b0000, 对于master信号的缺省值，可以参考文档AMBA4协议的 《A10.3 Default signal values》

2. AXI接口特性
- Slave Interface 特性

|Attribute|	Description|
|---|---|
|Write acceptance capability	|Slave能够同时接受active write transaction的最多个数|
|Read acceptance capability	|Slave能够同时接受active read transaction的最多个数|
|Write interleave depth	|Slave的写通道在接收数据的时候，能够支持的active write transaction的个数|
|Read data reorder depth	|Slave的读通道在传输读数据的时候，能够支持的active read transaction的个数|

* Master Interface 特性

|Attribute|	Description|
|  ----  | ---- |
|Write issue capability|	Master能够发出active write transaction的最多个数|
|Read issue capability|	Master能够发出active read transaction的最多个数|
|Write interleave capability|	Master的写通道能够支持的active write transaction的个数|
以上特性决定了master和slave在设计上的复杂度，capablity的值的越大，代表master和slave要用更大的buffer去存储active transactions。

#### 设计AXI接口IP的考虑
![](AMBA-APB-AHB-AXI.assets\23495115-58a05b1afc44ee5d.png)

![](AMBA-APB-AHB-AXI.assets\23495115-06b2502376815336.png)
![](AMBA-APB-AHB-AXI.assets\23495115-68dce360bdcb441f.png)
* Slave Implementation
![](AMBA-APB-AHB-AXI.assets\23495115-9143c6cbb9f8e8ed.png)
slave可以通过将相同ID的命令修改为不同ID的命令来进行ooo的处理，处理完之后再转化为in-order返回给master
* Master Implementation
![](AMBA-APB-AHB-AXI.assets\23495115-2d6c76c7c6ac0e2b.png)
* Debugging
一般不会加很多逻辑去检测总线错误，默认大家都会遵循规则。
![](AMBA-APB-AHB-AXI.assets\23495115-0426fbf380de1528.png)
* Compatibility
![](AMBA-APB-AHB-AXI.assets\23495115-c1a7b7331a551f0d.png)
slave最好是能够动态配置ID的位宽
#### Interconnect拓扑结构
* AXI Interconnection Architecture
![](AMBA-APB-AHB-AXI.assets\23495115-2fd18c4767b38f27.png)
![](AMBA-APB-AHB-AXI.assets\23495115-dcc8e76ba410321b.png)
![](AMBA-APB-AHB-AXI.assets\23495115-d70c90509f18ee03.png)
![](AMBA-APB-AHB-AXI.assets\23495115-9dfe2cbc33e09ee8.png)
#### 仲裁
![](AMBA-APB-AHB-AXI.assets\23495115-b790453c647a764a.png)
![](AMBA-APB-AHB-AXI.assets\23495115-a5a98d581538a8c7.png)
![](AMBA-APB-AHB-AXI.assets\23495115-29a56d47234feb07.png)
#### 时序收敛
* Timing closure
Full Registered
Forward Registered
Reverse Registered
![](AMBA-APB-AHB-AXI.assets\23495115-9d45d7d5c5f80ad1.png)
![](AMBA-APB-AHB-AXI.assets\23495115-567711e65c372f22.png)
#### 如何评估性能
* Bandwidth（带宽），Throughput（吞吐量）和Latency（延迟）
`Bandwidth`是指理论上数据传输的最大传输率，而`throughput`指的是实际数据传输率，以AXI的写通道为例，写操作的数据带宽为：
`Bus clock-freqency * bus width`
很明显，这是一个数据传输的最大值，但实际上数据传输受到很多限制，没有办法达到这么大的数据传输率。
`Latencyt`是一个transfer或者多个transfer从开始到结束的时间：
`Throughtput = Nd/T * f * bus width`
其中，Nd是transfers的个数，T是指整体Latency时间（单位是clock cycle数）
从以上公式可以看出，一个bus的throughput或者有效带宽是跟latency，bus clock frequency，和数据bus的宽度有关的。
* Latency源
在一个bus系统中，跟Latency有关的有以下几种因素：

1. Bus Protocol Latency
不同bus协议传输效率是不同的，也会导致transfer的latency不一样。比如AHB协议的传输至少需要两个clock cycles，一个用于寻址，一个用于传数据。那么对AHB协议，一个transfer就需要至少2个clock cycle latency

2. Arbitration Latency
当多个master要同时访问共享资源的时候，这时候必然需要仲裁，一个master可以访问，那么其他master就需要等待了，这个等待时间就是arbitration latency

3. Slave Processing Time Latency
如果slave不能及时响应的话，slave就需要在总线接口插入wait-state，也就是告诉master或总线的等待时间，这个latency一般就是wait-state的周期个数

4. Clock Domain Synchronization Latency
在一个复杂的SoC系统中，经常会用到异步时钟频率，这时候我们就需要做跨时钟处理，因为在做CDC的过程中，需要synchronizer，这时候也会带来一定的latency

5. Bus Bridges Latency
在一个SoC系统中，我们也会用到多个协议，因此我们需要引入协议转换桥，比如AXI2APB Bridge，AHB2APB Bridge，因此也会引起latency
#### Outstanding对性能的影响
* Three major methods to improve BW
    1. outstanding
    2. Out-of-order（ooo）
    3. interleave
* Outstanding
outstanding 可以改善平均延时，但是并不一定会改善绝对延时，可能会导致绝对延时更差
![](AMBA-APB-AHB-AXI.assets\23495115-81ef5423ff2ea319.png)
![](AMBA-APB-AHB-AXI.assets\23495115-ed80f4289e91cd66.png)
![](AMBA-APB-AHB-AXI.assets\23495115-b69a24f6715eba49.png)
![](AMBA-APB-AHB-AXI.assets\23495115-2e47e1c1a81c93cc.png)
* Outstanding个数
![](AMBA-APB-AHB-AXI.assets\23495115-f46781897a98234f.png)
#### Out-of-order对性能的影响
假如不支持out-of-order
![](AMBA-APB-AHB-AXI.assets\23495115-93bc5d17dfb9d78b.png)
支持out-of-order时
![](AMBA-APB-AHB-AXI.assets\23495115-d37b36c856ac302b.png)
#### interleave对性能的影响
假如不支持interleave
![](AMBA-APB-AHB-AXI.assets\23495115-aeda50a5ec9649eb.png)
当支持interleave
![](AMBA-APB-AHB-AXI.assets\23495115-2ad515dd5fe8cecc.png)
#### 提高Bus性能的其他方法
1. QoS
    * Qos is mainly for latency optimization
How to transfer QoS
![](AMBA-APB-AHB-AXI.assets\23495115-cfcb801c266b6e2d.png)

2. Data/Transfer refine
    1. More friendly for DDR：
        1. Address alignment
        2. Increase Burst Length; Burst combine
        3. Avoid partial write
        4. Read/write group（避免写读写读的操作）
        5. Avoid locked/exclusive access（尽量少用原子操作，atomic）
#### Bus 和 DDR的优化
![](AMBA-APB-AHB-AXI.assets\23495115-30e0f9332a5583bd.png)
![](AMBA-APB-AHB-AXI.assets\23495115-48e49a284690614d.png)
![](AMBA-APB-AHB-AXI.assets\23495115-222e7d929e332518.png)
![](AMBA-APB-AHB-AXI.assets\23495115-1a1b045da942ead5.png)


