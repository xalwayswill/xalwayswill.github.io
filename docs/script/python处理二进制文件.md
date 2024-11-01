使用struct函数进行unpack
https://docs.python.org/3/library/struct.html#struct.unpack
常见数据类型，可参考上述网页，16bit为 ‘h’
```
with open(r"file_name",'rb') as fp:
  for i in range():
    golden += unpack('h', fp_read(2))
```
