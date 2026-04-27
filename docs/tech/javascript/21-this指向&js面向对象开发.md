---
layoutClass: m-nav-layout
---

## 1. this指向 （高频面试题）

在 JavaScript 中,this 的指向是由函数的调用方式决定的,它指向调用函数的对象。this 的指向问题是 JavaScript 中非常重要但也常常令人困惑的一个概念。

一般来说,this 指向有以下几种情况:

### 1.1 全局环境中this

在全局函数中,this 指向全局对象 window

```js
function foo() {
  console.log(this) //window
}
foo() // Window {...}
```

### 1.2 对象方法中this

在对象方法中,this 指向拥有该方法的对象

```js
let obj = {
  name: 'obj',
  func: function () {
    console.log(this) //obj
  },
}
obj.func() // obj
```

### 1.3 构造函数中this

在构造函数中,或者原型方法中,this指向实例化对象

```js
function Foo() {
  this.name = 'foo'
  this.say = function () {
    console.log(this) // f
  }
}

Foo.prototype.run = function () {
  console.log(this) //f
}
let f = new Foo()
f.say()
console.log(f.name) // foo
f.run()
```

### 1.4. 事件绑定中this

事件绑定中的this: 指向绑定事件的对象

```js
dom.onclick = function () {
  console.log(this) // dom对象
}
```

### 1.5 定时器中this

定时器中的this, 指向window

```js
...
setTimeout(function(){
    console.log(this)
},1000)
```

### 1.6 箭头函数中this

箭头函数没有自己的 this,它会继承外层代码块的 this 值

```js
let obj = {
  name: 'obj',
  func: () => {
    console.log(this.name)
  },
}
obj.func() // undefined
// 此处的this继承自全局对象window
```

### 1.7 call / apply / bind手动绑定this

这三个方法可以手动绑定 this 的指向

```js
function foo() {
  console.log(this)
}

let obj = {
  name: 'obj',
}

foo.call(obj) // {name: "obj"}
foo.apply(obj) // {name: "obj"}
```

- call和apply的区别

  call和apply的相同点： 1. 调用函数 2. 改变this

  不同点：传参的方式， call是一个一个传，而apply必须以数组的形式传

```js
let search = document.querySelector('.search')

function add(x, y, z) {
  console.log(arguments) //接收所有参数，伪数组
  let result = x + y + z
  this.innerHTML = result //希望this指向search
}
//如果有传参，则第一个参数为this指向，后面才是真正的参数
add.call(search, 5, 7, 8)
add.apply(search, [5, 7, 8, 7])
```

- bind方法

  bind并没有调用foo, 而是foo调用bind方法，bind方法的返回值是新函数，而新函数中的this被改变

  bind返回的新函数和foo一样，只是this指向不同

```js
function foo() {
  console.log(1, this)
}

let obj = {
  name: 'obj',
}
foo.bind(obj)() // {name: "obj"}
```

所以综上,this 的指向是根据函数调用方式的不同而产生变化的,这也是 JavaScript 中一个容易令人混淆的地方。理解 this 指向的不同情况,可以让我们在编程中游刃有余,避免出现错误。

## 2. 面向对象和面向过程的区别

- 面向对象和面向过程是软件开发的两种方法或思想
- 面向过程是一件事“该怎么做“
- 面向对象是一件事“该让谁来做”，然后那个“谁”就是对象，他要怎么做是他自己的事，我们只需指挥对象即可
- 面向对象可以把程序中的关键模块都视为对象，而模块拥有属性及方法。这样我们如果把一些属性及方法封装起来，日后使用将非常方便，也可以避免繁琐重复的工作。

```JS
// 面向过程 ：
function eat(dog, food) {
}
eat('小黄', 'shi');
```

```js
// 面向对象：
function Dog() {
  this.eat = function (food) {}
}
let dog = new Dog()
dog.eat('shi')
```

