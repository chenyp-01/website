# Vuex 是什么？
官网： [https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)<br />Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。<br />它采用集中式存储管理应用的所有组件的共享状态，并以相应的规则保证状态以一种可预测的方式发生变化。
# 什么时候使用Vuex
如果应用比较简单，就不需要使用Vuex，直接使用父子组件传值及其它传值方式即可，使用Vuex就要额外的引入vuex的框架，可能是繁琐冗余的<br />如果需要构建一个中大型单页应用，就可以使用vuex更好地在组件外部管理状态
# 安装 
```javascript
npm install vuex@next --save
```
#  Vuex的五个核心概念
## 1. state
存储公共数据 
### 配置store 
src/store/index.js 
```javascript
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  }
})
export default store
```
### 全局注入store
main.js
```javascript
import { createApp } from 'vue'
import router from './router'
//-------------------1. 引入store对象
import store from './store'
import App from './App.vue'
const app = createApp(App)
app.use(router)
//-------------------2. 在app上全局注入store
app.use(store)
app.mount('#app')
```
### 在组件中使用store
#### 选项式API
```javascript
<script>
    export default {
        mounted(){
            console.log(this.$store.state.属性名);
        }
    }
</script>
```
#### 组合式API
```vue
<script setup>
import { computed } from 'vue';
// 1. 引入useStore
import { useStore } from 'vuex'
// 2. 获取store实例
const store = useStore()
// 3. 用计算属性获取store数据可以保持响应性
let count = computed(() => store.state.count)
</script>

<template>
    <div class="cart">
        cart----{{ count }}
    </div>
</template>

<style lang="scss" scoped></style>
```
### 使用辅助函数
```javascript
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
使用展开运算符与局部计算属性混合使用
```javascript
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```
## 2. getter
从 store 中的 state 中派生出一些状态,类似于计算属性<br />getter只读，不能修改<br />getter的参数为state
### 配置store
```javascript
...
 getters: {
    total: state => state.count * 200
  },
...
```
### 在组件中使用
```javascript
let total = computed(() => store.getters.total)
```
### 使用辅助函数
mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
```javascript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```
如果你想将一个 getter 属性另取一个名字，使用对象形式
```javascript
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```
## 3. mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation <br />必须是同步函数
### 配置store
```javascript
...
//定义
mutations: {
    change: (state,payload) => {
        state.count = payload
    }
}
...
```
### 在组件中使用
```javascript
//在组件中使用
store.commit('change',66)
```
### 使用辅助函数
```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```
## 4. action
提交的是 mutation，通过mutaion更改状态，而不是直接变更状态<br />Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。
### 配置store
```javascript
...
actions: {
    increment (context) {
      context.commit('increment')
    }
  }
...
```
### 在组件中使用
```javascript
//分发action
store.dispatch('increment')
```
### 使用辅助函数
```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```
## 5. modules
### 什么时间使用modules
 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿<br />	为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter 
### 在store中定义modules 
```javascript
const moduleA = {
  //给当前模块定义命名空间，以区分不同模块的功能
  namespaced: true,
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  namespaced: true,
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

//store.state.a  -> moduleA 的状态
//store.state.b  -> moduleB 的状态
```
### 在组件中使用 
```
读取： 
    主模块： this.$store.state.msg
    a模块：  this.$store.state.a.msg
修改
    主模块： this.$store.commit('change',参数)
    a模块： this.$store.commit('a/change',参数)
```
### 结合辅助函数使用 
```javascript
computed: {
  ...mapState(['msg'])
    ...mapState({
      //可以通过函数返回值来获取state
      //username: state=>state.user.username

      //等价于上方代码
      username: 'user/username'
    })
},

//用数组的语法
methods: {
  ...mapMutations([
    'user/changeUser',
    'changeMsg'
  ]),
    change2(){
    this["user/changeUser"]('Amy')
  }
}

//用对象的语法，给方法定义别名
methods: {
  ...mapMutations({
    changeUser: 'user/changeUser',
    changeMsg: 'changeMsg'
  }),
    change2(){
    this.changeUser('Amy')
  }
}
```
## 6. Vue2
 vuex在项目中的使用

-  安装 
```
npm i vuex@3.6.2 -S
```

-  在src中创建store文件夹，并创建index.js 
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
state: {
    msg: '公有的数据',
    score: [35,78,90,98,89,100],
    goodsList: [],
    amsg:'公共amsg' 
},
actions:{
    getGoodsList(ctx, type){
        console.log(ctx,type);
        setTimeout(()=>{
            let data = [
                {
                    "id": 1,
                    "goodsName": "红米"
                },
                {
                    "id": 3,
                    "goodsName": "小米"
                }
            ]
            ctx.commit("getGoodsList",data)
        },1000)
    }
},
mutations: {
    changeMsg(state,newMsg){
        state.msg = newMsg
    },
    getGoodsList(state,data){
        state.goodsList = data
    }
},
getters: {
    goodScore(state){
        return state.score.filter(item=>item>=90)
    }
}
})

export default store
```

-  在main.js中引入并注册 
```
import store from './store'

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
```

-  在组件中使用 
```
//获取state数据
this.$store.state.数据

//提交mutation
this.$store.commit("mutation方法",参数)

//派发action
this.$store.dispatch("action方法",参数)
```

