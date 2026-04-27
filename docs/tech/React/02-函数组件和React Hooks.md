# 1. （简单了解）类（class）组件的缺点
React 的核心是组件。v16.8 版本之前，组件的标准写法是类（class）。
下面是一个简单的类组件。

```jsx 
import React, { Component } from "react";

export default class Button extends Component {
  constructor() {
    super();
    this.state = { buttonText: "Click me, please" };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(() => {
      return { buttonText: "Thanks, been clicked!" };
    });
  }
  render() {
    const { buttonText } = this.state;
    return <button onClick={this.handleClick}>{buttonText}</button>;
  }
}

```
>这个组件类仅仅是一个按钮，但可以看到，它的代码已经很"重"了。真实的 React App 由多个类按照层级，一层层构成，复杂度成倍增长。再加入 Redux，就变得更复杂。
>
>
Redux 的作者 总结了class类组件的几个缺点。

- 大型组件很难拆分和重构，也很难测试。
- 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
- class类组件引入了复杂的编程模式
# 2. 函数组件
React 团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。 组件的最佳写法应该是函数，而不是类。

React 早就支持函数组件，下面就是一个例子。
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
>但是，这种写法有重大限制，必须是纯函数，不能包含状态（state），也不支持生命周期方法，,也没有this, 因此无法取代类。
# 3. React Hooks
React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。

Hook 这个单词的意思是"钩子"。

React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。 React Hooks 就是那些钩子。

# 4. 函数式组件和类组件的区别

**React 16.8 版本之前**

- 函数式组件中没有this,不能有自己的state,也不能有生命周期函数
- 类组件中可以有this,state,生命周期函数

**React 16.8之后**

- 函数式组件加入了Hook, 仍然没有this
- 但是函数式组件可以通过新的Hook来实现state和生命周期函数

# 5. 函数组件中常用Hook

- useState
- useEffect
- useRef
- useContext
## 5.1 useState

### useState用法

useState()用于为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。

```jsx
//引入钩子函数
import {useState} from 'react';
const Test = () => {
    // useState的参数为状态初始值
    // useState的返回值是一个数组
    // 数组第一个成员是变量，第二个成员是函数，用来更新状态，约定是set前缀加上状态的变量名
    const [num,setNum] = useState(1)
    return (
        <div>
            <div>访问num: {num}</div>
            <button onClick={()=>setNum(num+1)}>修改state</button>
        </div>
    );
}
export default Test
```
> 为什么用钩子函数定义状态时用const?
>
> 重新呈现组件后，将再次执行该函数，从而创建新的作用域，创建新的`count`变量，该变量与先前的变量无关。

### 理解setState的运行机制

特别提醒 ： setState可以用回调的方式实现 

> setState指代两种情况：
>
> 1. class组件中改变状态的API
> 2. 泛指函数组件中改变状态的方法,比如 const [color,setColor] = useState("red")    这里面的setColor就是setState

```react
import React, { useState, useEffect } from 'react'

export default function Home() {
    const [count, setCount] = useState(0)

    const changeCount = () => {

        //1. setState是异步的
        //2. 频繁改变状态会把改变合并，只执行最后一次
        //3. 结果 count = 1
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)


        // 1. 会把多个回调放入队列，依次执行
        // 2. 结果 count = 4
        // setCount(count => count + 1)
        // setCount(count => count + 1)
        // setCount(count => count + 1)
        // setCount(count => count + 1)
    }

    return (
        <div>
            <h3>Home</h3>
            <button onClick={changeCount}>改变count的值: {count}</button>
        </div>
    )
}

```



## 5.2 useEffect副作用钩子

useEffect()用来引入具有副作用的操作，最常见的就是向服务器请求数据。

useEffect() 可以模拟生命周期函数的效果

