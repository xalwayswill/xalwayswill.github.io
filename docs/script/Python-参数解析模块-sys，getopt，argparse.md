一些命令行工具的使用能够大大简化代码脚本的维护成本，提升复用性，今天主要是借助于python提供的几种主流的参数解析工具来实现简单的功能，主要是学习实践为主，这是新年伊始开工的第一篇，还是花了一番功夫来完成写作的和实验的，希望能够帮到需要的朋友们，新的一年里，祝大家心想事成！

好了，废话不多说，下面进入正文。

**Python中有三个内建的模块用于处理命令行参数：**

第一个：sys，最简单，只能够提供简单的参数解析功能

第二个：getopt，只能简单的处理命令行参数 ，较sys封装更好一点

第三个：argparse，使其更加容易的编写用户友好的命令行接口。它所需的程序进程了参数定义，argparse将更好的解析    sys.argv。同时argparse模块还能自动生成帮助及用户输入错误参数时的提示信息。

在命令行参数中分为“-”和“--”两种模式，具体的使用方法以及与异同点我都会在下面的实际使用中介绍到，主要是正确完成对两种命令参数模式的区分就行了。接下来的实践中，首先以sys模块为例，来观察该模块的参数解析过程，具体实践如下：
####argparse
```
def sysFunc():
  '''
  基于 sys 模块的简单参数解析功能
  选项的写法要求:
　　对于短格式:
        "-"号后面要紧跟一个选项字母，如果还有此选项的附加参数，可以用空格分开，也可以不分开。
        长度任意，可以用引号。
        如： -h  -ls -l s  等等
  对于长格式：
       "--"号后面要跟一个单词，如果还有些选项的附加参数，后面要紧跟"="，再加上参数。
       "="号前后不能有空格。
       如： --input=data.txt
  长格式是在Linux下引入的，许多Linux程序都支持这两种格式。在Python中提供了getopt模块很好
  的实现了对着两种用法的支持，而且使用简单。
  执行示例：
       python demo.py -d data.txt
       python demo.py --data=data.txt
  '''
  if len(sys.argv)==1: 
    print 'Nothing need to be done!'
    sys.exit()
  else:
    para_list=sys.argv
    print 'Parameters is: ',para_list
    if para_list[1].startswith('--'):
      print 'DataFile name is: ',para_list[1].split('=')[-1].strip()
      print 'Longopts,do your actions here!!!'
    elif para_list[1].startswith('-'):
      print 'DataFile name is: ',para_list[2]
      print 'Shortopts,do your actions here!!!'
```

关于该模块的使用和注意事项我在上面的代码片段中已经解释清楚了，相信很容易理解，我也附上了执行示例，接下来我们执行一下上述代码结果如下：

![](Python-参数解析模块-sys，getopt，argparse.assets\23495115-24819fba96f4f00d.png)

####getopt
接下来我们使用getopt模块来进行参数命令行的解析操作，代码中我们选用IP和端口两个属性作为待传入的参数，具体实践如下：
```
def getoptFunc():
  '''
  基于 getopt 模块来实现参数解析功能
  函数getopt(args,shortopts,longopts=[])
    参数args一般是sys.argv[1:]
    shortopts 短格式 (-) 
    longopts 长格式(--) 
  注意点：
      定义命令行参数时，要先定义带'-'选项的参数，再定义没有‘-'的参数
  执行示例：
      python demo.py -i 172.19.7.217 -p 8066 data.txt 88
      python demo.py --ip=172.19.7.217 --port=8066 data.txt 88
  '''
  if len(sys.argv)==1:
    print 'Nothing need to be done!'
    sys.exit()
  try:
    opts,args=getopt.getopt(sys.argv[1:],"hp:i:",["help","ip=","port="]) #过滤掉脚本名称
    '''
    opts是个包含元祖的列表,args是个列表，包含那些没有‘-'或‘--'的参数
    短格式 --- h 后面没有冒号：表示后面不带参数，p：和 i：后面有冒号表示后面需要参数
    长格式 --- help后面没有等号=，表示后面不带参数，其他三个有=，表示后面需要参数
    '''
    print 'opts: ',opts
    print 'args: ',args
  except getopt.GetoptError:
    print "argv error,please input"
    sys.exit()
  #打印具体参数
  map_dict={'-i':'IP','--ip':'IP','-p':'Port','--port':'Port'}
  for name,value in opts:
    if name in ("-h","--help"):
      print  """
          Usage:sys.args[0] [option]
          -h or --help：显示帮助信息
          -p or --ip： IP地址
          -p or --port： IP端口
          """
    if name in ('-i','--ip','-p','--port'):
      print '{0} is=======>{1}'.format(map_dict[name],value)
```

