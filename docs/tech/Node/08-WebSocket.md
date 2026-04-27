# 1. WebSocket是什么

WebSocket是一种网络通信协议，是HTML5开始提供的一种在单个TCP连接上进行全双工通讯协议。

# 2. 为什么需要WebSocket

- 使用HTTP 协议，通信请求只能由客户端发起，服务端对请求做出应答处理。
- 这种通信模型有一个弊端：HTTP 协议无法实现服务器主动向客户端发起消息。
- WebSocket 连接允许客户端和服务器之间进行全双工通信，以便任一方都可以通过建立的连接将数据推送到另一端。WebSocket 只需要建立一次连接，就可以一直保持连接状态

# 3. HTML5原生WebSocket的API

**Web浏览器和服务器都必须实现 WebSocket 协议来建立和维护连接**

1. 初始化WebSocket对象

    ```js
    const Socket = new WebSocket('ws://127.0.0.1:8000');
    ```

2. 事件： 当监听到客户端和服务器连接成功时

    ```js
    Socket.onopen = function(){}
    ```

3. 事件： 当监听到服务器发送数据时

    ```js
    Socket.onmessage = function(){}
    ```

4. 事件:  当通信发生错误时

    ```js
    Socket.onerror = function(){}   
    ```

5. 事件： 当连接关闭时

    ```js
    Socket.onclose = function(){} 
    ```

6. 方法： 向服务器发送数据

    ```js
    Socket.send(数据)
    ```

7. 方法： 关闭连接

    ```js
    Socket.close()
    ```

# 4. WebSocket 通信案例

客户端

> 用原生HTML5的API实现

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
    <p><button id="send">发送数据</button></p>
    <p><button id="closeBtn">关闭连接</button></p>
    <script>
        const ws = new WebSocket("ws://localhost:3000/socket")
        ws.addEventListener("open",()=>{
            console.log('连接成功');
        })

        ws.addEventListener("message",(msg)=>{
            console.log(msg);
        })
        send.addEventListener("click",()=>{
            ws.send("hello,服务器你好")
        })
        closeBtn.onclick = function(){
            ws.close()
        }
        ws.addEventListener("close",()=>{
            console.log('关闭连接');
        })
        
    </script>
</body>
</html>
```

服务器端

> 用express-ws实现服务器端websocket

```js
const express = require("express")
//引入express-ws模块
const expressWs = require("express-ws")
const cors = require("cors")

const app = express()
app.use(cors())

// 在现有的app实例上绑定websocket协议的封装方法
expressWs(app)

// 回调函数中，我们可以拿到两个参数
// ws：websocket实例，该实例可以监听来自客户端的消息发送事件（message事件）；
app.ws("/socket",(ws,req)=>{
    console.log('连接成功');
    
    //监听message事件，我们可以拿到浏览器通过websocket为我们发送的数据。
    ws.on("message",(msg)=>{
    
    	//send方法，用于向浏览器socket发送数据。
        ws.send("你好，我收到的你的消息:"+msg)
    })
})

app.listen(3000,()=>{
    console.log('服务器已开启3000窗口');
})
```

> 回调函数中，我们可以拿到两个参数：
>
> - ws：websocket实例，该实例可以监听来自客户端的消息发送事件（message事件）；
> - req：浏览器请求（request）实例，我们可以通过解析这个对象拿到相应的参数。
>
> ws实例提供了send方法，用于向浏览器socket发送数据。通过监听message事件，我们可以拿到浏览器通过websocket为我们发送的数据。

# 5. Socket.IO 实现客户端和服务器端方案

## 5.1 服务器端安装 

```
cnpm i socket.io -S
```

并从node_modules中找到socket.io, 在client中找到socket.js文件复制到客户端代码

## 5.2 客户端API

1. 建立连接

   ```js 
   const socket = io("http://localhost:3000")
   ```

   使用emit方法向服务器端发送自定义事件和数据

   ```js
   // 发送自定义事件send
   socket.emit('send',数据)
   ```

3. 断开链接

   ```js
   socket.close()
   ```

4. 使用on方法监听服务器端的事件，并获取数据

   ```js
   // 监听服务器端发送的自定义事件reply
   socket.on("reply",function(msg){
      console.log('服务器信息',msg);
   })
   ```

## 5.3 服务器端API

 1. 引入模块

    ```js
    const app = require('express')();
    
    //把app应用关联到http对象
    const http = require('http').Server(app);
    //在http对象上绑定io对象
    const io = require('socket.io')(http,{cors:true});
    
    //http请求
    app.get('/login', function(req, res){
      
      res.json({})
    });
    
    //ws请求
    //当用户连接时
    io.on('connection', function(socket){
      console.log('a user connected');
    });
    
    //!!!!!!!!!!!千万千万注意，这个地方由app改变http
    http.listen(3000, function(){
      console.log('listening on *:3000');
    });
    ```

2. 向所有人发送消息

   ```js
   io.emit(事件，数据)
   ```

3. 向指定用户发送消息

   ```js
   指定用户的socket.emit(事件，数据)
   ```

4. 向自己之外的其它人广播

   ```
   socket.broadcast.emit(事件,数据)
   ```

5. 监听客户端事件，并接收数据

   ```
   socket.on("send",(msg)=>{
       socket.emit(事件,数据)
   })
   ```

6. 监听断开连接的事件

   ```js
   socket.on('disconnect', (reason) => {
       console.log('disconnect');
    })
   ```

   

