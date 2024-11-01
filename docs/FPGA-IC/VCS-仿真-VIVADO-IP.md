添加IP目录下对应的sim文件，在synopsys_sim.setup 中增加VIVADO增对vcs编译产生的器件库中的synopsys_sim.setup
例如：
```
@echo "OTHER=~/work/VIVADO_VCS_LIBRARY_201702/synopsys_sim.setup" >> synopsys_sim.setup
```

对于需要glbl.v文件的，添加VIVADO安装路径下的glbl.v文件进行编译，并在tb中例化 `glbl glbl()`
