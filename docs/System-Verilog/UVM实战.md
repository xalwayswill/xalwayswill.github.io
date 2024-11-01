结合*UVM_Class_Reference_Manual*以及*uvm_users_guide_1.2.pdf*学习
验证平台中所有的组件因该派生自UVM中的类
class my_unit extends uvm_units
UVM采用树形结构
所有派生自uvm_component的类在其new函数中都要指明两个参数：string 类型的 name和uvm_component类型的parent
functon new(string name = "", uvm_component parent = )

## driver
driver所作的事情几乎都是在main_phase中完成，phase统一使用xxxx_phase命名，可以说实现一个driver就是实现其**main_phase**
**driver属于参数化的类，传入的参数类型就是transaction类型，内部有一些预先定义好的成员变量如req，其类型就是传递给uvm_driver的参数**

类的实例化
A a_inst；
a_inst = new();

**尽量使用uvm_info代替display**
**factory机制，其实现被集成在了uvm_component_utils这个宏中**，一个功能是将my_driver登记在UVM内部的一张表内。在driver引入factory机制后，便可在top_tb中**通过run_test创建一个my_driver的实例，并自动调用其main_phase**

## objection机制
控制验证平台的关闭，**raise_objection必须在main_phase(phase.raise_objection)中第一个消耗仿真时间**。每个phase中UVM会检查是否由objection被提起，并等待该objection被撤销（phase.drop_objection）后停止

## virtual interface
在验证平台中应尽量避免使用绝对路径，使用interface来进行处理。interface只能在module中声明，在class中只能使用virtual interface
但为了将顶层的接口与my_driver中的虚接口对应起来，还需要通过config_db机制
在tb中连接DUT时不需要指定interface内部的时钟块（时钟块只是保证在使用该interface时时钟块内的信号驱动和采样是同步的），只需要连接对应的信号。多个agent需要多个interface，输入输出使用的interface是不同的

## config_db机制
通过set、get机制，在top_tb中执行set操作，在driver中执行get操作（通过**build_phase**，build_phase是在new函数之后main_phase之前执行的，不消耗仿真时间，总是在仿真时间为0时执行），不同于main_phase，build_phase为函数，而main_phase为task
uvm_fatal宏与uvm_info类似，但一旦打印第二个参数传入的信息就会直接调用verilog的finish函数来结束仿真，用于表示验证平台出现了重大问题而无法继续
UVM通过run_test语句创建的my_driver的实例名为uvm_test_top
set 不仅可以传递接口还可以传递数据

## transation
transaction用于信息的传递，是一个抽象的概念，可认为一笔transaction就是一个包，不同的验证平台会有不同的transaction，其基类为uvm_sequence_item，transaction需要从uvm_sequence_item中派生才能使用UVM强大的sequence机制，使用uvm_object_utils来实现factory机制，和my_driver是有区别的，生命周期有限，从仿真的某一阶段产生，经过driver驱动，在经过reference model处理，最终由scoreboard比较完成后结束生命周期。UVM中具有类似特征的类都需要使用**uvm_object_utils**宏来实现。

## env
通过引入一个容器类uvm_env，在该容器类中实例化driver、monotor、reference model和scoreboard等，在调用run_test时传入该容器类而不是my_driver（**run_test只能实例化一个实例，并且run_test相当于在top_tb结构层次之外建立一个新的结构层次**）
容器类与my_drive一样在仿真时是一直存在的，使用uvm_component_utils宏来实现factory的注册。**使用factory机制注册过的类都应该也才能使用type_name::type_id::create的方式进行实例化，以便使用factory机制中的重载功能**

UVM通过new函数中parent的形式建立起树形的组织架构，**由run_test创建的实例是树根**（此处为my_env），并且名字书固定的为uvm_test_top，长出枝叶的过程需要在my_env的build_phase中手动实现，无论是树根还是树枝，都必须由uvm_component或者其派生类继承而来。先执行my_env的build_phase，再按照顺序执行其他的build_phase，之后才是别的phase


## monitor
验证平台实现DUT行为的组件是monitor。driver负责把transaction级别的数据转变成DUT的端口级别，并驱动给DUT，monitor的行为与其相对，用于收集DUT的端口数据，并将其转换成transaction交给后续的组件如reference model、scoreboard等

