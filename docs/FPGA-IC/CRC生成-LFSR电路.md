# [CRC Generator](http://outputlogic.com/)
# CRC校验公式推导
[CRC](https://blog.csdn.net/u011388550/article/details/45242725)
关键模2除就是异或操作，异或后的结果就是余数（要保证被除数最高位1才能除）
# CRC校验实现方式
根据上面转载的文章的描述，CRC校验实际上就是完成移位异或操作，重点是对于摩尔运算的理解以及代码编写。
以CRC16为例，采用x16+x15+x2+1的生成多项式0x8005（因为高位时钟为1，因此不考虑最高位），当输入一个bit数据时，如果输入数据为1，则左移16位并对生成多项式进行模2除（模2除的实质就是移位模2减，模2减又与模2加对应的真值表相同，因此模2除实际上就是移位模2加）所得余数即为CRC校验码，如果输入数据为0，则左移16位之后仍然小于生成多项式，从而余数就是本身，即CRC校验码。对于多位宽的输入实际上是一样的，只是将位宽拆分为单个bit进行输入。
#Verilog实现
[https://www.cnblogs.com/BitArt/archive/2012/12/22/2827005.html](https://www.cnblogs.com/BitArt/archive/2012/12/22/2827005.html)
![](CRC生成-LFSR电路.assets\23495115-d32258b8b7a1f46e.png)

# C语言实现
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
        crc = crc_init ^ ((ushort)(*(data++))) << 8;  // 源数据流先补8个0，再模2加初值后进行模2除
        for(i = 0; i < 8; i++)
        {
            if(crc & 0x8000)  // 若输入bit为1，则进行模2除取余数（模2减生成多项式即为余数）
                crc = (crc << 1) ^ 0x8005;  // 1000000000000101B，即CRC生成多项式系数的简式
            else  // 若输入bit为0，则直接就为余数
                crc <<= 1;
        }
    }
    return crc;  // CRC终值
}
```
当输入数据过长时，采用直接计算的方法会消耗大量的时间，因此一般采用查表的方式，先生成CRC校验表，然后通过查表获得。

# LFSR实现
首先实现单bit的LFSR CRC生成电路，多bit的就是单个bit逐次输入（模拟每个cycle输入1bit，实际为单个cycle完成计算），将所有bit的生成表达式计算出来，去冗余项，得到最终的生成逻辑表达式，下面以2bit输入生成多项式为x+x2+x3+x4的CRC生成逻辑来进行简单的描述，高位先输入。q0q1q2q3为上一个cycle的LFSR结果。
![](CRC生成-LFSR电路.assets\23495115-ee891a17f1e645c2.png)

![](CRC生成-LFSR电路.assets\23495115-ef96d38771250b40.png)


![](CRC生成-LFSR电路.assets\23495115-95bbd3ab69224040.jpg)