## 3. 面向对象的三个基本特征（三大特性）--- 了解

### 3.1 封装

封装(Encapsulation)是面向对象的主要特性之一。它指的是将对象的数据与功能包裹在同一个模块内,对外隐藏内部的细节和实现,只通过约定的接口与之交互。

```js
// 定义对象Person
function Person() {
  // 私有变量
  let name = 'John'

  // 私有方法,只能在对象内部调用
  function privateFunc() {
    console.log(name)
  }

  // 共有方法 - 可以访问私有部分
  this.publicFunc = function () {
    privateFunc()
  }
}

let p = new Person()
p.publicFunc() // 输出 John
p.privateFunc() // 报错
```

在这个例子中,name 和 privateFunc() 只能在 Person 的作用域内访问, 构成了私有部分。而 publicFunc() 则是共有方法,它内部调用私有函数实现具体的功能。这实现了变量和方法的封装

#### 封装有以下主要好处

1. 隐藏实现细节,提高安全性。内部数据和功能对外部不可见,不会被外部修改或依赖。
2. 更易维护和扩展。可自由更改内部实现方案,而不影响外部调用。
3. 避免命名冲突。内部变量和函数仅在封装范围内可见,不会与外部变量发生冲突。

#### 用面向对象实现粒子效果 (简单了解)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      div {
        position: absolute;
        border-radius: 50%;
      }
    </style>
  </head>

  <body>
    <script>
      //自定义对象Ball
      function Ball(num) {
        this.colors = [
          '#f83600',
          '#FFF94C',
          '#0072ff',
          '#780206',
          '#7B920A',
          '#dc2430',
          '#A83279',
          '#00bf8f',
          '#FF512F',
          '#485563',
          '#061700',
          '#02AAB0',
        ]
        this.size = 30
        this.left = 100
        this.top = 100
        this.num = num
      }

      // 创建新的div,并设置随机尺寸，随机移动方向
      Ball.prototype.createElement = function () {
        //创建div新元素
        let div = document.createElement('div')

        //获取随机值
        this.size = this.rnd(20, 50)
        this.left = this.rnd(100, 1000)
        this.top = this.rnd(50, 400)

        //设置div样式
        div.style.width = this.size + 'px'
        div.style.height = this.size + 'px'
        div.style.background = this.colors[this.rnd(0, this.colors.length - 1)]
        div.style.left = this.left + 'px'
        div.style.top = this.top + 'px'
        // 追加到页面
        document.body.appendChild(div)
        //设置随机的移动方向
        let direction = this.rnd(1, 4)
        switch (direction) {
          case 1:
            this.moveToLeft(div)
            break
          case 2:
            this.moveToRight(div)
            break
          case 3:
            this.moveToTop(div)
            break
          case 4:
            this.moveToBottom(div)
        }
      }

      // 向右移
      Ball.prototype.moveToRight = function (el) {
        let posX = this.left
        setInterval(() => {
          posX++
          el.style.transform = `translate3d(${posX}px,${this.top}px,0)`
        }, 1000 / 60)
      }
      // 向左移
      Ball.prototype.moveToLeft = function (el) {
        let posX = this.left
        setInterval(() => {
          posX--
          el.style.transform = `translate3d(${posX}px,${this.top}px,0)`
        }, 1000 / 60)
      }
      // 向上移
      Ball.prototype.moveToTop = function (el) {
        let posY = this.top
        setInterval(() => {
          posY--
          el.style.transform = `translate3d(${this.left}px,${posY}px,0)`
        }, 1000 / 60)
      }
      // 向下移
      Ball.prototype.moveToBottom = function (el) {
        let posY = this.top
        setInterval(() => {
          posY++
          el.style.transform = `translate3d(${this.left}px,${posY}px,0)`
        }, 1000 / 60)
      }

      Ball.prototype.rnd = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      Ball.prototype.init = function () {
        for (let i = 0; i < 100; i++) {
          this.createElement(this.num)
        }
      }

      let balls = new Ball(100)
      balls.init()
    </script>
  </body>
