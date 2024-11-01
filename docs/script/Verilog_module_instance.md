# GUI_inst
```
#! python3
# -*- coding: utf-8 -*-

import tkinter as tk
from tkinter import scrolledtext
# from tkinter import StringVar
# import tkinter.messagebox
from tkinter.filedialog import askopenfilename
from module_inst_GUI import *

class GUI(object):
    """GUI主程序"""

    def __init__(self):
        # 创建根窗口
        self.root = tk.Tk()
        # 设置窗口参数
        self.root.title("Verilog 模块自动例化工具")
        self.root.geometry('500x700+500+200')
        # 创建Frame
        self.__create_widgets()

    def __create_widgets(self):
        # 创建文本显示Frame
        self.__create_display_frame()
        # 创建操作控制Frame
        self.__create_ctrl_frame()
        # 创建图表Frame
        self.__create_icon_frame()

    def __create_display_frame(self):
        self.display_frame = tk.Frame(self.root, bg='pink', bd=3)  # Frame上面的子控件的大小会决定Frame的大小，宽高属性会失效
        self.display_frame.pack()

        # 创建滚动文本框
        self.display_text = scrolledtext.ScrolledText(self.display_frame, width=55, height=35, bg='palegreen', font=12)
        # self.display_text = tk.Text(self.display_frame, width=55, height=35, bg='palegreen', font=12)
        # # 创建滚动条填充
        # self.right_scroll = tk.Scrollbar()
        # self.right_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        # # 将滚动条与文本框关联
        # self.right_scroll.config(command=self.display_text.yview)  # 将文本框关联到滚动条上，滚动条滑动，文本框跟随滑动
        # self.display_text.config(yscrollcommand=self.right_scroll.set)  # 将文本框关联到滚动条上
        self.display_text.grid(row=0, column=0)

    def __create_ctrl_frame(self):
        self.ctrl_frame = tk.Frame(self.root)
        self.ctrl_frame.pack()

        self.__create_select_file_bt()
        self.__create_print_instance_bt()
        self.__create_path_entry()

    def __create_select_file_bt(self):
        self.select_file_bt = tk.Button(self.ctrl_frame)
        self.select_file_bt["text"] = "选择文件"
        self.select_file_bt["command"] = self.__select_file
        self.select_file_bt.grid(row=0, column=2)

    def __create_print_instance_bt(self):
        self.print_instance_bt = tk.Button(self.ctrl_frame)
        self.print_instance_bt["text"] = "输出例化代码"
        self.print_instance_bt["command"] = self.__print_instance
        self.print_instance_bt.grid(row=1, column=1)

    def __create_path_entry(self):
        self.path_label = tk.Label(self.ctrl_frame, text="目标文件:")
        self.path_label.grid(row=0, column=0)
        self.path = tk.StringVar()
        self.path_entry = tk.Entry(self.ctrl_frame, textvariable=self.path, relief='groove', bd=5, width='30')
        self.path_entry.grid(row=0, column=1, sticky='w')

    def __select_file(self):
        self.file_name = askopenfilename()
        self.path.set(self.file_name)

    def __print_instance(self):
        self.instance_code = print_module_inst(self.file_name)
        # 清空显示
        self.display_text.delete('1.0', tk.END)
        self.display_text.insert('insert', self.instance_code)

    def __create_icon_frame(self):
        # self.icon_frame = tk.Frame(self.root)
        # self.icon_frame.pack()
        pass


if __name__ == '__main__':
    gui = GUI()
    gui.root.mainloop()
```

