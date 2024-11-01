* shutil.rmtree() 表示递归删除文件夹下的所有子文件夹和子文件
* shutil.copytree()
* endswith() 方法用于判断字符串是否以指定后缀结尾，如果以指定后缀结尾返回True，否则返回False。可选参数"start"与"end"为检索字符串的开始与结束位置。
* str.strip() 方法用于移除字符串头尾指定的字符（默认为空格或换行符）或字符序列，读取excel表格或者文本文档内容是最好都加上strip()，减少debug成本
* str.split() 通过指定分隔符对字符串进行切片，如果参数 num 有指定值，则分隔 num+1 个子字符串
* python 获取当前执行的命令 处于什么文件内
比较常用的是下面这句
`os.path.dirname(os.path.abspath(__file__))`
但是如果使用exec的话,上述办法行不通,得使用下面这种更通用的办法:
```
filename = inspect.getframeinfo(inspect.currentframe()).filename
path = os.path.dirname(os.path.abspath(filename))
```
* str.join(list) 使用str连接list内部元素
* configparser.RawConfigParser().read 根据配置文件获取参数
* Template from string import Template
将一个string设置为模板，通过替换变量的方法，最终得到想要的string，可以通过template文件逐行读入的方式逐行替换生成新的文件
