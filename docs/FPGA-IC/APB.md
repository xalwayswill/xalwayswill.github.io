APB协议是ARM公司中AMBA协议的一种。最早的APB协议现在叫做APB2，后来又有APB3和APB4。APB协议是向下兼容的，随着时间的推移，根据实际需求，APB3在APB2的基础上添加一些功能，APB4在APB3的基础上再添加了一些功能。后面我会先从最基本的APB2讲起，逐步到APB4。什么是APB协议？在APB3官方文档里有这么一句话：The APB is part of

### APB协议详解

*   *   背景介绍
    *   APB2 - 每次cmd固定两个cycle
    *   *   读操作
        *   写操作
    *   APB3 - APB2基础上增加，pready和pslverr
    *   *   读操作，无等待
        *   读操作，有等待
        *   写操作，无等待
        *   写操作，有等待
        *   错误反馈
        *   *   写操作
            *   读操作
    *   APB4 - APB3基础上增加 PPROT 和 PSTRB
    *   *   PPROT
        *   PSTRB
    *   总结

## 背景介绍

APB协议是ARM公司中AMBA协议的一种。最早的APB协议现在叫做APB2，后来又有APB3和APB4。APB协议是向下兼容的，随着时间的推移，根据实际需求，APB3在APB2的基础上添加一些功能，APB4在APB3的基础上再添加了一些功能。后面我会先从最基本的APB2讲起，逐步到APB4。
什么是APB协议？在APB3官方文档里有这么一句话：
The APB is part of the AMBA 3 protocol family. It provides a low-cost interface that is optimized for minimal power consumption and reduced interface complexity.
The APB interfaces to any peripherals that are low-bandwidth and do not require the high performance of a pipelined bus interface. The APB has unpipelined protocol.
翻译：
APB是AMBA 3协议系列的一部分。 它提供了**一种低成本接口**，该接口经过了优化，可**最大程度降低功耗并降低接口复杂性**。 APB可以连接到任何**低带宽**且**不需要流水线总线接口**的**高性能**的外围设备。 APB是非流水线协议。
紧接着还有这么两句话：
All signal transitions are only related to the rising edge of the clock to enable the integration of APB peripherals easily into any design flow. Every transfer takes at least two cycles.
**所有信号跳变仅与时钟的上升沿相关**，从而能够将APB外设轻松集成到任何设计流程中。 **每次传输至少需要两个周期。**
虽然还没有看到具体的协议内容，但是我们已经知道了**APB协议的特点**：

*   低成本
*   低功耗
*   低带宽
*   无流水线
*   所有信号都是时钟上升沿有效
*   进行一次数据传输至少需要两个周期

## APB2

APB协议里面就是说的怎么进行数据传输，首先协议里面定义了很多端口，我们先来看看APB2协议里这些端口的定义

| Signal | Description |
| --- | --- |
| PCLK | 时钟。APB协议里所有的数据传输都在PCLK上升沿进行 |
| PRESETn | 复位。低电平有效 |
| PADDR | APB地址总线。最大宽度为32位 |
| PSELx | 选通。APB master会将此信号生成给每个slave。它指示已选择的slave，并且需要进行数据传输。 每个slave都有一个PSELx信号。 |
| PENABLE | 使能。当它为高时，表示数据有效 |
| PWRITE | 读写控制。为高时表示写操作，为低时表示读操作 |
| PWDATA | 写数据。master通过PWDATA将数据写到slave，该总线最大宽度为32位 |
| PRDATA | 读数据。master通过PRDATA将数据从slave读取回来，该总线最大宽度为32位 |

看了这个端口定义，大家可能对master和slave还不太明白，解释一下，可以把APB看成一种“线”，这种“线”是来连接两个设备的，一个就是master，一个就是slave，所有的数据传输都是master来控制的，slave来回应。

### 读操作

接下来我们进入主题，研究下APB是具体怎么规定读操作的：master从slave读取数据
![](APB.assets\23495115-f9b064c7454947ef.png)

从这张图我们看出几点：

*   所有的数据都是在PCLK上升沿跳变的
*   T0-T1：初始状态，准备开始数据传输
*   T1时刻：master向总线上发送了地址，这个地址是slave的地址；并且把PWRITE拉低，说明这次数据传输是一次读数据。PSEL拉高，APB协议里可能是有一个master，多个slave，当PADDR将地址发到总线上后，PSEL选择哪一个slave也就定了。
*   T1-T2时刻：保持现状不变，这个时候slave收到了mater的地址，读写控制，salve得知自己要讲这个地址对应的数据发送到master，所以它会做好准备。
*   T3时刻：PENABLE也就是使能信号拉高，这个时候也就是master通知slave进行PRDATA的传输

总结一下：一开始我们就说到，APB数据传输至少需要两个周期，也就是T1-T3。其实很简单，第一个周期做准备工作（把PADDR,PWRITE,PSEL发送到总线），第二个周期进行传输读或写的data（PENABLE拉高，表面当前时刻，数据有效，是master想要的数据！）

### 写操作

我们看看写操作，和读操作很类似
![](APB.assets\23495115-f57f896c0c132acb.png)

