## 认识ES6

参考网址：《ES6 入门教程》: https://es6.ruanyifeng.com/  作者： 阮一峰

- ECMAScript 6.0（简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了
- 提到 ES6 的地方，一般是指 ES2015 标准，但有时也是泛指“下一代 JavaScript 语言”：ES2015、ES2016、ES2017等
- 最新ES2021即ES12

## 1. 数组的扩展
####  扩展运算符
扩展运算符（spread）是三个点（`...`）
```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
```
####  扩展运算符应用

1. 扩展运算符取代`apply`方法的一个实际的例子，应用`Math.max`方法，简化求出一个数组最大元素的写法。
```javascript
// apply方法实现
let max = Math.max.apply(null, [1,2,3,4,5])

// 扩展运算符实现
let max = Math.max(...[1,2,3,4,5])
```

2. 复制数组
```javascript
const a1 = [1, 2];
const a2 = [...a1];

```

3. 合并数组
```javascript
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];
let newArr = [...arr1, ...arr2, ...arr3];
```

4. 与解构赋值结合使用

扩展运算符可以与解构赋值结合起来，用于生成数组。
```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
```
#### 数组的迭代

> 以下遍历（迭代）方法回调的两个形参分别为项目值和索引
> 都需要return

1. **map()**

返回一个由回调函数的返回值组成的新数组。
```javascript
let newArr = [1,2,3,4].map((item, index) => {return item * index})
```

2. **filter()**

将所有在过滤函数中返回 `true` 的数组元素放进一个新数组中并返回。
```javascript
let res = [10,4,5,2,1].filter((item, index) => {return item >= 5})
```

3. **some()**

如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false
```javascript
let res = [5,6,7,8,9].some((item, index) => {return item > 8})
```

4. **every()**

如果数组中的每个元素都满足测试函数，则返回 `true`，否则返回 `false。`
```javascript
let res = [5,6,7,8,9].every((item, index) => {return item > 8})
```

5. **reduce()**

从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
```javascript
// 没有指定初始值
let sum = [1,2,3,4,5].reduce((accumulator, currentValue,index) => {return accumulator + currentValue})
// 15
// 指定初始值
let sum = [1,2,3,4,5].reduce((accumulator, currentValue,index) => {return accumulator + currentValue}, 10)
// 25
```

6. **find()** --ES6

找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 `undefined`。
```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
```

7. **findIndex()** --ES6

数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`
```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
####  数组新增方法

1. **Array.from()**

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

2. **Array.of()**

`Array.of`方法用于将一组值，转换为数组。

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

3. **Array.includes()**

`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值

```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // falses
[1, 2, NaN].includes(NaN) // true
```

## 2. let: 声明块级作用域
- 不存在声明提前的问题
- 在同一个块中，不能重复声明
- 通过let可获取正确的索引

```js
    let arr = []
    for (let i = 0; i < 6; i++){
        arr[i] = function(){
            console.log(i)
        }
    }
    arr[3]()
```

## 3. const: 声明常量

- const也是块级作用域
- 声明的同时要赋值,不允许赋新值，不允许重复
- 如果 const 保存的是数组/对象/函数等 空间的地址时, 只能保证 所保存的地址不变, 地址中的值, 仍可改变.

> 什么是暂时性死区？
>
> ES6 规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”，也就是说使用let声明的变量都是先声明再使用 ，不存在变量提升问题

## 4. 箭头函数

箭头函数的基本语法：()=>{}

```js
let fun = ()=>{}
let fun = (x,y) => {}
let fun = x => {}  //如果只有一个参数,()可以省
let fun = (x,y) => console.log(x+y)  // 如果只有一条语句,{}可以省
let fun = (x,y) => 3  // 如果只有一条return语句,return可以省略
let fun = (x,y) => ({  // return对象
        name: 1,
        age: 2
    })
arr.forEach(()=>{})
setInterval(()=>{},1000)
```

### 箭头函数的this指向
箭头函数自身没有this,它内部的this是定义箭头函数所在环境的this

```js
box.onclick = function(){
    // console.log(this);
    let i  = 0
    setInterval(()=>{
        this.innerHTML = i;  //this是box
        i++
    },1000)
}
```
## 5. 对象字面量的简写

```js
let color = 'red',
    age = 18;

