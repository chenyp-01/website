# Vue3的特点
1. 在响应式系统中用ES6的Proxy对象替代ES5的obj.defineProperty方法
2. 使用组合式API
3. 重写了虚拟DOM(算法)
4. 提高了首次渲染及更新的速度
5. 摇树策略
6. 打包的体积变小了
# Vue3两种风格API

- Vue3 的组件可以按两种不同的风格书写：**选项式 API** 和**组合式 API**
- **只有Vue3有组合式API**
- **选项式API和组合式API,只是在API上有所区别，所有模板语法都是相同的**

**比如： **
**模板中的所有指令 v-html / v-on /v-bind / v-if / v-show / v-for / v-model 等使用都没有区别**
**模板中所有内置组件的使用都没有区别**
## 选项式API
使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。
```vue
<script>
export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0
    }
  },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```
## 组合式API
组合式 API 的核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题。这种形式更加自由，也需要你对 Vue 的响应式系统有更深的理解才能高效使用。相应的，它的灵活性也使得组织和重用逻辑的模式变得更加强大。
下面是使用了组合式 API 与 <script setup> 改造后和上面的模板完全一样的组件
> 只做简单了解，具体语法会在后面讲

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```
# 响应式基础
## reactive()函数
要在组件模板中使用响应式状态，需要在 setup() 函数中定义并返回。
使用 [reactive()](https://cn.vuejs.org/api/reactivity-core.html#reactive) 函数创建一个响应式对象或数组
也可以在同一个作用域下定义更新响应式状态的函数，并将他们作为方法与状态一起暴露出去：

```javascript
import { reactive } from 'vue'

export default {
  // `setup` 是一个专门用于组合式 API 的特殊钩子函数
  //  setup中没有this
  setup() {
    const state = reactive({
      count: 0,
      num: 12,
      nested: { count: 0 },
      arr: ['foo', 'bar']
    })

    function increment() {
      // state.count++
      state.arr.push('third')
    }

    // 暴露 state 到模板
    // 不要忘记同时暴露 increment 函数
    return {
      state,
      increment
    }
  }
}
```
```vue
<button @click="increment">
  {{ state.count }}------{{state.arr}}
</button>
```
reactive() API 有两条限制：

1. 仅对对象类型有效（对象、数组和 Map、Set 这样的[集合类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#%E4%BD%BF%E7%94%A8%E9%94%AE%E7%9A%84%E9%9B%86%E5%90%88%E5%AF%B9%E8%B1%A1)），而对 string、number 和 boolean 这样的 [原始类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 无效。
2. 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失
3. reactive() 的种种限制归根结底是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制

案例如下：
```vue
<script>
import { reactive } from 'vue';

export default {
  setup() {
    let state = reactive({
      count: 0,
      num: 1
    })
    function handle() {
      //更改了state的引用，响应式连接丢失
      //即更改state，但页面没有更新
      state = {
        count: 1,
        num:100
      }
    }
    return {
      state,
      handle
    }

  }
}
</script>

<template>
  <div>
    <p >{{ state.count }}</p>
    <p><button @click="handle">click</button></p>
  </div>
</template>
```
## ref()函数
Vue 提供了一个 [ref()](https://cn.vuejs.org/api/reactivity-core.html#ref) 方法来允许我们创建可以使用任何值类型的响应式 **ref**
ref() 将传入参数的值包装为一个带 .value 属性的 ref 对象
ref() 让我们能创造一种对任意值的 “引用”，并能够在不丢失响应性的前提下传递这些引用。

```vue
<script>
import { ref } from 'vue';

export default {
  setup() {
    //原始类型
    const count = ref(1)
    const user = ref({
      name: 'Landy',
      age: 16
    })
    const obj = {
      attr1: ref('a1'),
      attr2: ref('a2')
    }

    function handle() {
      // count.value++
      // user.value.name = 'Nancy'
      // obj.attr1.value = 'aaa'

      //解构赋值后依然保持响应性
      let {attr1,attr2} = obj
      attr1.value = 'cccc'
    }

    return {
      count,
      user,
      obj,
      handle
    }

  }
}
</script>

<template>
  <div>
    <p>count: {{ count }}</p>
    <p>user.name: {{ user.name }} </p>
    <p>obj.attr1: {{ obj.attr1 }}</p>
    <p><button @click="handle">更改数据</button></p>
  </div>
