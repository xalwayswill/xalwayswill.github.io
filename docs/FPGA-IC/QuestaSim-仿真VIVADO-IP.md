首先在VIVADO中选择QuestaSim仿真工具，编译VIVADO IP到指定文件夹中。
打开编译后的文件夹，找到modelsim.ini文件，复制其中的库文件路径至QuestaSim安装路径下的modelsim.ini文件的对应位置，完成库文件的添加。
之后在do文件中 使用vlog vcom对文件进行编译，对于VIVADO IP需要使用glbl.v对IP进行全局初始化，文件路径为VIVADO安装目录下的`/data/verilog/src/glbl.v`，对于该文件路径下还包含许多BUFG等原语仿真所需要的文件，可根据仿真内容酌情添加至filelist中。
编译完成后使用 vopt 对仿真进行优化同时链接对应的库文件，如果不指定库文件，会导致仿真时找不到对应模块。
之后运行vsim对工程进行仿真。

*VIVADO软件提供了使用各种仿真工具（包括VCS、QuestaSim等）对 VIVADO IP 进行仿真的脚本实例，可在IP对应的参考设计工程路径下的ip_user_files中找到。可在IP Source中找到对应IP右键选择Open IP Example Design打开官方例程，内部包含各种仿真model以及仿真脚本。*

```
# To run this example, bring up the simulator and type the following at the prompt:
#     do run.do
# or, to run from a shell, type the following at the shell prompt:
#     vsim -c -do run.do
# (omit the "-c" to see the GUI while running from the shell)
# Remove the "quit -f" command from this file to view the results in the GUI.

set top tb


# Create the library.
if [file exists work] {
    vdel -all
}
vlib work

vmap work work

# Get the simulator installation directory.
quietly set INSTALL_HOME [file dirname [file nativename $::env(MODEL_TECH)]]


# Set the compiler and linker paths.
#if {$tcl_platform(platform) eq "windows"} {
#	source $INSTALL_HOME/examples/c_windows/setup/setup_compiler_and_linker_paths_mingwgcc.tcl
#} else {
#	source $INSTALL_HOME/examples/c_posix/setup/setup_compiler_and_linker_paths_gcc.tcl
#}


# Compile the HDL source(s).
# Please use / rather than \ in file path
vcom -work work -f ../filelist/vhdl.f -l vcom.log
vlog -work work -sv \
     -f ../filelist/vlog.f \
     -l xvlog.log \
     +initmem+0 \
     +initreg+0
#     +incdir+../src/
#     -y C:/Xilinx/Vivado/2017.2/data/verilog/src/


# Elaborate the design.
vopt -64 +acc -l elaborate.log -L work \
-L lib_cdc_v1_0_2 \
-L proc_sys_reset_v5_0_11 \
-L generic_baseblocks_v2_1_0 \
-L axi_infrastructure_v1_1_0 \
-L axi_register_slice_v2_1_13 \
-L fifo_generator_v13_1_4 \
-L axi_data_fifo_v2_1_12 \
-L axi_crossbar_v2_1_14 \
-L axi_protocol_converter_v2_1_13 \
-L axi_clock_converter_v2_1_12 \
-L blk_mem_gen_v8_3_6 \
-L axi_dwidth_converter_v2_1_13 \
-L xbip_utils_v3_0_7 \
-L xbip_pipe_v3_0_3 \
-L xbip_bram18k_v3_0_3 \
-L mult_gen_v12_0_12 \
-L axi_utils_v2_0_3 \
-L xbip_dsp48_wrapper_v3_0_4 \
-L xbip_dsp48_addsub_v3_0_3 \
-L floating_point_v7_0_13 \
-L xbip_dsp48_mult_v3_0_3 \
-L xbip_dsp48_multadd_v3_0_3 \
-L div_gen_v5_1_11 \
-L unisims_ver \
-L unimacro_ver \
-L secureip \
-L xpm \
-work work work.$top work.glbl \
-o tb_opt


# Open the debugging windows.
quietly view *


# Simulate the design.
# onbreak {quit -f}
# onerror {quit -f}

vsim -c -novopt -l simulation.log -lib work tb_opt

do {wave.do}

view wave
view structure
view signals

# log -r /*

run -all

# quit -force
```
