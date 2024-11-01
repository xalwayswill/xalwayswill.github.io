![](DDR3-简记.assets\23495115-6c3d902e8779d2b4.png)
**DDR3提高传输速率的原因**
DDR2是4bit Prefetch DDR3为**8n Prefetch**（n为DDR接口的物理宽度）。8n-prefetch架构结合DDR双沿采样的接口设计，能够使**DDR3的内部时钟为接口时钟的四分之一**，这也是Prefetch的根本意义所在。

*The DDR3 SDRAM uses a 8n prefetch architecture to achieve high-speed operation. The 8n prefetch architecture is combined with an interface designed to transfer two data words per clock cycle at the I/O pins. A single read or write operation for the DDR3 SDRAM consists of a single 8n-bit wide, four clock data transfer at the internal DRAM core and two corresponding n-bit wide, one-half clock cycle data transfers at the I/O pins.*
8bit预取结合IO管脚处一个时钟传输2个数据位宽的接口设计（DDR），单次读写操作由8n-bits 宽度， DRAM核内部四个时钟的数据传输以及两个
完成单次8n-bits数据的读写操作，DRAM内部需要4次数据传输且IO接口完成两次采样（上下沿），IO管口时钟周期减少一半。
如上图所示物理位宽为16bits，prefetch为8，prefetch数据位宽为8(Burst length) * 16bits(物理位宽) = 128bits
该DDR3一个内部时钟周期可以传输128bits数据。（DDR内部时钟为外部时钟的四分之一，因为外部时钟如CPU能跑很高，所以主要以DDR内部时钟为参考表示传输速率）
上图中，DDR3内部预取128bit数据到READ FIFO，在每个IO时钟的上下沿均传输16bit数据输出。

**BC and BL**
DDR3 突发模式下BL（Burst Length）= 8，但是为了向下兼容，针对4bits突发传输时并笔调后面的4bits数据，这种叫做BC4（Burst chop 4 mode）
![](DDR3-简记.assets\23495115-1cfd88ed6f407bb5.png)
本应传输8bits的数据，结果在传输了4bits后就终止了。这样就浪费了被屏蔽掉的传输时间。但是DDR3是8bits预取的，一个时钟送8bits的数据到传输buffer内，应该不能修改为BL4


# DDR3仿真调试
通过VIVADO生成所需要的IP，然后选择IP右键打开参考模型即可创建并打开XILINX提供的DDR3仿真工程，内含DDR3的sv model。
DDR3仿真调试，ddr3 init_calib_completed 信号没有拉高。
后面分析了半天发现又是sb问题，stupid，给到ddr3的cs信号命名错误（ddr写成DDR）
虽然因为自己的智障踩了坑，但是总体而言还是学到了很多，仿真时的打印，问题的解决。通过仿真日志查看问题，查看哪个模块的进行的打印从而定位问题。仿真时多打印，在关键位置添加一些有标志性的打印。
MIG在仿真过程中会和DDR进行通信的，MIG初始化完成后就会去控制DDR模型。DDR3模型是sv写的，内部写法可以参考。通过task和function实现功能。

