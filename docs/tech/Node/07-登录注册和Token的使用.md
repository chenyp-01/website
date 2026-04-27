## 1. 用户注册

### 1.1 用户注册的逻辑

1. 用户填写注册表单,包含用户名、密码、手机号等信息
2. 验证表单信息有效性
3. 请求注册接口，并携带用户注册信息
4. 后端接收用户信息，查询用户名是否已被占用
5. 如果被占用，返回前端被占用的信息
6. 如果没被占用，则将用户信息插入表格中， 并返回前端注册成功的信息

### 1.2 前端代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form class="register">
        <p>用户名：<input type="text" class="username" value="Susan"></p>
        <p>手机号<input type="text" class="tel" value="13788998899"></p>
        <p>密码<input type="text" class="pw" value="123456"></p>
        <p><button>注册</button></p>
    </form>
    <script src="./js/axios.js"></script>
    <script src="./js/md5.min.js"></script>
    <script>
        function $(selector){
            return document.querySelector(selector)
        }
        function reg(){
            let btn = $(".register button")
            btn.onclick = async function(e){
                e.preventDefault()
                //请求接口 POST /user
                let res = await axios.post("/user",{
                    username: $(".register .username").value,
                    tel: $(".register .tel").value,
                    //密码加密
                    pw: MD5($(".register .pw").value)
                })
                console.log(res); // 注册成功或失败的信息
            }
        }
        reg()
    </script>
</body>
</html>
```

### 1.3 后端代码

```js
const express = require("express");
const router = express.Router();
const query = require("../utils/mysql");

// 用户注册(添加用户)
router.post("/user", async (req, res) => {
  let { username, tel, pw } = req.body;
  let sql = "select * from user where username = ?";
  //查询该用户名是否被占用
  let result = await query(sql, [username]);

  if (result.length) {
    //已占用
    res.send({
      code: 1,
      msg: "已占用",
    });
    return;
  }

  //没有占用
  sql = "insert into user (username,tel,pw) values (?,?,?)";
  result = await query(sql, [username, tel, pw]);
  if (result.affectedRows === 1) {
    //成功
    res.send({
      code: 0,
      msg: "注册成功",
    });
  } else {
    //失败
    res.send({
      code: 2,
      msg: "注册失败",
    });
  }
});

module.exports = router;

```

## 2. 用户登录

### 2.1 用户登录的逻辑

1. 用户填写登录表单,包含用户名、密码、手机号等信息
2. 验证表单信息有效性
3. 请求登录接口，并携带用户登录信息
4. 后端接收用户信息，查询该用户名匹配的记录
5. 如果不存在，则返回前端用户名不存在的信息
6. 如果存在，则进一步验证密码，
7. 如果密码正确，则返回登录成功，如果密码错误 ，则返回密码错误 

### 2.2 前端代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form class="login">
        <p>用户名：<input type="text" class="username" value="Susan"></p>
        <p>密码<input type="text" class="pw" value="123456"></p>
        <p><button>登录</button></p>
    </form>
    <script src="./js/axios.js"></script>
    <script src="./js/md5.min.js"></script>
    <script>
        function $(selector){
            return document.querySelector(selector)
        }
        function reg(){
            let btn = $(".login button")
            btn.onclick = async function(e){
                e.preventDefault()
                let res = await axios.post("/login",{
                    username: $(".login .username").value,
                    pw: MD5($(".login .pw").value)
                })
                console.log(res); // 注册成功或失败的信息
            }
        }
        reg()
    </script>
</body>
</html>
```

### 2.3 后端代码

```js
const express = require("express");
const router = express.Router();
const query = require("../utils/mysql");

// 用户登录
router.post("/login", async (req, res) => {
  let { username, tel, pw } = req.body;
  let sql = "select * from user where username = ?";
  //查询该用户名匹配的记录
  let result = await query(sql, [username]);

  if (!result.length) {
    //不存在
    res.send({
      code: 1,
      msg: "用户名不存在",
    });
    return;
  }

  //存在,则验证密码
  if (result[0].pw === pw){
    res.send({
      code: 0,
      msg: '登录成功'
    })
  }else{
    res.send({
      code: 2,
      msg: '密码错误'
    })
  }
  
});

module.exports = router;

```

## 3. Token(令牌)的使用

网址：https://www.jianshu.com/p/58abb716b5dc/
>具体概念参考上面链接

### 3.1 面试题-Token验证的基本流程

