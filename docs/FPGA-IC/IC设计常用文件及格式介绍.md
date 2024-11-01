![](IC设计常用文件及格式介绍.assets\23495115-95081fde63eb8108.png)

**GDSII：**
用来描述掩膜几何图形的shishi3标准，是二进制格式，内容包括层和几何图形的基本组成

**CIF：**
（caltech intermediate format）,叫caltech中介格式，是另一种基本文本的掩模描述语言。

**LIB：**
DC综合需要转化为 .db
![](IC设计常用文件及格式介绍.assets\23495115-ead17146052bae92.png)
![](IC设计常用文件及格式介绍.assets\23495115-d86fcd51fd83ccf6.png)
![](IC设计常用文件及格式介绍.assets\23495115-87fb9f5a030a19f7.png)
![](IC设计常用文件及格式介绍.assets\23495115-f19c4890f08376e2.png)
![](IC设计常用文件及格式介绍.assets\23495115-18c428e3d9425a6b.png)
![](IC设计常用文件及格式介绍.assets\23495115-4b111ade6ecdcd2b.png)
![](IC设计常用文件及格式介绍.assets\23495115-b2e550900166e2dc.png)
![](IC设计常用文件及格式介绍.assets\23495115-17bb7ecb971a1c49.png)
![](IC设计常用文件及格式介绍.assets\23495115-f50d90422bd33cfe.png)
![](IC设计常用文件及格式介绍.assets\23495115-9a2deda36cfabc37.png)
![](IC设计常用文件及格式介绍.assets\23495115-aaee07fe09de9e05.png)
输入的transition和输出端的load去查找器件的delay，输出load包括走线以及下一级的输入pin


**LEF：**
![](IC设计常用文件及格式介绍.assets\23495115-39dbcf25e1ade35d.png)
![](IC设计常用文件及格式介绍.assets\23495115-01e0bc100002918e.png)

（library exchange format）,叫库交换格式，它是描述库单元的物理属性，包括端口位置、层定义和通孔定义。它抽象了单元的底层几何细节，提供了足够的信息，以便允许布线器在不对内部单元约束来进行修订的基础上进行单元连接。
包含了工艺的[**技术**](http://aax1985.spaces.eepw.com.cn/articles/article/item/30504)信息，如布线的层数、最小的线宽、线与线之间的最小距离以及每个被选用cell, BLOCK, PAD的大小和pin的实际位置。cell, PAD的这些信息由厂家提供的LEF文件给出，自己定制的BLOCK的LEF文件描述经ABSTRACT后生成，只要把这两个LEF文件整合起来就可以了。
![](IC设计常用文件及格式介绍.assets\23495115-0487afb8979ec70a.png)
![](IC设计常用文件及格式介绍.assets\23495115-21568a8d32646e3f.png)


**SDC**
![](IC设计常用文件及格式介绍.assets\23495115-1250f5f7dfc58813.png)
![](IC设计常用文件及格式介绍.assets\23495115-49a18ca4e6374f23.png)
![](IC设计常用文件及格式介绍.assets\23495115-103e9fcd1197cf09.png)
![](IC设计常用文件及格式介绍.assets\23495115-645ddeb7b3a9ca12.png)
![](IC设计常用文件及格式介绍.assets\23495115-01a6c1c71ea462fc.png)
![](IC设计常用文件及格式介绍.assets\23495115-20eec1cea2335f50.png)
![](IC设计常用文件及格式介绍.assets\23495115-126fa167ce89420a.png)
![](IC设计常用文件及格式介绍.assets\23495115-5d1d3a621d14d3aa.png)
![](IC设计常用文件及格式介绍.assets\23495115-015197966547a789.png)
![](IC设计常用文件及格式介绍.assets\23495115-c4feea6fc3a03746.png)
![](IC设计常用文件及格式介绍.assets\23495115-b9988096f9e35d47.png)


[**UPF：**](https://aijishu.com/a/1060000000210678)
Unified Power Format，其作用是把功耗设计意图（power intent）传递给EDA工具，从而帮助实现物理设计。这就类似于综合时的约束，是把跟时序相关的设计意图传达给EDA。说简单一些，UPF就是一些tcl命令，系统架构师通过这些命令的组合，把真实的低功耗设计意图传递给工具。下面是UPF的spec中的解释。
![](IC设计常用文件及格式介绍.assets\23495115-079a40d9ea684321.png)
![](IC设计常用文件及格式介绍.assets\23495115-d065d1db3ddb9863.png)


**DEF：**
（design exchange format），叫[**设计**](http://aax1985.spaces.eepw.com.cn/articles/article/item/30504)交换格式，它描述的是实际的设计，对库单元及它们的位置和连接关系进行了列表，使用DEF来在不同的设计系统间传递设计，同时又可以保持设计的内容不变。DEF与只传递几何信息的GDSII不一样。它还给出了器件的物理位置关系和时序限制等信息。
DEF files are ASCII files that contain information that represent the design at any point during the layout process.DEF files can pass both logical information to and physical information fro place-and-route tools.
 * logical information includes internal connectivery(represented by a netlist),grouping information and physical constraints.
 * physical information includes the floorplan,placement locations and orientations, and routing geometry data.

**SDF：**
     (Standard delay format),叫标准延时格式，是IEEE标准，它描述设计中的时序信息，指明了模块管脚和管脚之间的延迟、时钟到数据的延迟和内部连接延迟。

**DSPF、RSPF、SBPF和SPEF：**
DSPF（detailed standard parasitic format）,叫详细标准寄生格式，属于CADENCE公司的文件格式。
RSPF（reduced standard parasitic format）,叫精简标准寄生格式，属于CADENCE公司的文件格式。
SBPF（synopsys binary parasitic format）,叫新思科技二进制寄生格式，属于SYNOPSYS公司的文件格式。
SPEF（standard parasitic exchange format）,叫标准寄生交换格式，属于IEEE国际标准文件格式。
以上四种文件格式都是从网表中提取出来的表示RC值信息，是在提取工具与时序[**验证**](http://aax1985.spaces.eepw.com.cn/articles/article/item/30504)工具之间传递RC信息的文件格式。

**ALF：**
(Advanved library format),叫先进库格式，是一种用于描述基本库单元的格式。它包含电性能参数。

**PDEF：**
（physical design exchange format）叫物理设计交换格式。它是SYNOPSYS公司用在前端和后端工具之间传递信息的文件格式。描述了与单元层次分组相关的互连信息。这种文件格式只有在使用SYNOPSYS公司的Physical Compiler工具才会用到，而且.13以下工艺基本都会用到该工具。

**TLF：**
TLF文件是描述cell时序的文件，标准单元的rise time，hold time，fall time都在TLF内定义。时序分析时就调用TLF文件，根据cell的输入信号强度和cell的负载来计算cell的各种时序信息。

**GCF：**
GCF文件包括TLF/CTLF文件的路径，以及综合时序、面积等约束条件。在布局布线前，GCF文件将设计者对电路的时序要求提供给SE。这些信息将在时序驱动布局布线以及静态时序分析中被调用。
