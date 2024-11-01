[LUT是如何实现千万种逻辑结构的](https://blog.csdn.net/weiaipan1314/article/details/104317186)
LUT-6：6输入，1输出
* LUT实现多bit按位异或
n bit的两个信号进行按位异或，会消耗n个LUT2。
* LUT实现规约运算符 ^
n bit输入能够将LUT-6的输入管脚占满，例如11bit输入
![](LUT实现逻辑功能.assets\23495115-1a33e21f55a864d7.png)

12bit输入
![](LUT实现逻辑功能.assets\23495115-974c0fa55b118622.png)
128 bit异或需要26个LUT
128/6 = 21 ... 2
(21+2)/6 = 3 ... 5
(3+5)/6 = 2
共21+3+2=26

* a + b
![](LUT实现逻辑功能.assets\23495115-db80ff1382556f25.png)






