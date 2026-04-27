# 一、React 安装和目录结构

React官方中文文档 ： https://react.docschina.org/

## 1. 认识React

- React 是一个用于构建用户界面的 JAVASCRIPT 库。
- React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。
- React 拥有较高的性能，代码逻辑非常简单，越来越多的人关注和使用它。

## 2. 快速构建 React 开发环境(脚手架)

- create-react-app 是来自于 Facebook，通过该命令我们无需配置就能快速构建 React 开发环境。

- create-react-app 自动创建的项目是基于 Webpack + ES6 

- 查看本机是否安装create-react-app

  ```
  create-react-app -V  
  ```

- 安 装   （目前使用create-react-app,要求必须是nodjs14以上的版本）

  ```
  npx create-react-app my-app  // my-app为项目名称
  ```

  >  npx临时安装create-react-app,并使用该模块创建项目my-app,创建之后删除安装包

- 进入目录 

  ```
  cd my-app
  ```

- 启动项目

  ```
  npm start
  ```

## 3. React脚手架的目录结构 （了解）

- node_modules: 存放第三方下载的依赖的包
- public:资源目录

  ```
  favicon.ico: 网站缩略图
  index.html: 项目首页模板
  manifest.json : 如果是一个 app ，定义 app 的图标 网址 主题颜色等
  robots.txt : 这个表示任何搜索引擎，抓取工具的用户代理都可以访问这个网站的所有页面资源
  ```

> 如果robots.txt的内容 是:
>
> User-agent: *
> disallow: /mytest1
> disallow: /mytest2
> disallow: /mytest3
> 这样，就可以确保这三个页面不被任何搜索引擎抓取

- src : 项目的所有源代码

  index.js: 整个程序的入口 (react 的理念 all in js)

  index.css: 初始化样式

  App.js: 根组件

  App.test.js: 自动化测试文件

  App.css: 项目的样式

  logo.svg: 首页 logo

  setupTests.js  针对`index.js`的测试

  reportWebVitals.js    Web Vitals是谷歌针对网页加载速度和体验所提出的一套指标，这套指标用于测试网页的加载速度及用户体验等等；谷歌基于这套指标不仅设计了多套测试工具，还针对各种指标提出了相应的优化方法

# 二、index.js入口文件 

- 引入react

  ```
  import React from 'react';
  ```

  > React包：用来编译JSX。  react的核心思想是虚拟DOM，react包含了生成虚拟DOM的函数react.createElement，及Component类。当我们自己封装组件时，就需要继承Component类，才能使用生命周期函数等。

- 引入react-dom

  ```
  import ReactDOM from 'react-dom';
  ```

  >  用来加载DOM。 核心功能就是把这些虚拟DOM渲染到文档中变成实际DOM

- 引入css文件

  ```
  import './index.css';
  ```

- 引入组件

  ```
  import App from './App';
  ```

- 渲染虚拟DOM到页面

  ```
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  ```

- <React.StrictMode> （了解）

  StrictMode 是一个用以标记出应用中潜在问题的工具。就像 Fragment ，StrictMode 不会渲染任何真实的UI。它为其后代元素触发额外的检查和警告。

  严格模式检查只在开发模式下运行，不会与生产模式冲突。

  StrictMode目前有助于

  ```
  1、识别具有不安全生命周期的组件
  2、有关旧式字符串ref用法的警告
  3、关于已弃用的findDOMNode用法的警告
  4、检测意外的副作用
  5、检测遗留 context API
  6、将来的React版本将添加其他功能。
  ```

# 三、App.js

App.js 是根组件

引入图片资源

```jsx
//import logo from './logo.svg';
import logo from './logo.jpg';

function App() {
  return (
    <div className="app">
        <h1>标题</h1>
    	<p><img src={logo} alt="替代文字"/></p>
    </div>
  );
}

export default App;
```

# 四、React组件

## 1. 函数组件

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的 React 组件

它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素（JSX）。

这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

## 2. class组件

还可以使用 [ES6 的 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 来定义组件

react核心包中的Component是组件的父类，用来定义组件

render 方法必须要返回一个 JSX 元素

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

上述两个组件在 React 里是等效的

## 3. 快速生成组件的插件

安装 VSCode插件：ES7 React... Snippets

生成函数式组件： rfc

生成class组件： rcc

html标签的自动补全功能

```
文件 -->  首选项 --> 设置 --> 用户 --> 扩展 --> Emmet --> Include Languages
添加：
键： javascript
值： javascriptreact
```

## 4. 使用组件注意事项 

- 组件名要大写
- return 只返回一行，不加（），如果多行，需要加()
- 组件中只有一个根元素
- 可以用Fragment做包裹元素，它不会被渲染为一个真实节点 或者使用 <></>
- 组件要导出

## 5. 代码保存时格式混乱的解决方案

https://blog.csdn.net/impossible1994727/article/details/119806420

# 五、React的JSX语法

## 1. JSX 简介

```
const element = <h1>Hello, world!</h1>;
```

这个有趣的标签语法既不是字符串也不是 HTML

它被称为 JSX，是一个 JavaScript 的语法扩展。

JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。

在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象（虚拟DOM）。

## 2. JSX 语法

- 标签在js中直接写，不用做为字符串加"", js语法的部分要在{}中定义

```jsx
<div>{3 > 7 ? 'a' : 'b'}</div>
```

- class属性用className替代,

  ```jsx
   <h1 className="title">标题</h1>
  ```

-  label标签的for属性用htmlFor替代

  ```jsx
  <label htmlFor="user">用户名
        <input type="text" id="user" />
  </label>
  ```

- jsx中不能用if语句，用三元运算来替代

  ```
  <div>
              {3 > 7 ? <p>111</p> : <p>222</p>}
              {
                  3 < 7 ?
                      <p>111</p>
                      :
                      <p>222</p>
              }
  </div>
  ```

- dangerouslySetInnerHTML属性

```
//直接渲染，不解析标签   
<p>{str}</p>
// 解析标签
<p dangerouslySetInnerHTML={{__html: str}}></p>
```
- 注释需要写在花括号中

  ```
  <div>
      <h1>菜鸟教程</h1>
      {/*注释...*/}
  </div>,
  
  ```

- JSX会自动解析数组，渲染数组中的每个元素值

```
const list = ['a','b']
...
    list.map((item,index) => {
        return <li key={index}>{item}</li>
    })
```

- JSX添加style属性

  ```
  {/* 错误写法 */}
  {/* <div style="color:#f00;font-size:30px;">style</div> */}
  {/* 正确写法 */}
  <div style={{ color: '#f00', fontSize: '30px' }}>style</div>
  ```

  



​    
