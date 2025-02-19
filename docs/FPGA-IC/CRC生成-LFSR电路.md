# CRC推导及设计
## Reference
[CRC Generator](http://outputlogic.com/)
[CRC8/CRC16/CRC32最全总结](https://blog.csdn.net/lianyunyouyou/article/details/107217125)
## CRC校验公式推导
[CRC](https://blog.csdn.net/u011388550/article/details/45242725)
以CRC32为例：
根据二进制信息码转换成多项式的方法，对于任意一个长度为（m+1）的二进制信息码，可以转换成一个最高次幂为m的多项式：
```
M(x)= Mm×2m+ Mm-1×2m-1+ … + M1×21+ M0×20
```
为求此二进制序列的CRC值，首先将M(x）乘以232，然后再除以生成多项式G（x），所得余数即为CRC32的值。G（x）亦为一个二进制多项式。设除法运算获得的商为Q(x),余数为R（x），那么：
```
M(x)×232/G(x) = Mm×2m × 232/G(x) + Mm-1×2m-1×232/ G(x) + … + M1×21×232/ G(x)+ M0×20×232/ G(x)  --------（公式一）
M(x)×232/G(x) = Q(x) + R(x)/ G(x)                                             --------（公式二）  
```
我们从最高位开始解，将M(x)中最高次项的系数Mm作为一个特殊的M(x)即带入公式二：
```
Mm×2^32/G(x) = Qm(x) + Rm(x)/ G(x)                                           --------（公式三）
```
其中，Mm的值为1，因为最高次项必须为1。Rm(x)是余数，是一个最高次幂为31的多项式。再将公式三代入公式一:
```
M(x)×232/G(x) = M_m×2^m×2^32/G(x) + M_(m-1)×2^(m-1)×2^32/ G(x) + … + M1×2^1×2^32/ G(x)+M0×2^0×2^32/ G(x)

              = {Qm(x)×2^m + Rm(x)/G(x)×2^m} + M_(m-1)×2^(m-1)×2^32/G(x)+ … + M1×2^1×232/ G(x) + M0×2^0×2^32/ G(x)

              = Qm(x)×2^m + {Rm(x)×2/G(x)×2^(m-1)+M_(m-1)×2^(m-1)×2^32/G(x)} + … + M1×2^1×2^32/ G(x) + M0×2^0×2^32/ G(x)

              = Qm(x)×2^m + {(Rm(x)×2 + M_(m-1)×2^32)/ G(x)}×2^(m-1)+ … + M1×2^1×2^32/ G(x)+ M0×2^0×2^32/ G(x)
--------（公式四）
```
公式四中，设
```
{(Rm(x)×2 + M_(m-1)×2^32)/ G(x)}= Q_(m-1)(x) + R_(m-1)(x)/ G(x)           --------（公式五）
```
再代入到公式四中，那么公式四转化为,相当于只留下可以整除的Q(x)，而将余数R(x)一层一层拆解：
```
M(x)×2^32/ G(x)= Qm(x)×2^m+Q_(m-1)(x)×2^(m-1)+{(R_(m-1)(x)×2 + M_(m-2)×2^32)/G(x)}×2_(m-2)+ …+M1×2^1×2^32/G(x)+M0×2^0×2^32/G(x)
```
以此类推，最终获得公式：
```
M(x)×2^32/G(x)=Qm(x)×2^m+Q_(m-1)(x)×2^(m-1)+Q_(m-2)(x)×2^(m-2)+…+Q1(x)×2^1+Q0(x)+R0(x)/G(x)      --------(公式六)
```
根据CRC的定义，多项式R0(x)对应的系数即为我们的CRC32的值。

以上推导过程表明：一个`m+1`位的二进制序列，可以按位求取CRC32的值。运算时，首先从最高位(第`m+1`位，设最右边的为第1位)开始计算，然后依次计算较低位。当输入第n个位`(n<m+1)`时，首先将第`n+1`位运算后的结果乘以2，再将第n的值(0或1)乘以232，两者相加后除以生成多项式G(x)。因此，每一位的CRC32运算就转化成了一个最高次幂为32的多项式除以一个最高次幂为32的多项式（生成多项式），结果（余数）为一个最高次幂不超过31的多项式。
关键模2除就是异或操作，异或后的结果就是余数，要保证被除数最高位为1才能除（及保证被除数大于除数），所以C代码里面会先判断最高为是否为1在与生成多项式进行异或（也就是除以生成多项式），计算所得的余数就是校验位，上一次计算得到的余数就是这一次的初始值，c代码里面首先和crc值的异或操作实际就是加上初始值
## CRC校验实现方式
根据上面转载的文章的描述，CRC校验实际上就是完成移位异或操作，重点是对于摩尔运算的理解以及代码编写。
以CRC16为例，采用`x16+x15+x2+1`的生成多项式0x8005（因为高位时钟为1，因此不考虑最高位），当输入一个bit数据时，如果输入数据为1，则左移16位并对生成多项式进行模2除（模2除的实质就是移位模2减，模2减又与模2加对应的真值表相同，因此模2除实际上就是移位模2加）所得余数即为CRC校验码，如果输入数据为0，则左移16位之后仍然小于生成多项式，从而余数就是本身，即CRC校验码。对于多位宽的输入实际上是一样的，只是将位宽拆分为单个bit进行输入。
#Verilog实现
[https://www.cnblogs.com/BitArt/archive/2012/12/22/2827005.html](https://www.cnblogs.com/BitArt/archive/2012/12/22/2827005.html)
![](CRC生成-LFSR电路.assets\23495115-d32258b8b7a1f46e.png)

## C语言实现
版本一：CRC16，输入数据流为8bit
```
#include <stdio.h>
#include <string.h>

typedef unsigned short int ushort;
typedef unsigned char uchar;

ushort CalcCRC16 (unsigned char *data)
{
    ushort len = strlen(data);
    ushort i;
    ushort crc_init = 0xffff;  // 1111111111111111B，即CRC初值
    ushort crc;
    while(len--)
    {
        crc = crc_init ^ ((ushort)(*(data++))) << 8;  // 源数据流先补8个0（因为CRC多项式为16bit），再模2加初值后进行模2除
        for(i = 0; i < 8; i++)
        {
            if(crc & 0x8000)  // 若输入bit为1，则进行模2除取余数（模2减生成多项式即为余数）
                crc = (crc << 1) ^ 0x8005;  // 1000000000000101B，即CRC生成多项式系数的简式，因为已经判断过最高bit为1，左移后做模2减肯定会消掉最高bit
            else  // 若输入bit为0，则直接就为余数
                crc <<= 1;
        }
    }
    return crc;  // CRC终值
}
```
版本二：CRC8，输入数据流为8bit
```
#define CRC_POLYNOMIAL_8    0x0C
uint8 crc_8(uint8 crc, uint8* pdata, uint32 len)
{
    for (uint32 i = 0; i < len; i++)
    {
        crc ^= pdata[i]; // crc为这次计算的初始值，或者为上一次计算的结果，及这次计算的值模2加上初始值
        for (uint8 j = 0; j < 8; j++)
        {
            if ((crc & 0x80u) > 0)
            {
                crc = ( (uint8)(crc << 1u) ) ^ CRC_POLYNOMIAL_8;
            }
            else
            {
                crc <<= 1u;
            }
        }
    }
    return crc;
}
```
当输入数据过长时，采用直接计算的方法会消耗大量的时间，因此一般采用查表的方式，先生成CRC校验表，然后通过查表获得。

## LFSR实现
首先实现单bit的LFSR CRC生成电路，多bit的就是单个bit逐次输入（模拟每个cycle输入1bit，实际为单个cycle完成计算），将所有bit的生成表达式计算出来，去冗余项，得到最终的生成逻辑表达式，下面以2bit输入生成多项式为`x+x2+x3+x4`的CRC生成逻辑来进行简单的描述，高位先输入。q0q1q2q3为上一个cycle的LFSR结果。
![](CRC生成-LFSR电路.assets\23495115-ee891a17f1e645c2.png)

![](CRC生成-LFSR电路.assets\23495115-ef96d38771250b40.png)


![](CRC生成-LFSR电路.assets\23495115-95bbd3ab69224040.jpg)
