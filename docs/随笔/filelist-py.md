```
#! /usr/bin/python
# -*- coding: utf-8 -*-
"""
    Usage1:
        python filelist.py search_path filelist_path key_ext1 [key_ext2, ...]
"""
import os
import sys


def search_file(search_path, ext, fp):
    """
    搜索serch_path下指定类型的文件，并输出文件的相对路径(相对于当前工作路径)或绝对路径到fp
    :param path:文件路径
    :param ext:文件扩展名，为一个列表
    :return:null
    """
    for filename in os.listdir(search_path):
        # 获取文件路径
        file_path = os.path.join(search_path, filename)
        # 判断是文件还是文件夹
        if os.path.isdir(file_path):  # 如果是文件夹，递归调用函数继续查找
            search_file(file_path, ext, fp)
        elif (os.path.splitext(file_path)[1] in ext):
            fp.write(file_path.replace('\\', '/') + '\n')
            print(file_path.replace('\\', '/'))
            # 输出绝对路径
            # print(os.path.abspath(file_path))


if __name__ == "__main__":
    search_path = sys.argv[1]
    filelist_path = sys.argv[2]
    key_ext = sys.argv[3:]

    with open(filelist_path, 'w') as fp:
        search_file(search_path, key_ext, fp)
```
