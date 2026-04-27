# 1. 安装路由依赖包

react-router-dom v6 整体体验相对于 v5 ，体验要好更多，最⼤的⼀个改变，就是曾经的 Route 不可嵌套，整个路由配置必须拆分 成若⼲⼩块，除⾮通过 react-router-config 这种插件，才可以实现对整个路由的管理，然⽽现在，不需要任何插件就可实现对路由配置 的管理。

```
npm i react-router-dom -S
```

# 2. 案例代码

App.js

```jsx 
import React from 'react
//引入路由中的各种API
import { 
	HashRouter,
	BrowserRouter,
	Routes, 
	Route,
	Navigate,
	Link,
	NavLink,
	Outlet
   } from 'react-router-dom'

// 引入路由相关组件
import Home from './Home'
import Cart from './Cart'
import My from './My'
import NotFound from './NotFound'
import FooterNav from './FooterNav'
import Tv  from './home/Tv'
import Ai  from './home/Ai'
import Login from './Login'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home></Home>}>
                    <Route path="tv" element={<Tv></Tv>}></Route>
                    <Route path="ai" element={<Ai></Ai>}></Route>
                </Route>
                <Route path="/cart" element={<Cart></Cart>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/my" element={<My></My>}></Route>
                <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
            <FooterNav></FooterNav>
        </BrowserRouter>
    )
}
```

# 3. 路由API

## 3.1 BrowserRouter和HashRouter （和V5相同）

- 二者都是路由的包裹元素，设置路由模式      
- BrowserRouter是history模式, 生产版本需要后端进行相应的配置, 路径前没有'#',比较美观
- HashRouter是hash模式，路由前有'#'

## 3.2 Routes （同v5的switch组件）

- Routes 组件替换 v5 的 Switch 组件

- 路由配置的包裹元素，<Route>必须放在<Routes>中，不然报错

## 3.3 Route （同v5的Route组件，只是添加了element属性）
配置路由, Route里面的path代表路径，element配置映射的路由组件

```
<Route path="/cart" element={<Cart></Cart>}></Route>
```

## 3.4 Navigate重定向 （同v5的Redirect组件）

v6 移除了 Redirect 组件，改⽤ Navigate 组件。

代表重定向，to代表跳到目标路由地址

```
<Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
```

> 注意： Navigate不能是<Routes>的子元素


## 3.5 Link和NavLink （和v5相同）
- 二者都是实现路由跳转的

- 不同之处是NavLink会给激活链接自动添加active的类名

  ```
  <Link to="/movie" >电影</Link>
  <NavLink to="/find" class="active">发现</NavLink>
  ```

# 4. 嵌套路由

## 4.1 定义嵌套路由 （和v5不同）

- v5嵌套路由需在对应一级路由页面内设置
- v6直接在App中配置一级和嵌套路由

App.js中配置<Home>的二级路由

```
<Route path="/home" element={<Home></Home>}>
    <Route path="tv" element={<Tv></Tv>}></Route>
    <Route path="ai" element={<Ai></Ai>}></Route>
</Route>
```

## 4.2 默认路由

嵌套路由必须在⽗组件中追加 Outlet 组件，作为⼦级组件的占位符，类似于 vue-router 中的 router-view 。

在嵌套路由中，如果URL仅匹配了父级URL，则`Outlet`中会显示带有`index`属性的路由

```
<Route path="/home" element={<Home></Home>}>
    <Route index element={<Tv></Tv>}></Route>
    <Route path="ai" element={<Ai></Ai>}></Route>
</Route>
```

## 4.3 Outlet定义二级路由出口 （v6新增）

Home.js中设置子路由出口

```jsx
import React,{useState,useEffect} from 'react'
import style from './Home.css'
import { Outlet,NavLink,useNavigate} from 'react-router-dom'

export default function Home() {

    return (
        <div>
            <div className="header">
                <p><NavLink to="" >电视</NavLink></p>
                <p><NavLink to="ai" >智能</NavLink></p>
            </div>
            <Outlet></Outlet>
        </div>
    )
}
```

# 5. 动态路由

## 5.1 动态路由  

格式：   /路径/:参数

```jsx
<Route path="/list/:id" element={<List></List>}></Route>
```

## 5.2  路由跳转

参数id=5 

```jsx
<p><NavLink to="/list/5">列表</NavLink></p>
```

## 5.3 获取动态路由参数

>  在rouer6中，函数组件无法用props中接收路由参数，只能使用useParams这个hook

``` jsx
import { useParams } from 'react-router-dom';

...

const params = useParams()
console.log(params.id)  //5
```

# 6. React-router 的Hooks

只有函数组件才有Hook

```jsx
import { useNavigate,useParams,useSearchParams,useLocation } from 'react-router-dom';
```

## 6.1 useNavigate

```jsx
const navigate = useNavigate()

//跳转到/my
navigate("/my")  

//跳转到上一页
navigate(-1)

//跳转到/my,并替换当前历史记录
navigate("/my",{replace: true})

//携带参数
navigate("/my",{replace: true,state:{arr:[1,2,3]}})
```

> state在组件中通过useLocation().state来获取