# module_inst_GUI
```
#! python3
# -*- coding: utf-8 -*-

"""
Generate verilog module instance code

Author: xuyinghao

Usage:
python module_inst.py module_name.v [output_file_name]
"""

import re
# import sys
import chardet


def del_comment(text):
    """remove the comment text"""
    regex_single_line = re.compile(r"//(.*)$", re.MULTILINE)  # (.*)? 非贪婪匹配, MULTILINE多行匹配，影响 ^ 和 $ 的功能，增加该参数后对于带换行符的字符串
    regex_multi_line = re.compile(r"/\*(.*)\*/", re.DOTALL)  # DOTALL 令 . 匹配包括换行符在内的任意字符，不传递则 . 不能匹配换行符
    text = regex_multi_line.sub('\n', text)
    text = regex_single_line.sub('\n', text)
    return text


def del_function(text):
    """remove the function text"""
    regex_func_line = re.compile(r"function(.*)?endfunction", re.DOTALL)
    text = regex_func_line.sub('\n', text)
    return text


def det_module_name(text):
    """detect the module name"""
    regex_module_name = re.compile(r"module\s*([a-zA-Z_0-9]*)")
    module_name = regex_module_name.search(text).group(1)
    return module_name


def det_paramete(text):
    """detect the paramete declaration"""
    regex_para = re.compile(r"#\s*\(\s*parameter(.*?)\)", re.DOTALL)
    para_declare = regex_para.search(text)
    if para_declare is not None:
        para_dec = para_declare.group(1)
        return para_dec
    else:
        return None


def formate_para(text):
    """format the paramete output"""
    para_declare = det_paramete(text)
    if para_declare is not None:
        regex_para = re.compile(r"(\w*)\s*=\s(\d*)")
        para = regex_para.findall(para_declare)
        l1 = max([len(p[0]) for p in para])
        l2 = max([len(p[1]) for p in para])
        para_print = r' #(' + '\n' + ',\n'.join(['  .' + i[0].ljust(l1 + 1)
                                                 + '( ' + i[1].ljust(l2) + ' )'
                                                 for i in para]) + ')\n'
        return para_print
    else:
        return ' '


def det_port(text):
    """detect the port declaration"""
    regex_port = re.compile(r"(input|output|inout)\s+((wire|reg)\s+)?(signed)?\s*(\[.*?:.*?\])?\s*(\w+)")
    port_list = regex_port.findall(text)
    return port_list


def formate_port(text):
    port_list = det_port(text)
    if port_list:
        l_port = max([len(p[-1]) for p in port_list])
        port_print = '(\n' + ',\n'.join(['  .' + p[-1].ljust(l_port) + r' ( ' + p[-1].ljust(l_port) + ' )'
                                         for p in port_list]) + '\n);'
        return port_print
    else:
        return "\nThis module doesn't have port"


def print_module_inst(input_file):
    """print the module instance code"""
    with open(input_file, 'rb') as fp:
        fp_info = chardet.detect(fp.read())
        fp_encoding = fp_info['encoding']

    with open(input_file, 'r', encoding=fp_encoding) as fp:
        file_text = fp.read()

    text = del_comment(file_text)
    text = del_function(text)
    module_name = det_module_name(text)
    para_print = formate_para(text)
    port_print = formate_port(text)
    instance_name = module_name + r'_inst'
    module_inst_code = module_name + para_print + instance_name + port_print
    return module_inst_code

```

#打包成可执行文件
PyInstaller
安装 pyinstaller
对于那些网络比较稳定，能够流畅使用 pip 源地址的用户，直接下面的命令就可以搞定：

pip install pyinstaller
通常我们会下载源码包，然后进入包目录，执行下面的命令（需要安装 setuptools）：

```
python setup.py install
```

安装完后，检查安装成功与否：

```
pyinstaller --version
```

安装成功后，就可以使用下面的命令了：

pyinstaller : 打包可执行文件的主要命令，详细用法下面会介绍。
pyi-archive_viewer : 查看可执行包里面的文件列表。
pyi-bindepend : 查看可执行文件依赖的动态库（.so 或.dll 文件）
pyi-… : 等等。

