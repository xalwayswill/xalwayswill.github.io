## Reference
[跟老李一起学习芯片设计-- CDC的那些事（1）](https://aijishu.com/a/1060000000145145)
[你真的懂2-flop synchronizer吗-- CDC的那些事（2）](https://aijishu.com/a/1060000000145558)
[常见数电面试题Pulse Synchronizer -- CDC的那些事（3）](https://aijishu.com/a/1060000000145898)
[多bit信号跨时钟域怎么办？ -- CDC的那些事（4）](https://aijishu.com/a/1060000000146119)
[面试必杀技：异步FIFO -- CDC的那些事（5）](https://aijishu.com/a/1060000000146410)
[干货大放送之CDC工程经验总结--CDC的那些事（6）完结篇](https://aijishu.com/a/1060000000146591)
[https://zhuanlan.zhihu.com/p/146418485](https://zhuanlan.zhihu.com/p/146418485)
**[synchronizer-techniques-for-multi-clock-domain-socs-fpgas](https://www.edn.com/synchronizer-techniques-for-multi-clock-domain-socs-fpgas)**
“three edge” require
![](跨时钟域(CDC).assets\23495115-25fafb6648aee6d8.png)
## 亚稳态
亚稳态是指信号在正常运行的某些时间点上，不能稳定的判定为0或1的状态
在多个时钟域的设计中，亚稳态无法避免，但是亚稳态的有害影响可以被规避掉
![](跨时钟域(CDC).assets\23495115-5521cbca18bfd598.png)
## 同步器
这里有两种同步场景：
1. 时钟域之间传输的数据允许被错过，例如异步FIFO中使用的格雷码计数器并不需要在另一个时钟域捕获到所有合法的编码值，但是在产生空满标志时其采样值被正确的识别是非常重要要的
2. 时钟域之间的每个信号都需要被传输成功
### 两级同步器
第一个触发器采样从另一个时钟域输入的信号，然后经过一个时钟周期来等待第一级输出的亚稳态衰减，然后第一级输出的信号被第二级触发器在同一个时钟域内进行采样，之后第二级触发器输出就是一个稳定并且有效的同步信号。
![](跨时钟域(CDC).assets\23495115-e1ed8f3252463804.png)
理论上来说，可能存在第一级触发器输出仍然处在亚稳态状态，并且导致第二级触发器输出也存在亚稳态的情况
对于大多数同步应用来说，两级触发器能够有效的移除所有可能存在的亚稳态。
### MTBF - mean time before failure![](跨时钟域(CDC).assets\23495115-f6e023121225579a.png)

![](跨时钟域(CDC).assets\23495115-76e656021fe705f6.png)
如果设计频率较高，建议使用三级同步器，增加寄存器可以避免亚稳态传播，但是不能纠正逻辑正确性。多级寄存器可以保证最后一级能够采样到稳定的值。但不一定能够采样到正确值。
### 在发送端将输出信号使用寄存器同步
数据在发送端发送到接收时钟域之前，应该首先使用寄存器进行同步，避免组合逻辑输出产生毛刺，降低了了MTBF中的数据反转率
### 对输入到接收端的信号进行同步
在数据发送到接收端之前，在发送端进行同步，减少毛刺
## 同步快时钟域信号到慢时钟域
如果一个快时钟域的时钟频率是慢时钟域的1.5倍，则同步一个慢时钟域时钟到快时钟域通常并不是一个大的问题，因为快时钟域能够采样到慢时钟域信号一到两次。（“three edge” requirement，输入信号需要在三个目的时钟沿保持稳定）
### 问题-传输一个跨时钟脉冲
1. 脉冲宽度在1.5个采样时钟以上，直接使用两级同步器（只适用于脉冲宽度满足该条件的情况下），之后在目的时钟域检测脉冲信号
2. 简单的展宽脉冲信号，然后在目标时钟域进行采样，这种只能应用在某些时钟频率固定的场景下。
3. **Handshake synchronization** 增加握手信号
clka下的脉冲信号，同步到clkb时钟域下，它对于clka与clkb的时钟频率关系没有任何限制，快到慢，慢到快都没问题。其主要原理就是先把脉冲信号在clka下展宽，变成电平信号，再向clkb传递，当确认clkb已经“看见”信号同步过去之后，再清掉clka下的电平信号。
4. **Toggle synchronizer** 快时钟域检测到脉冲沿后切换握手电平，慢时钟域检测到电平变化后产生脉冲（**该场景要求脉冲频率不能过高**，相对于握手方式发送方不知道接收方是否已经收到信号）
5. **Pulse synchronizer** In handshake based pulse synchronizer , synchronization of a pulse generated into source clock domain is guaranteed into destination clock domain by providing an acknowledgement. There is one restriction in pulse synchronizer that back to back (one clock gap) pulses cannot be handled. To make sure the next generated pulse in source clock domain gets definitely transferred and synchronized in the destination clock domain, the handshake based pulse synchronizer generates a “Busy” signal
## 多bit信号跨时钟域
多bit信号跨时钟域传输在下一个时钟域的上升沿采样会存在小范围的延时偏差，需要采用多bit跨时钟域策略来避免采样偏差
### 多bit跨时钟域策略
1. 多bit信号合并，可能的话应该考虑将多个CDC bits转换为1bit CDC 信号（比如讲另个en信号转化为一个后传输）
2. 多周期路径模式，使用一个同步后的load信号来安全的传递多bit信号（可以在接收端采用异或门获得load信号的反转产生脉冲信号来表示数据的更新，在脉冲产生时对数据进行采样），完整的解决方式是使用握手信号
3. **Gray encoding for multi bits signal** 使用格雷码传输
对于FIFO设计，好的考虑是保证计数器不会超过他们的边界，这可能会导致错过空满标志的检测。虽然在跨时钟域是采样到的格雷码计数值经常会错过，但是设计是稳健的，所有重要的gray码值都会被适当的采样到。详见下述参考文献
Clifford E. Cummings, “Simulation and Synthesis Techniques for Asynchronous FIFO Design,”
SNUG 2002 - www.sunburst-design.com/papers/CummingsSNUG2002SJ_FIFO1.pdf
4. **Recirculation mux synchronization** 在使用握手信号进行multi-bit的传输时，需要对req和ack信号进行两次握手（req拉高，ack拉高，req拉低，ack拉低），性能非常慢，在一些需要提高性能的场景下可使用recirculation mux synchronization 来对带有单bit control 和 data 信号的数据进行跨时钟域，通过 dual flip flop 或者toggle synchronization来对control信号进行跨时钟域，然后使用跨时钟域后的control信号控制对data进行采样。
5. **Async FIFO** 异步FIFO是对连续多bit数据进行跨时钟域处理的最佳选择，且对于两端的时钟比例关系没有约束，但是FIFO的深度需要计算
* 异步FIFO使用格雷码同步，可能会存在快时钟域的指针变化了多次才被慢时钟域同步一次，这是否会违背使用格雷码的宗旨，同一时刻有多个bit反转？
事实是这种时钟频率的差异并不会影响FIFO指针的同步，因为在慢时钟域对快时钟域的指针进行采样时，指针的前一个值已经稳定了，实际上并没有存在多个bit 翻转的现象。
## 命名约定和设计划分
