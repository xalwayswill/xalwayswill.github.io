## Notepad++安装NppExec插件
在notepad++界面中选择  插件》插件管理》安装NppExec
## 获取VIVADO语法检测工具路径
进入VIVADO安装路径，找到XILINX 官方xvlog语法检测批处理文件，默认路径为C:\Xilinx\Vivado\2017.2\bin
可在系统变量中添加路径，可直接通过xvlog调用
![](notepad++调用VIVADO语法检测工具进行verilog语法检测.assets\23495115-39357427ee81103d.png)
![](notepad++调用VIVADO语法检测工具进行verilog语法检测.assets\23495115-965f12ac5d3d2c63.png)


## 在notepad++中添加命令脚本
在安装NppExec完成后，按F6新建命令脚本，输入如下脚本命令
```
cmd /k cd "$(CURRENT_DIRECTORY)" &C:\Xilinx\Vivado\2017.2\bin\xvlog.bat "$(FULL_CURRENT_PATH)"   &ECHO. &EXIT 
```
![](notepad++调用VIVADO语法检测工具进行verilog语法检测.assets\23495115-0ae45f56dc0664dc.png)

配置完成后即可调用VIVADO语法检测工具进行verilog语法检测
![](notepad++调用VIVADO语法检测工具进行verilog语法检测.assets\23495115-72c751fccf820e03.png)

## 配置错误提示跳转
上述步骤完成之后即可实现语法检测，但我们习惯双击错误提示直接跳转错误所对应的行，为此我们需要增加命令行输出的正则表达式匹配，完成语法错误文本的跳转。
在notepad++中选择  插件->NppExec->Console Output Filters->HightLight添加对应的正则表达式
![](notepad++调用VIVADO语法检测工具进行verilog语法检测.assets\23495115-cf535848eb172c68.png)
其中，第一条为python的错误提示格式，第二条对应verilog的错误提示，%ABSFILE%对应当前文件的绝对路径，%LINE%对应要跳转的行。对于不同的语言错误的错误提示需要根据实际情况进行匹配。
```
*File "%ABSFILE%", line %LINE%,*          python错误匹配
*ERROR: [*[%ABSFILE%:%LINE%]              verilog错误匹配
```
**需要注意的是文件路径与行号一定要与命令行中的语法错误提示对应，保证匹配正确。**
