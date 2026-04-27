## 1.声明式导航的两种方式

### 1.两种传参方式 - 第1种

```
1.在路由上设置
 <Route path="/detail/:id/:type" element={<Detail></Detail>}></Route>
2.跳转的地方设置
  <NavLink to="/detail/12/car">商品2</NavLink>
3.接受参数
 //接收参数一  /detail/3/car
import { useParams } from 'react-router-dom'
    // const {id,type} = useParams()
```

### 2.两种传参方式 - 第2种

```
1.路由配置上面什么也不需要加
<Route path="/detail" element={<Detail></Detail>}></Route>
2.跳转的地方
<NavLink to="/detail?id=11&type=car">商品1</NavLink>
3.接参数
import { useSearchParams } from 'react-router-dom'
  //接收参数二   /detail?id=3&type=cart
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get("id")
    const type = searchParams.get("type")
```

## 2.编程式导航

### 1.组件中使用useNavigate进行跳转

```
1.引入useNavigate
import { useNavigate } from "react-router-dom";
2.使用方法
const nav = useNavigate();
3.设置点击事件
<button onClick={change}>登录</button>
4.跳转
const change = () => {
    nav("/login", {
      state: {
        user: "小明",
        pw: 123,
      },
    });
  };
```

### 2.跳转后的组件接收参数

```
1.引入useLocation
import { useLocation } from "react-router-dom";
2.使用方法
const {state:{user,pw}} = useLocation();
3.模板中使用
<div>Login----{user}---{pw}</div>;
```

```vue

```

