# MIPI
## Reference
[1] MIPI D-PHY Specification
[2] MIPI C-PHY Specification
[3] MIPI DSI-2 Specification

## D-PHY
### 8B9B 编码
MIPI D-PHY可采用8B9B编码进行数据编码，但是很少见到采用该编码的设计，采用8B9B编码情况下PPI接口需要替换为EPPI
1. 为何是8B9B而不是8B10B
个人理解，因为DPHY是通过源同步进行数据传输的，不需要通过CDR恢复时钟，所以对于传输数据的跳变沿要求不高，只是为了进行直流平衡，8B9B已经满足需求，并且8B9B相对于8B10B编码效率更高，带宽损失小
## C-PHY
1. C-PHY的五进制编码
C-PHY每条trio都由三条线进行传输，
C-PHY由3条wire组成一个trio(相当于dphy的lane的概念)，多个trio构成一个link，无专门的时钟通道。每条线各有有三个电平level（0mv(LOW), 100mv(MID), 200mv(HIGH)），三条线能够有多种电平组合，不同信号线之间的电平差异代表不同的传输值，C-PHY为了保证能够准确识别电平差异限制三条wire同时不能有相同的电平值，从而三条wire能够形成3x2=6个wire state，对于任一curr_state来说，next_state有5个可能性，这意味着每个symbol（电平变化）可传递的共5个数据(0-4)，也就是传递log2(5)=2.32bits，等于是将数据变成五进制编码
C-PHY以16bit为单位进行编码转换，16bit共65536个值，对于十进制需要5bit才能覆盖（10^5=100000），而采用五进制则最少需要7bit才能覆盖（5^7=78125），因此C-PHY通过将16bit的二进制编码转换为7symbol的五进制编码，传输效率提高16/7=2.28倍（带宽计算值）
