MIP(Magillem IP packager) MRV(Magillem Register View)
创建工程，GreateProject，增加项目版本信息
添加component，及版本信息
导入模块，通过-type entity方式只导入interface，GUI无法直接导入sv文件，需要使用command导入sv类型的hdl文件
创建 logic bus / physical bus
在配置总线上创建寄存器，register(name width)，filed(name, bits)，RW access，RstVal

一次导入太多寄存器会导致工具挂死半天，增大系统分配给工具的内存空间