*   T0-T1：初始状态
*   T1-T2：master把PADDR和PWRITE放在总线上，通过PSEL选择一个slave，slave得知mater将要进行一次写操作，并且master把需要写进slave的data也放到总线上。
*   T2：PENABLE为高，表示当前数据有效，并且master将data写入slave
*   T3：数据传输结束，再次回到初始状态

通过读写操作的时序图，我们可以看到，无论是读还是写，都是两个周期。在第一个周期，PSEL为高，PENABLE为低，这个时候为data的传输做准备工作；第二个周期里，PSEL和PENABLE同时为高，进行data的传输。

## APB3

在APB2诞生后，随着行业发展，对于APB协议有了新的需求，ARM公司针对这些需求，在APB2的基础上添加了两个端口，**一个是PREADY和PSLVERR**。PREADY是一个对于slave的准备信号，用于扩展APB的传输。PSLVERR是一个错误反馈信号，表示当前传输的数据有误。把这种协议叫做APB3。

只要你理解了APB2，APB3就会很简单，我们直接看时序图

### 读操作，无等待

这种情况和APB2的读操作没有区别。
![](APB.assets\23495115-815d57bf989e1fba.png)

**相对于APB2无非就是多了个PREADY,也就是说，当PSEL为高，PENABLE为高时，总线会看PREADY是否为高，如果为高，则进行数据传输，如果为低，那么等待其变为高。**
我们讨论的这种情况，无等待，无错误，和APB2的没有区别。

### 读操作，有等待

![](APB.assets\23495115-8ecd3457551d803c.png)

我们看到这张时序图，当PSEL和PENABLE都为高的时候，PREADY为低，说明slave没有准备好，再给他一点时间，在T4时刻这条虚线，发现PSEL和PENABLE为高，但是PREADY还是为低，继续等待。在T5时刻这条虚线，发现PSEL，PENABLE，PREADY都为高，说明这个时候采样的Data是我们想要读取的data。

### 写操作，无等待

直接放时序图，和APB2一样，应该不需要再解释了
![](APB.assets\23495115-e6f82601c7768bfc.png)

### 写操作，有等待

![](APB.assets\23495115-1e34ec7553edf687.png)

和之前说的一样，也是先判断PSEL和PENABLE,都为高时再判断PREADY,如果为低，就保持现状，为高这表明数据有效，进行传输。

### 错误反馈

我们可以通过使用PSLVERR来指示APB传输上的错误情况。读取和写入事务都可能发生错误。当PSEL，PENABLE和PREADY均为高电平时，仅在APB传输的最后一个周期内才认为PSLVERR有效，其他时间不考虑PSLVERR。

#### 写操作

![](APB.assets\23495115-50788517fcae93e0.png)

在前面的有等待的写操作的基础上，添加PSLVERR，也就是在T4时刻采样，发现PSEL，PENABLE和PREADY均为高电平的前提下，PSLVERR为高，说明这次数据传输有错误。

#### 读操作

![](APB.assets\23495115-6cec1f7db384a2e1.png)

读操作也是一样，不再赘述。

## APB4

APB4在APB3的基础上添加了两个端口，一个是PPROT,一个是PSTRB。 （其实在平时工作中几乎用不到这两个，主要还是APB3）
PPROT:一种保护信号，可支持APB上的非安全传输和安全传输。
PSTRB:一个写选通信号，用于在写数据总线上进行稀疏数据传输。

我们直接来看看官方文档里对这两个端口的解释

### PPROT

为了支持复杂的系统设计，通常需要互连和系统中的其他设备提供针对非法交易的保护。 对于APB接口，此保护由PPROT [2:0]信号提供。
这个信号位宽为3，每一位代表不同的作用。
**PPROT [0]：普通或特权**

*   低代表正常
*   高代表特权

一些master使用它来指示其处理模式。特权处理模式通常在系统内具有更高级别的访问权限。

**PPROT [1]：安全还是非安全**

*   低代表安全
*   高代表非安全
    这用于需要更大程度区分处理模式的系统中。

**PPROT [2]：数据还是指令**

*   低代表数据
*   高代表指令
    该位指示事务是数据访问还是指令访问。此指示仅作为提示，并非在所有情况下都是准确的。 例如，传输包含指令和数据项的混合。 建议默认情况下，除非明确将其称为指令访问，否则将访问标记为数据访问。

总结一张表就是这样：
![](APB.assets\23495115-b64431a97d98177e.png)

### PSTRB

写选通信号PSTRB使写数据总线上的稀疏数据传输成为可能。 每个写选通信号对应于写数据总线的一个字节。 当置为高电平时，写选通脉冲指示写数据总线的相应字节通道包含有效信息。 写数据总线的每八位有一个写选通脉冲，因此PSTRB [n]对应于PWDATA [（8n + 7）: ( 8n）]。 下图显示了32位数据总线上的这种关系。
![](APB.assets\23495115-911bcc7d36a6513d.png)

## 总结

APB协议中的2，3，4版本，都是在前一个版本上增加了一些功能，但是APB4的PPROT和PSTRB用的特别少，大家可以不用太在意，如果需要用到的时候再去查阅即可。只要能理解APB3中几种类型的数据传输就可以了（掌握时序图）

最后：若有错误的地方，望能指出~
