# 简介
VCS和Verdi均为synopsys退出的eda仿真软件，用于IC及FPGA等RTL代码的仿真及调试
# VCS和Verdi环境的配置
## 三个变量：
- VERDI_HOME/NOVAS_HOME：仿真器默认，且为设置PATH做准备
- PATH：让系统（Linux）找到Verdi
- LD_LIBRARY_PATH：让系统（Linux）能够中找到Verdi需要的库文件
## 三个命令
- echo(可配合sed)：查询环境变量
   - echo $PATH | sed 's/\:/\n/g'
   - echo $LD_LIBRARY_PATH | sed 's/\:/\n/g'

需要保证VCS和Verdi均成功增加环境变量，可使用which命令查询软件路径是否设置成功

## VCS命令及参数的设置
### 设置仿真环境
在进行仿真之前需要先配置synopsys_sim.setup文件，该文件用于映射特定的设计库，设置搜索路径，并声明仿真过程中的控制变量。synopsys_sim.setup文件应存放在VCS的安装目录/bin目录下，个人home目录下，或者仿真的运行路径下。一般而言，我们只需要指定库名称用于存放analyze过程中生成的中间文件。
```
WORK > worklib
worklib : ./worklib
```
在上述代码中，设置worklib为WORK的逻辑库，并将其映射到计算机对应的物理路径worklib。

VCS进行仿真可分为三步，Analysis(vlogan/vhdlan) -> Elaboration(vcs) -> simulation -> verdi
### 使用vlogan或者vhdlan对verilog、vhdl、System Verilog或者Openvera等文件进行语法分析
```
# set the vhdlan options, the more options can be find in VCS MX/VCS MXi User Guide or vhdlan -help
VCS_VHDL_OPTIONS  = -nc # Suppresses the Synopsys copyright message.
VCS_VHDL_OPTIONS += -full64 # Analyze the design for 64-bit simulation.
VCS_VHDL_OPTIONS +=	-work worklib # Map a design library name to the logical library ame WORK
                                  # which receives the output of vhdlan.
VCS_VHDL_OPTIONS +=	-l vhdlan_rtl.log # Specifies a log file.
VCS_VHDL_OPTIONS +=	-f ./filelist/vhdl.f # Specifies the VHDL source filelist to be analyzed.
VCS_VHDL_OPTIONS +=	-f ./filelist/tb.f # Specifies the TB source filelist to be analyzed.
VCS_VHDL_OPTIONS += -kdb

#--------------------------------------------------------------------------------
# set the vlogan options, the more options can be find in VCS MX/VCS MXi User Guide or vlogan -help
VCS_VLOG_OPTIONS = -nc # Suppresses the Synopsys copyright message.
VCS_VLOG_OPTIONS += -full64 # Analyze the design for 64-bit simulation.
VCS_VLOG_OPTIONS += +v2k
#VCS_VLOG_OPTIONS += -q # Suppresses compiler message.
VCS_VLOG_OPTIONS += -work worklib # Map a design library name to the logical library ame WORK
                                  # which receives the output of vlogan.
VCS_VLOG_OPTIONS +=	-sverilog # Enable the SystemVerilog source code.
VCS_VLOG_OPTIONS += -timescale=$(TIME_SCALE) # Specifies the timecale.
#VCS_VLOG_OPTIONS += +define+DUMP_FSDB # Define a text macro. Test for this deifinition in your
             						  			      # Verilog source code using the ifdef compiler directive
#VCS_VLOG_OPTIONS += +libext+.v+.vh.+.vp+.sv # Specifies that VCS MX search only for files with
									                          # the specified file name extensions in a library 
																						#	directory.`
VCS_VLOG_OPTIONS +=	-l vlogan_rtl.log # Specifies a log file.
VCS_VLOG_OPTIONS +=	-f ./filelist/vlog.f # Specifies the VHDL source filelist to be analyzed.
VCS_VLOG_OPTIONS += -kdb
```
上述代码仅给出部分实例参数，更多详细设置可通过vlogan或vhdlan -help或者查阅VCS MX官方文档
### Elaboration
该步骤使用analyze过程生成的中间文件建立模块实例化的层次结构并生成可执行的simv文件用于后续仿真的运行
```
# set the vcs options, the more options can be find in VCS MX/VCS MXi User Guide or vcs -help
VCS_ELAB_OPTIONS  = -full64 # Analyze the design for 64-bit simulation.
VCS_ELAB_OPTIONS += -q # Suppresses compiler message.
#VCS_ELAB_OPTIONS += -R # Run the executable file immediately after VCS MX links it together.
VCS_ELAB_OPTIONS += -l elaborate.log # Specifies a log file.
VCS_ELAB_OPTIONS += -timescale=$(TIME_SCALE)
#VCS_ELAB_OPTIONS += -P $(VERDI_PLI_PATH)/novas.tab $(VERDI_PLI_PATH)/pli.a
VCS_ELAB_OPTIONS += -kdb # Enable generate Verdi KDB database.
VCS_ELAB_OPTIONS += -debug_access+all # Enables post-process debug.  
                                      # Use'-debug_access+classdbg' for testbench debug,
                                      # and '-debug_access+all' for all debug capabilities
                                      # Refer the VCS user '-debug_access' 
                                      # and refer to '-debug_region' for region control."
