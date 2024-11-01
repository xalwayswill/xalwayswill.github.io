建议将文件路径加入PYTHONPATH 系统变量中，便于每个模块都能直接import
```
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from enum import Enum

class Color(Enum):
    BLACK = 30
    RED = 31
    GREEN = 32
    YELLOW = 33
    BLUE = 34
    MAGENTA = 35
    CYAN = 36
    WHITE = 37

def print_color(text: str, fg: Color = Color.BLACK.value):
    print(f"\033[{fg}m{text}\033[0m")

#print_color("Hello World", fg = Color.RED.value)
```
