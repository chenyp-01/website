# react的生命周期函数

## 1. react所有的生命周期函数

https://react.docschina.org/docs/react-component.html

#### 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- [**constructor()**](https://react.docschina.org/docs/react-component.html#constructor)
- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [**render()**](https://react.docschina.org/docs/react-component.html#render)
- [componentDidMount()](https://react.docschina.org/docs/react-component.html#componentdidmount)

#### 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)
- [**render()**](https://react.docschina.org/docs/react-component.html#render)
- [`getSnapshotBeforeUpdate()`](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate)
- [**componentDidUpdate()**](https://react.docschina.org/docs/react-component.html#componentdidupdate)

#### 卸载

当组件从 DOM 中移除时会调用如下方法：

- [**componentWillUnmount()**](https://react.docschina.org/docs/react-component.html#componentwillunmount)

## 2. 常用的生命周期方法

### 创建阶段
#### constructor
作用： (1) 获取props      (2) 初始化state
#### render
作用：渲染组件到页面中，无法获取页面中的DOM对象

#### componentDidMount()
（1） 组件已经挂载到页面中
（2） 可以进行DOM操作，比如：获取到组件内部的DOM对象
（3） 可以发送请求获取数据
（4） 可以通过 setState() 修改状态的值
注意：在这里修改状态会重新渲染

###  运行和交互阶段
#### componentDidUpdate(prevProps, prevState)
作用：组件已经被更新
参数：旧的属性和状态对象



###  卸载阶段 
#### componentWillUnmount()

组件卸载期间，只有一个函数，这个函数也有一个显著的特点：组件一辈子只能执行一次
使用说明
只要组件不再被渲染到页面中，那么这个方法就会被调用（ 渲染到页面中 -> 不再渲染到页面中 ）

作用：在卸载组件的时候，执行清理工作，比如清除定时器

# 讲解用案例代码

子组件

```
// 子组件
class Child extends Component {
  //构造方法
  constructor() {
    console.log('Child-constructor');
    super()
    this.state = {
      parentMsg: '父组件的数据'
    }
  }
  // 组件挂载后
  componentDidMount(){
    console.log('Child-componentDidMount');
  }
  // 是否应该更新组件
  shouldComponentUpdate(){
    console.log('Child-shouldComponentUpdate');
    return true
  }
  // 组件更新后
  componentDidUpdate(){
    console.log('Child-componentDidUpdate');
  }
  // 组件卸载前
  componentWillUnmount(){
    console.log('Child-componentWillUnmount');
  }
  //组件渲染
  render() {
    console.log('Child-render');
    return (
      <div>
        <p>子组件------------------{this.state.parentMsg}</p>
      </div>
    );
  }
}
```

父组件

```
// 父组件
class App extends Component {
  // 构造方法
  constructor() {
    console.log('App-constructor');
    super()
    this.state = {
      parentMsg: '父组件的数据'
    }
  }
  // 组件挂载后
  componentDidMount(){
    console.log('App-componentDidMount');
  }
  // 是否应该更新组件
  shouldComponentUpdate(){
    console.log('App-shouldComponentUpdate');
    return true
  }
  // 组件更新后
  componentDidUpdate(){
    console.log('App-componentDidUpdate');
  }
  // 组件卸载前
  componentWillUnmount(){
    console.log('App-componentWillUnmount');
  }

  change = ()=>{
    this.setState({
      parentMsg: '新的新的'
    })
  }
  //组件渲染
  render() {
    console.log('App-render');
    return (
      <div>
          <p>父组件-------------------{this.state.parentMsg}</p>
          <Child msg={this.state.parentMsg}></Child>
          <p><button onClick={this.change}>改变父组件的数据</button></p>
      </div>
    );
  }
}
```