</template>
```
# 这个地方开始<script setup>

在 setup() 函数中手动暴露大量的状态和方法非常繁琐。幸运的是，我们可以通过使用构建工具来简化该操作。当使用单文件组件（SFC）时，我们可以使用 <script setup> 来大幅度地简化代码。
*** 注意： 以后我们直接使用script setup语法，而不再使用setup()钩子函数 ***

```vue
<script setup>
//引入ref
import { ref,reactive } from 'vue';

// 定义响应式数据
let count = ref(2)
let user = ref({
  name: 'qq'
})
let obj = {
  attr1: ref('a1'),
  attr2: ref('a2')
}

let person = reactive({
  name: 'Landy',
  age: 23
})

//修改数据
function handle(){
  // count.value = 23
  // user.value = {
  //   name: '23'
  // }
  // obj.attr1.value = 'a13333'
  person.name = 'Lucy'
}

</script>

<template>
  <div>
    <p>count: {{ count }}</p>
    <p>user.name: {{ user.name }} </p>
    <p>obj.attr1: {{ obj.attr1 }}</p>
    <p>person: {{ person.name }}</p>
    <p><button @click="handle">更改数据</button></p>
  </div>
</template>

```
# 计算属性
```vue
<script setup>
//------------------------------------1. 引入computed
import { ref,computed } from 'vue';

let scoreList = ref([90,56,78,67,34])

//------------------------------------2. 计算属性 computed(()=>{})
//实现及格分
let goodList = computed(()=>{
  return scoreList.value.filter(item=>item>=60)
})

//更改数据
const change = ()=>{
  scoreList.value.push(88)
}
</script>

<template>
  <div>
    <!--3. 使用计算属性值-->
    <p>{{ goodList }}</p>
    <p><button @click="change">更改数据</button></p>
  </div>
</template>

```
# 生命周期钩子
> vue3和vue2的生命周期函数基本相同，只是销毁阶段变为: beforeUnmount,  unmounted.
> 如果使用组合式API,则在setup内部使用生命周期时改变为on+生命周期名称

1. setup()  : 替代beforeCreate和created
2. onMouted() : 当加载完毕的时候  (用在setup中)
3. onUpdated(): 当更新完毕时  (用在setup中)
3. onUnmounted(): 当组件卸载时 (用在setup中)

使用生命周期
Child.vue

```vue
<script setup>
  import { ref,onMounted, onUpdated,onUnmounted } from 'vue'
  let msg = ref("old")
  //组件初始化加载
  onMounted(() => {
    console.log('child-onMounted');
  })
  onUpdated(()=>{
    console.log('child-onUpdated');
  })
  onUnmounted(()=>{
    console.log('child-onUnmounted');
  })
</script>

<template>
  <div class="child">
    <p>子组件----{{ msg }}</p>
    <p><button @click="msg='new'">更改数据</button></p>
  </div>
</template>

<style lang="scss" scoped></style>
```
Parent.vue
```vue
<script setup>
import { ref,onMounted } from 'vue'
import Child from './Child.vue'
let show = ref(true)
//组件初始化加载
onMounted(() => {})
</script>

<template>
   <div class="app">
      <h3>父组件</h3>
      <p><button @click="show = !show">切换</button></p>
      <hr>
      <Child v-if="show"></Child>
   </div>
</template>

<style lang="scss" scoped></style>
```
# 侦听器
## watch
```vue
<script setup>

  import { ref, watch ,reactive} from 'vue'

  // ---------------------可以直接侦听一个 ref
  const msg = ref('')
  watch(msg, async (newVal, oldVal) => {
    console.log(newVal, oldVal);
  })

  // ----------------------------侦听多个数据
  const x = ref(2)
  const y = ref(3)

  watch([x, y],
        ([newX, newY]) => {
          console.log('变化', newX, newY)
        }
       )

  //----------------------------使用getter函数侦听
  // getter 函数, 监听x+y的结果,sum为getter函数的返回值
  watch(
    () => x.value + y.value,
    (sum) => {
      console.log(`sum of x + y is: ${sum}`)
    }
  )

  //----------------------------监听对象
  const person = ref({
    name: 'Lucy',
    age: 12
  })

  //--------------------------监听person,需要添加deep属性
  watch(person,
        (newVal,oldVal) => {
          console.log('person变化', newVal,oldVal)
        },
        {deep:true}
       )

  //--------------------------------监听某一个属性
  // watch(()=>person.value.age,
  //     (newVal,oldVal) => {
  //         console.log('变化', newVal,oldVal)
  //     }
  // )


  const person2 = reactive({
    name: 'Lucy',
    age: 12
  })
  watch(()=>person2,
        (newVal,oldVal) => {
          console.log('变化', newVal,oldVal)
        },
        {deep:true}
       )
  // watch(()=>person2.age,
  //     (newVal,oldVal) => {
  //         console.log('变化', newVal,oldVal)
  //     }
  // )

  const change = ()=>{
    // person.value.age = Date.now()
    person2.age = Date.now()
  }

  watch(msg, (newValue, oldValue) => {
      // 立即执行，且当 `source` 改变时再次执行
    }, { immediate: true })
