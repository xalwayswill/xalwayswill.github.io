* 父类句柄可以直接指向子类对象，但子类句柄需要使用cast指向父类对象（因为子类对象包含父类所有的属性，可直接通过父类句柄调用，但子类内部同时包含父类不存在的属性）

* 虚方法可实现多态，根据句柄指向的对象调用对应的方法，不采用虚方法则只能调用句柄类型对应的方法、

* SV不支持多重继承

* 对象的拷贝，深拷贝需要每个类都有copy方法，一层一层调用完成深拷贝

* 纯虚方法只能声明在抽象类内部，抽象内内部只有纯虚方法（没有主体的虚方法，pure virtual），没有非虚方法，子类必须对纯虚方法进行覆盖，否则编译会出错

* 使用虚方法实现回调函数

* SV参数类类似于C++的template，参数类传入不同的参数生成的类不同，相互之间没有OOP关系，不能使用$cast相互转换，可使用$typename $bits获得变量类型和所有参数所长用的bits数目

* 静态类（单例类）类内部成员都是static变量和静态方法，静态类通过类名调用，如 Class::method()

* 结合静态类和参数类的特性可以实现UVM中全局的config_db（configuration database）

* 类需要向声明在使用，但也可以通过typedef class class_name 声明之后生成对象

* new()和new[]的区别
**new()**
It is a constructor function to create and allocate an object for any class member.
It creates a memory for the class members and initializes them with their default values.
For eg,. 
```
class driver; // class with name driver
driver d1; // handle creation, only instance doesn’t hold any memory for members
d1 = new(); // Now holds memory for the member variables and functions
To de-allocate the memory allocated by new(), null() can be used.
such as d1.null( ); will remove the allocated memory.
```
**new[ ]**
It is an operator to **size/resize** a dynamic array.
```
integer apple[]; // Defines apple as a dynamic array of integer type
apple = new[4]; // Now new[] defines size of array with four storage size
integer grapes[]; // Now grapes as a dynamic array of integer type
grapes = new[8](apple); // expands as 8 elements, includes 4 more elements so that totally 8 elements. 4 elements from apple are kept alive and updated for grape array resizing.
```
