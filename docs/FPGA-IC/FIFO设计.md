[https://wenku.baidu.com/view/15c1f7d5360cba1aa811dab4.html](https://wenku.baidu.com/view/15c1f7d5360cba1aa811dab4.html)


## 简介
FIFO（First-In-First-Out）是一种先入先出的数据交互方式，广泛应用于数字电路设计中。FIFO根据工作方式不同分为同步FIFO和异步FIFO。
同步FIFO读时钟和写时钟采用的是同一时钟，FIFO内部逻辑都是同步逻辑，常常用于交互数据缓冲。异步FIFO读时钟和写时钟采用的是不同的时钟设计，内部的读写逻辑需要进行跨时钟域处理，异步FIFO常用于跨时钟域交互。
## 同步FIFO
典型的同步FIFO由三部分组成：
1. FIFO写控制逻辑：产生FIFO写地址、写有效信号，同时长生FIFO写满、写错等状态信号
2. FIFO读控制逻辑：产生FIFO读地址、读有效信号，同时长生FIFO读空、读错等状态信号
3. FIFO存储实体
![](FIFO设计.assets\23495115-e8f355fc510f2d71.png)

```
module sync_fifo #(
    parameter DATA_WIDTH = 8,
    parameter DATA_DEPTH = 8
) (
    input                       rst_n     , // Asynchronize reset active low
    input                       clk       , // Clock input
    input                       wr_en     , // write enable
    input      [DATA_WIDTH-1:0] fifo_din  , // write data input
    input                       rd_en     , // read enable
    output reg [DATA_WIDTH-1:0] fifo_dout , //
    output                      fifo_full ,
    output                      fifo_empty
);

localparam ADDR_WIDTH = $clog2(DATA_DEPTH);

reg  [DATA_WIDTH-1:0] mem [0:DATA_DEPTH-1];
reg  [ADDR_WIDTH-1:0] fifo_count;
reg  [ADDR_WIDTH-1:0] wr_ptr;
reg  [ADDR_WIDTH-1:0] rd_ptr;
wire                  push;
wire                  pop;

assign push = wr_en & ~fifo_full;
assign pop = rd_en & ~fifo_empty;

//==========================================
//-- data count
//==========================================
always @(posedge clk)
begin
    if(~rst_n)
        fifo_count <= {ADDR_WIDTH{1'b0}};
    else begin
        case({push, pop})
            2'b00: fifo_count <= fifo_count;
            2'b01: fifo_count <= fifo_count - 1'b1;
            2'b10: fifo_count <= fifo_count + 1'b1;
            2'b11: fifo_count <= fifo_count;
            default: fifo_count <= fifo_count;
        endcase
    end
end
always @(posedge clk)
begin
    if(~rst_n) wr_ptr <= {ADDR_WIDTH{1'b0}};
    else wr_ptr <= wr_ptr + push;
end
//==========================================
//-- data write
//==========================================
always @(posedge clk)
begin
    if(push) mem[wr_ptr] <= fifo_din;
    else mem[wr_ptr] <= {DATA_DEPTH{1'b0}};
end

//=========================================
//-- data read
//=========================================
always @(posedge clk)
begin
    if(~rst_n)
        fifo_dout <= {DATA_WIDTH{1'b0}};
    else if(push)
        fifo_dout <= mem[rd_ptr];
    else
        fifo_dout <= fifo_dout;
end
//==========================================
//-- generate the full and empty siganl
//==========================================
assign fifo_full = fifo_count == DATA_DEPTH ? 1'b1 : 1'b0;
assign fifo_empty = fifo_count == 0 ? 1'b1: 1'b0;

endmodule
```
上述写法读写地址不需要额外的位宽，如果不适用data_count，则读写地址需要增加一位用于判断是读超过写还是写超过读。


异步FIFO
异步FIFO使用格雷码同步，可能会存在快时钟域的指针变化了多次才被慢时钟域同步一次，这是否会违背使用格雷码的宗旨，同一时刻有多个bit反转？
事实是这种时钟频率的差异并不会影响FIFO指针的同步，因为在慢时钟域对快时钟域的指针进行采样时，指针的前一个值已经稳定了，实际上并没有存在多个bit 翻转的现象。即使采样没成功，地址仍然保持上一次的地址，此时也只会降低performance而不会造成功能上的错误。
异步FIFO的异步复位信号应该在各自时钟域内使用异步复位，同步释放的方式

异步FIFO不是2的n次方的深度时，选择中间2n个格雷码作为编码，保证每次只有1bit的翻转