结构与其他的基本一致，new，build_phase（vif, get/set），main_phase（task，function）
派生自uvm_monitor，也需要一个if，仿真过程中一直存在，是一个component，需要使用uvm_component_utils宏注册，实时收集数据需要while(1)
可在env中实例化两个monitor，分别用于监控DUT的输入（相当于将driver输出的transaction输出至后端reference model等）和输出端口

## 封装成agent
由于driver和monitor之间代码高度相似，UVM通常将二者封装在一起，组成一个agent，不同的agent代表不同的协议
派生自uvm_agent类，是一个component，使用uvm_component_utils宏来实现factory注册。其build_phase中依据is_active的值来决定是否创建driver实例，is_active为uvm_agent的一个成员变量，其类型为uvm_active_enum为一个枚举类型变量
将driver和monitor封装为agent后，在env中只需要实例化agent而不需要直接实例化driver和monitor了。
除在build_phase中实例化外，在new中也可以实例化，但是不推荐，is_active传递麻烦

## reference model
reference model用于完成和DUT相同的功能，输出被scoreboard接收，和DUT输出进行比较
在UVM中通常使用TLM实现component之间transaction级别的通信
数据的发送有多种方式，一种使通过uvm_analysis_port（参数化的类，其参数是要传递的数据的类型），通过write函数将数据写入
接收方式也有多种，其中一种为使用uvm_block_get_port（参数化的类，参数为需要接收的数据类型）通过port.get任务来得到数据
发送接收完成后使用fifo将两个端口联系在一起。fifo定义在env中，使用connect_phase相连。使用fifo是为了blocking_get_port处于忙的状态时，如果write写入数据就需要进行缓存。
**connect_pahse在build_phase执行完之后立即执行，但是是从树叶到树根的顺序执行的**

## score_board
在main_phase中通过fork建立两个进程，一个用于处理exp_port的数据，将数据放在expect_queue中；两外一个处理act_port的数据（DUT输出数据），当收集到这些数据后exp_queue弹出之前从exp_port收到数据，并使用compare函数对数据进行比较。由于reference model基于高级语言处理，一般不需要延时，能够比act_port输出早，所以需要queue进行存储。

## 加入field_automation机制
使用uvm_object_utils_begin 和 uvm_object_utils_end来实现my_transaction的factory注册，在这两个宏中间使用uvm_field宏注册所有字段。uvm_field系列宏随着transaction成员变量的不同而不同。经过宏注册后，即可直接调用copy(reference model)、compare(socre board)、print(transaction)等函数
另外field_automation能够简化driver和monitor的编写。通过调用pack_bytes将tr中所有的字段变成byte流放入data_q中，同时字段按照uvm_field系列宏书写的顺序排列。unpack_bytes函数的输入参数必须为一个动态数组。

## sequence（sequence，sequencer）
sequencer是一个uvm_component而sequence是一个uvm_object。
sequencer派生自uvm_sequencer，uvm_sequencer为一个参数化的类，参数为my_transaction
sequencer产生transaction，而driver负责接收transaction
sequencer也需要加入agent中，并在agent中将其seq_item_export与drv的seq_item_port连接，从而能够使用get_next_item，try_next_item，item_done等方法

![](UVM实战.assets\23495115-ed3b04f63913e514.png)

只有在sequencer的帮助下，sequence产生出的transaction才能最终送给driver。
sequence就像是一个弹夹，里面的子弹是transaction，而sequencer是一把
枪。sequencer为uvm_component，而sequence为uvm_object