##### 使用 PyInstaller

        pyinstaller 的语法：pyinstaller [options] script [script…] | specfile

        最简单的用法，在和 myscript.py 同目录下执行命令：

         pyinstaller mycript.py

         然后会看到新增加了两个目录 build 和 dist，dist 下面的文件就是可以发布的可执行文件，对于上面的命令你会发现 dist 目录下面有一堆文件，各种都动态库文件和 myscrip 可执行文件。有时这样感觉比较麻烦，需要打包 dist 下面的所有东西才能发布，万一丢掉一个动态库就无法运行了，好在 pyInstaller 支持单文件模式，只需要执行：

        pyinstaller -F mycript.py

        你会发现 dist 下面只有一个可执行文件，这个单文件就可以发布了，可以运行在你正在使用的操作系统类似的系统的下面。当然，pyinstaller 还有各种选项，有通用选项，如 -d 选项用于 debug。

        在执行 pyInstaller 命令的时候，会在和脚本相同目录下，生成一个.spec 文件，该文件会告诉 pyinstaller 如何处理你的所有脚本，同时包含了命令选项。一般我们不用去理会这个文件，若需要打包数据文件，或者给打包的二进制增加一些 Python 的运行时选项时…一些高级打包选项时，需要手动编辑.spec 文件。可以使用：

        pyi-makespec optionsscript [script …]

        创建一个.spec 文件，对于手动编辑的.spec 文件，我们可以使用下面任意一条命令：

        pyinstaller specfile

        pyi-build specfile

##### PyInstaller 原理简介

        PyInstaller 其实就是把 python 解析器和你自己的脚本打包成一个可执行的文件，和编译成真正的机器码完全是两回事，所以千万不要指望成打包成一个可执行文件会提高运行效率，相反可能会降低运行效率，好处就是在运行者的机器上不用安装 python 和你的脚本依赖的库。在 Linux 操作系统下，它主要用的 binutil 工具包里面的 ldd 和 objdump 命令。

        PyInstaller 输入你指定的的脚本，首先分析脚本所依赖的其他脚本，然后去查找，复制，把所有相关的脚本收集起来，包括 Python 解析器，然后把这些文件放在一个目录下，或者打包进一个可执行文件里面。

        可以直接发布输出的整个文件夹里面的文件，或者生成的可执行文件。你只需要告诉用户，你的应用 App 是自我包含的，不需要安装其他包，或某个版本的 Python，就可以直接运行了。

        需要注意的是，PyInstaller 打包的执行文件，只能在和打包机器系统同样的环境下。也就是说，不具备可移植性，若需要在不同系统上运行，就必须针对该平台进行打包。

##### 实践问题

        pyinstaller 打包后的 exe 运行怎么去掉弹出的命令行提示窗口？

        1\. 如果使用.spec 文件的话, 在该文件中找到 console=True 修改为 console=False

        2\. 如果是直接指定 python 文件进行 pyinstaller 打包的话，需要添加—noconsole

        pyinstaller path\mycode.py–noconsole

        如果想只打包成一个 exe：

        pyinstaller -F path\mycode.py –noconsole（注意：noconsole前面必须是两个  -  -，一个 - 不起作用）

       或：

        pyinstaller -F -wpath\mycode.py

        更换最终 exe 生成路径

        在 cmd 中，一开始就要 cd D:\PythonEXE\ 切换到输出文件夹，然后在用上面的代码，说明：各个参数的作用，

        例子：pyinstaller -F -w -pD:\tmp\core-python\libs -i d:\tmp\main.ico main.py

        -F 表示生成单个可执行文件；

        -D  –onedir 创建一个目录，包含 exe 文件，但会依赖很多文件（默认选项）。

        -w 表示去掉控制台窗口，这在 GUI 界面时非常有用。不过如果是命令行程序的话那就把这个选项删除吧！；

        -c  –console, –nowindowed 使用控制台，无界面 (默认)；

        -p 表示你自己自定义需要加载的类路径，一般情况下用不到；

        -i 表示可执行文件的图标。

