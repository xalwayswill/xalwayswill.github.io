https://blog.eetop.cn/blog-861869-34250.html
《高级ASIC芯片设计》
![](DC简明教程.assets\23495115-b3ba467f8ca40e07.png)
* **综合三部曲**：
1、  Translate/elabrate 是将 HDL转化为GTECH库元件组成的逻辑电路，这步通过read_verilog进行（verilog代码），verilog代码被读入后，将会被自动translate。GTECH是独立于工艺库的通用元件库。这个时候可以用write -output ./unmapped/design.db输出unmapped的二进制文件。
2、  Mapping 是将GTECH映射到某一指定的工艺库，此网表包含了工艺参数。
3、  Optimization 是将网表按设计者的约束进行优化。

* **一些乱七八糟的知识**
1. .lib 是可读的文本文件，用于描述电子电路库的特性，如时序功耗特性等，可用于逻辑/物理综合及时序分析
2. .db 是不可读的二进制文件，内容与.lib一致，可有lib文件转化而来，是synopsys 工具指定的文件格式
3. NLDM（non-linear delay Model）非线性延时模型，较老的时序模型，电压源模型
4. CCS（Composite Current Source Model）复合电流源模型，synopsys提出
5. ECSM（Effective Current Source Model）有效电流源模型，Cadence提出
6. feedthrough，可通过设置compile_fix_multiple_port_nets 为TRUE加入buffer解决bypass的feed through
7. DCT mode，DC topographic mode，可通过 dc_shell -topo 打开，The main idea of topological synthesis is to have a more accurate wire length (cap and res) instead using wire load model.
8. set verilogout_no_tri true
9. 可通过icc/icc2 将gds2转为mikyway



**1.1 ****什么是DC?** DC(Design Compiler)是Synopsys的**logical synthesis**优化工具，它根据design description和constraints自动综合出一个优化了的门级电路。它可以接受多种输入格式，如硬件描述语言、原理图和netlist等，并产生多种性能报告，在缩短设计时间的同时提高读者设计性能。

**1.2 DC****能接受多少种输入格式?** 支持.db, .v, .vhd , edif, .vgh等等，以及.lib等相关格式。

**1.3 DC****提供多少种输出格式?**  提供.db, .v, .vhd, edif, .vgh等，并可以输出sdc, .sdf等相关格式文件。 **1.4 DC****的主要功能或者主要作用是什么?**  DC是把HDL描述的电路综合为跟工艺相关的门级电路。并且根据用户的设计要求，在timing和area，timing和power上取得最佳的效果。在floorplanning和placement和插入时钟树后返 回DC进行时序验证

**1.5 ****如何寻找帮助?**  帮助可以用3种求助方式： 1.使用SOLD，到文档中寻求答案 2.在命令行中用man+ DC命令 3.在命令行中用info+ DC命令

**1.6 ****如何找到SOLD文档?**  SOLD文档可以在teminal中输入sold&执行。 $> sold& 或者用命令 which **dc_shell**找到dc的安装目录。找到online目录。

**1.7 ****如何配置DC?**  综合设置提供必要的参数给DC，使工具能够知道进行综合时所需要的必要的信息，即重要参数：工艺库，目标库，标志库等等。要在.synopsys_dc.setup上设置好这些参数。而.synopsys_dc.setup要在三个目录下有说明，一个是synopsys的安装目录，一个是用户文件夹，最后一个是工程目录。由后一个设置覆盖前一个文件。  参数包括：search_path, target_library, link_library, symbol_library