VCS_ELAB_OPTIONS += -lca # The kdb option is belong to the lca strategy.
```
上述代码仅给出部分实例参数，更多详细设置可通过vlogan或vhdlan -help或者查阅VCS MX官方文档
### Simulation并使用verdi查看仿真结果
该过程使用上一步产生的可执行文件进行仿真的运行。大致可分为两种模式
#### 1. post-processing mode
该模式需要首先生成Verdi所需的fsdb文件，生成fsdb可通过两种方式
1. 使用Verilog系统函数
```
initial begin
    $fsdbDumpfile("top_tb.fsdb");
    $fsdbDumpvars(0,"tob_tb");
end
```
VCS中不包含fsdbDump相关函数，若仿真过程中提示找不到函数或task可通过-P参数增加Verdi动态链接库或增加-debug_acc+all参数
2. 使用UCLI/TCL命令
```
global env
fsdbDumpfile "$env(demo_fifo).fsdb"
fsdbDumpvars 0 "top_tb"
run 100us
```
若使用tcl命令对仿真过程进行控制，需要在运行simv文件时增加-i参数并指定对应的tcl文件。
使用tcl控制仿真过程不需要重新编译仿真顶层，是用高级语言接口容易完成复杂处理，如变量的传递，正则表达式匹配等，并使用交互式接口，控制灵活，可在仿真过程中修改dump信息，如dumpoff/on等
```
# set the simulation options, the more options can be find in VCS MX/VCS MXi User Guide or vlogan -help
VCS_SIM_OPTISONS  = -l run.log # Specifies the simulation log file
VCS_SIM_OPTISONS += -ucli # Use the Unified Command-line Interface(UCLI)
VCS_SIM_OPTISONS += -i run.tcl # specifies the run.tcl
VCS_SIM_OPTISONS += +fsdb+autoflush # Enable the dumping while simulation.

./simv $(VCS_SIM_OPTISONS);
```
在运行仿真之后，便可使用verdi 通过-ssf参数加载fsdb文件查看仿真结果
```
verdi:
	@if [ -f $(MODULE_TOP).rc ]; then \
		verdi $(VERDI_OPTISONS) -ssf $(MODULE_TOP).fsdb -sswr $(MODULE_TOP).rc; \
	else \
		verdi $(VERDI_OPTISONS) -ssf $(MODULE_TOP).fsdb; \
	fi
```
#### 2. UFE flow(推荐)
该模式可以简化Verdi导入的流程
该模式不需要提前生成fsdb文件再通过verdi导入，可通过在analyze和elaborate阶段增加-kdb -lca参数来生成Verdi的KDB database，从而直接使用Verdi启动仿真并调用tcl脚本
```
./simv $(VCS_SIM_OPTISONS) -verdi;
```
## Verdi的使用
- nTrace
- nWave
## 参考文献
1. VCS MX/VCS MXi User Guide
2. https://www.youtube.com/watch?v=SGiSNNCVk4Y
3. Verdi基础知识整理 [https://blog.csdn.net/immeatea_aun/article/details/80961258](https://blog.csdn.net/immeatea_aun/article/details/80961258)
4. https://b23.tv/pEvsLe
5. solvnet.synopsys.com
6. VCS学习总结_201212060 [https://wenku.baidu.com/view/a514c0ef9ec3d5bbfd0a743f.html?pn=50](https://wenku.baidu.com/view/a514c0ef9ec3d5bbfd0a743f.html?pn=50)

## 附录
Makefile
```
#============================================================
#  Company: 
#
#  Author: 
#
#  Description:
#
#    This makefile is used to simulate your design and view 
#    the wave file by vcs+verdi. The simulation process 
#    includes the following four steps:
#    Analysis(vlogan/vhdlan) -> Elaboration(vcs) -> simulation -> verdi
#
#  Tool version: vcs L-2016.06 verdi_2017.12_sp2
#
#  Version: 1.0 - file created
#
#  Data: 2020.06.17
#
#============================================================
TIME_SCALE = 1ns/1ps
TEST_NAME = tb # the top module name of design
VLOG_LIST = 1 # if there is a vlog_list
VHDL_LIST = 0 # if there is a vhdl_list
INIT_STD_LOGIC = 0 # initialize the VHDL STD_LOGIC/STD_ULOGIC
VERDI_INVOKED_MODE = 1 # 0-Post-processing mode, 1-interactive mode
# Specifies the VERDI 
VERDI_PLI_PATH = /share/eda/Synopsys/verdi/verdi_2016.06/share/PLI/VCS/LINUX64
MODULE_TOP = $(TB)# TB is form the terminal input

