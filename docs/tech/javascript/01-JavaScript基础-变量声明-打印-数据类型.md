---
layoutClass: m-nav-layout
---

## 1 JavaScript的使用方式

### 1.1 JavaScript的引入方式

#### 1.1.1 JS代码直接写在script标签中

```javascript
<script>console.log('Hello World!');</script>
```

#### 1.1.2 JS代码单独存放在JS文件中

使用单独的JavaScript文件，可以将HTML和JavaScript代码解耦，但是在做练习的时候建议使用1.1提供的方法。正常项目时应该单独存放在不同的文件中。

js/index.js

```javascript
// JavaScript代码应该存放在这个位置
console.log('Hello World')
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- script标签最好添加到body闭合标签之前 -->
    <script src="./js/index.js"></script>
  </body>
</html>
```

### 1.2 JavaScript注释方式

#### 1.2.1 单行注释

```javascript
// 单行注释
```

#### 1.2.2 多行注释

```javascript
/*
	多行注释
  多行注释
  多行注释
*/
```

```javascript
// console.log('hello');// 这行代码不会被编译
/*
	console.log('world');//这块代码不会被编译
*/

console.log('你好世界') // 这里在控制台打印  你好世界
```

---

## 2 字面量

字面量就是一些不改变的值，这些值可能是一些字符串，一些数字等相关形式。直接写在script标签中是不会报错的。

```javascript
'这是一段文字' // 字符串
10 // 整数数字
3.1415926 // 小数数字
```

---

## 3 内容输出

在JS中输出内容有很多种方式，我们来说三种常见的内容输出方式，这三种方式都不会作为常规编程使用，只是在测试及调试时使用更加方便。先学习方法。

### 3.1 控制台输出

#### 3.3.1 console.log

如果我们想要在控制台输出一些内容，那么我们可以使用 `console.log` 进行输出。

```javascript
console.log('Hello World')
```

观察控制台输出的内容，试一试其他的输出内容。

### 3.2 警告框输出

#### 3.2.1 alert

警告框输出会阻止代码运行。可以在网页上弹出一个警告框

```javascript
alert('Hello World')
```

### 3.3 页面输出

#### 3.3.1 document.write

页面输出未来很少使用，前期我们可以先用这个简单的办法实现一些特殊的功能。该功能可以在网页中输出内容

```javascript
document.write('Hello World')
```

---

## 4 变量声明

### 4.1 变量声明关键字

- var
- let
- const

变量是对字面量的存储，当我们想要反复使用某个字面量时，可以使用变量存储，下次直接使用变量名即可，不需要再去创建一个新的字面量。

如果我们要弹出三次的`Hello JavaScript`字符，那么我们就需要使用以下代码

```javascript
alert('Hello JavaScript')
alert('Hello JavaScript')
alert('Hello JavaScript')
```

如果使用变量，我们就变成了下面的写法

```javascript
var str = 'Hello JavaScript'
alert(str)
alert(str)
alert(str)
```

类比生活：

第一种方式相当于一次性的，用完就没了，下次在用需要代码做一个新的。第二种方式是反复重复使用的，用了就可以一只使用。

#### 4.1.1 var

var是最早的声明变量的方法，我们可以使用var声明一个变量。

我们可以把变量类比成一个箱子，箱子里面可以装任何东西（比如数字、字符串等），并且箱子可以重复利用（被重新赋值）。

##### 4.1.1.1 变量声明

变量可以单独声明，就像我们单独做了一个箱子，但没有往箱子中放任何东西

```javascript
var 变量名 // 单独声明变量不赋值
```

##### 4.1.1.2 变量赋值

变量赋值是一个把值存放在变量中的过程，这个过程需要用赋值运算符 `=` 来进行。

```javascript
var 变量名
变量名 = 值
```

这是一种先声明再赋值的过程，一般情况下，我们可以将变量声明及赋值放在一起

```javascript
var 变量名 = 值
```

##### 4.1.1.3 变量提升问题

使用`var`声明的变量存在变量提升的问题，那么什么是变量提升。变量提升一个客观事实，表现为，当我们先使用变量，后声明变量时，没办法得到正常的结果，看下面效果。

```javascript
console.log(str) // 如果是其他编程语言，这个地方是会报错的，告诉我们变量str找不到。但是在js中不会这样，js会直接输出undefined，一个没有学过的值
var str = 'Hello World'
```

在JavaScript中，上面的代码其实相当于下面的代码

```javascript
var str
console.log(str) // 输出一个还没有学过的值undefined
str = 'Hello World'
```

#### 4.1.2 let

let和const是ES6中新增的关键字，用于声明变量的一种新的方式，使用方式和var相同。let声明变量，可以进行重新赋值，const声明常量，无法被重新赋值

let和const的出现解决的其中一个问题就是变量提升的问题。使用let声明的变量不会出现该问题

```javascript
console.log(str) // str is not defined
let str = 'Hello World'
```

#### 4.1.3 const

const用法和let相同，表现上只有一点差异，const无法被重新赋值，也就是用const声明的变量的箱子是封死的，无法改变内部的内容

```javascript
let str = 'Hello World'

str = 'Hello JavaScript' // 正常执行
```

如果使用const则会直接报错

```javascript
const str = 'Hello World'

str = 'Hello JavaScript' // Uncaught TypeError: Assignment to constant variable.
```

