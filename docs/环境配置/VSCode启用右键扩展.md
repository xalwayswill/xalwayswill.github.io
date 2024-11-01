复制下面代码至文本文档中保存为*.reg，之后点击添加注册表
```
Windows Registry Editor Version 5.00
	
[HKEY_CLASSES_ROOT\*\shell\VSCode]
@="Open with Code"
"Icon"="C:\\Users\\xalwa\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"
	
[HKEY_CLASSES_ROOT\*\shell\VSCode\command]
@="\"C:\\Users\\xalwa\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\" \"%1\""
	
Windows Registry Editor Version 5.00
	
[HKEY_CLASSES_ROOT\Directory\shell\VSCode]
@="Open with Code"
"Icon"="C:\\Users\\xalwa\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"
	
[HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
@="\"C:\\Users\\xalwa\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\" \"%V\""
	
Windows Registry Editor Version 5.00
	
[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode]
@="Open with Code"
"Icon"="C:\\Users\\xalwa\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"
	
[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode\command]
@="\"C:\\Users\\xalwa\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\" \"%V\""
 ```