</script>

<template>
  <p>
    <input type="text" v-model="msg">
  </p>
  <p>{{ msg }}</p>
  <p>x: <input type="text" v-model="x"></p>
  <p>y: <input type="text" v-model="y"></p>
  <!-- <p>{{ person.age }}</p> -->
  <p>{{ person2.age }}</p>
  <p><button @click="change">改变数据</button></p>
</template>
```
## watchEffect
```vue
<script setup>

import { ref, watch ,watchEffect,reactive} from 'vue'

let msg = ref('')
let count = ref(0)

const change = ()=>{
    count.value = Date.now()
}

//count变化监听不到，因为不在侦听列表中
// watch(msg,()=>{
//     console.log('count',count.value);
//     console.log('msg变化',msg.value);
// })

//立即执行
//count和msg的变化都能监听到
watchEffect(()=>{
    console.log('count',count.value);
    console.log('msg变化',msg.value);
})
</script>

<template>
    <p>
        <input type="text" v-model="msg">
    </p>
    <p>{{ msg }}</p>
    <p>{{ count }}</p>
    <p><button @click="change">改变数据</button></p>
</template>
```
## watch与watchEffect的区别
watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。
# 模板引用
为了通过组合式 API 获得该模板引用，我们需要声明一个同名的 ref：
```vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

const list = ref([3,6,7])
const item = ref(null)

onMounted(() => {
  input.value.focus()
//   console.log(item.value);
  console.log(item.value[1]);
})


</script>

<template>
  <input ref="input" />
  <hr>
  <ul>
    <li v-for="item in list" ref="item">{{ item }}</li>
  </ul>
</template>
```
# 传递props
在使用 <script setup> 的单文件组件中，props 可以使用 defineProps() 宏来声明
父组件

```vue
<script setup>
import Child from './Child.vue'
import {ref} from 'vue'
let user = ref('Jenny')
</script>

<template>
   <div class="app">
       app----{{ user }}
       <hr>
       <Child :user="user" age="10"></Child>
   </div>
</template>

<style lang="scss" scoped></style>
```
子组件
```vue
<script setup>
//如果只是在模板中使用，可以不能返回值
// defineProps(['user','age'])
    
// defineProps({
//     user: String,
//     age: String
// })

//如果在业务逻辑中调用，需要返回props才能访问
let props = defineProps(['user','age'])

const fun1 = ()=>{
    console.log(props.user);
}
</script>

<template>
   <div class="child">
       child----{{ user }}----{{ age }}
       <p><button @click="fun1">调用</button></p>
   </div>
</template>

<style lang="scss" scoped></style>
```
# 组件事件
父组件
```vue
<script setup>
import Child from './Child.vue'
import {ref} from 'vue'
let user = ref('Jenny')
</script>

<template>
   <div class="app">
       app----{{ user }}
       <hr>
       <Child :user="user" @send="(val)=> user = val"></Child>
   </div>
</template>

<style lang="scss" scoped></style>
```
子组件
我们在 <template> 中使用的 $emit 方法不能在组件的 <script setup> 部分中使用，但 defineEmits() 会返回一个相同作用的函数供我们使用
defineEmits() 宏**不能**在子函数中使用。如上所示，它必须直接放置在 <script setup> 的顶级作用域下。

```vue
<script setup>
defineProps(['user'])
const emit = defineEmits(['send'])

const fun1 = ()=>{
    emit("send",'hello')
}
</script>

<template>
   <div class="child">
       child----{{ user }}
       
       <!-- <p><button @click="$emit('send','hello')">调用</button></p> -->
       
       <p><button @click="fun1">调用</button></p>
   </div>
</template>