let obj = {
    color,
    age,
    run(){
        console.log('run')
    }
}
```

## 6. 类和继承 （重要）

定义父类
```js
class Animal {
    constructor(color){
        this.type = 'animal';
        this.eye = true;
        this.color = color;
    }
    sound(){
        console.log('sound')
    }
}

var ani = new Animal('red')
```
定义子类

```js
class Cat extends Animal{
    constructor(nickname,age,color){
        super(color);
        this.nickname = nickname;
        this.age = age;
    }
    eat(){
        console.log('eat')
    }
}
var cat = new Cat('小猫咪',5,'white')
cat.sound()
```
## 7. 模板字符串
```js
    let color = 'red';
    let str = `this is ${color}`
```
## 8. 解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）
### 1. 数组的解构
从数组中提取值，按照对应位置，对变量赋值
本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值

####  完全解构
```javascript
let [a, b, c] = [1, 2, 3];
a // 1    
b // 2    
c // 3

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1   
bar // 2   
baz // 3

let [ , , foo] = [1, 2, 3]
foo // 3
```
如果解构不成功，变量的值就等于`undefined`。
```javascript
let [foo] = [];
foo //  undefined
let [bar, foo] = [1];
bar // 1    
foo // undefined
```
####  不完全解构
不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
```javascript
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```
####  默认值
解构赋值允许指定默认值。
```javascript
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```
默认值可以引用解构赋值的其他变量，但该变量必须已经声明
```javascript
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
//报错原因是因为x用y做默认值时，y还没有声明
```
### 2. 对象的解构
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
####  对象解构
```javascript
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```
####  变量名重命名
如果变量名与属性名不一致，必须写成下面
对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
####  默认值
对象的解构也可以指定默认值。
```javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5
```
### 3. 字符串解构
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象
```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
### 4. 函数参数解构
函数的参数也可以使用解构赋值。
```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); 
```

## 9. 展开运算符...

把数组或对象中的值打散，一个一个罗列

### 常见案例

- 向函数传参

```js
let arr = [34, 56, 78];

function total(Ch, En, Math) {
    return Ch + En + Math;
}
let result = total(...arr)
```

- 把伪数组转为数组

```js
let divList = document.querySelectorAll("div");

//伪数组可以调用 forEach,不能调用其它数组的遍历方法
divList.forEach((el)=>{
    console.log(el);
})

var arr = [...divList].map((el)=>{
    return el.innerHTML
})
console.log(arr);

```

- 合并数组

```js
let arr1 = [1,2,3]
let arr2 = [4,5]
let arr3 = [...arr1,...arr2]
```

- 展开对象

```js
let option = {
    el: '#app',
    autoplay: true
}
let custom = {
    speed: 300,
    duration: 1000,
    ...option
}
console.log(custom)
```



## 10. 默认参数

```js
function draw(radius=100){
    console.log(radius);
}
draw(30)

// 默认(default)参数必须设置在最后
function draw(y,x=2,z=20){
    console.log(x,y,z);
}

draw(1)
draw(1,3)
```

## 11. 剩余参数

```js
// 函数中的arguments是伪数组，...args是真数组
function total(...args){
    console.log(args);
    console.log(args instanceof Array);  //true
}
total(23,45)
```

## 12. Symbol数据类型-了解
获取唯一的不会重复的变量，是ES6新增的基本数据类型
```js
// Symbol的应用场景

//第三方的库中定义了一个对象(对用户来讲是隐蔽的)

let obj = {
    name: '23',
    count() {
        console.log('count');
    }
}

// 对对象的功能进行扩展：希望用一个一定不会和对象已有属性重复的属性名

let count = Symbol();

obj[count] = function(){
    console.log('数量');
}

obj.count()  // count
obj[count]();  //数量

//Reflect.ownKeys():  返回一个包含所有自身属性（不包含继承属性）的数组
console.log(Reflect.ownKeys(obj)) 
```

