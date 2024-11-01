受限随机测试（constrained-random test， CRT）由两部分组成：产生输入到DUT的随机值的测试代码，以及一个伪随机数生成器（pseudo-random number generator，PRNG）的种子

### 在类中定义随机变量
```
class packet；
  // The random variables
  rand bit [31 : 0] src, dst, data[8];
  randc bit [7 : 0] kind;
  // limit the values for src
  constraint c {src > 10;
                      src < 15;}
endclass

Packet p;
initial begin
  p = new(); // Create a packet
  if (!p.randomize())
    $finish;
  transmit(p);
end
```
### 检查随机化的结果
如果代码中存在冲突的约束会导致随机化失败，所以需要随时对随机化状态进行检测，可通过宏定义的方式定义随机化检测
```
`define SV_RAND_CHECK(r) \
  do begin \
    if (!(r)) begin \
      $display("%s:%0d: Randomization failed \"%s\"", \ `__FILE__, `__LINE__, ``"r`"); \
      $finish;
    end
  end while(0)

initial begin
  Packet p = new();     // Create a packet
  `SV_RAND_CHECK(p.randomize());  // Randomize it
end
```
### 可进行随机化的变量
SV仅支持包含位的集合的变量进行随机化，包括二值及四值类型，虽然随机化只生成二值。可以生成integers，bit vectors等，但不能是随机字符串或者约束中的句柄。
## 约束
### 简单表达式
约束中一条语句最多只能使用一个运算符，A>B可以，A>B>C不支持，因为A>B的返回结果为0或1
### 等价表达式
不能在约束中使用复制，如果要复制应该使用相等运算符 ==
### 权重分布
使用dist关键字结合 :/ 或者 :=操作符，:= 操作符设置权重为指定值，:/ 操作符设置权重均匀分布在所有的值上
```
constraint c_dist {
  src dist {0 := 40, [1:3] := 60};  // 0 weight = 40/220. 1/2/3 weight = 60/220
  dst dist {0 : /40, [1:3] :/ 60};  // 0 weight = 40/100, 1/2/3 weight = 20/100
}
```
### 设置成员及内部操作符
```
class Ranges;
  rand bit [31:0] c;
  bit [31:0] lo, hi;
  constraint c_range {
    c inside {[lo:hi]};  // lo <= c && c <= hi
    // !(c inside{[lo:hi]});  // c < lo or c > hi
}
endclass
```
#### 从数组中选择
```
bit [7:0] vals[] = '{1,2,3,5,8};
constraint c_fib {
  f inside vals;
}
```
可以使用randc 产生数据的下标用于从数组中随机选择元素
### 双向约束
约束块并不是运行代码，而是声明代码。
SV的约束是双向执行的，所有随机变量的约束都是同时被解释的。
### 隐含的约束
A -> B等价于(!A || B)，当B成立，A是否成立都可以，当A成立，B必须成立
### 等价操作(同或)
`<->` 等价于 `((A->B) && (B->A))`
## Solution Probabilities
当两个随机变量存在依赖关系时，不同的优先级会导致不同的随机分布，可使用solve ... before ... 定义优先级
## 多个约束块之间的控制
可使用constraint_mode控制约束块的启用，使用handle.constraint.constraint_mode(arg)控制单个约束块，使用handle.constraint_mode(arg)控制对象内所有的约束块。
## 有效约束
一个有效的约束技巧是创建一些约束来保证随机激励的正确性。
## 内联约束
使用with {}在原约束上增加额外的约束
`t.randomize() with {}`
## pre_randomize and post_randomize
在类中使用pre_randomize 和 post_randomize在随机化前后运行函数
## 随机数函数
![](Randomization.assets\23495115-99a5f598536a3e6b.png)
## 约束技巧和技术
### 使用变量作为参数
### 使用非随机化值
通过使用rand_mode关闭或开启对应变量的随机化
```
p.length.rand_mode(0);  // make length nonrandom
p.length = 42;  // set it to constant value
```
### 使用约束检验值是否正确
如果你修改了部分随机变量，使用handle.randomize(null)将所有变量视为非随变量，如果约束不满足，则返回0
### 随机化个别变量
使用randomize(variables)  // 随机化 variables，及时variables并不是随机化变量，该方法不建议在testbench中使用，只用于寻找bug
### 开启或关闭约束
constraint_mode()
### 使用内联约束来指定约束条件
### 使用external constraint
可以在类定义之外定义约束的主体，该约束的主体可以在test中编写
### 扩展类
## 迭代和数组约束
详见 SystemVerilog for Verification 3rd Edition
