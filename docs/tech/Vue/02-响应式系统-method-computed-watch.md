

## 1. 响应式系统 

### 声明响应式状态

- 选用选项式 API 时，会用 `data` 选项来声明组件的响应式状态。此选项的值应为返回一个对象的函数

- Vue 将在创建新组件实例的时候调用此函数，并将函数返回的对象用响应式系统进行包装
- 此对象的所有顶层属性都会被代理到组件实例 (即方法和生命周期钩子中的 `this`) 上

- 这些实例上的属性仅在实例首次创建时被添加，因此你需要确保它们都出现在 `data` 函数返回的对象上。若所需的值还未准备好，在必要时也可以使用 `null`、`undefined` 或者其他一些值占位。

- 虽然也可以不在 `data` 上定义，直接向组件实例添加新属性，但这个属性将无法触发响应式更新

- Vue 在组件实例上暴露的内置 API 使用 `$` 作为前缀。它同时也为内部属性保留 `_` 前缀。因此，你应该避免在顶层 `data` 上使用任何以这些字符作前缀的属性

  

#### 原始数据类型

```html
<!-- 模板 -->
<div id="app">
    <p>age----{{age}}</p>
    <p>price----{{price}}</p>
    <p>num----{{num}}</p>
    <p><button @click="fun1">添加age</button></p>
    <p><button @click="fun2">更改price</button></p>
    <p><button @click="fun3">更改num</button></p>
    <p><button @click="fun4">更改age</button></p>
</div>
```

```js
const { createApp } = Vue
const app = createApp({
    data() {
        return {
            price: 100,
            num: 10
        }
    },
    methods: {
        fun1(){
            //age没有在data中定义，而是通过this添加到组件实例上
            this.age = 10
        },
        fun2(){
            //触发视图更新
            this.price ++
        },
        fun3(){
            //触发视图更新
            this.num ++
        },
        fun4(){
            //更改age不会触发视图更新
            this.age ++
        }
    }
})
app.mount('#app')
```

####　数组和对象

Vue3中使用了es6的proxy对数据进行处理。

可以直接监听对象而非对象属性，可以监听对象添加额外属性的变化

可以直接监听数组的变化

```html
<!-- 模板 -->
<div id="app">
    <p>person----{{person}}</p>
    <p>score----{{score}}</p>
    <p><button @click="fun1">person添加color属性</button></p>
    <p><button @click="fun2">score添加值</button></p>
</div>
```

```js
const { createApp } = Vue
const app = createApp({
    data() {
        return {
            person : {
                name: 'qq',
                age: 100
            },
            score: [23]
        }
    },
    methods: {
        fun1(){
            //触发更新
            this.person.color = 10
        },
        fun2(){
            //触发更新
            this.score[1] = 34
        }
    }
})
app.mount('#app')
```

### vue2响应式系统 