## 13. Set类型的数据-了解
是ES6中新增的集合的数据类型，用来存放数组。但是，数组的元素不允许重复

不能通过索引获取值

数组去重
```js
var arr = [1,2,3,2,5,1]
var result = [...new Set(arr)]
console.log(result);
```
Set常用的API
```js
1. add
2. delete
3. has
4. clear
```

```js
var set1 = new Set([]);
    set1.add('a');
    set1.add('b');
    set1.add('c');
    set1.add('b');

    set1.delete("b")
    set1.clear();

    console.log(set1);
    console.log(set1.has("d"));
```

Set的遍历

```js
 var set2 = new Set([2,5,7,9])
 set2.forEach((item)=>{
 	console.log(item);
 })

for (let val of set2){
	console.log(val);
}
```

## 14. for...of语句

- for: （1）需要明确遍历次数  (2)不能遍历对象，可以遍历对象以外的集合 array,伪数组 （3）可以使用break和continue
- forEach: (1) 可以遍历对象以外的集合 （数组，Set, NodeList--->dom集合）  （2）不能使用break和continue
- for...in  (1)遍历对象  (2)不能直接访问对象的属性值 (3)可以使用break和continue
- 新增的for...of: 
(1) 自定义的对象不能使用for...of,但大部分原生的数据集合都可以使用 (数组、字符串、Set类型、Map类型、NodeList)
(2)可以使用break和continue

```js
    //作用于数组
    var arr = ['a','c','d']
        for(let i of arr){
            console.log(i);
        } 
```

```js
//作用于元素节点NodeList
    let divList = document.querySelectorAll("div");
        for (let el of divList){
            console.log(el);
        }

```

## 15. Object新增的API 

1. Object.is(a,b) 判断a和b的值是否相等

   ```js
   console.log(NaN === NaN)  //false
   console.log(Object.is(NaN,NaN)) // true
   ```

2. Object.assign: 合并对象

   Object.assign() 方法主要用于对象的合并将所有可枚举属性的值从一个或多个源对象复制到目标对象。它会返回目标对象。

   - target: 目标对象,接收属性和值的对象。
   - sources: 源对象,属性会被复制到目标对象的对象。

   ```js
   const target = { a: 1, b: 2 };
   const source = { b: 4, c: 5 };
   
   const returnedTarget = Object.assign(target, source);
   
   console.log(target); 
   // {a: 1, b: 4, c: 5}
   
   console.log(returnedTarget); 
   // {a: 1, b: 4, c: 5}
   ```

   

3. Object.keys()： 返回对象所有键组成的集合

```js
        let obj = {
            name: 'Peppa',
            age: 4,
            sex: '女'
        }
        // ["name","age","sex"]
        console.log(Object.keys(obj));
```
## 16. Map类型的数据-了解
类似于对象，用来存储键值对。
对象只能使用字符串作为属性名，而Map可以使用任意类型的数据做为属性名

```js
//第一个键是"a",值是1, 第二个键是b,值是2
        var map1 = new Map([["a",1],["b",2]]);
        console.log(map1);
```

Map的API

```js
        属性: size 
        方法: set , get , has, delete ,clear
```

for...of 遍历
```js
    var map1 = new Map([["a", 1], ["b", 2]]);
        
        //只遍历键
        for (let key of map1.keys()){
            console.log(key);
        }

        // 只遍历值
        for (let val of map1.values()){
            console.log(val);
        }


        // val是数组，存储了每一个的键和值
        for (let val of map1){
            console.log(val[0]);
            console.log(val[1]);
        }

        //同时返回键值对
        for (let [key,value] of map1){
            console.log(key);
            console.log(value);
        }

        // 等价于上面的写法
        for (let [key,value] of map1.entries()){
            console.log(key);
            console.log(value);
        }
```

## 17. Promise （最重要）
- promise用来解决回调地狱的问题，把异步的代码用同步的方式来实现

- Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
        它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

 - 一个Promise的三种状态
        pending: 初始状态，既不是成功，也不是失败状态。
        fulfilled: 意味着操作成功完成。
        rejected: 意味着操作失败。

 - Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
        Resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
        Reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
- Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。


```js
// 需求： ajax1执行完再执行ajax2,ajax2执行完再执行task
function ajax1() {
    setTimeout(function () {
        console.log('ajax1');
    }, 1000)
}
function ajax2() {
    setTimeout(function () {
        console.log('ajax2');
    }, 2000)
}
function task() {
    console.log('task');
}

```
用Promise实现
 ```js
        var flag1 = true;
        var flag2 = false;

        function error(err) {
            console.log(err);
        }
        function ajax1() {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    if (flag1) {
                        resolve('ajax1的结果')
                    } else {
                        reject('ajax1错误')
                    }
                }, 1000)
            })
        }

        function ajax2(data) {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log('ajax2接收ajax1的参数', data);
                    if (flag2){
                        resolve()
                    }else{
                        reject('ajax2错误')
                    }
                }, 2000)
            })
        }

        function task() {
            console.log('task');
        }

        ajax1()
            .then(ajax2)
            .then(task)
            .catch(error)
 ```
### Promise.all() Promise.race()
 Promise.all() 两个异步操作都成功完成后，再执行的逻辑
 Promise.race() 最先得到结果的异步操作执行成功，即执行下面的逻辑
 all()和race()中的参数必须是promise实例

 ```js
    Promise.all([ajax1(),ajax2()])
            .then(function(data){
                console.log('两个请求都成功后的数据',data);
                task(data)
            })
            .catch(err)
 ```

 ```js
    Promise.race([ajax1(), ajax2()])
            .then(function (data) {
                console.log('请求返回最快的任务的结果', data);
                task(data)
            })
            .catch(err)
 ```

 ## 18. async和await的用法（最重要）
- async: 定义一个异步函数,消除promise中then的链式调用 ，让代码更加清晰，优雅
- await后面接一个会return new promise的函数并执行它
- await只能放在async函数里
- async函数通过try...catch处理失败时要执行的逻辑 
```js
    var flag1 = false;
        var flag2 = true;
        function ajax1() {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log('ajax1任务执行完毕');
                    if (flag1) {
                        resolve('ajax1的结果')
                    } else {
                        reject('ajax1错误')
                    }
                }, 1000)
            })
        }
        function ajax2(data) {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log('ajax2', data);
                    console.log('ajax2任务执行完毕');
                    if (flag2) {
                        resolve('ajax2的结果')
                    } else {
                        reject('ajax2错误')
                    }
                }, 2000)
            })
        }
        function task(data) {
            console.log('task任务执行完毕');
            console.log('task', data);
        }
       

        async function render() {
            try {
                let result1 = await ajax1()
                await ajax2(result1)
                task()
            }catch(err){
                console.log('catch',err);
            }
        }
        render()
```

## 19 . 事件循环(Event Loop)-高频面试题

### 1. 面试回答 

```
所有的任务可以分为同步任务和异步任务，同步任务，顾名思义，就是立即执行的任务，同步任务一般会直接进入到主线程中执行。而异步任务，就是异步执行的任务，比如 ajax 网络请求，setTimeout 定时函数等都属于异步任务，异步任务会通过任务队列的机制(先进先出的机制)来进行协调。

同步和异步任务分别进入不同的执行环境，同步的进入主线程，即主执行栈，异步的进入任务队列。主线程内的任务执行完毕为空，会去任务队列读取对应的任务，（会先执行所有的微任务，然后才会执行宏任务）推入主线程执行。上述过程的不断重复就是我们说的 Event Loop (事件循环)。
```

### 2. 宏任务和微任务

都是异步任务

参考宏任务和微任务： https://blog.csdn.net/RedaTao/article/details/81504532

宏任务：包括整体代码 script，setTimeout，setIntervcal

微任务：Promise

> 1. 存在微任务的话， 那么就执行所有的微任务.  
> 2. 微任务都执行完之后， 执行第一个宏任务
> 3.  循环 1， 2

###  3. 读程序，写结果 

demo1