**1.8 target_library ****是指什么?**  target_library是在synthesis的map时需要的实际的工艺库。target library是综合和优化使用的std cell library，包含timing power name function load等信息。target_library使用在"compile"过程中，用来生成工艺相关的门级网表。Design [Compiler](https://so.csdn.net/so/search?q=Compiler&spm=1001.2101.3001.7020)根据PPA的要求选择逻辑门去满足设计功能和时序的要求。
target_library 指定工艺库的名称，其单元对应于设计人员想让DC推断出并最终映射到的库单元。
link_library定义其库单元只用于参考的库名称，也就是DC不是使用link_library中的单元进行推断。link_library列表中应包含目标库名，这在DC中读取门级网表时是很重要的。如果链接库列表中不包含目标库名，DC就不能链接网表中已映射的单元，DC生成表示其不能解析网表单元的警告。
target_library和link_library系统变量允许设计人员更好地控制单元的映射。这些变量提供了一种有用的方法将门级网表从一种工艺重新映射到另一种工艺。这种情况下，link_library可包括旧的工艺库名，而target_library可包含新的工艺库名。


**1.9 link_library****如何指定?** 链接时需要的库，通常与library相同，设置时，需要加“*”，表示内存中的所有库。link是Design Compiler ”resolve”设计中例化模块的过程。Design Compiler通过变量“link_library”指定例化模块库的位置。link library中包含memory library和target library。所有在设计中例化的宏模块都应该在link library 中设置。

**1.10 search_path ****的设置?** 该参数指定库的存储位置

**1.11 DA ****和DC有什么区别?**  DA是 Design Analyzer的简称, 它调用dc来进行综合. 但是它是图形化的. 可以看逻辑电路图,当然需要你的库有symbol库.

**1.12 ****为什么要使用DA而不用shell接口?**  暂时我也不知道答案 **1.13 SOLD****是什么?**  SOLD是 Synopsys OnLine Document的简称, 基本包括了synopsys公司的所有工具的文档集合.

**1.14\. translation****这一步是用什么DC命令来实现的?**  我们知道, DC综合过程包括3个步骤: translation + logic optimization + mapping
transition 对应命令为 read_verilog(read_vhdl,等)
logic optimization 和 mapping 对应于 compile

**1.15. ****逻辑优化和映射（logic optimization + mapping）又是用什么DC命令来实现的?**  逻辑优化和映射均在compile命令完成，但是可以指定使用特殊的优化方法：structural 和flatten

**1.16. ****什么是DC script?**  DC script. 是一组dc 命令的集合. 使得综合可以流程化也易于管理.

**1.17. ****基于路径的综合的意思是什么?**  路径（path），是DC中的一个重要概念。它包括4种路径方式： a. input到FF的data口； b. FF的clk到另一个FF的D口； c. FF的clk到输出端口DICDER
d. input到output 基于路径的综合就是对这四种路径进行加约束，综合电路以满足这些约束条件。

**1.18 DC****中的各类参数的单位是如何确定的呢?**  参数的单位由所使用库文件决定，在读入库之后，可以用report_lib去看库的信息，里边有详细的单位说明

**1.19 DC****中的对象有哪些?**  设计变量：一共有八种：Design, cell, reference, port, pin, net, clock, library。其中cell是子设计的例化，reference是多个子设计例化的通称，port是design的输入输出，pin是cell的输入输出。

**1.20 ****什么叫start point 和 end point?**  这两个概念是DC中path概念的起始点和终点。  起始点可以是input和FF的clk 终点可以是FF的data和output。

**1.21 ****如何寻找想约束的对象?**  一个是全部查找包括：all_inputs , all_outputs, all_clocks, all_registers。一个是根据关键词进行查找：find_ports()，find(port,’ ‘)。

**1.22 ****什么叫一个设计(design) ?**  设计是DC中的重要对象，你所要综合的东西就叫design，确切或者说你所要综合模块的top文件。

**1.23 ****什么叫cell ?**  在design中，instance的子设计，称为cell。

**1.24 reference ****是指什么? 和cell 有什么区别?**  当存在一个模块被多次例化，那么该模块就称为reference

**1.25 ****如何读入一个design?**  使用analyze + elaborate 或者 read_verilog, read_vhdl, read_file 命令。

**1.26 analyze+ elaborate ****和 read 命令有什么区别?**  read_file 是可以读取任何SYNOPSYS支持格式的；analyze和eloborate只支持verilog和VHDL两个格式，但是他们支持在中间过程中加入参数而且以便以后可以加快读取过程。

**1.27 ****如何处理多个引用的问题?**  一个方法是使用uniquify，就是把引用几次那么就在内存中换名引入多个子设计，适用于不同时序约束要求；也可以用dont_touch命令，先对多个引用的设计进行编译之后，设置为dont_touch，适用于基本相同的环境要求；还有一种就是把两个引用进行flatten，之后进行综合。

**1.28 link****的作用是什么?** 确定所有文件是否均存在并把它们链接到当前设计。

**1.29 ****环境设置是指什么?**  是指芯片物理上的参数，比如电压，温度等。

**1.30 ****如何设置线载模型?**  使用set_wire_model命令

**1.31 ****如何得知线载模型的种类?**  读取库文件到DC中，使用report_lib看有多少可用的线载模型

**1.32 ****如何设置工作环境变量?**  使用set_operating_conditions

**1.33 ****工作环境变量的类别可以分为哪几类?**  一般可以分为最坏（worst case),典型(typical),最佳（best case)。