#### py2exe

         （py2exe 似乎只能支持 python3.3 和 pyhton3.4）

         py2exe 是一个将 python 脚本转换成 windows 上的可独立执行的可执行程序 (*.exe) 的工具，这样，你就可以不用装 python 而在 windows 系统上运行这个可执行程序。 

        py2exe 已经被用于创建 wxPython, Tkinter, Pmw, PyGTK, pygame,win32com client 和 server, 和其它的独立程序。py2exe 是发布在开源许可证下的。

##### py2exe 的用法 

        如果你有一个名为 myscript.py 的 python 脚本，你想把它转换为运行在 windows 上的可执行程序，并运行在没有安装 python 的 windows 系统上，那么首先你应写一个用于发布程序的设置脚本例如 mysetup.py，在其中的 setup 函数前插入语句 import py2exe 。 

mysetup.py 示例如下: 

```
# mysetup.py from distutils.core import setup import py2exe setup(console=["myscript.py"]) 
```

然后按下面的方法运行 mysetup.py: 

python mysetup.py py2exe 

        上面的命令执行后将产生一个名为 dist 的子目录，其中包含了 myscript.exe,python24.dll,library.zip 这些文件。

        如果你的 myscript.py 脚本中用了已编译的 C 扩展模块，那么这些模块也会被拷贝在个子目录中，同样，所有的 dll 文件在运行时都是需要的，除了系统的 dll 文件。dist 子目录中的文件包含了你的程序所必须的东西，你应将这个子目录中的所有内容一起发布。

        默认情况下，py2exe 在目录 dist 下创建以下这些必须的文件： 

        1、一个或多个 exe 文件。

        2、python##.dll。

        3、几个.pyd 文件，它们是已编译的扩展名，它们是 exe 文件所需要的；加上其它的.dll 文件，这些.dll 是.pyd 所需要的。 

        4、一个 library.zip 文件，它包含了已编译的纯的 python 模块如.pyc 或.pyo 上面的 mysetup.py 创建了一个控制台的 myscript.exe 程序，如果你要创建一个图形用户界的程序，那么你只需要将 mysetup.py 中的 console=[“myscript.py”] 替换为 windows=[“myscript.py”] 既可。 

        py2exe 一次能够创建多个 exe 文件，你需要将这些脚本文件的列表传递给 console 或 windows 的关键字参数。如果你有几个相关联的脚本，那么这是很有用的。 

        运行下面个命令，将显示 py2exe 命令的所有命令行标记。 

        python mysetup.py py2exe–help 

指定额外的文件 
       一些应用程序在运行时需要额外的文件，诸如配置文件、字体、位图。 如果在安装脚本中用 data_files 可选项指定了那些额外的文件，那么 py2exe 能将这些文件拷贝到 dist 子目录中。data_files 应包含一个元组 (target-dir, files) 列表，其中的 files 是这些额外的文件的列表。 

示例如下： 

```
# mysetup.pyfrom distutils.core import setupimport globimport py2exe  setup(console=["myscript.py"], data_files=[("bitmaps", ["bm/large.gif","bm/small.gif"]), ("fonts", glob.glob("fonts\\*.fnt"))], ) 
```

说明：data_files 选项将创建一个子目录 dist\bitmaps，其中包含两个.gif 文件；一个子目录 dist\fonts，其中包含了所有的.fnt 文件。

Windows NTservices 
        你可以通过传递一个 service 关键字参数给 setup 函数来建造 Windows NT services , 这个 service 参数的值必须是一个 Python 模块名 (包含一 service 类) 的列表。 

示例如下： 

```
# mysetup.pyfrom distutils.core import setupimport py2exesetup(service=["MyService"]) 
```

所建造的可执行的 service 是可以通过在其后跟一定的命令行参数标记来自行安装和卸载的。

附——pyinstaller打包参数说明：

![](Verilog_module_instance.assets\23495115-adfb0e5be0e57667.png)
