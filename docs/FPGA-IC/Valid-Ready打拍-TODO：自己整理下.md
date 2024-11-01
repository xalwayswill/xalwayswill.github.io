##Reference
【1】https://mp.weixin.qq.com/s/8gXX1cBkVnvhBfXevKSBfw
【2】https://blog.csdn.net/cy413026/article/details/88698824
【3】https://aijishu.com/a/1060000000192860
##握手信号
* 无气泡传输
https://www.796t.com/article.php?id=185983
src_req可以在dst_rdy为0时拉高，充分利用自己内部的以及缓存。
什么是气泡？
我們看整個流水剛剛啟動時，此時中間插入的這些暫存器沒有任何有效資料，這時ready從0到1啟動流水，但receiver卻不能立刻拿到資料，因為資料從sender出發往後傳,必須經過中間這些暫存器一級一級往後傳，這期間receiver要一直拉高ready等待資料傳過來，等待的這些clk就是氣泡。
若是receiver把ready拉下去是中間模組還有沒排乾淨的流水的話，那receiver下次再把ready從0到1啟動時是可以立刻拿到上一次殘留的資料的，所以此時沒有氣泡。
但是一次傳輸一定會把流水排乾淨的，比如一次傳輸16個數據，sender的valid累計16次和ready握上手以後就會拉低等待下一次傳輸，而receiver端要真正收完16個才能把ready拉低，然後再開啟下一次傳輸，也即除了和sender的valid累計握手16次，還需繼續維持k-1個clk作為流水線排空時間（假設中間有K級流水），這樣才算完成一次傳輸。
所以我們可以說每一次傳輸啟動時都會有K個氣泡。

那怎麼消除氣泡呢？由上可知每一級流水對應一個氣泡，所以只要每一箇中間模組都擠掉自己的氣泡即可。類似沒排乾淨流水的狀態，即使receiver的ready不來，前面這幾級流水也還是可先處理並存下K個數據的，所以只需要將暫存器工作的條件改為receiver發了ready或者當前暫存器狀態為空（即OutReady=0），對應到程式碼上就是隻需改一下InReady的邏輯：
valid打拍只需要ready，数据打拍需要valid和ready握手成功

* 前向打拍
![](Valid-Ready打拍-TODO：自己整理下.assets\23495115-97c8ff2c1b557bfb.png)

