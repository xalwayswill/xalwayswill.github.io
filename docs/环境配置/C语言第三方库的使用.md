最近在使用opencv库的过程中遇到了很多坑，记录一下。
* 首先，关于opencv下载的库默认只支持visio studio，MinGW需要自己使用CMAKE进行编译
* 其次，使用编译过程中遇到很多问题，主要是win下使用make的情况很少见，建议还是直接使用别人编译好的库https://github.com/huihut/OpenCV-MinGW-Build，里面有各种版本的编译完成的库以及使用说明。
* 编译时库的调用问题，通过gcc -I 包含include文件路径，-L包含动态链接库路径，-l 指定所需要的动态链接库

[gcc 编译流程](https://blog.csdn.net/czg13548930186/article/details/78331692)

[https://blog.csdn.net/czg13548930186/article/details/78331692](https://blog.csdn.net/czg13548930186/article/details/78331692)

![](C语言第三方库的使用.assets\23495115-8362978ca4896f40.png)


静态编译与动态编译的区别

* 动态编译的 [可执行文件](http://baike.baidu.com/view/159830.htm)需要附带一个的 [动态链接库](http://baike.baidu.com/view/887.htm)，在执行时，需要调用其对应动态链接库中的命令。所以其优点一方面是缩小了执行文件本身的体积，另一方面是加快了编译速度，节省了 [系统资源](http://baike.baidu.com/view/53557.htm)。缺点一是哪怕是很简单的程序，只用到了链接库中的一两条命令，也需要附带一个相对庞大的链接库；二是如果其他计算机上没有安装对应的 [运行库](http://baike.baidu.com/view/1032404.htm)，则用动态编译的可执行文件就不能运行。　　
* 静态编译就是 [编译器](http://baike.baidu.com/view/487018.htm)在编译可执行文件的时候，将可执行文件需要调用的对应动态链接库(.so)中的部分提取出来，链接到可执行文件中去，使可执行文件在运行的时候不依赖于动态链接库。所以其优缺点与 [动态编译](http://baike.baidu.com/view/3195155.htm)的可执行文件正好互补。

[静态](http://baike.baidu.com/view/612026.htm)lib将导出声明和实现都放在lib中。编译后所有代码都嵌入到[宿主程序](http://baike.baidu.com/view/2760697.htm)

动态lib相当于一个h文件，是对实现部分（.dll文件）的导出部分的声明。编译后只是将导出声明部分编译到宿主程序中，运行时候需要相应的dll文件支持

　　(1)lib是编译时需要的，dll是运行时需要的。

　　如果要完成[源代码](http://baike.baidu.com/view/60376.htm)的编译，有lib就够了。

　　如果要使动态连接的程序运行起来，有dll就够了。

　　在开发和调试阶段，当然最好都有。

　　(2)一般的动态库程序有lib文件和dll文件。lib文件是必须在编译期就连接到应用程序中的，而dll文件是运行期才会被调用的。如果有dll文件，那么对应的lib文件一般是一些索引信息，具体的实现在dll文件中。如果只有lib文件，那么这个lib文件是[静态编译](http://baike.baidu.com/view/2814822.htm)出来的，索引和实现都在其中。静态编译的lib文件有好处：给用户安装时就不需要再挂动态库了。但也有缺点，就是导致应用程序比较大，而且失去了动态库的灵活性，在[版本升级](http://baike.baidu.com/view/421718.htm)时，同时要发布新的应用程序才行。

　　(3)在动态库的情况下，有两个文件，一个是引入库（.LIB）文件，一个是DLL文件，引入库文件包含被DLL导出的[函数](http://baike.baidu.com/view/15061.htm)的名称和位置，DLL包含实际的函数和数据，应用程序使用LIB文件链接到所需要使用的DLL文件，库中的函数和数据并不复制到[可执行文件](http://baike.baidu.com/view/159830.htm)中，因此在应用程序的可执行文件中，存放的不是被调用的函数代码，而是DLL中所要调用的函数的[内存地址](http://baike.baidu.com/view/404417.htm)，这样当一个或多个应用程序运行是再把程序代码和被调用的函数代码链接起来，从而节省了内存资源。从上面的说明可以看出，DLL文件必须随应用程序一起发行，否则应用程序将会产生错误。


