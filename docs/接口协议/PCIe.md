# PCIe 协议学习
## Chapter 2 - Transaction Layer
### 2.2: Translation Layer protocal -- Pcaket Definition
PCIe 采用基于数据包完成两个组件之间的数据传输，PCIe是异步的，请求和响应分离，所以需要不同结构的TLP。需要传输事务通过Requests 和 Completions完成，Completions只有在有Reqired才会传输，同事cmpl需要和对应的requests的transaction ID和packet header保持相同。
### 2.3: TLP Format（TLP格式定义）
### 2.4: Address Space and Transaction Types（地址空间和事务类型）
### 2.5: TLP Prefix（TLP前缀）
### 2.6: TLP Processing Hints（处理提示）

## Chapter 3 - Data Link Layer
### 3.2: DLLP（数据链路层包）
### 3.3: Data Protection（数据保护 - LCRC）
### 3.4: Link Level Flow Control（链路级流控）
### 3.5: ACK/NAK Protocol（确认/否认协议）
### 3.6: Replay（重传机制）

## Chapter 6 - Flow Control
### 6.1: Flow Control Overview（流控概述）
### 6.2: Flow Control Rules（流控规则）
### 6.3: Credit-Based Flow Control（基于信用的流控）
### 6.4: Virtual Channels（虚拟通道）


* TLP有重传，DLLP没有重传机制
* 地址路由，ID路由以及多种路由方式，系统刚上电时候还没有分配地址，只能用ID路由
* Data Link Layer(point-to-point), Transaction Layer(end-to-end)
* InitFC1/InitFC2 主要是为了两次握手，保证两边都确认接收到
* ID 由 bus number, device number, function number决定
* Type 0，BAR 部分RW，部分RO，CPU给寄存器全写1，再读出发现有几位一直为0，从而知道对应设备申请多大空间，然后再重新分配正式的空间
* 不加扰直接8b10b，固定的码型数据会造成大的EMI噪声
* Elastic Buffer来同步恢复时钟和本地时钟造成的数据速率差异，通过插入或者删除SKIP序列
* 接收端的数据链路层并不需要管理FC buffer，因为FC buffer 是区分P/NP/CPL的，这些需要事务层去解析，发送端数据链路层只需要维护我还能发送多少TLP，接收端数据链路层维护我已经释放了多少Credit，发送端事务层只需要告诉数据链路层有一个TLP要发，接收端事务层只需要告诉数据链路层有一个buffer空间释放了，其余的credit计数维护都在数据链路层维护，而实际的FC buffer则是在传输层
