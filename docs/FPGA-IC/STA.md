通过STA工具查看关键路径，了解原因。一半包括如下两个原因：
* 逻辑级数太高
逻辑级数太高需要对组合逻辑进行拆分，插入寄存器
* 布线过长
布线过长可能是由于寄存器扇出过大，导致走线困难，可插入buf或者通过寄存器复制，减少扇出。

通过synplify可以查看综合后的网标文件，选择对应的cell右键可查看该cell例化的source code，从而找到造成时序违例的逻辑代码，对其进行优化。

PVT(Process, Voltage, Temperature)
PPA(Performance, Power, Area)

并不总是在高温下延迟较大，有时在低温下的延时比高温下更大，这是因为在纳米技术下，设备阈值电压相对于供电电压的裕量降低了。在这种情况下，低功率供给时，负载较小的cell在低温下的延时相对于高温下更大。对于高阈值或者标准阈值电压的cell更加明显。这种现象叫做逆温。

![](STA.assets\23495115-4e8cdad7f68c6489.png)
![](STA.assets\23495115-3b593186c530d05b.png)


第7章
静态时序分许无法分析没有约束的路径，因此如果要对输入信号进行静态时序分析，就需要对外部延时进行描述
* set_input_delay
输入延时描述在芯片输入管脚数据相对于时钟的延时
![](STA.assets\23495115-c245023d61e34a24.png)
![](STA.assets\23495115-791e03cee5c182a3.png)
input_delay 描述了数据在**芯片输入管脚处**相对于时钟的延时，max和min参数一起描述了输入数据相对于时钟的变化区间，从而芯片内部可根据时钟周期计算到底内部第一级FF的延迟时间。
如上图所示，输入数据相对于时钟的延时范围为3-6.7ns，时钟周期15ns，则内部有效的建立时间延时在8.3-12ns之间。
* set_output_delay
输出延时
![](STA.assets\23495115-e1f68b69fd0a42b4.png)
上述例A中描述了简单地输出约束，输出延时描述为Tc2+Tsetup
![](STA.assets\23495115-debeff1e12768bc7.png)
例B描述了max和min描述下的输出约束，max和min描述了在数据输出端口，数据相对于时钟的延时关系，将外部延时等效到外部寄存器的建立保持时间上，最小走线延时为0（走线不能为负的延时），因此对应的输出约束为
```
set_output_delay 7.4 -max -clock CLKQ [get_ports OUTC]
set_output_delay -0.2 -min -clock CLKQ [get_ports OUTC]
```
![](STA.assets\23495115-f5e6e863b4cbe98b.png)
```
create_clock -period 100 -waveform {5, 55} [get_ports MCLK]
set_input_delay 25 -max -clock MCLK [get_ports DATA_IN]
set_input_delay 5 -min -clock MCLK [get_ports DATA_IN]
set_output_delay 20 -max -clock MCLK [get_ports DATAOUT]
set_output_delay -5 -min -clock MCLK [get_ports DATAOUT]
```
* TIming Path Group
静态时序分析中，路径根据有效的发起端和有效的终止端计时的。
有效的起始端为：同步设备的输入管脚(ports)和时钟端(pin)，例如FF和存储单元。
有效的终止端为：同步设备的输入端(pin)和输出管脚(ports)
因此，有效的时序路径可以为：
1. 从输入管脚到输出管脚
2. 从输入管脚到FF或者存储单元的输入端
3. 从FF或存储单元的时钟端到一个寄存器或者存储单元的输入端
4. 从FF的时钟端到输出管脚
5. 从存储单元的时钟端到输出管脚
![](STA.assets\23495115-ec6d69e66799e6d8.png)
时序路径根据与终止端相关的时钟划分为不同的路径组（path groups）。因此，**每个时钟都有一个与其相关的时钟集合**。另外，还有一个default path group 包含所有没有被时钟驱动的路径（异步路径）
* 虚拟时钟
虚拟时钟表示存在但是没有绑定到设计中任何端口或者管脚的时钟
`create_clock -name VIRTUAL_CLOCK -period 10 -waveform {2, 8}`
主要用于在进行输入输出约束时，芯片内部没有输入信号的驱动时钟和输出信号的捕获时钟
* Refining the Timing Analysis
`set_case_analyse` `set_disable_timing` `set_flase_path` `set_multicycle_path`
set_case_analysis可用于DFT选择（对于测试链路不进行STA），功能模式选择（只对一个模式进行STA）或者通过CLKMUX对时钟信号进行选择来使STA更容易完成，节约CPU运行时间。
一个时序路径包括发起端和终止端，set_input_delay和set_output_delay会分别创建startpoint和endpoint，从而能够将一条时序路径拆分。set_disable_timing，set_max_delay，set_min_delay同样能够将时序路径拆分。

set_data_check，Setup and hold checks can also be applied between any two arbitrary data Pins, neither of which is a clock.
Distinction with respect to the setup check：
* The data to data setup check is performed on **the same edge** as the **launch** edge
* Unlike a normal setup check of a flip-flop, where the capture clock edge is normally one cycle away from the launch clock edge
