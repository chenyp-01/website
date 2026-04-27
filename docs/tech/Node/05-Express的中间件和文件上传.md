##  1. app.use()

在express中，app.use 加载用于处理http请求的middleware（中间件），当一个请求传过来的时候，会依次被这些 middlewares处理

```
app.use([path,]function)
```
##  2. 中间件 middleware (了解)
中间件是一个函数,它可以访问请求对象(req)、响应对象(res)、和应用的请求/响应循环中的下一个中间件函数。中间件的作用是在请求和响应对象上执行一些代码。
这个函数有些不太一样，它还有一个next参数，而这个next也是一个函数，它表示函数数组中的下一个函数



应用程序可以使用各种中间件函数,它们按照定义的顺序一个接一个地执行。每个中间件都有机会对请求和响应对象进行更改。

### 2.1 Express应用可以使用以下几种中间件:

1. 应用级中间件:使用app.use()在所有的路由上执行。
2. 路由级中间件:使用app.get()、[app.post](http://app.post/)()等路由方法绑定,在特定的路由上执行。
3.  错误处理中间件:使用app.use()绑定,接收4个参数,专门处理错误。
4.  内置中间件:Express自带的中间件,例如express.static提供静态文件等。
5.  第三方中间件:开源的Express中间件,需要通过npm安装并配置使用。



#### 1. 应用级中间件

没有路径的中间件，路径默认为"/", 所有的http请求都会执行该逻辑

```js
// 该中间件会在所有路由上打印当前时间,然后通过调用next()将控制权传递给下一个中间件或路由。
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

```

#### 2. 路由级中间件

```js
// 该路由没有调用next(),所以不会再执行以后的中间件
app.get('/user', (req, res) => {
  console.log('请求user数据';
});
```

#### 3. 错误处理中间件

错误处理中间件有4个参数:

- err:错误对象

- req:请求对象
- res:响应对象
- next:下一个中间件函数

```js
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke!');
});
// 这个路由处理会报错，因为res对象没有query, 只有req有query
app.get("/order", (req, res, next) => {
  try {
    let { id } = res.query;
    console.log("user", id);
  } catch {
    //抛出错误 
    throw new Error("order-err");
  }
});

app.get("/user", (req, res, next) => {
  let { id } = req.query;
  console.log("user", id);
  //抛出错误  
  throw new Error("user-err");
});

app.get("/goods", (req, res, next) => {
  let { id } = req.query;
  console.log("user", id);
   //抛出错误 
  throw new Error("goods-err");
});
//********************************错误处理中间件
// 该中间件会在所有路由和中间件之后执行,用于捕获并处理所有未处理的错误。
app.use((err, req, res, next) => {
  // 错误名称
  console.log("err.name", err.name);
  // 错误消息
  console.log("err.message", err.message);
  // 错误堆栈跟踪信息,用于开发环境调试
  // console.log("err.stack", err.stack); 
  res.status(500).send("Something broke!");
});
```

#### 4. 内置中间件

```js
//静态资源处理中间件
app.use(express.static())
// 解析post请求参数中间件
app.use(express.json())
```

#### 5. 第三方中间件

```js
//安装
npm i cors

// app.js
// 实现跨域的中间件
const cors = require("cors")
app.use(cors())
```

### 2.2 在中间件中使用另一个中间件

app.use(path，中间件, function(req,res,next){})

```js
// 第一个中间件n
function n(req,res,next){
  console.log('n');
  next()
}
// 第二个中间件
// 在进入下面路由后，会先执行第一个中间件n
app.use('/user',n,function(req,res,next){
  console.log(req.color);
  console.log('b');
  next()
})
```
### 2.3 通过next传参

```js
app.use("/cc",function(req,res,next){
    console.log('第一个');
    // 调用下一个中间件，并向下一个中间件传参
    next(10)
})


app.use("/cc",function(msg,req,res,next){
    console.log('第二个',msg);
    res.send('hello')
})
```
接收参数的中间件必须写够四个参数，第一个参数才能接收到上一步的数据

## 3. 文件上传前后端（一个文件）

### 3.1 前端部分

html部分

```html
    <div class="add">
        <p>商品名称： <input type="text" class="productName"></p>
        <p>商品价格： <input type="number" class="price" ></p>
        <!-- multiple: 允许同时上传多张图片 -->
        <!-- <p>商品图片： <input type="file" class="file" multiple="multiple"></p> -->
        <p>商品图片： <input type="file" class="file"></p>
        <p><button class="add-btn">添加商品</button></p>
    </div>
    <script src="js/axios.js"></script>
    <script src="js/util.js"></script>
    <script src="js/upload.js"></script>
```

util.js

```js
function $(selector){
    return document.querySelector(selector)
}
```

upload.js

```js 
// 新建表单数据对象，用来存储上传的文件及上传的其它数据
let param = new FormData()

$(".file").onchange = function(){
    //获取图片信息
    let file = this.files[0]
    //"file"为前后端约定好的属性名
    param.append("file",file)
}
$(".add-btn").onclick = function(){
    let productName = $(".productName").value;
    let price = $(".price").value;
    param.append("productName",productName)
    param.append("price",price)

    axios.post("/product",param,{
        headers: {
            // 默认提交的类型
            // "content-type": "application/json"
            // 复杂的表单数据(只要上传文件，就必须是下面的类型)
            "content-type": "multipart/form-data"
        }
    })
    .then((res)=>{
        console.log(res.data);
    })
}
```

### 3.2 Express后端部分 

使用multer实现图片上传

下载

```js
npm i multer -S
```

配置 

在根目录创建uploadImg文件夹，用来存储上传到服务器的文件

在根目录创建util的文件夹，并在内部创建uploadFile.js

uploadFile.js

```js
const path = require("path")
const multer = require("multer")
const uuid = require("uuid")

var storage = multer.diskStorage({
    // 配置文件上传后存储的路径
    destination: function (req, file, cb) {
        // NodeJS的两个全局变量
        // console.log(__dirname);  //获取当前文件在服务器上的完整目录 
        // console.log(__filename); //获取当前文件在服务器上的完整路径 
        cb(null, path.join(__dirname,'../uploads'))
    },
    // 配置文件上传后存储的文件名
    filename: function (req, file, cb) {
        console.log('file',file);
        cb(null, Date.now() + uuid.v4() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })
module.exports = upload
```

在路由中使用
```js
const upload = require("../util/uploadFile")
//添加商品

//"file"为前端传过来的存储上传文件的属性名
router.post("/product",upload.single("file"),(req,res)=>{
    //接收普通文本参数
    let {productName,price} = req.body;
    //接收上传文件数据
    let imgUrl = req.file.filename;
    let sql = "insert into product (productName,price,imgUrl) values (?,?,?)"
    conn.query(sql,[productName, price , imgUrl],(err,result)=>{
        if (err){
            console.log('增加失败');
            return;
        }
        let data;
        if (result.affectedRows === 1){
            data = {
                code: 0,
                msg: '添加成功'
            }
        }else{
            data = {
                code: 1,
                msg: '添加失败'
            }
        }
        res.send(data)
    })
})
```

## 4. 文件上传前后端（多个文件）


### 3.1 前端部分

html部分

在文件域中添加multiple属性

```html
    <div class="add">
        <p>商品名称： <input type="text" class="productName"></p>
        <p>商品价格： <input type="number" class="price" ></p>
        <!-- multiple: 允许同时上传多张图片 -->
        <p>商品图片： <input type="file" class="file" multiple></p>
        <p><button class="add-btn">添加商品</button></p>
    </div>
    <script src="js/axios.js"></script>
    <script src="js/util.js"></script>
    <script src="js/upload.js"></script>
```

util.js  （不变）

```js
function $(selector){
    return document.querySelector(selector)
}
```

upload.js （改变）

```js 
// 新建表单数据对象，用来存储上传的文件及上传的其它数据
let param = new FormData()

$(".file").onchange = function(){
    //*************************************遍历所有的文件，添加到param中
    Array.from(this.files).forEach(item=>{
        param.append("file",item)
    })
}
$(".add-btn").onclick = function(){
    let productName = $(".productName").value;
    let price = $(".price").value;
    param.append("productName",productName)
    param.append("price",price)

    axios.post("/product",param,{
        headers: {
            // 默认提交的类型
            // "content-type": "application/json"
            // 复杂的表单数据(只要上传文件，就必须是下面的类型)
            "content-type": "multipart/form-data"
        }
    })
    .then((res)=>{
        console.log(res.data);
    })
}
```

### 3.2 Express后端部分 

uploadFile.js （不变）

```js
const path = require("path")
const multer = require("multer")
const uuid = require("uuid")

var storage = multer.diskStorage({
    // 配置文件上传后存储的路径
    destination: function (req, file, cb) {
        // NodeJS的两个全局变量
        // console.log(__dirname);  //获取当前文件在服务器上的完整目录 
        // console.log(__filename); //获取当前文件在服务器上的完整路径 
        cb(null, path.join(__dirname,'../uploads'))
    },
    // 配置文件上传后存储的文件名
    filename: function (req, file, cb) {
        console.log('file',file);
        cb(null, Date.now() + uuid.v4() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })
module.exports = upload
```

在路由中使用
```js
const upload = require("../util/uploadFile")
//添加商品

// 使用upload.array(), 12表示上传最大文件数
router.post("/product",upload.array("file",12),(req,res)=>{
    //接收普通文本参数
    let {productName,price} = req.body;
    //接收上传文件数据
    let imgList = req.files;
    console.log(imgList)
    res.end('多个文件上传成功')
})
```

## 5. nodejs经常出现的错误提示

```
Cannot set headers after they are sent to the client
```

原因： res.send()只能执行一次， 多次执行就会报上面的错误 

