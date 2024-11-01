##Reference
[仲裁器设计（一） -- Fixed Priority Arbiter](https://aijishu.com/a/1060000000147580)
[仲裁器设计（二）-- Round Robin Arbiter](https://aijishu.com/a/1060000000147836)
[仲裁器设计（三）-- Weighted Round Robin](https://aijishu.com/a/1060000000148019)
[Weber - 2001 - Arbiters: Design Ideas and Coding Styles](https://wenku.baidu.com/view/ceedcf878762caaedd33d462?pcf=2&bfetype=new&_wkts_=1673854376220)
[Reconfigurable Parallel Architecture of High Speed Round Robin Arbiter](https://arxiv.org/ftp/arxiv/papers/2003/2003.01107.pdf)

## Fixed Priority Arbiter
从右往左找第一个为1的bit，从低位到高位依次去判断，借助一个higher_pri_reqs来记录低位是否已经有了request， 如果第i位有了request，那么第i+1位一直到最高位的pre_req都是1
```
  logic [REQ_WIDTH-1:0]   higher_pri_reqs;
// For example, highter_pri_reqs[3] = higher_pri_reqs[2] | req[2];
  assign higher_pri_reqs[0] = 1'b0;
  assign higher_pri_reqs[REQ_WIDTH-1:1] = req[REQ_WIDTH-2:0] | higher_pri_reqs[REQ_WIDTH-2:0];
  assign gnt = req & ~higher_pri_reqs;
```
高阶，减一会借位，从右向左第一个1变成0，右侧全部变成1，左侧不变。取反后与原数据相与，只有该bit保持不表仍未1。
```
assign gnt = req & (~(req-1));
```
## Round Robin Arbiter

**只需要把req和上一个周期的pre\_req AND起来**，相当于mask掉已经授权的req，再将剩余的req送到两个Fixed Priority Arbiter中，之所以两个是因为存在所有的req都被mask的时刻，此时相当于所有的req都被grant一次了，需要重新开始grant，此时不能通过pre_req将所有的req给mask掉。
![](仲裁器-TODO：自己整理下.assets\23495115-0d97bf26f82a622e.png)

当no\_req\_masked之后，pointer\_reg并不是要更新到1111或是1110，而是要根据这个时候的request来，比如说这个时候request是0010，那么新的mask就要调整为1100，重新把bit[0], bit[1]都mask掉

## Weight Round Robin Arbiter
