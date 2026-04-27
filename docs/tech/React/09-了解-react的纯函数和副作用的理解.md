# 1. 纯函数： Pure Function

如果一个函数符合两个条件，它被称为**纯函数**

1. 此函数在相同的输入值时，总是产生相同的输出。函数的输出和当前运行环境的**上下文状态**无关。

2.  此函数运行过程不影响运行环境，比如不会触发事件、更改环境中的对象、终端输出值等。

简单来说，也就是当**一个函数的输出不受外部环境影响，同时也不影响外部环境时，该函数就是纯函数。**

# 2. 区分纯函数和非纯函数

JavaScript 内置函数中有不少纯函数，也有不少非纯函数。

比如以下函数是纯函数：

- String.prototype.toUpperCase
- Array.prototype.map
- Function.prototype.bind

以下函数不是纯函数：

- Math.random
- Date.now
- document.body.appendChild  //影响外部环境

# 3. 为什么要区分纯函数和非纯函数

因为在系统里，纯函数与非纯函数相比，在可测试性、可维护性、可移植性、并行计算和可扩展性方面都有着巨大的优势。

对于纯函数，因为是**无状态**的，测试的时候不需要构建运行时环境，也不需要用特定的顺序进行测试：

# 4. 副作用
​        除了修改外部的变量，一个函数在执行过程中还有很多方式产生外部可观察的变化，比如说调用 DOM API 修改页面，或者你发送了 Ajax 请求，还有调用 window.reload 刷新浏览器，甚至是 console.log 往控制台打印数据也是副作用。

```jsx 
//=========================================纯函数实例
function add(x,y){
    let x = x * 10
    return x+y
}

let result1 = add(2,8)
let result2 = add(1,8)
let result3 = add(1,8)
let result4 = add(1,8)

//===============================有副作用的不纯函数实例

// 输入相同参数，返回结果不同
function add(x,y){
    let x = x * 10
    let c = Math.random()
    return x+y+c
}

let a = 8;
function add(x,y){
    let x = x * 10
    //副作用
    let input = document.querySelector(".txt")
    input.value = '123'

    //副作用：更改了函数外部的变量的值
    a = 12
    
    //副作用
    console.log(1111)
    
    //副作用
    fetch("http://www.api.com").then...
    
    return x+y+c
}
```

# 5. 总结纯函数的好处

- 代码实现简洁

- 易于后期测试

- 纯函数还使得维护和重构代码变得更加容易