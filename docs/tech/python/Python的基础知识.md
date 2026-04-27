好的！我来为你系统整理一下 Python 的基础知识。这份指南将从最基础的概念开始，逐步深入，适合初学者系统学习。

## 一、Python 简介与安装

### 什么是 Python？
- **高级编程语言**：语法简洁易懂
- **解释型语言**：无需编译，直接运行
- **跨平台**：Windows、Mac、Linux 都可运行
- **应用广泛**：Web开发、数据分析、人工智能、自动化等

### 安装 Python
```bash
# 从官网 python.org 下载安装包
# 或使用 Anaconda（推荐数据科学用途）
```

## 二、基础语法

### 1. 注释
```python
# 单行注释
"""
多行注释
三个双引号或单引号
"""
```

### 2. 变量与数据类型
```python
# 变量赋值（无需声明类型）
name = "小明"          # 字符串
age = 20              # 整数
height = 1.75         # 浮点数
is_student = True     # 布尔值

# 查看数据类型
print(type(name))     # <class 'str'>
```

### 3. 基本数据类型
```python
# 数字类型
int_num = 10         # 整数
float_num = 3.14     # 浮点数
complex_num = 1 + 2j # 复数

# 字符串
str1 = "Hello"
str2 = 'World'
str3 = """多行
字符串"""

# 布尔值
bool_true = True
bool_false = False

# 空值
nothing = None
```

## 三、数据结构

### 1. 列表（List）- 可变序列
```python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]

# 基本操作
fruits.append("grape")      # 添加元素
fruits.remove("banana")     # 删除元素
fruits[0] = "pear"         # 修改元素
print(fruits[1])           # 访问元素

# 列表切片
print(numbers[1:3])        # [2, 3]
print(numbers[:3])         # [1, 2, 3]
print(numbers[2:])         # [3, 4, 5]
```

### 2. 元组（Tuple）- 不可变序列
```python
coordinates = (10, 20)
colors = ("red", "green", "blue")

# 元组不可修改
# coordinates[0] = 5  # 会报错！
```

### 3. 字典（Dictionary）- 键值对
```python
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

# 基本操作
person["job"] = "工程师"    # 添加键值对
print(person["name"])      # 访问值
del person["age"]          # 删除键值对

# 常用方法
print(person.keys())       # 所有键
print(person.values())     # 所有值
print(person.items())      # 所有键值对
```

### 4. 集合（Set）- 无序不重复
```python
set1 = {1, 2, 3, 3, 4}    # {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# 集合运算
print(set1 | set2)         # 并集: {1, 2, 3, 4, 5, 6}
print(set1 & set2)         # 交集: {3, 4}
print(set1 - set2)         # 差集: {1, 2}
```

## 四、流程控制

### 1. 条件语句
```python
age = 18

if age < 0:
    print("年龄不能为负数")
elif age < 18:
    print("未成年")
elif age == 18:
    print("刚好成年")
else:
    print("已成年")

# 简写形式
result = "成年" if age >= 18 else "未成年"
```

### 2. 循环语句
```python
# for 循环
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)

# 遍历数字序列
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

# while 循环
count = 0
while count < 5:
    print(count)
    count += 1

# 循环控制
for i in range(10):
    if i == 3:
        continue        # 跳过本次循环
    if i == 7:
        break           # 退出循环
    print(i)
```

## 五、函数

### 1. 定义与调用
```python
def greet(name, greeting="Hello"):
    """简单的问候函数"""
    return f"{greeting}, {name}!"

# 调用函数
message = greet("小明")
print(message)  # Hello, 小明!

# 参数传递方式
greet("小红")                    # 位置参数
greet(name="小刚")               # 关键字参数
greet(greeting="Hi", name="小李") # 关键字参数
```

### 2. 函数参数详解
```python
def example(a, b=2, *args, **kwargs):
    """
    a: 必需参数
    b: 默认参数
    *args: 可变位置参数（元组）
    **kwargs: 可变关键字参数（字典）
    """
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"kwargs={kwargs}")

example(1, 3, 4, 5, name="小明", age=20)
```

### 3. Lambda 函数
```python
# 匿名函数
square = lambda x: x ** 2
print(square(5))  # 25

# 常用于排序等场景
students = [("小明", 20), ("小红", 18), ("小刚", 22)]
students.sort(key=lambda x: x[1])  # 按年龄排序
```

## 六、文件操作

```python
# 写入文件
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("Hello, World!\n")
    f.write("这是第二行\n")

# 读取文件
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()          # 读取全部内容
    # lines = f.readlines()     # 读取所有行到列表

# 逐行读取（推荐大文件）
with open("example.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())     # 去掉换行符
```

## 七、异常处理

```python
try:
    num = int(input("请输入一个数字: "))
    result = 10 / num
    print(f"结果是: {result}")
except ValueError:
    print("输入的不是有效数字！")
except ZeroDivisionError:
    print("不能除以零！")
except Exception as e:
    print(f"发生错误: {e}")
else:
    print("计算成功！")
finally:
    print("程序执行完毕")
```

## 八、面向对象编程

### 1. 类与对象
```python
class Student:
    # 类属性
    school = "某大学"
    
    def __init__(self, name, age):
        # 实例属性
        self.name = name
        self.age = age
    
    # 实例方法
    def introduce(self):
        return f"我叫{self.name}，今年{self.age}岁"
    
    # 类方法
    @classmethod
    def get_school(cls):
        return cls.school

# 创建对象
student1 = Student("小明", 20)
print(student1.introduce())
print(Student.get_school())
```

### 2. 继承
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def speak(self):
        return "我会说话"

class Teacher(Person):
    def __init__(self, name, age, subject):
        super().__init__(name, age)
        self.subject = subject
    
    def teach(self):
        return f"我教{self.subject}"

teacher = Teacher("张老师", 35, "数学")
print(teacher.speak())  # 继承的方法
print(teacher.teach())  # 自己的方法
```

## 九、模块与包

### 1. 导入模块
```python
# 导入整个模块
import math
print(math.sqrt(16))

# 导入特定函数
from math import sqrt, pi
print(sqrt(9))

# 给模块起别名
import numpy as np
import pandas as pd

# 导入自定义模块
from my_module import my_function
```

### 2. 创建模块
```python
# 文件: my_module.py
def hello():
    return "Hello from my_module!"

def add(a, b):
    return a + b

if __name__ == "__main__":
    # 只有当直接运行该文件时执行
    print("测试代码")
```

## 十、常用内置函数

```python
# 类型转换
str(123)        # "123"
int("456")      # 456
float("3.14")   # 3.14
list("abc")     # ['a', 'b', 'c']

# 数学运算
abs(-5)         # 5
round(3.14159, 2)  # 3.14
max([1, 5, 2])  # 5
min([1, 5, 2])  # 1
sum([1, 2, 3])  # 6

# 序列操作
len("hello")    # 5
sorted([3, 1, 2])  # [1, 2, 3]
reversed([1, 2, 3]) # 反转迭代器

# 输入输出
name = input("请输入你的名字: ")
print("你好,", name)
```