### 4.2 变量名命名规范

#### 4.2.1 规则

- 由字母、数字、下划线、$符号组成，不能以数字开头
- 不能是关键字和保留字，例如：for,while,this,name
- 区分大小写

#### 4.2.2 规范

- 变量名必须有意义
- 遵守驼峰命名法
- 建议不要用$作为变量名

```javascript
var a = 1;// 合法的变量名
var var = 1;// 报错语法错误,不应该用关键字作为变量名 Uncaught SyntaxError: Unexpected token 'var'
var a1 = 1;// 合法的变量名
var 1a = 1;//语法错误，不合法的采用变量名不能用数字开头 Uncaught SyntaxError: Invalid or unexpected token
var a = 1;
console.log(A);//报错，A未定义  A is not defined ,大写的A 和 小写的a 是两个变量名;
// 驼峰命名法
// 如果一个变量名由多个单词组成，除首字母外，后边所有单词的首字母大写的形式
var goodsList;
```

---

## 5 数据类型

字面量其实有不同的类型，在写JS代码时，在不同的情况，我们也需要使用不同的类型值，前期我们不清楚什么时候使用不同的类型，那么我们就需要先学习类型都有那些。

JS中的值都是存储在内存中的

### 5.1 原始值

原始值存储在栈内存（前期不需要理解），这些变量一旦改变，则值就会从内存中被销毁。

```javascript
let str = 'Hello World'
str = 'Hello JavaScript' // 这个Hello World被销毁
```

#### 5.1.1 String

在JS中，所有的用引号包裹的内容都是字符串

```javascript
'字符串'
'字符串'
'123'
'3.14'
'true'
```

字符串包裹不限双引号和单引号，但是如果在一个字符串中想要使用引号则必须使用不同的引号进行包裹，或者使用转译符号 `\` (反斜杠)

```javascript
"这是一个'字符串'，里面有个单引号"
'这是一个\'字符串\'，里面有个单引号'

'这是一个"字符串"，里面有个单引号'
"这是一个\"字符串\"，里面有个单引号"
```

##### 5.1.2 Number

在JS中直接写的数字没有被引号包裹的叫Number

```javascript
1
10
10.11
0xff
```

##### 5.1.2.1 NaN

NaN是一个特殊的数字，全称“Not a Number（不是一个数字）”因为在JS中很多操作都可能把一些值转换为数字，但是有些值，如特殊字符串等无法被转换为现存的数字类型

#### 5.1.3 Boolean

在JavaScript中，有一个值掌管对错，那就是布尔值（Boolean），布尔值只有两个值 `true` 和 `false`

```javascript
true
false
```

#### 5.1.4 Undefined

Undefined类型下只有`undefined`一个值，这个值在很多地方都会出现，先做了解。变量声明未赋值时就是 `undefined`

```javascript
const str
console.log(str) // undefined
```

#### 5.1.5 Null

Null和undefined有很多的渊源，在这里不做解释，null表示为空。可以在后期讲，这里先提一下

### 5.2 引用值

引用值存储在内存的堆内存中，栈内存中存储的只是一个堆内存地址。这句话先做了解先不讲

#### 5.2.1 数组

当我们无法用原始值中的类型表示一个数据的集合时，数组就产生了。数组是很多值的集合，一个变量箱子中本来只能存放一个值，用了数组，就可以存放很多的值，并且值不限制类型。

##### 5.2.1.1 数组语法

数组的写法很简单，我们可以使用 `[]` 来表示数组

```javascript
let arr = []
```

创建数组时我们可以在数组中存放值，值的写法是统一的

```javascript
let arr = [1, '字符串', true, undefined, null, []]
```

数组中的值类型不作限制，设置我们可以直接存放一个新的数组都可以

##### 5.2.1.2 索引值

在数组中，值是有顺序的，从0开始到最终结束。

`[1,2,3,4,5]` 这个数组的顺序就是0、1、2、3、4，而这些值就是这个数组的索引值，也叫下标

##### 5.2.1.2 数组取值

如果我们想要使用数组中的某个值，则需要使用`变量名[索引值]`

```javascript
let arr = ['第一个值', '第二个值', '第三个值', '第四个值']
console.log(arr[0]) // 第一个值
console.log(arr[1]) // 第二个值
console.log(arr[2]) // 第三个值
console.log(arr[3]) // 第四个值
```

关于数组的深入了解，我们需要在后期课程中做讲解。

#### 5.2.2 对象

数组可以存储多个值，但是无法得知每个值的作用是什么，如果我们想要给每个值有对应的特性，可以使用对象，对象以 `key: value` 形式存在。在 `{}` 中包裹

```javascript
{
	key: value,
  key: value,
  key: value,
  自定义属性名: "属性值"
}
```

比如，如果我们想要表示一个学生的“姓名”, “年龄”, “性别”，使用数组表示为下面的形式

```javascript
let stu = ['张三', 18, '男'] // 虽然每个值都有，但是在有些时候，我们不知道那个值对应的是什么，这个时候就可以使用对象
```

使用对象则会更加清晰明了

```javascript
let stu = {
  name: '张三',
  age: 18,
  sex: '男',
}
```

---

## 本章小结

![img](https://cdn.nlark.com/yuque/0/2021/png/203294/1610441660870-e02a7f15-83e8-4ad2-befb-d760aa45805b.png)