```js
console.log('1'); //

// h1
setTimeout(function () {
    console.log('2'); //
    new Promise(function (resolve) {
        console.log('3'); //
        resolve();
    }).then(function () {
        console.log('4'); //
    })
}, 20);

new Promise(function (resolve) {
    console.log('5'); //
    resolve();
}).then(function () {
    console.log('6'); //
});

// h2
setTimeout(function () {
    console.log('7'); //
    new Promise(function (resolve) {
        console.log('8'); //
        resolve();
    }).then(function () {
        console.log('9'); //
    });
},0)
console.log('end')

// 打印结果：1  5 end 6 7 8 9 2 3 4
```

demo2

```js
console.log('1'); //
// h1
setTimeout(function () {
    console.log('2'); //
    new Promise(function (resolve) {
        console.log('3'); //
        setTimeout(()=>{
            console.log(11)
            resolve()
        },100)
    }).then(function () {
        console.log('4'); //
    })
}, 0);

new Promise(function (resolve) {
    console.log('5'); //
    setTimeout(()=>{
        console.log(10)
        resolve()
    },100)
}).then(function () {
    console.log('6'); //
});

// h2
setTimeout(function () {
    console.log('7'); //
    new Promise(function (resolve) {
        console.log('8'); //
        resolve();
    }).then(function () {
        console.log('9'); //
    });
    console.log(12)
},20)
console.log('end')

// 打印：  1 5 end 2 3 7 8 12 9  10  6  11  4
```

## 20. Object.defineProperty-了解

ES5中的方法，用于定义对象的属性

```js
let obj = {
    name: '西游记',
    addTime: '739754975945489'
}

//必须使用一个临时变量，来存储name属性的值
let temp = obj.name;


// 拦截器(劫持)
Object.defineProperty(obj, "name", {
    //存取器
    get: function () {
        console.log('get');
        //get中一定要有return,return的结果即为name属性的新值
        return "《" + temp + "》"
    },
    set: function (newVal) {
        console.log('set');
        temp = newVal;
    }
})


obj.name = "窗边的小豆豆";
console.log(obj.name);
```

## 21. ES6的Proxy对象-了解

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```js
let obj = {
    name: '西游记',
    addTime: '739754975945489'
}

let newObj = new Proxy(obj,{
    get(target,prop){
        // target是源对象，prop是访问的属性
        // console.log('get',target,prop);
        if (prop == "name"){
            return `《${target[prop]}》`
        }else{
            return target[prop]
        }
    },
    set(target,prop,newVal){
        console.log('set',target,prop,newVal);
        target[prop] = newVal
    }
})
console.log(newObj.name);
newObj.addTime = '000'
console.log(newObj.addTime);
console.log(obj);
```

## 22. ES6模块化 （重要）

ES6模块化又称为ESM 即为 ES Moudle

### 为什么要使用ES6模块化

1. 解决命名空间冲突。通过模块化,每个模块有自己的命名空间。
2.  依赖管理。可以清楚地看到模块的依赖关系。
3.  高度封装。模块可以选择导出部分内容,隐藏其他实现细节。
4.  可重用。可以在多个模块中重复使用同一模块。

### ES6如何实现模块化

ES6模块化主要通过export和import两个关键字实现。

#### 导出模块

- 命名导出:使用export关键字导出

  ```js
  export const PI = 3.14
  export function square(x) { ... } 
  ```

- 默认导出

  使用export default关键字导出,每个模块只能有一个默认导出

  ```js
  export default function() { ... }
  ```

#### 导入模块

import用于导入其他模块中的导出内容,主要有两种导入方式:

 命名导入:使用{ }指定导入内容的名称

```js
import { PI, square } from './math.js'
```

- 整体导入+改名:使用as关键字重新命名

```js

import * as math from './math.js'
math.PI
math.square()
```

-  默认导入:使用默认导出的名称导入

```js
import square from './math.js' 
square()
```

## ES6相关面试题 

1. ES6的新特性

2. var let const的区别

3. 用Set如何实现数组去重

4. promise, promise.all promise.race

5. async await

6. 事件循环

7. for...of和其它循环语句的区别

   