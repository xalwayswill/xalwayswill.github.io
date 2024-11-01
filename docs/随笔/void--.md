void *保存的实际为指针的地址，但并不包含指针指向的数据类型，必须要用户自己能够通过逻辑上保证指向的类型，或者不关心其指向的数据类型。一个指向任何对象 类型的指针都可bai以赋值给类型为void* 的变量du，void* 可以赋值给另一个void* ，两个void* 可以比较相等与否，而且可以显式地将void* 转换到另一个类型。其它操作都是不安全的，因为编译器并不知道实际被指的是哪种对象。因此，对void* 做其他任何操作都将引起编译错误。
应用举例：
```
// 下面语句开辟一个内存空间，并将地址赋给void* 类型
void *frame_data = malloc(frame.total()*frame.elemSize());
return (unsigned long long)frame_data;  // 将地址存储在unsigned long long 内
Mat frame(img.cols, img.rows, CV_8U, (void *)frame_data);  // 根据起始地址分配内存空间
```
