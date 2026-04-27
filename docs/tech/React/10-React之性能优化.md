# 1. 什么是高阶组件？

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

具体而言，**高阶组件是参数为组件，返回值为新组件的函数。**

举例： 1. react内置的memo组件   2. 项目中用于路由鉴权的WrapperRouteComponent组件

# 2. React.memo

React.memo为高阶组件。

- 不使用memo时
当父组件更新的时候，子组件也会更新，即使这个子组件不需要更新。例如子组件不接受props时，或者接受的props相同渲染结果相同，这种情况下子组件就不需要重新渲染，但事实上子组件依然会渲染

- 使用memo时

子组件不接受props时，或者接受的props相同渲染结果相同，这种情况下子组件就不会重新渲染
- memo作用
用React.memo包一下子组件。通过记忆组件渲染结果的方式提高性能。在这种情况下，React将跳过渲染组件的操作并直接复用最近一次渲染的结果
``` jsx
import {memo} from 'react'
const Child = ()=>{}
export default memo(Child)
```

# 3. React.useMemo
React.useMemo和React.memo不是一回事。React.memo是高阶组件，而React.useMemo是React中的Hook，返回一个记忆的缓存值。把创建函数和依赖项数组作为参数传入useMemo，他仅会在依赖项变化时才会重新计算缓存的值。通俗理解就是useMemo返回一个缓存的变量，只有当依赖项改变时，useMemo返回值才会变。

语法

```jsx
const 返回值 = useMemo(回调，[依赖项])
```

案例

```jsx
export default function App() {
  const [list, setlist] = useState([23, 56, 78])
  
  // useMemo缓存对象
  const result = React.useMemo(() => {
    console.log('result一次');
    let arr = []
    arr =  list.filter(item => item > 60)
    return arr.map((item,index)=><li key={index}>{item}</li>)
  },[list])

  return (
    <div>
      <ul>
        {result}
      </ul>

      <hr />
      <button onClick={()=>setcolor(Math.random())}>改变color</button>
    </div>
  )
}
```

# 4. React.useCallback

useMemo缓存的是一个对象，而useCallback缓存的是一个函数。
使用memo后,当props没有改变时，子组件不会重新渲染，但如果子组件接受的有父组件传入的方法，因为父组件重新渲染时，会重新创建函数，所以传入子组件的也是不同的函数地址，同样也会触发子组件渲染，使用useCallback后，缓存函数。

语法：

```jsx
const 缓存函数名 = useCallback(回调函数，[依赖项])
```

案例

```jsx
export default function App() {
  const [list, setlist] = useState([23, 56, 78])
  
  //useCallback缓存函数
  const changeCity = useCallback(()=>{
    setcity(Math.random())
  },[city])

  return (
    <div>
      <button onClick={()=>setcolor(Math.random())}>改变color</button>
      <Child changeCity={changeCity}></Child>
    </div>
  )
}
```

