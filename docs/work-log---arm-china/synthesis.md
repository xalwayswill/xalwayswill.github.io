使用genus进行综合发现，别人的综合SRAM Q端到内部寄存器没有timing violation，自己的却有，最后排查发现别人的配置文件只添加了_m40c下的一个sram lib 0p63(ram)_0p72(core)的 lib ，而我的配置文件增加了许多额外lib，导致工具选择了更低的电压，导致timing问题，后续综合一定要确定logic和sram的电压配置。
sram和logic是可以使用不同的电压和不用的vt的，因为本身就是独立的物理器件

综合28nm时候发现工艺库名称为HT(ULL)，经过查找发现HT是hight threshold 的意思，ULL代表Ultra low-leakage的意思，另外28nm还有HPC的工艺库，High Performance Compact 。HT工艺路中只有RVT/HVT的器件，HPC的似乎有HVT/SVT/LVT的器件

![](synthesis.assets\23495115-f9eed31e8c8832f7.png)
7T 面积最小，适应于面积要求苛刻的场景，9T性能功耗提升，但是增大了面积，12T类似，都是通过面积平衡功耗和性能

![](synthesis.assets\23495115-6bc184896df921ef.png)

Multi-Channel Length, 对于28nm就是c30 c35 c40 之类

图中命名，规则
![](synthesis.assets\23495115-82a458f3c8089baf.png)
![](synthesis.assets\23495115-01189635221251b6.png)

I31综合过程中，使用TSMC下的库，40nm(9T)大约是16nm(7.5T)的4~5倍（通过NP-4.75倍，GGC-5，DPF-7 ）

I31 40nm综合过程中，遇到rf_sp_n4096x12这个sram q端口的timing过不去，直接Q到reg中间没有其他逻辑，考虑增加multiplexer（从4->8->16），修复sram的timing，另外sram的q端口输出即要到内部逻辑又要到AHB回读，可以考虑把寄存器duplicate，以便于布局布线，修复timining


工作内容不单单是try，还需要配合修改综合编译问题，环境问题等

TSMC16FCLL, Track 7P5T, ssgnp_0p63v_0p72v_m40c
TSMC28HT Track 9T, ssg_cworstt_0p90v_0p90v_m40c
TSMC40LP Track 9T, nlmd_ss_0p99v_0p99v_m40c
