

# 1. Redux Toolkit是什么

RTK ( Redux Toolkit ) 是[redux](https://so.csdn.net/so/search?q=redux&spm=1001.2101.3001.7020)的开发工具,以配置的方式编写redux逻辑,能减少样板代码和错误代码,其中还内置了redux-thunk等一些基础插件, redux官方强烈推荐使用RTK。

> toolkit : 软件包

Redux的核心是store，它由Redux提供的 createStore(reducer) 这个方法生成,  在RTK版本中，已经集成到configureStore方法中。

![](.\react配图\01-react废弃了createStore.png)

# 2. Redux Toolkit实现状态管理的流程

## 2.1 安装 

!!!! 不需要单独安装redux

``` 
npm install @reduxjs/toolkit react-redux
```

## 2.2 RTK常用API

- configureStore方法，

  该方法相当于集成了redux和redux-thunk的createStore、combineReducers以及默认支持了扩展工具Redux DevTools。

- createSlice方法

  定义切片Slice

  rtk引入了新的定义slice，它是应用中对action和reducer逻辑的整合，通过createSlice方法进行创建

## 2.3 案例

- 文件列表

  store/tags.store.js

  store/user.store.js

  store/index.js

  index.js

  Test.js

- 代码

  store/tags.store.js

  ```jsx
  import { createSlice } from "@reduxjs/toolkit";
  
  const tagsSlice = createSlice({
      name: 'tags',
      initialState: {
          activeTagId: 0,
          tagsList: ['a','c']
      },
      reducers: {
          //等价于redux的action
          addTag: (state,action)=>{
              console.log("addTag-state",state);
              console.log('addTag-action',action);
              state.tagsList.push(action.payload)
          },
          removeTag: (state,action)=>{
              console.log("removeTag-state",state);
              console.log('removeTag-action',action);
          }
      }
  })
  
  export const {addTag,removeTag} = tagsSlice.actions
  export default tagsSlice.reducer
  ```

store/user.store.js

```jsx
import { createSlice } from "@reduxjs/toolkit";

  const userSlice = createSlice({
      name: 'user',
      initialState: {
          account: 'wf',
          role: 'admin'
      },
      reducers: {
          setAccount: (state,action)=>{
              console.log("setAccount-state",state);
              console.log('setAccount-action',action);
              let {account,role} = action.payload
              state.account = account
              state.role = role
          }
      }
  })

  export const {setAccount} = userSlice.actions
  export default userSlice.reducer
```

store/index.js

```js
  import { combineReducers, configureStore } from '@reduxjs/toolkit'
  import tagsReducer from './tags.store'
  import userReducer from './user.store'
  
  const rootReducer = combineReducers({
      tags: tagsReducer,
      user: userReducer
  })
  
  const store = configureStore({
      reducer: rootReducer
  })
  export default store
```



index.js

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import store from './store'
  import { Provider } from 'react-redux';
  // App根组件
  import App from './App';
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  ```



Test.js

  ```jsx
  import React from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  //引入action
  import {addTag} from './store/tags.store'
  import { setAccount } from './store/user.store'
  
  export default function Cart() {
    const { tagsList, activeTagId } = useSelector(state => state.tags)
    const { account, role } = useSelector(state => state.user)
    const dispath = useDispatch()
  
    const changeActiveTagId = ()=>{
      dispath(addTag('d'))
    }
    const changeRole = ()=>{
      dispath(setAccount({
        account: 'eeee',
        role: 'editor'
      }))
    }
    return (
      <div>
        Cart
        <hr />
        <p>store数据tagsList: {tagsList}</p>
        <p>store数据activeTagId:{activeTagId} </p>
        <p>store数据account: {account}</p>
        <p>store数据role: {role}</p>
        <p><button onClick={changeActiveTagId}>更改store数据activeTagId</button></p>
        <p><button onClick={changeRole}>更改store数据role</button></p>
      </div>
    )
  }
  
  ```

  