## 6.2 useParams

**动态路由**

```jsx
<Route path="/list/:id" element={<List></List>}></Route>
```

**路由跳转，参数id=5 **

```jsx
<p><NavLink to="/list/5">列表</NavLink></p>
```

**获取动态路由参数**

```jsx
const params = useParams()
console.log(params.id)  //5
```

## 6.3 useSearchParams

获取查询参数, 查询参数不需要在路由中定义

```jsx
/list?type=cart
```

使用`useSearchParams` hook来访问查询参数。其用法和useState类似，会返回当前对象和更改它的方法

> 更改searchParams时，必须传入所有的查询参数，否则会覆盖已有参数

```jsx 
import { useSearchParams } from 'react-router-dom';

// 当前路径为 /foo?id=12
function Foo(){
    const [searchParams,setSearchParams] = useSearchParams();
    console.log(searchParams.get('id')) // 12
    setSearchParams({
        name: 'foo'
    }) // /foo?name=foo
    return (
        <div>foo</div>
    )
}
```

## 6.4 useLocation

返回代表当前URL的location对象

1. hash: ""
2. key: "h8dnd0wk"
3. pathname: "/list/5"
4. search: ""
5. state: null

## 6.4 案例代码 

```jsx 
import { useNavigate,useParams,useLocation } from 'react-router-dom';
...
export default function List() {
    //用navigate实现编程式导航
    const navigate = useNavigate()
    //获取动态路由的参数
    const params = useParams()
    //获取url信息
    const location = useLocation()

    const toUrl = ()=>{
        // navigate("/my")
        navigate("/my",{replace: true})
    }
    return (
        <div>
            list
            <hr />
            <button onClick={toUrl}>回到我的</button>
        </div>
    )
}
```

# 7. 仿小米App的路由配置

## 7.1 FooterNav.css

```
.footerNav {
    display: flex;
    justify-content: space-around;
    position: absolute;
    width: 100%;
    height: 60px;
    left: 0;
    bottom: 0;
    background-color: #aaa;
}
.footerNav .active{
    border: 1px solid #000;
    background-color: #f00;
}
```

## 7.2 FooterNav.js

```
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './FooterNav.css'
export default function FooterNav() {
    return (
        <div className="footerNav">
            <p><NavLink to="/home">首页</NavLink></p>
            <p><NavLink to="/cart">购物车</NavLink></p>
            <p><NavLink to="/my">我的</NavLink></p>
            <p><NavLink to="/list/5">列表</NavLink></p>
        </div>
    )
}

```

## 7.3 App.js

```
import React from 'react'
import { HashRouter,BrowserRouter,Routes, Route,Navigate,Link,NavLink,Outlet} from 'react-router-dom'
import Home from './Home'
import Cart from './Cart'
import My from './My'
import NotFound from './NotFound'
import FooterNav from './FooterNav'
import Tv  from './home/Tv'
import Ai  from './home/Ai'
import Login from './Login'
import isLogin from './util/token'
import List from './List'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home></Home>}>
                    <Route path="tv" element={<Tv></Tv>}></Route>
                    <Route path="ai" element={<Ai></Ai>}></Route>
                </Route>
                <Route path="/cart" element={isLogin() ?<Cart></Cart>:<Login></Login>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/my" element={<My></My>}></Route>
                <Route path="/my" element={<My></My>}></Route>
                <Route path="/list" element={<List></List>}></Route>
                <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
            <FooterNav></FooterNav>
        </BrowserRouter>
    )
}
```

## 7.4 Home.css

```
.header {
    display: flex;
    justify-content: space-around;
}
.header .active {
    border: 1px solid #000;
}
.header .atdh {
    background-color: #f00;
}

```

## 7.5 Home.js

```
import React,{useState,useEffect} from 'react'
import style from './Home.css'
import { Outlet,NavLink,useNavigate} from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/home/tv')
    },[])// eslint-disable-line

    return (
        <div>
            <div className="header">
                <p><NavLink to="tv" >电视</NavLink></p>
                <p><NavLink to="ai" >智能</NavLink></p>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

```

# 8. useRoutes的使用

上面通过把 二级路由Route 作为 一级路由Route 的 children，实现二级路由配置

```
<Route path="/home" element={<Home></Home>}>
    <Route path="tv" element={<Tv></Tv>}></Route>
    <Route path="ai" element={<Ai></Ai>}></Route>
</Route>
```

但是我们还可以通过`useRoutes`生成对应的 element

> useRoutes 可以将数组对象形式的路由，直接在页⾯上使⽤。

**在App.js中通过json数据实现路由配置**

```jsx
import React from 'react'
import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom'

import Home from './pages/Home'
import Category from './pages/Category'
import Phone from './pages/Category/Phone'
import NoteBook from './pages/Category/NoteBook'
import GoodsList from './pages/GoodsList'
import My from './pages/My'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'

const GetAllRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <Navigate to="/Home" />
        },
        {
            path: '/Home',
            element: <Home />
        },
        {
            path: '/Category',
            element: <Category />,
            children: [
                {
                	  //默认路由
                    index: true,
                    element: <Phone />
                },
                {
                    path: 'NoteBook',
                    element: <NoteBook />
                }
            ]
        },
        {
            path: '/GoodsList',
            element: <GoodsList />
        },
        {
            path: '/My',
            element: <My />
        },
        {
            path: '/Detail/:id',
            element: <Detail />
        },
        {
            path: '/404',
            element: <NotFound />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ])
    return routes;
}


export default function App() {
    return (
        <Router>
            <GetAllRoutes />
        </Router>
    )
}

```

