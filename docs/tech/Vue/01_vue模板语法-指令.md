## 1. 了解三大前端框架

目前前端有三个非常流行的框架，分别是angularjs,reactjs,vuejs。而这三个当中，Vue作为最后推出的框架（2014年），借鉴了前辈angular和react的特点（如VirtualDOM、双向数据绑定、diff算法、响应式属性、组件化开发等）并做了相关优化，使其使用起来更加方便，更容易上手。

Vue的开发者尤雨溪是中国人，框架本身提供了大量丰富的中文文档，这也为Vue的发展和使用带来巨大的优势

## 2.  什么是 Vue？

vue3官网： https://cn.vuejs.org/

Vue (发音为 /vjuː/，类似 **view**) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。

## ３.创建一个 Vue 应用

### vue3

- 每个 Vue 应用都是通过 [`createApp`](https://cn.vuejs.org/api/application.html#createapp) 函数创建一个新的 **应用实例**
- 应用实例必须在调用了 `.mount()` 方法后才会渲染出来。该方法接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串

```html
<!-- 根组件模板 -->
<div id="app">
    <button @click="count++">{{ count }}</button>
</div>
```

```html
<script src="./js/vue3.js"></script>
<script>
    const { createApp } = Vue
    // 创建应用实例
    const app = createApp({
        data() {
            return {
                count: 0
            }
        }
    })
    //mount()挂载应用
	app.mount('#app')
</script>
```

### vue2
```html
  <!-- 根组件模板 -->
  <div id="app">
      <button @click="count++">{{ count }}</button>
  </div>
```

  ```html
<script src="./js/vue2.js"></script>
<script>
    // new Vue生成应用实例
    const app = new Vue({
        data() {
            return {
                count: 0
            }
        }
    })
    //$mount() 挂载应用
    app.$mount('#app')
</script>
  ```

## 4. 快速生成vue文件模板

- vscode -> 文件 -> 首选项 ->配置用户代码片段 -> html.json

- 粘入代码：

  ```json
  {
  	"Html5-Vue": {
  			"prefix": "vue",
  			"body": [
  				"<!DOCTYPE html>",
  				"<html lang=\"en\">",
  				"",
  				"<head>",
  				"\t<meta charset=\"UTF-8\">",
  				"\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">",
  				"\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
  				"\t<title>Document</title>",
  				"</head>",
  				"",
  				"<body>",
  				"\t<div id=\"app\"> ",
  				"\t\t$0",
  				"\t</div>",
  				"",
  				"\t<script src=\"./js/vue3.js\"></script>",
  				"\t<script>",
  				"\t\tconst { createApp } = Vue",
  				"\t\tconst app = createApp({",
  				"\t\t\tdata() {",
  				"\t\t\t\treturn{",
  				"\t\t\t\t\t",
  				"\t\t\t\t}",
  				"\t\t\t},",
  				"\t\t\t//方法集合",
  				"\t\t\tmethods: {\n",
  				"\t\t\t}",
  				"\t\t})",
  				"\t\tapp.mount(\"#app\")",
  				"\t</script>",
  				"</body>",
  				"",	
  				"</html>"
  			],
  			"description": "快速创建在 html5 编写的 vue 模板"
  		}
  	}
  	
  	
  ```

- 新建html文件， 输入vue, 回车即可

## 5.模板语法 

Vue 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。

在底层机制中，Vue 会将模板编译成高度优化的 JavaScript 代码。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。

## 6. 文本插值-模板语法

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：

```
<span>Message: {{ msg }}</span>
```

双大括号标签会被替换为[相应组件实例中](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state) `msg` 属性的值。同时每次 `msg` 属性更改时它也会同步更新。

文本插值也可以是js表达式

```js
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}
```

## 7. vue指令-模板语法
- 指令是带有 `v-` 前缀的特殊 attribute（属性）

- 指令 attribute 的期望值为一个 JavaScript 表达式

- 一个指令的任务是在其表达式的值变化时响应式地更新 DOM

- 某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识, 比如 v-bind:src 

### 7.1 v-html
可以解析html标签
```html
<h1 v-html="msg"></h1>
<h1 v-html="msg + 'world'"></h1>
```
可以在绑定的表达式中使用一个组件暴露的方法

```html
<!-- 模板 -->
<div id="app">
    <p v-html="total(2)"></p>
</div>
```

```js
const { createApp } = Vue
const app = createApp({
    data() {
        return {
            price: 100
        }
    },
    methods: {
        total(num){
            return this.price * num
        }
    }
})
app.mount('#app')
```

### 7.2 v-bind

绑定动态属性
```html
<h1 title="msg">1111</h1>
<h1 v-bind:title="msg">2222</h1>
<h1 :title="msg">2222</h1>
<img :src="图片地址"/>
```
### 7.3 v-on
#### 事件绑定

```html
<div id="app"> 
    <p><button v-on:click="fun1">没有参数1</button></p>
    <p><button @click="fun1">没有参数2</button></p>
    <p><button @click="fun2('red')">有参数</button></p>
    <p><button @click="fun3">获取事件对象</button></p>
    <p><button @click="fun4(10,$event)">有参数+获取事件对象</button></p>
</div>
```



```javascript
 const { createApp } = Vue
 const app = createApp({
     data() {
         return{

         }
     },
     //方法集合
     methods: {
         //没有参数
         fun1(){
             console.log('fun1');
         },
         //有参数
         fun2(color){
             console.log(color);
         },
         //获取事件对象
         fun3(e){
             console.log(e);
         },
         //事件对象+参数 , 特别注意，调用时最后一个参数为$event
         fun4(age,e){
             console.log(age);
             console.log(e);
         }
     }
 })
 app.mount("#app")
```
#### 事件绑定修饰符

```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>
```

#### 按键修饰符

```html
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
```

Vue 为一些常用的按键提供了别名：

- `.enter`
- `.tab`
- `.delete` (捕获“Delete”和“Backspace”两个按键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### 7.4 v-if v-else-if v-else
条件渲染指令

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。

v-if和v-else之间不能有其它内容

```html
<p v-if="count > 80">红色</p>
<p v-else-if="count > 60">蓝色</p>
<p v-else>绿色</p>
```
```js
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

和 `v-else` 类似，一个使用 `v-else-if` 的元素必须紧跟在一个 `v-if` 或一个 `v-else-if` 元素后面

#### `<template>` 上的 `v-if`

因为 `v-if` 是一个指令，他必须依附于某个元素。但如果我们想要切换不止一个元素呢？在这种情况下我们可以在一个 `<template>` 元素上使用 `v-if`，这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 `<template>` 元素。

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### 7.5 v-show

条件渲染指令

如果表达式为真，则显示该元素，如果为假，则隐藏该元素（dom存在）

```html
<p v-show="0">红色</p>
```
不同之处在于 `v-show` 会在 DOM 渲染中保留该元素；`v-show` 仅切换了该元素上名为 `display` 的 CSS 属性。

`v-show` 不支持在 `<template>` 元素上使用，也不能和 `v-else` 搭配使用

#### `v-if` vs. `v-show` (面试题 )

`v-if` 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

`v-if` 也是**惰性**的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

相比之下，`v-show` 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS `display` 属性会被切换。

**总的来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适**。

### 7.6 v-for

列表渲染指令
```javascript
data（）{
    return {
        arr: ['Amy', 'Rose', 'Black'],
        person: {
            name: 'Rose',
            age: 34,
            class: 'H5'
        }
    }
}

```
####  遍历数组
```html
<li v-for="item in arr">{{item}}</li>
<li v-for="item of arr">{{item}}</li> -->
<li v-for="(item,index) in arr">{{item}}----{{index}}</li>
```
#### 遍历对象
```html
<li v-for="item in person">{{item}}</li> -->
<li v-for="(item,key) in person">{{key}}-----{{item}}</li>
<li v-for="(item,key,index) in person">{{index}}----{{key}}-----{{item}}</li>
```
### 7.7 v-model
双向数据绑定,只针对表单元素

js数据

```javascript
data（）{
    return {
        tel: '123'
    }
}
```
模板
```html
<p>请输入手机号：<input type="text" v-model="tel"></p>
<p>{{tel}}</p>
```
### 7.8 v-once
只渲染一次
```html
<span v-once>This will never change: {{msg}}</span>
```

### 7.9 v-cloak

- **不需要表达式**

- **用法**：

  这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache (双大括号{{}} 插值表达式)标签直到实例准备完毕。

 ```css
[v-cloak] {
  display: none;
}
 ```

```vue
<div v-cloak>
  {{ message }}
</div>
```