Vue2的[响应式系统 ](https://so.csdn.net/so/search?q=双向数据绑定&spm=1001.2101.3001.7020)是利用了es5 的一个API Object.definepropert() 对数据进行劫持 结合发布订阅模式来实现的

不能监听到深层对象数据和数组数据的更改

Vue2是通过this.$set和this.$delete两个api去解决的

```html
<!-- 模板 -->
<div id="app">
    <p>person----{{person}}</p>
    <p>score----{{score}}</p>
    <p><button @click="fun1">person添加color属性</button></p>
    <p><button @click="fun2">score添加值</button></p>
</div>
```

```js
const app = new Vue({
    data() {
        return {
            person : {
                name: 'qq',
                age: 100
            },
            score: [23]
        }
    },
    methods: {
        fun1(){
            //不会触发更新
            this.person.color = 10
        },
        fun2(){
            //不会触发更新
            this.score[1] = 34
        }
    }
})
app.mount('#app')
```

### 声明方法

- Vue 自动为 `methods` 中的方法绑定了永远指向组件实例的 `this`

- 不应该在定义 `methods` 时使用箭头函数

### DOM更新时机（重要）

- 当你更改响应式状态后，DOM 会自动更新。然而，你得注意 DOM 的更新并不是同步的

- Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次状态更改，每个组件都只更新一次。
- 若要等待一个状态改变后的 DOM 更新完成，你可以使用 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 这个全局 API

```html
<div id="app">
    <div class="box">{{age}}</div>
    <p><button @click="change">更改age</button></p>
</div>
```

```js
const { createApp } = Vue
const app = createApp({
    data() {
        return {
            age: 1
        }
    },
    methods: {
        change() {
            this.age = 100
            let box = document.querySelector(".box")
            console.log(box.innerHTML);  //仍然是1，而不是100

        }
    }
})
app.mount('#app')
```

解决方案

```js
//引入全局API nextTick()
const { createApp,nextTick } = Vue
const app = createApp({
    data() {
        return {
            age: 1
        }
    },
    methods: {
        change() {
            this.age = 100
            //使用nextTick这个全局API, 可以在数据改变，并且DOM更新完毕之后再执行回调
            nextTick(()=>{
                let box = document.querySelector(".box")
                console.log(box.innerHTML); //最新的100
            })

        }
    }
})
```

## 2. 方法 vs 计算属性 vs 侦听器 （重要）

 需求分析 

1. 初始化时计算并显示总价
2. 单击按钮，获取改变数量，并重新计算总价
3. 分别用methods(方法),computed(计算属性),watch(侦听器)来实现以上需求

###  methods（方法）

```js
<div id="app">
    <p>商品数量：<input type="text" class="num" v-model="num1"></p>
    <p><button @click="changeNum">改变数量</button></p>
    <p>显示总价：{{getTotal()}}</p>
    <hr>
    <p>使用总价：{{getTotal()}}</p>
</div>
```
```js
const { createApp, nextTick } = Vue
const app = createApp({

    data() {
        return {
            price: 200,
            num1: '',
            num2: 3
        }
    },
    methods: {
        // 有返回值的methods在模板中直接调用时，要加()
        getTotal() {
            console.log('计算一次');
            let total;
            total = this.price * this.num2
            return total
        },
        changeNum() {
            this.num2 = this.num1;
        }
    }
});
```

### computed(计算属性)

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。

所以，对于任何复杂逻辑，你都应当使用**计算属性**。

```js
<div id="app">
    <p>商品数量：<input type="text" class="num" v-model="num1"></p>
    <p><button @click="changeNum">改变数量</button></p>
    <p :title="getTotal">显示总价：{{getTotal + 1}}</p>
    <hr>
    <p>使用总价：{{getTotal}}</p>
</div>
```
```js
const app = createApp({

    data() {
        return {
            price: 200,
            num1: '',
            num2: 3
        }
    },
    methods: {
        changeNum() {
            this.num2 = this.num1;
        }
    },
    computed: {
        getTotal() {
            console.log('计算一次');
            let total;
            total = this.price * this.num2
            return total
        }
    }
```
#### computed和methods的区别

1. 如果一个业务流程没有返回值，则用methods实现，有返回值，用computed和methods都可以实现

2. 计算属性和方法都是函数，计算属性一定有返回值，它通过对数据进行处理，返回一个结果 

3. 在模板中调用时，计算属性不加(),而methods必须需要加()

4. 计算属性和方法最主要的区别是计算属性有缓存功能。
    
    方法被调用时每次都要重复执行函数
    
    计算属性初次调用时执行函数，然后会缓存结果。当再次被调用时，如果依赖的响应式数据没有发生改变，则直接返回之前缓存的结果 。如果依赖发生了改变，则会再次执行函数并缓存结果
    
5. 计算属性应只做计算而没有任何其他的副作用,**不要在 计算属性中做异步请求或者更改 DOM**

#### 计算属性的getter和setter（了解）

 每一个计算属性都包含一个getter和setter

上面的例子都是计算属性的默认用法，只是利用了getter来读取。每调用一次计算属性，就相当于调用一次getter属性；当计算属性的值发生变化时，会默认调用setter属性，进行相应的操作例如:

```html
<div id="app">
    <p>{{fullName}}</p>
    <p><button @click="change">更改fullName</button></p>
</div>
```

```javascript
const app = createApp({

    data() {
        return {
            firstName: "尼古拉斯",
            lastName: "赵四"
        }
    },
    computed: {
        fullName: {
            get: function () {
                return this.firstName + "·" + this.lastName
            },
            set: function (newValue) {
                // [this.firstName, this.lastName] = newValue.split(' ')
                var arr = newValue.split(" ");
                this.firstName = arr[0];
                this.lastName = arr[1];
            }
        }
    },
    methods: {
        change(){
            this.fullName = 'Green Mike'
        }
    }
});
```

当我们改变fullName时，setter就会被调用。

绝大多数情况下，我们只会用默认的 getter 方法来读取一个计算属性，在业务中很少用到setter,

所以在声明一个计算属性时，可以直接使用默认的写法，不必将getter，setter都声明。

#### 接受参数的computed

computed如果要接收参数，需要return 一个函数

```html
<div id="app">
    <p>商品数量：<input type="text" class="num" v-model="num1"></p>
    <p><button @click="changeNum">改变数量</button></p>
    <p>显示总价：{{getTotal(5) + 1}}</p>
    <hr>
    <p>使用总价：{{getTotal(2) }}</p>
</div>
```

```js
const app = createApp({
    data() {
        return {
            price: 200,
            num1: '',
            num2: 3
        }
    },
    methods: {
        changeNum() {
            this.num2 = this.num1;
        }
    },
    computed: {
        //接收参数的computed需要return一个函数
        getTotal() {
            return (val) => {
                console.log('计算一次');
                let total;
                total = this.price * this.num2 + val
                return total
            }

        }
    }
});
```

### watch(侦听器)

当需要在状态（响应式数据）变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态，可以使用侦听器

在选项式 API 中，我们可以使用 [`watch` 选项](https://cn.vuejs.org/api/options-state.html#watch)在每次响应式属性发生变化时触发一个函数

```js
<div id="app">
    <p>商品数量：<input type="text" class="num" v-model="num1"></p>
    <p><button @click="changeNum">改变数量</button></p>
    <p>显示总价：{{getTotal}}</p>
    <hr>
    <p>使用总价：{{getTotal}}</p>
</div>
```
```js
const app = createApp({
    data() {
        return {
            price: 200,
            num1: '',
            num2: 3,
            getTotal: 0
        }
    },
    methods: {
        changeNum() {
            this.num2 = this.num1;
        }
    },
    // 侦听器默认在页面初始化时不执行，只有侦听数据发生变化才会执行
    watch: {
        // 侦听响应式数据num2的更新，只要num2数据更新，就触发该侦听器(函数)
        // newValue,oldValue 为响应式数据新值和旧值
        num2(newValue,oldValue) {
            console.log('侦听num2一次');
            this.getTotal = this.price * this.num2
        },
        price() {
            console.log('侦听price一次');
            this.getTotal = this.price * this.num2
        }
    }
});
```
#### 即时回调的侦听器

`watch` 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调

用一个对象来声明侦听器，这个对象有 `handler` 方法和 `immediate: true` 选项，这样便能强制回调函数立即执行

```js
watch: {
    // 侦听响应式数据num2的更新，只要num2数据更新，就触发该侦听器(函数)
    num2: {
        handler() {
            console.log('侦听num2一次');
            this.getTotal = this.price * this.num2
        },
        // 立即执行
        immediate: true //初始化时即自动执行一次
    }
}
```
#### 深层侦听器

`watch` 默认是浅层的：被侦听的属性，仅在被赋新值时，才会触发回调函数——而嵌套属性的变化不会触发

如果需要侦听对象属性值的变化，需要添加deep:true

```js
data() {
    return {
        person: {
            name: 'cat',
            age: 2
        }
    }
}
```



```js
watch: {
    //添加deep属性，可以监听对象所有属性的变化
    person: {
        handler: function(){
            console.log('watch');
        },
        //深度侦听
        deep: true
    },
    //监听某个属性的变化
    'person.age'(){
        
    }
}
```

#### watch和computed的区别

computed一定有返回值，而watch不需要返回值
computed是依赖的数据发生改变时重新调用, watch是监听的响应式数据发生改变时重新调用 

computed不能有异步操作，而watch中可以有异步操作

#### watch和methods的区别

methods是每次调用都会执行函数
watch不需要调用,并且只有监听的响应式数据发生改变时才会重新调用 

