## 使用QuestaSIm仿真sv调用C/C++
编写sv以及C代码，在vlog时同样对C代码进行编译
```
vlog -work work -sv \
     -f ../filelist/vlog.f \
     -f ../filelist/tb.f \
     -l xvlog.log \
     +initmem+0 \
     +initreg+0 \
     -dpiheader ../tb/dpi_types.h \
     ../tb/hello.c ../tb/c_test.c
```
其中，dpi_types.h为QuestSim自动生成。
SystemVerilog提供了svdpi.h头文件，内部提供众多数据类型及方法，可在C/C++中调用该数据类型便于与SV中的数据类型对应。
在SV中调用C/C++函数需要通过import对对应的函数进行声明
``` import "DPI-C" context function/task c_xxxx()```
同样在C/C++中调用SV编写的函数和任务时需要首先在SV中对函数通过export进行声明
```export "DPI-C" function/task sv_xxxx;```
在调用C++函数时需要使用extern "C" { }，来告诉C++编译器传递给链接器的外部信息需要使用C调用约定传递而不适用名称混淆。

* **chandle** 数据类型用于将C/C++的指针存储在SV中

DPI只能调用在link time 已知的C/C++函数，如果需要调用一个C++的类呢？
解决办法是创建一个固定地址的函数，然后和C++的动态对象或者方法进行通信。通过一个xxx_new函数创建一个对象并返回该对象的句柄，另一个例程调用C++方法使用对象的句柄完成函数功能。
需要使用extern "C" { }，来告诉C++编译器传递给链接器的外部信息需要使用C调用约定传递而不适用名称混淆。
动态C++方法包含在使用对象句柄的静态方法中传输给SystemVerilog
![](DPI.assets\23495115-d36c842d6db5f6ee.png)
![](DPI.assets\23495115-8fa675927bac9ba6.png)
![](DPI.assets\23495115-83dd282b16643c06.png)
![](DPI.assets\23495115-32ade66113815d5b.png)
图片截取自*SystemVerilog for Verification 3rd Edition*，文中有更多关于C/C++的调用细节

# opencv实现图像数据的读取
opencv包的导入，需要对应gcc版本。将MinGW下的bin路径和下载的编译后的opencv库中的x64\mingw\bin添加环境变量
```
g++ -c -I E:\Code\CPP\opencv411\include -I E:\Code\CPP\opencv411\include\opencv2 read_image.cpp
g++ -shared -o read_image.dll read_image.o -L E:\Code\CPP\opencv411\x64\mingw\bin -L D:\questasim64_10.6c\win64  -llibopencv_core411 -llibopencv_highgui411 -llibopencv_calib3d411 -llibopencv_imgcodecs411 -llibopencv_imgproc411 -llibopencv_objdetect411 -llibopencv_photo411 -llibopencv_stitching411 -llibopencv_gapi411 -lmtipli
```

```
vlib work
vlog -work work -sv -dpiheader dpiheader.h tb.sv
vsim -novopt -lib work -sv_lib read_image tb
add wave *
run -all
```