使用getopt模块分析命令行参数大体上分为三个步骤：

*   1.导入getopt, sys模块
*   2.分析命令行参数
*   3.处理结果       

同样我们加入了详细的注释与说明帮助理解该模块的工作机制，我们也附上了相关的执行示例，运行上述代码得到的结果如下图所示：

![](Python-参数解析模块-sys，getopt，argparse.assets\23495115-82ef5e6a5b124f46.png)

####argparse
最后我们实践一下argparse模块，该模块相对于前两个模块而言，封装程度更为高级，使用也更为方便一下，具体的实践如下：
```
def argparseFunc():
  '''
  基于argparse模块实现高级的参数解析功能
  执行示例：
       python demo.py -i 172.19.7.236 -p 7077 -f -w
       python demo.py -i 172.19.7.236 -p 7077 -f -r
  '''
  parser=argparse.ArgumentParser(description="show example") #使用argparse的构造函数来创建对象
  parser.add_argument("-i","--ip",help="IP Address") #添加可解析的参数
  parser.add_argument("-p","--port",help="IP Port") #添加可解析的参数
  parser.add_argument("-f","--flag",help="Flag",action="store_true") #action=store_true的意义是如果使用了这个参数则值默认为TRUE
  exptypegroup=parser.add_mutually_exclusive_group() #添加一组互斥的选项，如上例中的-l和-r只能用一个
  exptypegroup.add_argument("-r","--read",help="Read Action",action="store_true")
  exptypegroup.add_argument("-w","--write",help="Write Action",action="store_true")
  ARGS=parser.parse_args()
  print 'ARGS:',ARGS
  if ARGS.ip:
    print "IP is: "+ARGS.ip
  if ARGS.port:
    print "Port is: "+ARGS.port
  if ARGS.flag:
    print "Flag is: "+str(ARGS.flag)
  if ARGS.read:
    print "Read action is: "+str(ARGS.read)
  if ARGS.write:
    print "Write action is: "+str(ARGS.write)
```

该模块的使用较为广泛，首先使用该模块提供的构造函数来创建一个ArgumentParser对象，后续的参数传入和指定等工作都是基于ArgumentParser对象来进行的，其中，add_argument用来添加参数对象选项，add_mutually_exclusive_group用于添加互斥的选项，比如：上述的读操作和写操作就是互斥的，上述代码中我们给出了执行示例，同样我们依旧是基于IP和端口两个参数选项进行实验，结果如下所示：

![](Python-参数解析模块-sys，getopt，argparse.assets\23495115-c73a3a46a5aa2c31.png)


我们想知道，声明好的互斥的参数选项是否真的是不能同时使用呢？这里简单的执行一下就行了：

![](Python-参数解析模块-sys，getopt，argparse.assets\23495115-dfbacb815607eea5.png)

从上面的error信息中我们看到了argparse模块给我们的反馈信息是读写操作不被允许同时使用，说明了上述我们声明的互斥参数是正常工作了的。
三个模块，三种参数解析的实践也只能是对其达到初步了解的目的，希望有了一定的了解与认识之后再使用到具体的项目中去相信效果会更好一些。

####总结
以上就是这篇文章的全部内容了，希望本文的内容对大家的学习或者工作具有一定的参考学习价值，谢谢大家对脚本之家的支持。如果你想了解更多相关内容请查看下面相关链接