<style lang="scss" scoped></style>
```
# 依赖注入
## 基础使用
main.js
```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
//全局注入
app.provide("theme","dark")
app.mount('#app')

```
提供数据的组件
```vue
<script setup>
import Child from './Child.vue'
import {ref,provide} from 'vue'
let user = ref('Jenny')
provide("greet",'hello')
//user传入后代后，依然保持响应式
provide("user",user)
</script>

<template>
   <div class="app">
       app----{{ user }}
       <hr>
       <input type="text" v-model="user">
       <Child ></Child>
        <p><button @click="user='Mike'">更改user</button></p>
   </div>
</template>

<style lang="scss" scoped></style>
```
后代组件
```vue
<script setup>
import {inject} from 'vue'

let greet = inject("greet")
let user = inject("user")
let theme = inject("theme")
</script>

<template>
   <div class="child">
       child----{{ greet }}----{{ user }}----{{ theme }}
   </div>
</template>

<style lang="scss" scoped></style>
```
## 后代更改数据
有的时候，我们可能需要在注入方组件中更改数据。在这种情况下，我们推荐在供给方组件内声明并提供一个更改数据的方法函数
```vue
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```
```vue
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```
# 组合式函数
在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。
## 鼠标跟踪器示例
如果我们要直接在组件中使用组合式 API 实现鼠标跟踪功能，它会是这样的：
```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

但是，如果我们想在多个组件中复用这个相同的逻辑呢？我们可以把这个逻辑以一个组合式函数的形式提取到外部文件中：
mouse.js

