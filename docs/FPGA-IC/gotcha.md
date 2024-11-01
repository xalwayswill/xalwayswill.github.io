##Verilog
* part-select的信号都按照unsigned对待
* 在较长的计算模块中尽量使用注释来标明当前逻辑是第几拍，不要在代码中通过后缀标注，避免需要调整逻辑级数时候修改的代码量太大
* RTL中的function最好不要写在module后面，写在前面或者放在lib文件中通过include的方式导入，不提前声明的话有些工具会因为找不到而报Error
