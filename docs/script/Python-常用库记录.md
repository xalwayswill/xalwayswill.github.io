#### panda
**Pandas 是 Python 语言的一个扩展程序库，用于数据分析。**
Pandas 是一个开放源码、BSD 许可的库，提供高性能、易于使用的数据结构和数据分析工具。
Pandas 名字衍生自术语 "panel data"（面板数据）和 "Python data analysis"（Python 数据分析）。
Pandas 一个强大的分析结构化数据的工具集，基础是 [Numpy](https://www.runoob.com/numpy/numpy-tutorial.html)（提供高性能的矩阵运算）。
Pandas 可以从各种文件格式比如 CSV、JSON、SQL、Microsoft Excel 导入数据。
Pandas 可以对各种数据进行运算操作，比如归并、再成形、选择，还有数据清洗和数据加工特征。
Pandas 广泛应用在学术、金融、统计学等各个数据分析领域。

* DataFrame
DataFrame 是一个表格型的数据结构，它含有一组有序的列，每列可以是不同的值类型（数值、字符串、布尔型值）。DataFrame 既有行索引也有列索引，它可以被看做由 Series 组成的字典（共同用一个索引）

#### numpy
NumPy(Numerical Python) 是 Python 语言的一个扩展程序库，支持大量的维度数组与矩阵运算，此外也针对数组运算提供大量的数学函数库。
NumPy 的前身 Numeric 最早是由 Jim Hugunin 与其它协作者共同开发，2005 年，Travis Oliphant 在 Numeric 中结合了另一个同性质的程序库 Numarray 的特色，并加入了其它扩展而开发了 NumPy。NumPy 为开放源代码并且由许多协作者共同维护开发。
NumPy 是一个运行速度非常快的数学库，主要用于数组计算，包含：
* 一个强大的N维数组对象 ndarray
* 广播功能函数
* 整合 C/C++/Fortran 代码的工具
* 线性代数、傅里叶变换、随机数生成等功能


#### sys，getopt，argparse

#### os

#### sqlite3
SQLite 是一个软件库，实现了自给自足的、无服务器的、零配置的、事务性的 SQL 数据库引擎。SQLite 是在世界上最广泛部署的 SQL 数据库引擎。SQLite 源代码不受版权限制。

#### re
正则表达式
[正则表达式教程](https://www.runoob.com/regexp/regexp-tutorial.html)

#### pdb
用于debug

#### itertools
在Python中，迭代器（Iterator）是常用来做惰性序列的对象，只有当迭代到某个值的时候，才会进行计算得出这个值。因此，迭代器可以用来存储无限大的序列，这样我们就不用把他一次性放在内存中，而只在需要的时候进行计算。所以，对于读取大文件或者无限集合，最好是使用迭代器。

#### copy


#### shutil
shutil 是 篇python 中的高级文件操作模块，与os模块形成互补的关系，os主要提供了文件或文件夹的新建、删除、查看等方法，还提供了对文件以及目录的路径操作。shutil模块提供了移动、复制、 压缩、解压等操作，恰好与os互补，共同一起使用，基本能完成所有文件的操作。是一个非常重要的模块。
* 查看包中的所有方法

print(dir(shutil))

[ 'chown', 'collections', 'copy', 'copy2', 'copyfile', 'copyfileobj', 'copymode', 'copystat', 'copytree', 'disk_usage', 'errno', 'fnmatch', 'get_archive_formats', 'get_terminal_size', 'get_unpack_formats', 'getgrnam', 'getpwnam', 'ignore_patterns', 'make_archive', 'move', 'nt', 'os', 'register_archive_format', 'register_unpack_format', 'rmtree', 'stat', 'sys', 'unpack_archive', 'unregister_archive_format', 'unregister_unpack_format', 'which']

#### Decimal


#### string
Template
```
from string import Templeta
s=Template("There $a and ${b}s") //use {} to connect the ${b} with s
print(s.substitute(a='apple', b='banana'))
```
Template 还可以接收字典来直接传递数据
```
from string import Templeta
s=Template("There $a and ${b}s") //use {} to connect the ${b} with s
d={"a": "apple", "b": ""banana}
print(s.substitute(d))
```

#### rich


#### 其他函数
str.isnumeric()
