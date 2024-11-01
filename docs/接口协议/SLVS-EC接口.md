SLVS-EC接口是由sony公司提出的一种高速串行接口，用于高速及高分辨率Sony CMOS图像传感器系统的设计（CMOS Image Sensor，CIS）。高接口实现了CIS与DSP之间高帧率的宽带宽的图像数据传输。因此该接口引入了一种优化的包格式与几乎没有冗余的控制协议，并且架构简单，只有两层模型组成：一个链路层，允许使用并行结构对宽带数据进行格式处理；一个物理层，可以提供低功耗的高速数据传输。包含前向纠错功能（Forward Error Correction，FEC），实现了高可靠性、低冗余、低延迟的数据传输应用，且功耗低，物理接口小。
2.0协议最大支持5.0Gbps，4672

高速SERDES -> 控制字识别 -> lane2packet -> CRC -> 帧信息提取 -> packet2pixel -> pixel2chn