>  其它代码参考仿小米App的路由配置，只是与首页相关的，由/home改为/ ,   /home/tv, 改为/tv

# 9. 路由懒加载和鉴权

## lazy()路由懒加载

一个页面中也许会有许多的逻辑代码并不需要在页面加载时加载，也许是在触发了某个事件如点击之后才需要加载。那么通过动态加载就可以实现这一点，好处在于可以加快页面加载的速度。

```jsx
import {lazy} from 'react'
const Later = lazy(() => import('./Later'));
```

## Suspense组件

既然是动态加载，那么也就是说会有一个加载过程，那么在这个加载过程中就需要一个UI组件，来在等待过程中显示一些UI,Suspense组件实现这个功能

`suspense`组件有一个`fallback`属性，它就是用来接收加载过程中显示的组件的。`suspense`内部是可以包裹多个组件的。

```jsx
import  {  lazy, Suspense } from 'react';
const Later = lazy(() => import('./Later'));

export default function  App {
   return (
     <div> 
       <Suspense fallback={<div>loading...</div>}>
         <Later />  
       </Suspense>
     </div>
   );
}
```

## 案例涉及文件列表

App.js

src/routes/index.js

src/routes/config.js

src/routes/privateRoute.js

## 案例代码

src/privateRoute.js

```jsx
/**
 *  PrivateRoute使用方式
 *  <PrivateRoute element={<Cart>} tag="权限"> </PrivateRoute>
 *  props: {element:, tag: }
 */
import { Navigate } from "react-router-dom";
const PrivateRoute = props => {
  const isLogin = localStorage.getItem("token")
  return isLogin ? (
    (props.element)
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default PrivateRoute;


```

src/routes/config.js

```jsx

import PrivateRoute from './privateRoute';
import { Suspense } from 'react';
const WrapperRouteComponent = ({ titleId, auth, ...props }) => {
    if (titleId) {
        document.title = titleId
    }
    return (
        <Suspense fallback={<div>loading...</div>}>
            {auth ? <PrivateRoute {...props} /> : (props.element)}
        </Suspense>
    )
};
export default WrapperRouteComponent;

```



src/routes/index.js

```jsx
import { lazy } from 'react';
import Home from '../Home';
import WrapperRouteComponent from './config';
import { useRoutes, Navigate } from 'react-router-dom';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '../NotFound'));
const Ai = lazy(() => import(/* webpackChunkName: "ai'"*/ '../home/Ai'));
const Tv = lazy(() => import(/* webpackChunkName: "tv'"*/ '../home/Tv'));
const Cart = lazy(() => import(/* webpackChunkName: "Cart'"*/ '../Cart'));
const My = lazy(() => import(/* webpackChunkName: "My'"*/ '../My'));
const List = lazy(() => import(/* webpackChunkName: "List'"*/ '../List'));
const Detail = lazy(() => import(/* webpackChunkName: "Detail'"*/ '../Detail'));
const Login = lazy(() => import(/* webpackChunkName: "Login'"*/ '../Login'));

const routeList = [
    {
        path: '/',
        element: <Navigate to="/home" />
    },
    {
        path: '/home',
        // element: <Home />,
        element: <WrapperRouteComponent element={<Home />} titleId="首页" />,
        children: [
            {
                path: 'ai',
                element: <WrapperRouteComponent element={<Ai />} titleId="ai" />,
            },
            {
                path: 'tv',
                element: <WrapperRouteComponent element={<Tv />} titleId="tv" />,
            }
        ]
    },
    {
        path: '/cart',
        element: <WrapperRouteComponent element={<Cart />} titleId="Cart" auth={true}/>,

    },
    {
        path: '/my',
        element: <WrapperRouteComponent element={<My />} titleId="My" />
    },
    {
        path: '/list',
        element: <WrapperRouteComponent element={<List />} titleId="List" />
    },
    {
        path: '/detail/:id/:type',
        element: <WrapperRouteComponent element={<Detail />} titleId="Detail" />
    },
    {
        path: '/login',
        element: <WrapperRouteComponent element={<Login />} titleId="Login" />
    },
    {
        path: '/404',
        element: <NotFound />
    },
    {
        path: '*',
        element: <NotFound />
    }
]
const RenderRouter = () => {
    const element = useRoutes(routeList);
    return element;
};

export default RenderRouter;
```



App.js

```jsx
import React from 'react'
import "./App.css"
//引入路由中的各种API
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import RenderRouter  from './routes'
import TabBar from './TabBar'


export default function App() {
  return (
    <div className="app">
      <Router>
         <RenderRouter></RenderRouter>
         <TabBar></TabBar>
      </Router>
    </div>
  )
}

```

