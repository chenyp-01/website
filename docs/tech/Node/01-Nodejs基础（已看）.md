# Nodejs入门
## 1. 什么是NodeJs
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。它使用了一个

事件驱动、非阻塞式 I/O 的模型,使其轻量又高效。

## 2. Node.js 的主要特点

- 事件驱动

  Node.js 使用事件驱动模型,当某个操作完成后会触发一个事件来通知你,你可以编写处理该事件的回调函数。

- 非阻塞

  Node.js 使用非阻塞 I/O,也就是说 Node.js 大部分的时间都在空闲的状态,等待 I/O 操作完成后才会执行其他操纵,这使得 Node.js 高效又轻量。

- 单线程

  Node.js 使用单线程模型,也就是说你无论启动多少异步操作,都只会使用一个线程来执行相应的回调。这避免了多线程之间的切换开销,使得 Node.js 可以处理大量并发请求。

- 模块化

  Node.js 支持 JavaScript 模块化,我们可以使用 require() 来加载模块,使用 exports 或 module.exports 来导出模块中的内容。

-  包管理

  Node.js 使用 NPM(Node Package Manager) 来管理模块包,我们可以很方便地下载或上传开源模块包。


## 3. 安装NodeJS
### 下载： 

​	NodeJS中文网： http://nodejs.cn/

​	注意：14以上版本只有win8以上才支持

### 安装 

​	双击安装包，根据提示安装

### 检测是否安装成功  

1. 打开命令行窗口： 在任意位置结合Shift右键： 在此处打开命令窗口即可
2. 在vscode中打开终端：  Ctrl + `
3. 输入 node -v, 如果显示node的版本号，即表示安装成功
4. npm -v  (npm是node自带的包管理工具)

   注意：如果在vscode中不能运行npm,则输入 set-ExecutionPolicy RemoteSigned

## 4. 安装淘宝镜像

也就是安装cnpm 

- 从npm网站上安装 cnpm包

  ```js 
  //-g表示全局安装
  npm i cnpm -g
  ```

- 直接从淘宝镜像安装cnpm 

  ```
  npm install -g cnpm --registry=http://registry.npm.taobao.org
  ```

- 测试是否安装成功

  ```
  cnpm -v
  ```

  注意：如果安装成功后，在vscode中不能运行cnpm,则输入 set-ExecutionPolicy RemoteSigned

## 5. 初始化node项目

生成package.json这个node项目的配置文件

- 逐步设置配置文件

  ```js
  npm init
  ```

- 快速生成配置文件

  ```js
  npm init -y 
  ```

  

## 6. 运行node文件
1. 创建一个nodejs文件

   ```js
   // index.js
   console.log('I am NodeJS')
   ```

2. 在命令行窗口输入 node命令运行文件

   ```js
   node index.js
   ```

3. 结束执行：  ctrl + c

4. 清屏： cls

5. **如果js文件有改动，需要重新执行**

## 7. nodemon的安装和使用
- 作用： 可以监听js的变化，并重启服务

- 安装

  ```js
  npm install nodemon -g    // (global,全局安装)
  nodemon -v  //查看nodemon版本，显示版本即安装成功
  ```

- 使用

  ```js
  nodemon 文件名
  ```

  文本发生变化会自动重启服务
  
  `nodemon` 是一个 **Node.js 应用的自动重启工具**，主要用于 **开发环境**，可以在文件发生变更时 **自动重启** Node.js 服务器，避免手动停止 & 重新启动，提高开发效率。
  
  ------
  
  ## **🌟 `nodemon` 作用**
  
  ### ✅ **监听代码文件变化，自动重启应用**
  
  - 适用于 Node.js 服务器开发，比如 `Express`、`Koa` 项目
  - 代码改动后自动重启服务器，不需要手动 `Ctrl + C` 再 `node app.js`
  - 提高开发效率，避免重复操作
  
  ------
  
  ## **🔧 `nodemon` 怎么用？**
  
  ### **1️⃣ 安装 `nodemon`**
  
  ```sh
  npm install --save-dev nodemon  # 推荐本地安装
  ```
  
  或全局安装（可以在任何项目中使用）：
  
  ```sh
  npm install -g nodemon
  ```
  
  ### **2️⃣ 运行 Node.js 应用**
  
  用 `nodemon` 代替 `node` 命令：
  
  ```sh
  npx nodemon app.js
  ```
  
  或（如果全局安装了）：
  
  ```sh
  nodemon app.js
  ```
  
  此时，**`nodemon` 会监视 `app.js`，一旦代码发生改动，自动重启服务器**。
  
  ------
  
  ## **💡 `nodemon` 适用场景**
  
  | 场景                       | 传统 `node` 启动                                             | 使用 `nodemon`                                     |
  | -------------------------- | ------------------------------------------------------------ | -------------------------------------------------- |
  | **本地开发 API**           | 每次修改代码后，手动 `Ctrl + C` 终止进程，重新运行 `node app.js` | 代码变动后，`nodemon` 自动重启服务器，无需手动操作 |
  | **监听文件改动**           | 需要手动监视文件                                             | `nodemon` 监听文件变化，自动更新                   |
  | **Express / Koa 后端开发** | 手动重启很麻烦                                               | `nodemon` 让开发更高效                             |
  
  ------
  
  ## **🚀 `nodemon` 高级用法**
  
  ### **1️⃣ 监听特定目录**
  
  ```sh
  nodemon --watch src --watch config app.js
  ```
  
  👉 **只监听 `src/` 和 `config/` 目录的变化**。
  
  ### **2️⃣ 忽略某些文件**
  
  创建 `.nodemonignore` 文件：
  
  ```
  node_modules/
  logs/
  *.log
  ```
  
  👉 `nodemon` 不会因 `node_modules/` 和 `logs/` 目录的变更而重启。
  
  ### **3️⃣ 配置 `nodemon.json`**
  
  可以创建 `nodemon.json` 配置文件：
  
  ```json
  {
    "watch": ["src"],
    "ignore": ["node_modules", "logs"],
    "ext": "js,json",
    "exec": "node --inspect app.js"
  }
  ```
  
  👉 指定监听的文件、忽略的目录、支持的扩展名等。
  
  ------
  
  ## **📌 总结**
  
  ✅ `nodemon` 主要用于 **Node.js 本地开发环境**
   ✅ **自动监听文件变更，自动重启应用**，省去手动 `Ctrl + C` & `node app.js`
   ✅ **适用于 Express/Koa 等后端项目**，提高开发效率 🚀
  
  如果你的项目是 **长期运行的生产环境**，**不要用 `nodemon`**，可以使用 **PM2** 之类的进程管理工具。

## 8. NodeJS的第一个功能 ： 构建服务器

```js
const http = require("http"); // 引入nodejs原生模块

http.createServer((req,res)=>{
    //req: 接收客户端http的请求信息
    //res: 向客户端发送信息
    console.log(req.url);
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
    res.write('<em>Hello World!</em>')
    res.end()
}).listen(8000)
console.log('服务器已经开启在8000端口');
```

以上代码启动一个 HTTP 服务器,监听8000端口,并返回 Hello World! 字符串