```jsx
import { useState, useEffect } from 'react';
const Test = () => {
    const [num, setNum] = useState(1)
    const [msg, setMsg] = useState('a')
    const [list, setList] = useState([])

	//1. 只有个参数-------------------------------------
    // 组件初始化自动执行一次，之后每更新一次执行一次
    // 类似 componentDidUpdate
    useEffect(()=>{
        console.log('没有第二个参数，多次执行');
    })

	//2. 第二个参数为空数组-------------------------------
    //等价于 componentDidMount , 只在初始化时执行一次
    useEffect(()=>{
        console.log('第二个参数为空数组，只执行一次');
    },[])

    // 3. 第二个参数为state------------------------------
    // 初次执行后，只有该state改变时再次执行
    useEffect(()=>{
        console.log('第二个参数为state数据，数据改变一次执行一次');
    },[num])

	// 4.回调函数内部又return一个函数------------------------
	//return的回调 等价于 componentWillUnmount() 组件卸载时
    useEffect(()=>{
        return ()=>{
            console.log('组件卸载时');
        }
    },[])
    
    return (
        <div>
            <div>访问num: {num}</div>
            <button onClick={() => setNum(num + 1)}>修改num</button>
            <hr/>
            <div>访问msg: {msg}</div>
            <button onClick={() => setMsg(msg + 'm')}>修改msg</button>
        </div>
    );
}
export default Test
```
在父组件中实现组件卸载
```jsx
import Test from './Test'
import { useState } from 'react';

const App = () => {
  const [flag,setFlag] = useState(true)
  return ( 
    <div>
      {/* 单击按钮，卸载组件 */}
      <button onClick={()=>{setFlag(false)}}>删除Test</button>
      { flag ? <Test></Test> : null}
    </div>
   );
}
```
## 5.3 useRef

useRef用来**保存引用值**

使用useRef后，有一个.current属性， 该属性不会引发组件重新渲染。

保持临时变量不丢失（引用的闭包原理）, 绑在dom或组件上方便实现组组件通信和dom节点的访问

```jsx
import { useRef , useEffect} from "react";

const Test = () => {
    //1. 创建引用实例
    const btnRef = useRef()
    useEffect(()=>{
        //3. 通过实例的current属性即可访问DOM对象
        btnRef.current.focus()
    },[])
    return (
        <div>
            {/* 2. 给DOM元素添加ref属性,值为useRef创建的实例 */}
            <input type="text"  ref={btnRef}/>
        </div>
    );
}
export default Test
```
## 5.4 useContext 跨层级组件通信
如果需要在组件之间共享状态，可以使用useContext()

1. 使用 React Context API，在组件外部建立一个 Context
    Context因为需要其它组件共享，所以要单独导出

  context.js
```jsx
export const AppContext = React.createContext()   
```
2. 利用父组件状态钩子，创建共享状态
```jsx
const [city,setCity] = useState('郑州')   
```
3. 提供了一个 Context 对象，这个对象可以被子组件共享
> value值为共享状态,值为一个对象
```jsx
<AppContext.Provider value={{city,setCity}}>
    Test---{city}
    <hr/>
    <Child></Child>
</AppContext.Provider>
```
4、在后代组件中引入Context,   
```jsx
import {AppContext} from './Test'
```
5. useContext()钩子函数用来引入 Context 对象，从中获取所需要的状态
```jsx
import React,{useContext} from 'react';
......
const {city,setCity} = useContext(AppContext)
```
#### 完整案例

context.js

```react
import React from 'react'
export const AppContext = React.createContext()   
```



Parent.js
```react
import { createContext, useState } from 'react'
import Child from './Child'
import { AppContext } from './context'
const Parent = () => {
    const [city, setCity] = useState('郑州')
    return (
        <AppContext.Provider value={{ city, setCity }}>
            Parent---{city}
            <hr />
            <Child></Child>
        </AppContext.Provider>
    );
}
export default Parent;
```
Child.js
```react
import GrandSon from './GrandSon'
const Child = () => {
    return ( 
        <div>
            Child
            <hr/>
            <GrandSon></GrandSon>
        </div>
     );
} 
export default Child;
```
GrandSon.js
```react
import React, { useContext } from 'react';
import { AppContext } from './context'

const GrandSon = () => {
    const { city, setCity } = useContext(AppContext)
    return (
        <div>
            GrandSon-----{city}
            <div><button onClick={() => { setCity('广州') }}>改变城市</button></div>
            <hr />
        </div>
    );
}
export default GrandSon;
```







