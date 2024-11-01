![](RGB2YUV-and-YUV2RGB.assets\23495115-766752f409bb3102.png)

RGB转YUV不需要line_buffer，矩阵相乘得到YUV444的值，YUV444通过crop或者average（average应该会需要line_buffer）得到YUV422的值
YUV422转YUV444类似。

YUV420转422需要一行line_buffer存储UV，Y是否需要line_buffer取决于UV和Y的传输排布方式以及duplicate还是average的模式
YUV422转444不需要line_buffer，因为都是水平方向处理，YUV444转RGB也不需要line_buffer，只是一个矩阵相乘


YUV转RGB关键的是**YUV420 to YUV422**操作时对列向数据进行插值，插出更多的行。分为以下两种方式插值：
1. 先考虑UV分量，假设UV数据伴随第一行的Y数据到来，当前行的UV不进行插值，保持原数据，对于缺少UV数据的行才进行UV的插值。第一行UV(对应Y的line0)到来时已经可以输出了，即在line0输出UV，因为当前行不需要插值，但是在第二行UV(对应Y的line2)到来时才能输出插值出来的UV(对应Y的line1)，这样UV的line0和line1之间就存在一行的bubble。为了避免bubble的产生，需要等到line1的Y到来时再输出line0的UV，这样当line2的Y到来时，第二行的UV也到来了，此时已经可以插值出来line1的UV数据并输出，同时更新SRAM中的line buffer，这种方式只需要1行的line buffer（以Y数据为参考）用于缓存UV数据。如果要保证Y和UV数据对齐，则需要额外的一条line buffer来对Y分量进行delay，共计两条line buffer。
2. 另一种情况是假设UV数据的line number为0.5 2.5 4.5这种，则插值line1 line2 的时候都需要用到0.5和2.5行的UV分量，而2.5行的UV分量是和line2的Y数据一起来的，当line2的Y数据到来时，便可以插值line1的UV数据，但是此时无法像第一种情况一样去更新line buffer里面的UV数据，因为当要插值line2的UV数据时，还需要用到0.5 和 2.5行的UV分量，所以不同于上一种情况，此时UV分量共需要两行line buffer进行存储。再加上如果要对齐Y和UV，则总共需要三条line buffer（1行Y，两行UV）