```
module vld_pipe #(
    parameter RST_EN      = 1'b1,
    parameter BIT_RST_VAL = 1'b0,
    parameter DWIDTH      = 12
)(
    input                   clk,
    input                   rst_n,
    input                   clr,
    //src
    input                   src_vld,
    output reg              src_rdy,
    input      [DWIDTH-1:0] src_data,
    //dst
    output                  dst_vld,
    input                   dst_rdy,
    output     [DWIDTH-1:0] dst_data
);
//=================================================================================
//-FOWARD
//=================================================================================
wire dst_vld_upd;
wire dst_data_upd;

//=================================================================================
//-buf_vld update
//=================================================================================
assign dst_vld_upd = src_rdy;

//=================================================================================
//-buf_vld
//=================================================================================
cbb_rw_reg #(
    .RST_EN      ( 1'b1  ),
    .BIT_RST_VAL ( 1'b0  ),
    .DWIDTH      ( 1     )
) u_buf_vld_upd (
    .clk      ( clk         ),
    .rst_n    ( rst_n       ),
    .clr      ( clr         ),

    .en       ( dst_vld_upd ),
    .data_in  ( src_vld     ),
    .data_out ( dst_vld     )
);
//=================================================================================
//-buf_data update
//=================================================================================
assign dst_data_upd = dst_vld_upd & src_vld;

//=================================================================================
//-buf_data
//=================================================================================
cbb_rw_reg #(
    .RST_EN      ( RST_EN      ),
    .BIT_RST_VAL ( BIT_RST_VAL ),
    .DWIDTH      ( DWIDTH      )
) u_buf_data_upd (
    .clk      ( clk                  ),
    .rst_n    ( rst_n                ),
    .clr      ( clr                  ),

    .en       ( dst_data_upd         ),
    .data_in  ( src_data[DWIDTH-1:0] ),
    .data_out ( dst_data[DWIDTH-1:0] )
);
assign src_rdy = ~dst_vld | dst_rdy;  //remove the bubble

endmodule

```
key2：
```
always @(posedge clk or negedge rst_n)begin
   if (rst_n == 1'd0)
       valid_dst <= 1'd0;
   else if (valid_src == 1'd1)  //???? if ready_dst = 0, then 
       valid_dst <= #`DLY 1'd1;
   else if (ready_dst == 1'd1)
       valid_dst <= #`DLY 1'd0;
end
 
always @(posedge clk or negedge rst_n)begin
   if (rst_n == 1'd0)
       payload_dst <= 'd0;
   else if (valid_src == 1'd1 && ready_src == 1'd1)
       payload_dst <= #`DLY payload_src;
end
 
ready_src = (~valid_dst) | ready_dst
```
#### 解析
**valid_dst** : 当master（source段端）发送数据（拉高src_vld）是，拉高dst_vld，直到当前master没有数据请求，并且slave可以接受请求（拉高valid）时，拉低dst_vld
**payload_dst**：在master发请求(拉高valid_src)，并且前面没有请求、请求已经被接收或者正在被接收时将payload_src打拍赋给payload_dst。
**ready_src**: register slice 或者slave可以接收数据时拉高

* 反向打拍
何時用到skid buffer呢？前面我們也提到模組級流水所有模組的ready都是來自receiver，所以若是中間模組太多或者receiver中ready的邏輯太長，都會造成ready的Timing緊張，這時就需要對Ready也打拍。但是對Ready也打拍後就會出現，後級想停下（拉低ready）但傳給前級會慢一拍，這樣前級就多握一次手，多向後傳一個數據，但後級已經停下了，所以就在本級做一個深度為1的緩衝將其存下來，等後級再啟動時先把它傳過去即可，這樣就避免了由於ready打拍造成資料丟失。
只有dst_vld为1才`src_rdy<=dst_rdy`，其他时刻src_rdy均为1，挤掉气泡
buf_rdy_upd，当src_vld为1且dst_rdy为0时才更新buf_vld
buf_vld_in为进入buf的vld，当dst_vld为1且dst_rdy为0时才拉高buf_vld_in，即下一级拉低ready但是因为打拍没有传到上一级，多出来的一拍握手数据进入buf
buf_vld_upd信号在src_vld有效且dst_rdy为0时拉高（表明下一级反压，但是src_vld依旧有效且src_rdy打拍没有来得及更新，所以需要用buf暂存）或者在buf_vld为高时拉高（表明当前buf内部有数据，当下一级rdy一旦拉高数据就被送出去并再把buf_vld重新拉低）
buf_vld_upd = buf_vld | (src_vld & ~dst_rdy);
buf_vld_in = dst_vld & ~dst_rdy;
en(buf_vld_upd), d_i(buf_vld_in), d_o(buf_vld)
buf_data_upd = ~buf_vld & src_vld & ~dst_rdy
dst_vld = buf_vld | src_vld;
dst_data = buf_vld ? buf_data : src_data
![](Valid-Ready打拍-TODO：自己整理下.assets\23495115-9cd754725726bcfe.png)
**感觉这个rdy_pipe有点复杂，具体逻辑为何还有待研究**
* 下面是一个比较清晰版本的rdy_pipe，是否验证充分有待考量。
```
always @(posedge clk or negedge rst_n)begin
   if (rst_n == 1'd0)
       valid_tmp0 <= 1'd0;
   else if (valid_src == 1'd1 && ready_dst == 1'd0 &&valid_tmp0 == 1'd0)
       valid_tmp0 <= #`DLY 1'd1;
   else if (ready_dst == 1'd1)
       valid_tmp0 <= #`DLY 1'd0;
end
 
always @(posedge clk or negedge rst_n)begin
    if (rst_n == 1'd0)
       payload_tmp0 <= 'd0;
   else if (valid_src == 1'd1 && ready_dst == 1'd0 &&valid_tmp0 == 1'd0)
       payload_tmp0 <= #`DLY payload_src;
end
 
assign payload_dst = (valid_tmp0 == 1'd1) ?payload_tmp0 : payload_src;
 
always @(posedge clk or negedge rst_n)begin
   if (rst_n == 1'd0)
       ready_src <= 1'd0;
   else
       ready_src <= #`DLY ready_dst;
end
```
* 双向打拍
先过ready pipe后过valid pipe