**1.34 ****为什么要设置工作环境变量?**  由于我们要做的是一颗要在实际环境中正常工作的芯片，而在不同的温度和环境下的电路的性能有很大影响，因此为了近可能地模拟芯片工作，设置合适的工作环境信息是非常必要的。

**1.35 read ****和 analyze + ealborate做了哪些工作?**  语法检查，建立GETECH库。值得注意的是，read命令不自动执行link操作。

**1.36 getech****库是做何用途的?**  GETCH库是由软宏（soft macros）组成的，是加法器，乘法器之类的东西，这些组件都是在DW里引用的。

**1.37 ****调用getech 库中的加法器之后,如何去自己选择一个设计者需要的加法器?**  暂时没有答案

**1.38 ****调用了加法器之后在优化阶段还能够掉换不同的加法器么?**  暂时没有答案

**1.39 ****如何检查script文件中有何错误呢?**  **dc_shell** -tcl -f

**1.40 ****如果在****dc_shell****启动后, 想修改库,怎么办?**

暂时没有答案

**1.41 ****如何在****dc_shell****环境下执行UNIX命令?**

**1.42 ****优化分为几个层次？**  一个是基于HDL的结构优化转化为GETCH结构；基于GTECH的逻辑优化，包括架构（strcuture），打平（flatten），转化为优化过的GETCH；基于GETCH的门级优化，主要作用是映射到实际的工艺库中。

**1.43 ****什么是约束？** 约束分为design constraint和optimization constraint。design constraint不由用户确定，已经由所采用的库确定了，用户只能添加进一步的约束。optimization constraint分为两个方面，timing constraint和area constraint。timing constraint又可分为组合电路的约束，时序电路的约束以及输入输出的约束。

**1.44 DC Script****支持TCL么？**  dcsh和dc-tcl。前者是SYNOPSYS的内部语言，后者是TOOL COMMAND language（TCL）。

**1.45 ****综合时不想使用某些库单元进行mapping，怎么办？**使用set_dont_use 命令

/******** Part 2 Compile stategy **************/

**2.1 ****约束一个设计分为几个方面?**总的分为，面积约束和时序约束。

**2.2 ****面积约束的命令是什么？**  set_max_area

**2.3 ****如何对时钟进行约束？** 对时钟进行约束是对时钟的周期，波形进行描述。  使用create_clock 建立时钟约束

**2.4 ****如何对pll进行约束？**  如果存在PLL，那么首先对输入的初始时钟用create_clock进行约束。  再用create_propagated_clock 对PLL输出时钟在基于输入时钟进行约束。

**2.5 ****什么叫虚拟时钟约束？**  虚拟时钟是指在当前要综合的模块中不存在的物理时钟。比如，设计外的DFF的时钟。  建立这样的时钟有益于描述异步电路间的约束关系。

**2.6 DC****可以对时钟的哪些特性进行约束？**  DC支持对时钟的周期，波形，jitter，skew，latency 描述

**2.7 ****如何约束时钟的jitter？**  使用set_clock_uncertainty -setup(-hold) 约束时钟的jitter

**2.8 ****如何约束时钟的skew？**  使用set_clock_uncertainty 约束时钟网络的skew

**2.9 ****如何约束时钟的latency？** 使用 set_clock_latency -option ，option is source or network，the default is network。

**2.10 ****如何对当前设计的端口外部条件进行约束？**  端口的外部条件包括输入驱动大小，输出负载的大小，扇出大小。

**2.11 ****输入端口被多大的驱动所驱动？**  可以使用set_dirive 和set_driving_cell

**2.12 ****输出端口要驱动多大的负载？** 使用set_load 对输出电容值进行约束，单位根据工艺库的define所定。

**2.13 DC****是基于path的综合，那么在约束时如何体现？** 我们知道，基于path会有四种路径形式，DC中提供 create_clock定义寄存器和寄存器之间的路径； set_input_delay定义输入与寄存器之间的路径； set_output_delay定义寄存器与输出之间的路径； set_max_delay和 set_min_delay定义输入和输出的组合路径；

**2.14 set_input_delay ****的目的是什么？**  定义输入延时，来约束设计中输入逻辑的时序

**2.15 set_output_delay ****的目的是什么？**  定义输出延时，来约束设计中的输出逻辑的时序

**2.16 ****如何对组合电路进行约束？** 组合电路有set_max_delay 和set_min_delay进行约束 **2.17 ****如何对电路的速度进行约束？**  采用对电路时钟周期的约束的方式来约束电路的速度，使用create_clock

**2.18 ****当一个组合电路超过了时钟周期约束，那么该如何处理？**
