[功耗分析](https://www.cnblogs.com/IClearner/p/6898463.html)
[功耗分析](https://www.cnblogs.com/IClearner/p/6893645.html)
[PTPX UG](https://picture.iczhiku.com/resource/eetop/sYkefefZjIyJFmbB.pdf)
* namemap文件，主要是rtl到综合后netlist的门级name映射
set_rtl_to_gate_name
* netlist.v 综合后的网表 verilog文件，理论上如果使用综合后的网表进行功耗分析，波形文件也应该使用网表文件产生波形，保证波形能够正确反标回去，不然annotated nets/cells 的比例会很低
* fsdb/vcd/SAIF
波形文件或者开关文件，使用 fsdb文件时 PrimeTime和dump fsdb的vcs版本应该对应起来，不然需要先使用fsdb2vcd将fsdb转为vcd使用
* lib文件
library需要添加完整，理论上综合之后除了SRAM，第三方Lib以外，其他的link_library 应该都已经转化为foundry工艺对应的cell，另外set link_library一定要添加 * ，这样才能将当前设计从内存中添加进去，不然会找不到当前设计，都是blackbox
* sdf文件
如果是仿真综合后的网表，最好将sdf添加进去，否则属于no delay 的模型，peak power会特别大。读sdf可以在tb中通过$sdf_annotate()读入，综合切harden的话也可以分别读入并连接到对应的module上，仿真不能加+nospecify，不然会没有delay
* SPEF文件
Standard Parasitic Exchange Format）是集成电路设计流程中EDA工具间传递互连线寄生参数的标准媒介文件。SPEF可以描述多种互连线寄生模型，还建立了信号skew，延迟计算语言和名称映射等功能.
* 不同corner下，leakage随温度和电压差距很大，接近百倍，动态功耗受温度影响不是很大，internal power和switch power会有所增加，`switch power =  αfcv^2`或者`1/2*Tr*c_load*v^2`，α为switch activity，f为频率，c为负载电容，v为电压，Tr为输入信号的翻转率（单位时间内信号(包括时钟、数据等信号)的翻转次数）。internal主要是cell内部门电路以及短路电流功耗
* Output Port的load Capacity 对于功耗的影响主要体现在switch power上，Input transaction对于功耗的影响主要在internal power，transaction time越长，短路电流功耗越大，短路电流同样受到晶体管尺寸与门电路输出负载的影响
[PTPX UG](https://picture.iczhiku.com/resource/eetop/sYkefefZjIyJFmbB.pdf)
