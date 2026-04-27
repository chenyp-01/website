# 1. 什么是Redux

redux 是一个独立专门用于做状态管理的 JS 库(不是 react 插件库) 

# 2. 为什么使用Redux

- 因为对于react来说，同级组件之间的通信尤为麻烦，或者是非常麻烦了，所以我们把所有需要多个组件使用的state拿出来，整合到顶部容器，进行分发。

- 首先明确一点，Redux 是一个有用的架构，但不是非用不可。事实上，大多数情况，你可以不用它，只用 React 就够了

# 3. Redux的应用场景

从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux。

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

# 4. 面试题：Redux的三个核心概念

## 4.1 store

Redux的核心是store，它由Redux提供的 createStore(reducer) 这个方法生成

三个相关API:

store.getState()：在组件中获取存储的store数据；

store.dispatch(action)：分发action，并返回一个action，这是唯一能改变store中数据的方式；

subscribe(listener)：注册(订阅)一个监听者，store发生变化的时候被调用。

## 4.2  reducer
reducer是一个纯函数，它根据previousState和action计算出新的state。指定了应用状态的变化如何响应action并发送到store的。
reducer(previousState,action)

## 4.3  action

action本质上是一个JavaScript对象，其中必须包含一个type字段来表示将要执行的动作，其他的字段都可以根据需求来自定义。数据的唯一来源，描述了有事情发生这一事实。

```
const ADD_TODO = 'ADD_TODO'
{
  type: ADD_TODO,
  value: '数据'
}
```

# 5. 面试题：Redux的工作流程

1. 用户在UI组件中通过 store.dispatch触发action ；
2. store 自动调用reducer，并传入之前的state，以及用户的action， 经过reducer返回新的state；
3. 组件通过store.subscribe(listener) 订阅state的变化，可通过setState更新react UI。