#--------------------------------------------------------------------------------
# set the vhdlan options, the more options can be find in VCS MX/VCS MXi User Guide or vhdlan -help
VCS_VHDL_OPTIONS  = -nc # Suppresses the Synopsys copyright message.
VCS_VHDL_OPTIONS += -full64 # Analyze the design for 64-bit simulation.
VCS_VHDL_OPTIONS +=	-work worklib # Map a design library name to the logical library ame WORK
                                  # which receives the output of vhdlan.
VCS_VHDL_OPTIONS +=	-l vhdlan_rtl.log # Specifies a log file.
VCS_VHDL_OPTIONS +=	-f ./filelist/vhdl.f # Specifies the VHDL source filelist to be analyzed.
VCS_VHDL_OPTIONS +=	-f ./filelist/tb.f # Specifies the TB source filelist to be analyzed.
VCS_VHDL_OPTIONS += -kdb

#--------------------------------------------------------------------------------
# set the vlogan options, the more options can be find in VCS MX/VCS MXi User Guide or vlogan -help
VCS_VLOG_OPTIONS = -nc # Suppresses the Synopsys copyright message.
VCS_VLOG_OPTIONS += -full64 # Analyze the design for 64-bit simulation.
VCS_VLOG_OPTIONS += +v2k
#VCS_VLOG_OPTIONS += -q # Suppresses compiler message.
VCS_VLOG_OPTIONS += -work worklib # Map a design library name to the logical library ame WORK
                                  # which receives the output of vlogan.
VCS_VLOG_OPTIONS +=	-sverilog # Enable the SystemVerilog source code.
VCS_VLOG_OPTIONS += -timescale=$(TIME_SCALE) # Specifies the timecale.
#VCS_VLOG_OPTIONS += +define+DUMP_FSDB # Define a text macro. Test for this deifinition in your
             						  			      # Verilog source code using the ifdef compiler directive
#VCS_VLOG_OPTIONS += +libext+.v+.vh.+.vp+.sv # Specifies that VCS MX search only for files with
									                          # the specified file name extensions in a library 
																						#	directory.`
VCS_VLOG_OPTIONS +=	-l vlogan_rtl.log # Specifies a log file.
VCS_VLOG_OPTIONS +=	-f ./filelist/vlog.f # Specifies the VHDL source filelist to be analyzed.
VCS_VLOG_OPTIONS += -kdb # Compile design and generate un-resolved KDB to ./work

#--------------------------------------------------------------------------------
# set the vcs options, the more options can be find in VCS MX/VCS MXi User Guide or vcs -help
VCS_ELAB_OPTIONS  = -full64 # Analyze the design for 64-bit simulation.
VCS_ELAB_OPTIONS += -q # Suppresses compiler message.
#VCS_ELAB_OPTIONS += -R # Run the executable file immediately after VCS MX links it together.
VCS_ELAB_OPTIONS += -l elaborate.log # Specifies a log file.
VCS_ELAB_OPTIONS += -timescale=$(TIME_SCALE)
#VCS_ELAB_OPTIONS += -P $(VERDI_PLI_PATH)/novas.tab $(VERDI_PLI_PATH)/pli.a
VCS_ELAB_OPTIONS += -kdb # Enable generate Verdi KDB database, generate elaborate KDB to ./simv.dadir
VCS_ELAB_OPTIONS += -debug_access+all # Enables post-process debug.  
                                      # Use'-debug_access+classdbg' for testbench debug,
                                      # and '-debug_access+all' for all debug capabilities
                                      # Refer the VCS user '-debug_access' 
                                      # and refer to '-debug_region' for region control."
VCS_ELAB_OPTIONS += -lca # The kdb option is belong to the lca strategy.

#--------------------------------------------------------------------------------
# set the simulation options, the more options can be find in VCS MX/VCS MXi User Guide or vlogan -help
VCS_SIM_OPTISONS  = -l run.log # Specifies the simulation log file
VCS_SIM_OPTISONS += -ucli # Use the Unified Command-line Interface(UCLI)
VCS_SIM_OPTISONS += -i run.tcl # specifies the run.tcl
VCS_SIM_OPTISONS += +fsdb+autoflush # Enable the dumping while simulation.

