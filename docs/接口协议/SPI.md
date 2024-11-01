### Reference
* **SPI Block Guide V03.06 -- S12SPIV3**
* AN991D Using the Serial Peripheral Interface
* Infineon-Component SPI_V2.10-Software Module Datasheets-v02_07-EN.pdf
* introduction-to-spi-interface -- AnalogDialogue
* KeyStone Architecture Serial Peripheral Interface (SPI) -- User Guide.pdf
* pg153-axi-quad-spi.pdf -- XILINX
* QSPI NOR Flash -- The Quad SPI Protocol


SPI 的四种mode，mode 0/3 都是SCK的上升沿采样，下降沿发送数据，区别是mode 0的 sample edge先来（第一个数据发送在CS拉低的时刻），transfer edge后来；mode 3 的 transfer edge先来，sample edge后来，第一个数据发送在第一个跳变沿
APB 接口的 SPI master一般来说存在两种异常情况：
1. 处于数据发送阶段时 tx_fifo empty，也就是tx_fifo underflow
2. 处于数据接受阶段时 rx_fifo full，也就是rx_fifo_overflow
至于 tx_fifo_overflow，rx_fifo_underflow的两种情况，一般来说会通过pready信号对用户进行反压



### SPI master 和 slave 之间的时钟关系
* master输出的SCK由clk_sys内部计数分频出来，但是只能实现2N倍的分频，不是任意整数分频。
* slave输入的SCK和slave内部的clk_sys之间的关系约束需要更加复杂，slave使用内部clk_sys去采样SCK，因为SCK和MOSI是由master发送的，内部进行两级打拍同步后会造成采样后的SCK时钟沿和MOSI存在三个clk_sys时钟周期的delay，对于MOSI信号的采样时间同样就会发生delay，可能会造成无法正确采样到对应的MOSI，因此SCK与clk_sys的时钟频率比率应该能够覆盖掉这几个clk_sys 的 cycle delay。另外如果slave还要给master返回数据的话，这个时钟比的要求就更高了，因为SCK是由master发送的，slave内部的delay对于master而言并不能感知到，master还会在原来的上升沿进行数据采样，slave在SCK下降沿发送的数据必须得能够保证master在原SCK的下降沿稳定采样到。
三个cycle的delay原因是对于SCK进行两级同步需要两个cycle，再判断沿需要多一个cycle的打拍，如果再预留给master两个cycle的采样建立时间，那么一共就需要五个cycle，SCK的半个时钟周期一定要大于这五个cycle，整个频率也就变为clk_sys的十倍。
* 如果slave的系统时钟上不去，synopsys提供了一种额外的方式，就是使用clk_sys的上升沿和下降沿分别对SCK进行同步，这样就能将两级同步的时间压缩到一个clk_sys的cycle内部，从而降低对时钟频率的要求
```
{signal: [
  {name: 'clk_cfg',    wave: 'pppppppppppppppppppppppppppppppp'},
  {name: 'CS',         wave: '10.............................1'},
  {name: 'SCK',        wave: '0.....1....0....1....0....1.....'},
  {name: 'sck_d1',     wave: '0......1....0....1....0....1....'},
  {name: 'sck_d2',     wave: '0.......1....0....1....0....1...'},
  {name: 'sck_d2_inv', wave: '1.......0....1....0....1....0...'},
  {name: 'sck_d3',     wave: '0........1....0....1....0....1..'},
  {name: 'sck_d3_inv', wave: '1........0....1....0....1....0..'},
  {name: 'rx_edge',    wave: '0.......10........10........10..'},
  {name: 'tx_edge',    wave: '0............10........10.......'},
  
  {name: 'MISO',       wave: '2.............2.........2.......'},
  {name: 'MOSI',       wave: '2..........2.........2..........'},
]}
```
