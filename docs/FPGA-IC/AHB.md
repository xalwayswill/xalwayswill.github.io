![](AHB.assets\23495115-88938a5cc29d70e3.png)
多层总线是指AHBLite需要支持多个Master的话需要多层总线访问slave，类似下图
![](AHB.assets\23495115-7619ffb8e674b3f2.png)
![](AHB.assets\23495115-a38a9ba78bf0f714.png)

![](AHB.assets\23495115-9486f9a814123051.png)
![](AHB.assets\23495115-5fbcef88d6b17361.png)
![](AHB.assets\23495115-3306060634adc7b1.png)
![](AHB.assets\23495115-2c22ef28e201b157.png)
![](AHB.assets\23495115-7d41f8fead993a55.png)
AHB是支持流水线的，不像APB最少两个cycle，HWRITE信号只用在地址周期拉起，ready反压时不需要保持。当前cmd的数据周期是晚于地址周期的
AHB的HSEL HTRANS HADDR 和 HSIZE都是只需要在地址阶段有效就可以了，HWDATA则需要在数据阶段有效
![](AHB.assets\23495115-1c133be8978a09e3.png)
![](AHB.assets\23495115-23ab7b8b60e75cfe.png)
HADDR和HSIZE必须对应
![](AHB.assets\23495115-e04058a48eba8c8f.png)
![](AHB.assets\23495115-040da1b9c000ec31.png)
![](AHB.assets\23495115-2343cb083a1e7a7f.png)
![](AHB.assets\23495115-2693ec3b953a44db.png)

Bufferable 是说数据可以先到buffer，就完成传输了，non-bufferable是指数据必须到达最终的slave才算完成传输
![](AHB.assets\23495115-5744be2b2432f22c.png)