#--------------------------------------------------------------------------------
# set the verdi options, the more options can be find in verdi User Guide or verdi -help
VERDI_OPTISONS   = -sv # Support the SystemVerilog
VERDI_OPTISONS  += -f ./filelist/vlog.f
VERDI_OPTISONS  += -f ./filelist/vhdl.f
VERDI_OPTISONS  += -top $(MODULE_TOP) 

all: config analyze elaborate sim

#----------------------------------------------------------------------
#  help
#----------------------------------------------------------------------
help:
	@echo "############################################################################################";
	@echo "# Makefile Help Page:"
	@echo "#    Testcase:"
	@echo "#           TB=test_name:    specify testcase name"
	@echo "#           TB=tb_sensor_driver_top"
	@echo "#           TB=tb_fan_pwm_ctrl"
	@echo "#    Targets:"
	@echo "#           clean:       clean simulation directory"
	@echo "#           verdi:       show simulation wave in verdi"
	@echo "############################################################################################";

#----------------------------------------------------------------------
#  Config
#----------------------------------------------------------------------
config:
	@echo '=============== Config work library ================'
	@mkdir -p worklib
	@echo "WORK > worklib"                     > synopsys_sim.setup
	@echo "worklib : ./worklib"               >> synopsys_sim.setup
	@if [ $(VHDL_LIST) == 1 ]; then \
	  echo "INIT_STD_LOGIC=$(INIT_STD_LOGIC)" >> synopsys_sim.setup; \
	fi

#----------------------------------------------------------------------
#  Analyze
#----------------------------------------------------------------------
analyze: 
	@echo '================ Analysis disegn ==================='
	@if [ $(VHDL_LIST) == 1 ]; then \
		vhdlan $(VCS_VHDL_OPTIONS); \
	fi
	@if [ $(VLOG_LIST) == 1 ]; then \
		vlogan $(VCS_VLOG_OPTIONS); \
	fi

#----------------------------------------------------------------------
#  Elaboration
#  VCS MX using the intermediate files generated during analysis builds 
#  the instance hierarchy and generates a binary executable simv 
#----------------------------------------------------------------------
elaborate:
	@echo '================ Elaborate design =================='
	@vcs $(VCS_ELAB_OPTIONS) worklib.$(MODULE_TOP) 

#------------------------------------------------------------
#  Simulate
#------------------------------------------------------------
sim: simulate
simulate:
	@echo '================= Simulate design =================='
	@if [ $(VERDI_INVOKED_MODE) == 0 ]; then \
		./simv $(VCS_SIM_OPTISONS); \
	else \
		./simv $(VCS_SIM_OPTISONS) -verdi -verdi_opts; \
	fi

#------------------------------------------------------------
#  view the wave
#------------------------------------------------------------
verdi:
	@if [ -f $(MODULE_TOP).rc ]; then \
		verdi $(VERDI_OPTISONS) -ssf $(MODULE_TOP).fsdb -sswr $(MODULE_TOP).rc; \
	else \
		verdi $(VERDI_OPTISONS) -ssf $(MODULE_TOP).fsdb; \
	fi

#------------------------------------------------------------
#  clean
#------------------------------------------------------------
clean:
	@echo '================== Clean output ===================='
	@rm -f simv
	@rm -f ucli.key
	@rm -f novas.conf
	@rm -f novas.rc
	@rm -f synopsys_sim.setup
	@rm -f *.log
	@rm -f *.fsdb
	@rm -fr worklib
	@rm -fr verdiLog
	@rm -fr simv.daidir
	@rm -fr csrc
        @rm -rf *.fsdb*
        @rm -rf *.ses*

```
run.sh
```
#!/bin/bash
#-*- coding: utf-8 -*-
if [ ! $1 ]; then
  export TB="default_top_name"
else
  export TB=$1
fi
# export设置的环境变量是临时的，再关闭shell时失效（有的系统直到log out才失效），$1为传入的第一个参数，$0返回命令
echo "The top module is $TB"
# make clean
make TB=$TB VERDI_INVOKED_MODE=1
```
run.tcl
```
fsdbDumpfile "$env(TB).fsdb"  # 通过shell设置环境变量传递参数
fsdbDumpvars 0 "$env(TB)"
run 100us
# if there is signal.rc existed, restore the rc file
if { [file exists $env(TB).rc] == 1 } {
  wvRestoreSignal "$env(TB).rc"
}
```
上面wvRestoreSignal为verdi的命令，verdi兼容tcl命令，详细关系和命令格式可查看verdi 界面help帮助页中的Verdi and Siloti Tcl Reference文档



 
