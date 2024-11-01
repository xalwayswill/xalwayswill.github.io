```
### Reference
[基于三维查找表插值算法的显示器色彩空间转换模型的研究](http://www.designartj.com/ch/reader/download_pdf_file.aspx?journal_id=bzgcgk&file_name=3618E016C89268EC5BE49414EEAFA92CB53D69655D08E5174753FBA88B67B54B3F8D784C32E993DF87584989526651CE596418DBB66B75AB5039015AA6EB0622&open_type=self&file_no=201105021)
[How to create a color gamut](https://zhuanlan.zhihu.com/p/304729311)
[Applications of Tetrahedral Interpolation in Color Conversion Model](https://ieeexplore.ieee.org/document/4722591)
[3D LUT interpolation](https://community.acescentral.com/uploads/default/original/2X/5/518c5ede1ca11c4a7e13f9c7350e2228bb8762c7.pdf)

**使用的是四面体插值，而非三线性插值，计算量小，效果精度更高，论文中的方法使用的是判断当前点在哪个四面体内部，然后当前点与另外四个顶点组成四个四面体，四个四面体面积之和等于大的四面体的面积，根据面积占比去划分各部分的权重**
本文都假定顶点排序按照01234567（从下到上，顺时针旋转）
将大的立方体拆分成小的立方体，每个立方体总共八个顶点，分别存在8个sram中，然后根据像素位置来取顶点值进行计算，**LUT表是11bit，有符号数**
SRAM的读取操作，将所有小立方体的顶点存在8个sram中，通过RGB值判断落在哪个立方体内，然后根据RGB三个维度的坐标去SRAM中取对应的lut值，只有奇数或偶数的立方体有顶点，通过index的最低为来判断是选择当前index还是下一个index。（例如，假设像素落在偶数立方体，同时顶点坐标都是按照偶数立方体计算，则只需要按照坐标取当前立方体的顶点。而当像素落在奇数立方体中，则需要前后两个立方体的顶点值进行拼接来计算）
对于17*17*17的lut，小立方体八个顶点各自对应的数目分别为：
|lut name| number（x*y*z） 
|--|--|
lut_0 | 9x9x9=729
lut_1 | 8x9x9=648
lut_2 | 9x8x9=648
lut_3 | 8x8x9=576
lut_4 | 9x9x8=648
lut_5 | 8x9x8=576
lut_6 | 9x8x8=576
lut_7 | 8x8x8=512

首先根据RGB值对应的index，xyz来从sram中取数据，如果x为奇数，则在x轴方向取顶点0，2，4，6时多向后一个index，如果y为奇数，则在y轴方向取顶点0，1，4，5时向后一个index，如果z为奇数，则在取顶点0，1，2，3时向后一个index，也就得到如下所示的index计算方法
```
addr_lut_0 = (x+x_odd) + (y+y_odd)*9 + (z+z_odd)*81
addr_lut_1 = x               + (y+y_odd)*9 + (z+z_odd)*72
addr_lut_2 = (x+x_odd) +               y*8 + (z+z_odd)*72
addr_lut_3 = x               +               y*8 +  (z+z_odd)*64
addr_lut_4 = (x+x_odd) + (y+y_odd)*9 +                z*81
addr_lut_5 = x               + (y+y_odd)*9 +                z*72
addr_lut_6 = (x+x_odd) +               y*9 +                z*72
addr_lut_7 = x               +               y*8 +                z*64
```
在从SRAM中取出对应的lut值后，由于不同的pixel落在的位置不同，取出的8个顶点坐标顺序需要重新排列，例如cude(1,0,0)的顶点0的坐标是cude(0,0,0)的顶点3，**因此需要根据pixel计算出来的xyz的奇偶性，来对读出的顶点坐标进行不同的重排列，然后进行插值（并不是三线性差值，寻找当前点所在的立方锥也就是四面体进行插值，不是立方体而是四面体）**。
| target | equal | code (xyz)|
|-|-|-|
cude_0(x,y,z) | cude_0(x,y,z) | 000  
| | cude_1(x+1,y,z) | 100
| | cude_2(x,y+1,z) | 010
| | cude_3(x+1,y+1,z) | 110
| | cude_4(x,y,z+1) | 001
| | cude_5(x+1,y,z+1) | 101
| | cude_6(x,y+1,z+1) | 011
| | cude_7(x+1,y+1,z+1) | 111

| target | equal | code(~xyz) |
|-|-|-|
cude_1(x,y,z) | cude_1(x,y,z) | 000  
| | cude_0(x+1,y,z) | 100
| | cude_3(x,y+1,z) | 010
| | cude_2(x+1,y+1,z) | 110
| | cude_5(x,y,z+1) | 001
| | cude_4(x+1,y,z+1) | 101
| | cude_7(x,y+1,z+1) | 011
| | cude_6(x+1,y+1,z+1) | 111

| target | equal | code(x~yz) |
|-|-|-|
cude_2(x,y,z) | cude_2(x,y,z) | 000  
| | cude_3(x+1,y,z) | 100
| | cude_0(x,y+1,z) | 010
| | cude_1(x+1,y+1,z) | 110
| | cude_6(x,y,z+1) | 001
| | cude_7(x+1,y,z+1) | 101
| | cude_4(x,y+1,z+1) | 011
| | cude_5(x+1,y+1,z+1) | 111


cude_0(2a-1,2b-1,2c-1) = lut_0()

17\*17\*17\*3的lut表
整个LUT表共有17\*17\*17\*3(RGB)个lut值，每个lut值12bit，空间划分为16\*16\*16个立方体，每个lut值对应小立方体的顶点，总共17\*17\*17个顶点可划分为3类，大立方体外侧角上的顶点对应的sram大小为9\*9\*9=729，该类顶点有1组，大立方体侧边上的点对应的sram大小为8\*9\*9=648，该类顶点有3组，立方体上下面顶点对应的sram大小为9\*8\*8=576，共3组，大立方体内侧的顶点为8\*8\*8=512，共1组。合计729+648\*3+576\*3+512=4913，小立方体的8个顶点存放在不同的sram中，8个三维的lut表。TT中是每次读取两组lut值，然后根据像素落在奇数还是偶数小立方体中来对读出的lut值进行组合变成所需要的小立方体的顶点lut值，然后进行三线性插值。
TODO：详细的分布图后面整理下画一下，也可以考虑下自己实现时可以怎么操作。

SRAM的使用

|Type| Bit mask| depth|width|num|
|-|-|-|-|-|
|sp|Y|729|36|1|
|sp|Y|648|36|3|
|sp|Y|576|36|3|
|sp|Y|512|36|1|

 RTL实现时通过配置sram_sel的寄存器来进行不同顶点sram的配置，通过wr_chn_sel和rd_chn_sel来对通道进行选择，总共组合起来有8*3=24个sel的选择，节约AHB地址空间（为何lut的数据位宽是12bit）
SRAM的读取操作，将所有小立方体的顶点存在8个sram中，通过RGB值判断落在哪个立方体内，然后根据RGB三个维度的坐标去SRAM中取对应的lut值，只有奇数或偶数的立方体有顶点，通过index的最低位来判断是选择当前index还是下一个index。（例如，假设像素落在偶数立方体，同时顶点坐标都是按照偶数立方体计算，则只需要按照坐标取当前立方体的顶点。而当像素落在奇数立方体中，则需要前后两个立方体的顶点值进行拼接来计算）

里面有个找RGB最大值的运算
rgtg = (diffR >= diffG) //R is greater than G
ggtb = (diffG >= diffB)
bgtr = (diffB >= diffR)

idxP0 = (iR, iG, iB) //当前立方体原点的坐标
使用Rmax表示RGB分量中R最大，则
Rmax = rgtg & ~bgtr
Gmax = ggtb & ~rgtg
Bmax = bgtr & ~ggtb
idxR1 = {iR+Rmax, iG+Gmax, iB+Bmax} //当前立方体从原点向RGB最大分量方向偏移的坐标
idxP2 = {iR+Rmed, iG+Gmed, B+Bmedi} //当前立方体从原点向非RGB最小分量方向偏移的坐标
idxP3 = {iR+1, iG+1, iB+1}
最终四个坐标组成一个立方锥，然后插值（但是感觉这个算法不对劲）
RGB分量最大值方向（也就是最接近的顶点）乘以该分量的系数，中间分量和小分量分别乘以各自的系数。（实际就是四个顶点，哪个离得近哪个占比高，加权累加）
```