</html>
```

### 3.2 继承

继承(Inheritance)是一种机制,它允许我们从现有对象创建新对象,新对象继承已有对象的属性和方法。继承允许我们重用代码,实现属性和方法的传递

在 JavaScript 中,继承的实现方式主要有:

- 原型链继承

  ```js
  function Parent() {
    this.name = 'parent'
  }

  Parent.prototype.sayName = function () {
    console.log(this.name)
  }

  function Child() {}

  Child.prototype = new Parent()

  var child = new Child()
  child.sayName() // parent
  ```

  > 这里 Child 的原型为 Parent 的实例,所以 Child 继承了 Parent 的属性和方法

- 构造函数继承

  ```js
  function Parent() {
    this.name = 'parent'
  }

  function Child() {
    Parent.call(this)
  }

  var child = new Child()
  child.name // parent
  ```

  > 这里通过 call 方法将 Parent 的属性继承给 Child 的实例

- 组合继承

  ```js
  function Parent(name) {
    this.name = name
  }

  Parent.prototype.sayName = function () {
    console.log(this.name)
  }

  function Child(name) {
    Parent.call(this, name)
  }

  Child.prototype = new Parent()
  Child.prototype.constructor = Child

  var child = new Child('child')
  child.sayName() // child
  ```

  > 这是 JavaScript 中最常用的继承方式,它结合了原型链继承和构造函数继承的优点。

除此之外,ES6还引入了 extends 和 super 用于继承,更加简洁高效 （ES6中讲）

### 3.3 多态

多态的字面意思就是多种状态,同一操作作用于不同的对象上,可以产生不同的解释和不同的执行结果

假设我们要编写一个地图应用，现在有两家可选的地图API 提供商供我们接入自己的应用

> 注意： 接口都是第三方接口，在实际开发中我们看不到，只能通过API接口调用功能
>
> 案例中涉及的接口都是

```js
//google地图接口
let googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图')
  },
}
// 百度地图接口
let bdMap = {
  show: function () {
    console.log('开始渲染百度地图')
  },
}
```

#### 非多态的开发方式

```js
let renderMap = function (type) {
  if (type === 'google') {
    googleMap.show()
  } else if (type === 'bd') {
    bdMap.show()
  }
}
renderMap('google')
```

> 可以看到，虽然 renderMap 函数目前保持了一定的弹性，但这种弹性是很脆弱的，一旦需要 替换成其他的地图接口，那无疑必须得改动 renderMap 函数，继续往里面堆砌条件分支语句

如果要添加对高德地图的接口

```js
// 高德地图接口
let gdMap = {
  show: function () {
    console.log('开始渲染高德地图')
  },
}

let renderMap = function (type) {
  if (type === 'google') {
    googleMap.show()
  } else if (type === 'bd') {
    bdMap.show()
  } else if (type === 'gd') {
    gdMap.show()
  }
}
renderMap('google')
```

#### 多态的开发方式

```js
let renderMap = function (map) {
  // 如果map.show函数不存在，为假，则不执行map.show()
  // 如果存在，则执行map.show()
  map.show && map.show()
}
renderMap(googleMap) // 输出:开始渲染谷歌地图
renderMap(bdMap) // 输出:开始渲染百度地图
```

> 总结： 多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而 消除这些条件分支语句

## 4. || 和 &&的特殊用法

```js
// ||: 如果左边为真，则将左边的值赋给变量，如果左边为假，则把右边的值赋给变量

let a = 3 || 6
console.log(a) //3

let b = 0 || 6
console.log(b) //6
```

```js
function show(num, cb) {
  if (num > 8) {
    // 如果&&左侧的值为真，则执行右侧的表达式，如果左侧为假，则右侧不执行
    cb && cb(num)
  } else {
    console.log('end')
  }
}
```
