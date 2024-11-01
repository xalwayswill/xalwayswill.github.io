#### clogb2(ceiling of the log base 2) -- 计算信号位宽 (same as the systemverilog build in function $clog2)
```
// This example defines a function called clogb2 that returns an integer which has the value of the ceiling of the log base 2.
function automatic integer clogb2;
  input [31:0] value;
  begin
    value = value - 1;
    for (clogb2 = 0; value > 0; clogb2 = clogb2 + 1)
      value = value >> 1;
    end
endfunction
```

####bin2gray
```
input integer value;
begin
  bin2gray = (value ^ (value >> 1))
end
```

####gray2bin
```
  begin
    func_i = 2;
    func_v = func_value;
    func_result = 0;
    while (func_v != 0) begin
      if((func_v & 1) == 1) func_result = func_result ^ (func_i - 1)
      func_v = func_v >>>1;
      func_i = func_i <<<1;
    end
    gray2bin = func_result; 
  end
```
####minus
对于一个nbit的数，`2^n - a = ~a + 1`，因为 `a+~a={n{1}}`

####abs
```
function automatic integer abs;
  input [n-1:0] value;
  begin
    abs = value[n-1] ? ~value + 1'b1 : value;
  end
endfunction
```

####clock gate
```
module mali_tx300_clock_gate (clk_in, clk_en, dftclkdisable, dftclkenable, clk_out);

  input wire  clk_in;
  input wire  clk_en;
  input wire  dftclkdisable;
  input wire  dftclkenable;
  output wire clk_out;

  reg    clk_enable_lat;
  wire   clk_enable_nxt;

  assign clk_enable_nxt = !dftclkdisable && (clk_en | dftclkenable);

  
  always @ (clk_in or clk_enable_nxt) begin
    if (~clk_in)
      clk_enable_lat <= clk_enable_nxt;
  end


  assign clk_out = clk_in & clk_enable_lat;
endmodule
```
#### 无毛刺切换
![](common-lib.assets\23495115-63c7fe7f43744d40.png)
