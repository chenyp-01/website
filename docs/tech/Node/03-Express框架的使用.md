

官网： https://www.expressjs.com.cn/

## 1. Express是什么
基于 Node.js 平台，快速、开放、极简的 Web 开发框架

## 2. 了解NodeJS服务器框架
- express
- koa
- egg

## 3. express的使用流程

- 创建项目目录   

- 项目初始化 

  ```js
  // 生成package.json
  npm init -y 
  ```

- 修改入口文件

  在package.json

  ```js
  //修改前
  "main": "index.js"
  //修改后
  "main": "app.js"
  //***也可以不改
  ```

- 安装express

  ```js
  npm install express --save
  //也可以简写为
  npm i express -S
  ```

- 在根目录创建入口文件app.js

  app.js快速搭建一个web服务器

  ```js
  const express = require("express")
  
  //实例化一个express的应用
  const app = express()
  
  //定义服务器监听的端口
  const port = 3000
  
  //托管静态资源 (public存放静态资源文件)
  app.use(express.static("public"))
  
  app.listen(port,()=>{
      console.log(`服务器正在监听： localhost:${port}`);
  })
  
  ```

- 运行app.js,开启服务器

  ```js
  nodemon app
  ```

- 在根目录创建public文件夹

  public即为静态资源文件夹，我们的前端文件放在这个文件夹中

- 打开浏览器，测试项目

  ```JS
  //输入域名
  localhost:3000 //即可访问到index.html
  ```

## 4. express的基本路由

路由是指根据用户的请求URL,将请求映射到某个资源或处理程序的机制

GET请求

```js
// app.get()接收客户端的get请求
// 当请求地址匹配时，即执行后面的回调函数

app.get('url地址', function (req, res) {
  // req对象携带请求信息
  // res对象可调用send方法向客户端返回信息
  res.send('Hello World!')
})
```
POST请求
```js
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
```
PUT请求
```js
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
```
DELETE请求
```js
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```

## 5. 接口请求传参（接收客户端传递的信息）

### 1. get(delete)请求携带的信息

前端代码

```HTML
<button class="get">get</button>
<script src="./js/axios.js"></script>
<script>
    let getBtn = document.querySelector(".get")
    getBtn.onclick = function(){
        // 第一种 
         // axios.get("/user?grade=三&age=8").then(res=>{
        //     console.log(res)
        // }).catch((err)=>{
        //     console.log(err)
        // })
        
        //第二种 
        axios.get("http://localhost:3000/user",{
            //信息
            params: {
                username: 'ww',
                age: 12
            }
        })
            .then(res=>{
            console.log(res);
        })
    }
</script>
```

后端代码

****

```js
app.get('/user',(req,res)=>{
    //get请求的信息用req.query接收
    let {username,age} = req.query
    console.log(username,age);
    res.send('success')
})
```

### 2. post(put)请求携带的信息

前端代码

```html
<button class="post">post</button>
<script src="./js/axios.js"></script>
<script>
    let postBtn = document.querySelector(".post")
    postBtn.onclick = function(){
        axios.post("http://localhost:3000/user",{
            //post请求携带的信息
            username: 'ww',
            age: 18
        })
            .then(res=>{
            console.log(res);
        })
    }
</script>
```

后端代码

```js
//*************************一定要加上下面这句代码，才能够正确解析post请求的数据
app.use(express.json())
...
app.post('/user',(req,res)=>{
    // post请求的数据从req.body中获取
    let {username,age} = req.body
    console.log(username,age);
    res.send('success')
})
```

### 3. 获取请求头中携带的信息

前端代码

```html
<button class="get">get</button>
<script src="./js/axios.js"></script>
<script>
    let getBtn = document.querySelector(".get")
    getBtn.onclick = function(){
        
        //---------------------get和delete请求时，携带请求头信息
        axios.get("http://localhost:3000/user",{
            params: {
                username: 'ww',
                age: 12
            },
            //请求头携带的信息
            headers: {
                token: 'rererererer'
            }
        })
            .then(res=>{
            console.log(res);
        })
        
        //---------------------post和put请求时，携带请求头信息
        axios.post("http://localhost:3000/user",{
            username: 'ww',
            age: 12
        },
        {
            //请求头携带的信息，键名自定义，值不能是中文
            headers: {
                token: 'rererererer'
            }
        })
            
            .then(res=>{
            console.log(res);
        })
    }
</script>
```

