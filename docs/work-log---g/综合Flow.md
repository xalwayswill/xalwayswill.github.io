# 综合Flow
## Reference
[1] [Design Compiler Optimization Reference Manual](https://picture.iczhiku.com/resource/eetop/SHidRGQWtQruovNN.pdf)

[2] [Design Compiler Register Retiming Reference Manual]

[3] [综合与Design Conpiler](https://leiblog.wang/static/FPGA/books/%E7%BB%BC%E5%90%88%E4%B8%8EDesignCompiler.pdf)

```
## Elaborate:
### Read design and lib or ddc
analyze -format sverilog -work WORK -vcs "-f xxx.f"
### Write verilog
write -f verilog -hierarchy -output xxx.v
### Write ddc
write -hierarchy -format ddc -output xxx.ddc
### Write SDF backannotation data from Design Compiler placement
### for static timing analysis
write_sdf xxx.sdf
### Write sdc
write_sdc -nosplit xxx.sdc
### Write the map between pre and post synthesis names for timing analysis
saif_map -type ptpx -write_map xxx.mapped.SAIF.namemap

Compile Ultra:
### Read SDC
source [dcrm_mcmm_filename sdc_file $mode]
### Compile_Ultra
compile_untra -argv 

Reports:
report_qor > xx.rpt
report_clocks > xx.rpt
report_constraint -all_violatoprs -nosplit -verbose > xx.rpt
check_mv_design > xx.rpt
report_area -physical -hierarchy -designware -nosplit > xx.rpt
report_resources -hierarchy > xxx.rpt
report_timing -scenarios [all_active_scenarios] -transition_time -nets -attributes  -nworst 1000 -sort_by slack -nosplit -input -net -trans -cap -significant_digits 4 > xx.rpt
report_clock_gating -ungated -nosplit > xxx.rpt
report_power -nosplit > xxx.rpt
report_threshold_voltage_group -nosplit > xxx.rpt
```

相关命令
man attributes可以查看到对应目标所拥有的属性，便于get_attribute
get_attribute object_list attribute_name可以获取到对应目标的对应属性
list_attributes也可以获得目标属性
如果不知道属性名，可以通过report_cell/net/pin list的当时获得对应目标的属性

## 一些参数
`set_clock_gating_style -num_stage n` 设置Specifies the maximum number of stages for multistage clock gating. 似乎手动插入的和ICG自动插入的都会计算级数，设置的太小可能会导致前面手动插入太多，后面DFF无法插入ICG