​	1.服务端收到请求，去验证用户名与密码
​	2.验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
​	3.客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
​	4.客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
​	5.服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据

### 3.2 了解与token相关的概念（仅需了解）

 JWT标准的Token有如下三个部分

 header (头部)
 payload （数据）
 signature （签名）

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInVzZXJfaWQiOjEsImlhdCI6MTU5NDI2MjQ5NSwiZXhwIjoxNTk0MzQ4ODk1fQ.1MJ_MAFgpBjOjpggj69Xz8F_evBcMAenRK_7a8fdVrc
```
### 3.3  安装两个依赖包

- 依赖包1：jsonwebtoken   

   作用： 生成token与验证

  ```js
  npm install jsonwebtoken --save
  ```

- jsonwebtoken的两个api

  - 生成token的方法 sign

    ```js
    const jwt = require("jsonwebtoken")
    //密钥
    const jwtSecret  = '129urererjeorjeor'
    let token = jwt.sign({ username: 'admin' }, jwtSecret, { expiresIn: '1m' })
    ```

    ```js
    <!-- 
     let res = await axios.get("/cart", {
              headers: {
                // 注意要加上空格
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
    -->
    ```

    

  - 验证token的方法 verify

    ```js
    let { authorization } = req.headers;
    let token = authorization.split(" ")[1]
    // 用户名 info.username
    let info = jwt.verify(token,jwtSecret)
    ```
    
    

- 依赖包2： express-jwt  

  ```
npm install express-jwt --save
  ```
  
- express-jwt的作用

  验证token是否过期并规定哪些路由不需要验证 
  
  ```js
  const { expressjwt } = require("express-jwt");
  app.use(expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({ path: ["/token"] }))
  ```
  
  

### 3.4  与token相关的Express前后端代码

#### 前端代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button class="getToken">请求token数据</button>
    <button class="getUser">请求user数据</button>
    <script>
        
      let getToken = document.querySelector(".getToken")
      let getUser = document.querySelector(".getUser")
      
      //--------------------------------------登录时携带用户信息
      getToken.onclick = function () {
        fetch("/login", {
            method:'post',
            // post请求携带数据的方式
            body: JSON.stringify({username: 'admin'}),
            headers: {
                "content-type":"application/json"
            }
        })
          .then((res) => res.json())
          .then((res) => {
            let {token} = res
            localStorage.setItem("token",token)
          })
          .catch((err) => {
            console.log(err);
          });
      };
        
      // -------------------------------请求接口数据时携带token
      getUser.onclick = function () {
        fetch("/user", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
          .then((res) => res.json())
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    </script>
  </body>
</html>

```

#### 后端代码

##### 封装生成token的函数和验证token的中间件

/utils/token.js

```js
// 用来生成token
const jwt = require("jsonwebtoken");
// 用来验证token是否有效(正确且没有过期)，并解析token中的数据
const { expressjwt } = require("express-jwt");
//密钥
const secret = "fdkjfkdjfjfkdj";

//---------------------------------------生成token
function setToken(username) {
  return jwt.sign({ username }, secret, { expiresIn: "5s" });
}
//--------------------------------------验证token的中间件
const verifyToken = expressjwt({
  //密钥
  secret,
  // 加密算法
  algorithms: ["HS256"],
  //配置不需要验证token的接口
}).unless({ path: ["/token"] });


//---------------------------------------模块导出
module.exports = {
    setToken,
    verifyToken
};

```
##### 验证token，解析token中用户信息

 app.js 
```js
const express = require("express");
const token = require("./util/token")

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

//*********************注册验证token，解析token的中间件
app.use(token.verifyToken)

//------------------------------------------------------登录接口
app.post("/login", (req, res) => {
  let { username } = req.body;
  // 生成token
  const tokenCode = token.setToken(username);
  res.json({ token: tokenCode });
});
//-------------------------------------------------------普通数据接口
app.get("/user", (req, res) => {
  //中间件解析的token中的用户名添加在req.auth中
  console.log(req.auth.username);
});

//-------------------------------------------------------错误处理
app.use((err, req, res,next) => {
  // token失效时，err.name = 'UnauthorizedError'
  console.log("err",err.name);
    
   if (err.name === 'UnauthorizedError'){
        res.status(401).send({
          message: '无效的token'
        })
    }
    
});

app.listen(port, () => {
  console.log(`服务器正在监听： localhost:${port}`);
});

```