后端代码

```js
app.get('/user',(req,res)=>{
    let {username,age} = req.query
    
    //请求头中携带的信息用req.headers获取
    let {token} = req.headers
    console.log(token);
    res.send('success')
})
```

### 4. 路由参数

前端代码

```html
<button class="get">get</button>
<script src="./js/axios.js"></script>
<script>
    let getBtn = document.querySelector(".get")
    getBtn.onclick = function(){
        //url地址后的/3/car中， 3和car即为路由参数
        axios.get("http://localhost:3000/user/3/car",{
            params: {
                username: 'ww',
                age: 12
            },
            headers: {
                token: 'rererererer'
            }
        })
            .then(res=>{
            console.log(res);
        })
    }
</script>
```

后端代码

```js
//注意：前端的路由参数只有和后端路由配置对应，才能匹配
app.get('/user/:id/:type',(req,res)=>{
    //用req.params来接收路由参数
    let {id,type} = req.params
    console.log(id,type);
    res.send('success')
})
```

## 6. 路由拆分

如果将所有路由规则都定义在一个文件中,随着路由规则的增多会变得难以管理和理解。拆分成多个文件或模块可以让每个路由文件保持简单和聚集相关路由

- 创建文件夹 router

- 在router中创建用户管理路由userRouter.js

  ```js
  const express = require("express")
  //创建路由对象，来管理路由
  const router = express.Router()
  
  router.get('/user',(req,res)=>{})
  router.get('/user/:id',(req,res)=>{})
  router.post('/user',(req,res)=>{})
  router.put('/user/:id',(req,res)=>{})
  router.delete('/user/:id',(req,res)=>{})
  
  
  module.exports = router
  ```

- 在app.js中引入路由，并使用

  ```js
  //引入路由模块
  const productRouter = require("./router/productRouter") 
  const userRouter = require("./router/userRouter") 
  
  ......
  
  app.use(express.static("./public"))
  
  //所有以"/product"开始的路径，都会去执行productRouter
  app.use(productRouter)
  app.use(userRouter)
  ```

## 7. get请求和post请求的区别（高频面试题）

参考地址： [post和get请求的区别是什么-常见问题-PHP中文网](https://www.php.cn/faq/500696.html)

GET请求和POST请求是HTTP协议中最常用的两种请求方法。

它们的主要区别在于:

1. 数据提交方式不同

   GET请求将参数包含在URL中,以?分割 URL 和参数,并使用 & 连接多个参数。

   例如:GET /posts?category=tech&author=1 。

   POST请求将参数包含在请求体中。请求体使用不同的内容类型,如application/x-www-form-urlencoded或multipart/form-data。

2. 数据量不同

    GET请求只能包含ASCII字符,并且URL长度受限,不适合提交大量数据。

   POST请求可以提交大量数据,没有数据类型和长度限制。

3. 对数据操作的影响

   GET请求只是获取数据,不改变资源状态。数据被当做URL的一部分,会被浏览器主动缓存。

   POST请求用于更新数据,会改变资源状态。POST请求不会被浏览器主动缓存。

4. 安全性不同

   GET请求的参数直接暴露在URL上,所以不安全,不能用来传递敏感信息。

   POST请求的参数不会出现在URL中,相对而言更安全一些。但是仍不建议用于传输敏感信息,因为参数依然有可能被截获。

5. 书签支持

   GET请求可以被浏览器主动cache（缓存）,支持保存为书签。

   POST请求不可以被浏览器主动cache,不支持保存为书签。

总结

 GET适用于获取数据,主要用于查询、搜索等。

POST更适用于更新数据,主要用于提交表单等。



**总结**

|            | get                  | post                        |
| ---------- | -------------------- | --------------------------- |
| 参数位置   | url中                | Request Body中              |
| 参数长度   | 有限制               | 无限制                      |
| 参数编码   | ASCII编码            | 无限制                      |
| 后退/刷新  | 不重复提交，回退无害 | 重复提交，回退有害          |
| 安全性     | 参数暴露，不安全     | 安全                        |
| 缓存       | 可以缓存             | 不可以缓存                  |
| 书签       | 可以收藏为书签       | 不可以收藏为书签            |
| 历史       | 参数保存在浏览器历史 | 不保存在浏览器历史          |
| 请求包个数 | 1个 http header+data | 2个 先 http header ，再data |


​		
​		
​		
​		
​		