## field_automation机制
`uvm_filed_* 宏通过包含在`uvm_*_utils_begin和`uvm_*_utils_end宏块中自动实现一些数据才做方法，包括copy，compare，pack，unpack，record，print 和 sprint，并且在使用时可以通过修改UVM_ALL_ON参数设置哪些方法使用哪些不使用。uvm_field系列宏有很多种，根据数据类型的不同所用的宏也不同

## 打印信息的控制
UVM通过冗余度级别的设置提高仿真日志的可读性，小于设置的冗余度的信息才会被打印
不同的component可设置为不同的冗余度阈值，且可通过递归调用的方式设置其下所有打印的级别
并且可重载打印信息的严重性，从而将一定级别打印信息重写为其他级别的打印信息，重载严重性只能针对某个component中的某个ID起作用。UVM_FALAT会立即终止仿真，ERROR达到一定数量也会终止。

## config_db机制
uvm_config_db#(T)是静态的，因此调用时必须使用::操作符
`uvm_config_db#(T)::set(this, "*", "A", )`
通过get_full_name可以得到component的路径
![](UVM实战.assets\23495115-2198aad9a497793a.png)
uvm_top的名字是__top__，但是在显示路径的时候，并不会显示这个名字，只显示从uvm_test_top开始的路径。
路径与层次结构不太一样，在使用create创建实例是输入的参数名为路径，所以为了保持一致，尽量保持变量名与例化时传递的名字保持一致。
set第一个和第二个参数联合起来组成目标路径，与此路径符合的目标才能收信，第一个参数必须是uvm_component的指针，第二个参数是相对此实例的路径，第三个参数表示一个记号，第四个参数是要设置的值。
get函数中的第一个参数和第二个参数联合起来组成路径。第一个参数也必须是一个uvm_component实例的指针，第二个参数是相对此实例的路径。一般的，如果第一个参数被设置为this，那么第二个参数可以是一个空的字符串。第三个参数就是set函数中的第三个参数，这两个参数必须严格匹配，第四个参数则是要设置的变量。
uvm_root::get()即uvm_top
UVM规定层次越高，优先级越高，层次指的是在UVM树中的位置，越靠近树根层次越高
* 非直线的设置与获取
例如在driver中获取其他component设置给其的参数，称为直线的获取，而在其他例如reference model中获取设置给driver的参数称为非直线的获取。非直线的设置需要仔细设置set函数的第一和第二个参数。
在使用非直线设置时应该避免在同一层级之间进行，因为build_phase是自顶向下的，同一层级之间的顺序未知，可能会导致set和get执行顺序不一致，从而出现get获取不到。非直线设置应该是用于树根向下面多个模块设置同一个参数时，避免写过多的直线设置，如top给scb和ref_model设置同一个参数。
`check_config_usage` `print_config`
## TLM1.0
**Transaction Level Modeling（事务纪建模）**，transaction level是相对于DUT中各个模块之间信号级别的通信来说的，也可以认为是各个component之间传输transaction用的
在使用TLM之前需要先明白transaction是什么。transaction是一个类对象，包含两个component之间通信单元建模所需要的的所有信息，transaction对象内部包含变量，约束，另外的一些field和方法用于生成和操作transaction
[https://blog.csdn.net/qq_41394155/article/details/82144536](https://blog.csdn.net/qq_41394155/article/details/82144536)

**端口的按照类型可以划分为三种：**
* port：经常作为initiator的发起端，也凭借port，initiator才可以访问target中实现的TLM通信方法。
* export：作为initiator和target中间层次的端口。
* imp：只能是作为target接收request的末端，它无法作为中间层次的端口，所以imp的连接无法再次延伸。

**常规操作步骤：**
1. 定义TLM传输中的数据类型，上面分别定义了request类和response类。
2. 分别在各个层次中的component中声明和创建TLM端口对象。
3. 在各个层次中通过connect()函数完成当前层次与下一级层次之间的端口连接。
4. 在各个imp端口创建的类中要实现各自需要提供给initiator的可调用方法。例如，在comp2中由于有一个uvm_nonblocking_put_imp #(request, comp2) nbp_imp，因此需要实现两个方法try_put()和can_put();而comp4中有一个 uvm_blocking_get_imp #(request, comp4) bg_imp，则需要实现对应的方法get()。读者要注意的是，这些方法是必须实现的，否则端口即使连接也无法实现数据的传输。

一个transaction就是把具有某一特定功能的一组信息封装在一起而成为一个类
TLM通信中有如下个几个常用的术语：
* put操作，A将一个transaction发送给B，A为发起者，A具有的端口成为PORT，B为目标，B的端口成为EXPORT
* get操作，A向B索取一个transaction，A依然是发起者及PORT，B仍然是目标EXPORT
PORT和EXPORT体现的是控制流而不是数据流
*transport操作，相当于一次put加一次get操作

PORT和EXPORT体现的是控制流而不是数据流，发起者拥有的是PORT端口
IMP承担了UVM中TLM的绝大部分实现代码，其中put、get、peek等关键字并不是代表其发起相应的操作，而是只意味着他们可以和相应类型的PORT或者EXPORT进行通信，且通信时作为被动承担者。PORT、EXPORT、IMP优先级从高到低，只能高优先级连接低优先级。重点是实现对应的操作函数，如PORT调用EXPORT的put，EXPORT的put调用IMP的put，最终IMP的put调用相应的任务。
UVM还支持同一优先级之间的连接
 
analysis端口
* 一个analysis_port(analysis_export)可以连接多个IMP，也就是说analysis_port和IMP之间是一对多的通信，而put和get系列端口与对应的IMP之间的通信是一对一的，analysis_port更像是一个广播。analysis_port与一般的port之间的主要差别是端对多与端对端。
* put和get系列端口有阻塞和非阻塞的概念，但是analysis_port（export）没有，因为其本身就是广播，不必等待连接端口的响应。
IMP必须是uvm_analysis_imp，analysis_port（export）只有write一种操作，analysis_imp所在的component必须具有write函数

port和analysis两种通信方式的主要区别在于put/get port需要一个对应的export来提供put/get方法的实现，而analysis（观察者模式）重点在于特定的component（例如monitor），能够产生transaction stream 而忽视实际连接到的目标

analysis port只包含一个简单地write方法，当analysis_port.write调用后，analysis_port通过列表调用连接在上面的export

FIFO通信
FIFO本质是一块缓存加两个IMP
![](UVM实战.assets\23495115-fa01d67584a162ba.png)
![](UVM实战.assets\23495115-8f482e73ee62d115.png)
其中，圆圈虽然命名为export但本质上都是imp

主要是用FIFO实现不同component之间的连接
# phase机制
phase的引入是为了解决何使结束仿真的问题，更多的是面向task phase而不是funtion phase
根据似乎否消耗仿真时间分为 function phase（build_phase、connect_phase等）和task_phase（run_phase）
![](UVM实战.assets\23495115-885e53fd25953bf4.png)
所有不耗费仿真时间的phase都是自下而上（指层次上的顺序）执行的，如connect_phase
run_phase、main_phase等task_phase也都是按照自下而上的顺序执行的，但是这种task phase是消耗时间的，这些run_phase通过fork_join_none的形式全部启动。
同一类消耗时间的phase执行完成后才开始下面的phase，相同的phase执行顺序是字典顺序（1.2版本是）并采用深度优先方式遍历
phase的跳转，phase可以跳转到他的前序phase或者后序phase，但是不能跳转run_phase，因为run_phase是与其他12个phase并行的
可使用UVM_PHASE_TRACE命令行参数来对phase机制进行调试
# objection机制
raise_objection, drop_objection
当当前phase所有的objection都被撤销后，UVM会直接跳到下一个phase。
**如果想执行一些耗费时间的代码，那么要在此phase下任意一个component中至少提起一次objection。**这些只适用于12个run-time的phase，对于run_phase并不适用。**由于run_phase与动态运行的phase是并行运行的**，如果12个动态运行的phase有objection被提起，那么run_phase根本不需要raise_objection就可以自动执行
![](UVM实战.assets\23495115-1427fb356bce3ae3.png)
一般function phase不需要提起和撤销objection
objection一般可以在scoreboard中控制，或是在sequence中提起sequencer的objection，当sequence完成后，再撤销此objection，UVM的设计哲学就是全部由sequence来控制激励的生成，更推荐这种方式
使用drain_time设置延时，一个phase对应一个drain_time
UVM提供UVM_OBJECTION_TRACE命令行来进行objection的调试
# domain的应用
domain将不同的组件分为相对独立的部分，可分别复位、配置、启动。domain只能隔离run-time的phase，对于其他phase还是同步的，及run_phase依然同步，function phase也同步

# UVM中的sequence
## sequence基础
start_item()接收sequence_item类型的句柄作为参数，该函数会阻塞该代码块，直到sequencer授权该sequence后进行该sequence的配置并在finish_item之后sequence_item才可以到达driver
finish_item()
不要使用pre_/post_body，尽量通过body实现或者基类的方式，调用super.body()
## sequence的仲裁机制
uvn_do或者uvm_do_with产生的transaction的优先级是默认的优先级，可通过uvm_do_pri及uvm_do_pri_with改变所产生的transaction的优先级
可通过lock操作锁定sequencer的所有权，当该sequence的全部transaction发送完成后再通过unlock释放sequencer的所有权，lock请求会被放在sequencer仲裁队列的最后面，而grab请求会放在sequencer仲裁队列的最前面，但不会终端lock操作
sequencer会查看sequence的is_relevant的返回结果，可通过重载is_relavant函数来使sequence失效
is_relevant与wait_for_relevant一般应成对重载
## sequence相关宏及其实现
* uvm_do系列宏
* uvm_create与uvm_send宏
* uvm_rand_send宏
* start_item与finish_item
* pre_do、mid_do与post_do
* m_sequencer（sequenc默认的sequencer，使用uvm_do_on宏会在指定sqr上获取seq）
## sequence进阶应用
* 嵌套的sequence
* 在sequence中使用rand类型变量
* transaction类型的匹配
* p_sequencer的使用
为便于在sequence中调用sqr中的成员变量，UVM内建了一个宏`uvm_declare_p_sequencer(SEQUENCER)`，本质是声明了一个SEQUENCER类型的成员变量，并在pre_body()中通过cast将m_sequencer转化为p_sequencer，可直接使用p_sequencer引用sqr中的变量
## virtual sequence的使用
实现sequence之间同步的最好方式是使用virtual sequence，不发送transaction，只是控制其他的sequence
为了使用virtual sequence 一般需要一个virtual sequencer，内部包含其他真实sequence的指针，在base_test中创建实例并赋值。
![](UVM实战.assets\23495115-fed8e2fa48f12787.png)
```
class case0_vsqe externds uvm_sequence;
  `uvm_object_utils(case0_vsqe);
  `uvm_declare_p_sequenc(my_vsqr)

  virual task body();
    my_transaction tr;
    drv0_seq seq0;
    drv1_Seq seq1;

    `uvm_do_on_with(tr, p_sequencer.p_sqr0, {;})
    `uvm_info()
    fork
      `uvm_do_on(seq0, p_sequencer.p_sqr0);
      `uvm_do_on(seq1, p_sequencer.p_sqr1);
    join
  endtask
endclass
```

还可以使用`uvm_send发送`uvm_create的trans，uvm_send使用是为了节省内存空间？发送多次用一个空间？uvm_do会发送多少次用多少个空间？？
## sequence中使用config_db
在set目标时seq实例化名称使用通配符，因为seq实例化名字不固定。
最大问题是get，uvm_config_db::get第一个参数必须是component，而seq不是component，在get时不能使用this指针，只能使用null（会被替换为后者）或者uvm_root::get()，再加上get_full_name()，从而得到seq的完整路径

## response的使用
允许driver将一个response返回给sequence
put_response与get_response
## sequence library
sequence library就是一系列sequence的集合，可以通过uvm_sequence_library_cfg来对sequence library进行配置，来控制sequence的选择
# 寄存器模型
UVM寄存器模型的本质就是重新定义了验证平台与DUT的寄存器接口，使验证人员更好地组织及配置寄存器
# UVM中的factory机制
重载的最大优势是使得一个子类的指针以父类的类型传递时，其表现出的行为依然是子类的行为（父类指针指向子类对象，调用的是子类的函数）
factory机制的重载，当新的类型加入了重载记录后，便可用新的类型来替代旧的类型，即使传入的是旧的类型的实例，创建的仍然是新的类型（不同于传统的面向对象的重载功能只能将子类对象赋值给父类句柄才能实现重载，factory机制相当于直接将类型进行了替换）
# UVM中代码的可重用性
* callback机制
* 功能的模块化：小而美
* 参数化的类