```js

import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}
```
下面是它在组件中使用的方式：
```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```
# 自定义指令
除了 Vue 内置的一系列指令 (比如 v-model 或 v-show) 之外，Vue 还允许你注册自定义的指令 (Custom Directives)。
我们已经介绍了两种在 Vue 中重用代码的方式：[组件](https://cn.vuejs.org/guide/essentials/component-basics.html)和[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)。组件是主要的构建模块，而组合式函数则侧重于有状态的逻辑。另一方面，自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑。

## 自定义指令的特点
一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。下面是一个自定义指令两种定义方式（全局注册和局部注册）的例子，当一个 input 元素被 Vue 插入到 DOM 中后，它会被自动聚焦：

Tip(提示)
**只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令。其他情况下应该尽可能地使用 v-bind 这样的内置指令来声明式地使用模板，这样更高效，也对服务端渲染更友好。**

## 全局注册
main.js
``` js
const app = createApp(App)
// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  mounted: (el) => el.focus()
})
```
组件中使用
```vue
<template>
   <div class="app">
      <!-- 全局指令无需引入，直接添加v-focus -->
      <input type="text" v-focus>
   </div>
</template>
```
## 局部注册
```vue
<script setup>
// 定义指令，必须以v开头
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
   <!-- 在模板中启用 v-focus -->
  <input v-focus />
</template>
```
## 指令钩子
一个指令的定义对象可以提供7种钩子函数 (都是可选的), 自行参考官网
```js
// 自定义指令
const vColor = {
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el, binding) {
        // console.log('el',el); //使用指令的dom
        // console.log('binding',binding); // 指令参数
    },

    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el, binding) { 
        console.log('updated');
    },
}

```
案例： 添加文本颜色 
```vue
<script setup>
import { ref } from 'vue';
// 自定义指令
const vColor = {

    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el, binding) {
        console.log('mounted');
        // console.log('el',el); //使用指令的dom
        // console.log('binding',binding); // 指令参数
        el.style.color = binding.value ? binding.value : '#0f0'
    },

    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el, binding) { 
        console.log('updated');
        // console.log('binding',binding.value);
        el.style.color = binding.value
    },
}

let theme = ref("#00f")

</script>

<template>
    <div class="app">
        app---{{theme}}--<button @click="theme='yellow'">改变数据</button>
        <p v-color>第一个内容-默认绿色</p>
        <p v-color="'#f00'">第二个内容-红色</p>
        <p v-color="theme">第三个内容-蓝色</p>
    </div>
</template>

<style lang='scss' scoped></style>
```
## 简化形式
对于自定义指令来说，一个很常见的情况是仅仅需要在 mounted 和 updated 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令
```vue
<div v-color="color"></div>
```
```js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```
## 对象字面量
如果你的指令需要多个值，你可以向它传递一个 JavaScript 对象字面量。别忘了，指令也可以接收任何合法的 JavaScript 表达式。
```vue
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```
# 插件
## 简单认识插件
插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。下面是如何安装一个插件的示例：
```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* 可选的选项 */
})
```
## 使用Vant
### 介绍
Vant 是一个**轻量、可定制的移动端组件库**，于 2017 年开源。
目前 Vant 官方提供了 [Vue 2 版本](https://vant-contrib.gitee.io/vant/v2)、[Vue 3 版本](https://vant-contrib.gitee.io/vant)和[微信小程序版本](http://vant-contrib.gitee.io/vant-weapp)，并由社区团队维护 [React 版本](https://github.com/3lang3/react-vant)和[支付宝小程序版本](https://github.com/ant-move/Vant-Aliapp)。
Vue3版本官网： [https://vant-contrib.gitee.io/vant/#/zh-CN](https://vant-contrib.gitee.io/vant/#/zh-CN)

### 安装
```
# Vue 3 项目，安装最新版 Vant
npm i vant

# Vue 2 项目，安装 Vant 2
npm i vant@latest-v2

```
当然，你也可以通过 yarn 或 pnpm 进行安装：
```
# 通过 yarn 安装
yarn add vant

# 通过 pnpm 安装
pnpm add vant

```
### 全局注册
main.js
```javascript
import { createApp } from 'vue'
import App from './App.vue'

//1.全局引入组件,之后在任意组件中直接使用
import { Button } from 'vant';

// 2. 引入组件样式
import 'vant/lib/index.css';

const app= createApp(App)

// 3. 通过 app.use 注册
// 注册完成后，在模板中通过 <van-button> 或 <VanButton> 标签来使用按钮组件

app.use(Button);

app.mount('#app')

```
组件中
> 注意： 全局注册后，使用组件用<van-xxx>的形式

```vue
<template>
    <div class="app">
        <h3>Button组件</h3>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="success">成功按钮</van-button>
        <van-button loading type="success" loading-text="加载中..." />
    </div>
</template>
```
### 局部注册
main.js
```javascript
// 2. 引入组件样式
import 'vant/lib/index.css';
```
组件
> 注意： 局部注册后，在模板中使用不要加 'van-xxxx' , 直接用<xxx>

```vue
<script setup>
// 按需引入Vant组件
import { Button } from 'vant';
</script>

<template>
    <div class="app">
        <h3>Button组件</h3>
        <Button type="primary">主要按钮</Button>
        <Button type="success">成功按钮</Button>
        <Button type="default">默认按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
        <Button loading type="success" loading-text="加载中..." />
    </div>
</template>

<style lang='scss' scoped></style>
```
### 案例1： Popup弹出层
> 注意：
> 1. 官网示例只引入了Popup,需要自行引入Cell
> 2. setup()语法需要自行转为 script setup语法糖

```vue
<script setup>
import { ref } from 'vue';
import { Popup,Cell } from 'vant';
const show = ref(false);
const showPopup = () => {
    show.value = true;
}
</script>

<template>
    <div class="app">
        <h3>Popup弹出层</h3>
        <Cell title="展示弹出层" is-link @click="showPopup" />
        <Popup v-model:show="show" :style="{ padding: '64px' }">内容</Popup>
    </div>
</template>

<style lang='scss' scoped></style>
```
### 案例2： 函数调用唤起组件 
> 注意： 为了便于使用 Toast，Vant 提供了一系列辅助函数，通过辅助函数可以快速唤起全局的 Toast 组件。


```vue
<script setup>
import { Cell,showLoadingToast } from 'vant';
const showPopup = () => {
    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
    })
}
</script>

<template>
    <div class="app">
        <h3>Toast轻提示</h3>
        <Cell title="展示弹出层" is-link @click="showPopup" />
    </div>
</template>

<style lang='scss' scoped></style>.

```
### 案例3： 组合式API
Vant 底层依赖了 @vant/use 包，其中内置了一系列的组合式 API。对于使用了 Vant 的项目，可以复用这些 API 进行开发。
案例
> 注意官网代码需要适当修改

```vue
<script setup>
import { ref } from 'vue'

//------------------------ 监听点击元素外部的事件。
import { useClickAway } from '@vant/use';
//-------------------------- 提供倒计时管理能力。
import { useCountDown } from '@vant/use';
const root = ref();
useClickAway(root, () => {
    console.log('click outside!');
});
const countDown = useCountDown({
    // 倒计时 24 小时
    time: 24 * 60 * 60 * 1000,
});

let current = ref(countDown.current)

// 开始倒计时
countDown.start();
</script>

<template>
    <div class="app">
        <h3>Toast轻提示</h3>
        <div ref="root">root</div>
        <div>
            <span>总时间：{{ current.total }}</span>
            <span>剩余天数：{{ current.days }}</span>
            <span>剩余小时：{{ current.hours }}</span>
            <span>剩余分钟：{{ current.minutes }}</span>
            <span>剩余秒数：{{ current.seconds }}</span>
            <span>剩余毫秒：{{ current.milliseconds }}</span>

        </div>
    </div>
</template>

<style lang='scss' scoped></style>
```
### vant组件作业布置
#### 基础组件

1. [Button按钮](https://vant-contrib.gitee.io/vant/#/zh-CN/button)
2. [Cell单元格](https://vant-contrib.gitee.io/vant/#/zh-CN/cell)
3. [ConfigProvider全局配置](https://vant-contrib.gitee.io/vant/#/zh-CN/config-provider)
4. [Icon图标](https://vant-contrib.gitee.io/vant/#/zh-CN/icon)
5. [Image图片](https://vant-contrib.gitee.io/vant/#/zh-CN/image)
6. [Layout布局](https://vant-contrib.gitee.io/vant/#/zh-CN/col)
7. [Popup弹出层](https://vant-contrib.gitee.io/vant/#/zh-CN/popup)
8. [Space间距](https://vant-contrib.gitee.io/vant/#/zh-CN/space)
9. [Style内置样式](https://vant-contrib.gitee.io/vant/#/zh-CN/style)
10. [Toast轻提示](https://vant-contrib.gitee.io/vant/#/zh-CN/toast)
#### 表单组件

11. [Calendar日历](https://vant-contrib.gitee.io/vant/#/zh-CN/calendar)
12. [Cascader级联选择](https://vant-contrib.gitee.io/vant/#/zh-CN/cascader)
13. [Checkbox复选框](https://vant-contrib.gitee.io/vant/#/zh-CN/checkbox)
14. [DatePicker日期选择](https://vant-contrib.gitee.io/vant/#/zh-CN/date-picker)
15. [Field输入框](https://vant-contrib.gitee.io/vant/#/zh-CN/field)
16. [Form表单](https://vant-contrib.gitee.io/vant/#/zh-CN/form)
17. [NumberKeyboard数字键盘](https://vant-contrib.gitee.io/vant/#/zh-CN/number-keyboard)
18. [PasswordInput密码输入框](https://vant-contrib.gitee.io/vant/#/zh-CN/password-input)
19. [Picker选择器](https://vant-contrib.gitee.io/vant/#/zh-CN/picker)
20. [PickerGroup选择器组](https://vant-contrib.gitee.io/vant/#/zh-CN/picker-group)
21. [Radio单选框](https://vant-contrib.gitee.io/vant/#/zh-CN/radio)
22. [Rate评分](https://vant-contrib.gitee.io/vant/#/zh-CN/rate)
23. [Search搜索](https://vant-contrib.gitee.io/vant/#/zh-CN/search)
24. [Slider滑块](https://vant-contrib.gitee.io/vant/#/zh-CN/slider)
25. [Signature签名](https://vant-contrib.gitee.io/vant/#/zh-CN/signature)
26. [Stepper步进器](https://vant-contrib.gitee.io/vant/#/zh-CN/stepper)
27. [Switch开关](https://vant-contrib.gitee.io/vant/#/zh-CN/switch)
28. [TimePicker时间选择](https://vant-contrib.gitee.io/vant/#/zh-CN/time-picker)
29. [Uploader文件上传](https://vant-contrib.gitee.io/vant/#/zh-CN/uploader)
#### 反馈组件

30. [ActionSheet动作面板](https://vant-contrib.gitee.io/vant/#/zh-CN/action-sheet)
31. [Barrage弹幕](https://vant-contrib.gitee.io/vant/#/zh-CN/barrage)
32. [Dialog弹出框](https://vant-contrib.gitee.io/vant/#/zh-CN/dialog)
33. [DropdownMenu下拉菜单](https://vant-contrib.gitee.io/vant/#/zh-CN/dropdown-menu)
34. [FloatingPanel浮动面板](https://vant-contrib.gitee.io/vant/#/zh-CN/floating-panel)
35. [FloatingBubble浮动气泡](https://vant-contrib.gitee.io/vant/#/zh-CN/floating-bubble)
36. [Loading加载](https://vant-contrib.gitee.io/vant/#/zh-CN/loading)
37. [Notify消息通知](https://vant-contrib.gitee.io/vant/#/zh-CN/notify)
38. [Overlay遮罩层](https://vant-contrib.gitee.io/vant/#/zh-CN/overlay)
39. [PullRefresh下拉刷新](https://vant-contrib.gitee.io/vant/#/zh-CN/pull-refresh)
40. [ShareSheet分享面板](https://vant-contrib.gitee.io/vant/#/zh-CN/share-sheet)
41. [SwipeCell滑动单元格](https://vant-contrib.gitee.io/vant/#/zh-CN/swipe-cell)
#### 展示组件

42. [Badge徽标](https://vant-contrib.gitee.io/vant/#/zh-CN/badge)

43. [Circle环形进度条](https://vant-contrib.gitee.io/vant/#/zh-CN/circle)

44. [Collapse折叠面板](https://vant-contrib.gitee.io/vant/#/zh-CN/collapse)

45. [CountDown倒计时](https://vant-contrib.gitee.io/vant/#/zh-CN/count-down)

46. [Divider分割线](https://vant-contrib.gitee.io/vant/#/zh-CN/divider)

47. [Empty空状态](https://vant-contrib.gitee.io/vant/#/zh-CN/empty)

48. [ImagePreview图片预览](https://vant-contrib.gitee.io/vant/#/zh-CN/image-preview)

49. [Lazyload懒加载](https://vant-contrib.gitee.io/vant/#/zh-CN/lazyload)

50. [List列表](https://vant-contrib.gitee.io/vant/#/zh-CN/list)

51. [NoticeBar通知栏](https://vant-contrib.gitee.io/vant/#/zh-CN/notice-bar)

52. [Popover气泡弹出框](https://vant-contrib.gitee.io/vant/#/zh-CN/popover)

53. [Progress进度条](https://vant-contrib.gitee.io/vant/#/zh-CN/progress)

54. [RollingText翻滚文本](https://vant-contrib.gitee.io/vant/#/zh-CN/rolling-text)

    

2. [Skeleton骨架屏](https://vant-contrib.gitee.io/vant/#/zh-CN/skeleton)

3. [Steps步骤条](https://vant-contrib.gitee.io/vant/#/zh-CN/steps)

4. [Sticky粘性布局](https://vant-contrib.gitee.io/vant/#/zh-CN/sticky)

5. [Swipe轮播](https://vant-contrib.gitee.io/vant/#/zh-CN/swipe)

6. [Tag标签](https://vant-contrib.gitee.io/vant/#/zh-CN/tag)

7. [TextEllipsis文本省略](https://vant-contrib.gitee.io/vant/#/zh-CN/text-ellipsis)

9. [Watermark水印](https://vant-contrib.gitee.io/vant/#/zh-CN/watermark)

#### 导航组件

11. [ActionBar动作栏](https://vant-contrib.gitee.io/vant/#/zh-CN/action-bar)

12. [Grid宫格](https://vant-contrib.gitee.io/vant/#/zh-CN/grid)

13. [IndexBar索引栏](https://vant-contrib.gitee.io/vant/#/zh-CN/index-bar)

14. [NavBar导航栏](https://vant-contrib.gitee.io/vant/#/zh-CN/nav-bar)

15. [Pagination分页](https://vant-contrib.gitee.io/vant/#/zh-CN/pagination)

16. [Sidebar侧边导航](https://vant-contrib.gitee.io/vant/#/zh-CN/sidebar)

17. [Tab标签页](https://vant-contrib.gitee.io/vant/#/zh-CN/tab)

18. [Tabbar标签栏](https://vant-contrib.gitee.io/vant/#/zh-CN/tabbar)

19. [TreeSelect分类选择](https://vant-contrib.gitee.io/vant/#/zh-CN/tree-select)

20. [BackTop回到顶部](https://vant-contrib.gitee.io/vant/#/zh-CN/back-top)

#### 业务组件

21. [AddressEdit地址编辑](https://vant-contrib.gitee.io/vant/#/zh-CN/address-edit)

22. [AddressList地址列表](https://vant-contrib.gitee.io/vant/#/zh-CN/address-list)

23. [Area省市区选择](https://vant-contrib.gitee.io/vant/#/zh-CN/area)

25. [Card商品卡片](https://vant-contrib.gitee.io/vant/#/zh-CN/card)

26. [ContactCard联系人卡片](https://vant-contrib.gitee.io/vant/#/zh-CN/contact-card)

27. [ContactEdit联系人编辑](https://vant-contrib.gitee.io/vant/#/zh-CN/contact-edit)

28. [ContactList联系人列表](https://vant-contrib.gitee.io/vant/#/zh-CN/contact-list)

29. [Coupon优惠券](https://vant-contrib.gitee.io/vant/#/zh-CN/coupon-list)

30. [SubmitBar提交订单栏](https://vant-contrib.gitee.io/vant/#/zh-CN/submit-bar)

#### 组合式 API

31. [useClickAway](https://vant-contrib.gitee.io/vant/#/zh-CN/use-click-away)

32. [useCountDown](https://vant-contrib.gitee.io/vant/#/zh-CN/use-count-down)

33. [useCustomFieldValue](https://vant-contrib.gitee.io/vant/#/zh-CN/use-custom-field-value)

35. [useEventListener](https://vant-contrib.gitee.io/vant/#/zh-CN/use-event-listener)

36. [usePageVisibility](https://vant-contrib.gitee.io/vant/#/zh-CN/use-page-visibility)

37. [useRect](https://vant-contrib.gitee.io/vant/#/zh-CN/use-rect)

38. [useRelation](https://vant-contrib.gitee.io/vant/#/zh-CN/use-relation)

39. [useScrollParent](https://vant-contrib.gitee.io/vant/#/zh-CN/use-scroll-parent)

40. [useToggle](https://vant-contrib.gitee.io/vant/#/zh-CN/use-toggle)

41. [useWindowSize](https://vant-contrib.gitee.io/vant/#/zh-CN/use-window-size)

# npm和pnpm区别
深入浅出分析npm和pnpm的区别 ： [https://zhuanlan.zhihu.com/p/526257537](https://zhuanlan.zhihu.com/p/526257537)
## npm的缺点
### 幽灵依赖
幽灵依赖是指在 package.json 中未定义的依赖，但项目中依然可以正确地被引用到。
比如A依赖了B, 所以安装A后，B会和A同级出现，所以项目中可以正常引用B,但package.json中却没有声明对B的依赖
幽灵依赖是由依赖的声明丢失造成的，如果某天某个版本的 A 依赖不再依赖 B 或者 B 的版本发生了变化，那么就会造成依赖缺失或兼容性问题。
### 依赖分身
如果是以下的依赖场景

- A 和 D 依赖 B@1.0
- C 和 E 依赖 B@2.0

那么B@1.0和AC同级，而C和E下会各安装一次B@2.0, 即B@2.0被重复安装 
## pnpm的优点
pnpm - performant npm，在 2017 年正式发布，定义为快速的，节省磁盘空间的包管理工具，开创了一套新的依赖管理机制，成为了包管理的后起之秀
与依赖提升和扁平化的 node_modules 不同，pnpm 引入了另一套依赖管理策略：内容寻址存储。
该策略会将包安装在pnpm系统的全局 store 中，依赖的每个版本只会在系统中安装一次。
在引用项目 node_modules 的依赖时，会通过硬链接与符号链接在全局 store 中找到这个文件。为了实现此过程，node_modules 下会多出 .pnpm 目录，而且是非扁平化结构。

- **硬链接 Hard link**：硬链接可以理解为**源文件的副本**，项目里安装的其实是副本，它使得用户可以通过路径引用查找到全局 store 中的源文件，而且这个副本根本不占任何空间。同时，pnpm 会在全局 store 里存储硬链接，不同的项目可以从全局 store 寻找到同一个依赖，大大地节省了磁盘空间。

- **符号链接 Symbolic link**：也叫软连接，可以理解为**快捷方式**，pnpm 可以通过它找到对应磁盘目录下的依赖地址。
- 


这套全新的机制设计地十分巧妙，不仅兼容 node 的依赖解析，同时也解决了：

1. 幽灵依赖问题：只有直接依赖会平铺在 node_modules 下，子依赖不会被提升，不会产生幽灵依赖。
2. 依赖分身问题：相同的依赖只会在全局 store 中安装一次。项目中的都是源文件的副本，几乎不占用任何空间，没有了依赖分身。

同时，由于链接的优势，pnpm 的安装速度在大多数场景都比 npm 和 yarn 快 2 倍，节省的磁盘空间也更多。
