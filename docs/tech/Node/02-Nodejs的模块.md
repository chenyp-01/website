# Node.js的模块

## 1. 认识Node.js的三种模块

在 Node.js 中,主要有 3 种模块

- 核心模块(Core Modules)

  即 Node.js 自带的原生模块,如 fs、http 等。

  这些模块在 Node.js 安装时就编译到了二进制文件中,可以直接通过 require() 使用。

- 文件模块(File Modules)
  即我们自己编写的模块文件,一般使用 .js 后缀。

  我们可以使用 exports 或 module.exports 来导出该模块的接口,通过 require() 来使用该模块

-  第三方模块(Third Party Modules)
  即开源社区提供的模块,需要通过 npm 安装后使用。

  常用的如 express、lodash 等。

  

  以上 3 种模块分别由不同来源提供,但使用方式基本相同,都可以通过 require() 来加载使用。

##　2. 原生模块

​	Node.js 提供许多内置的模块,这些模块在Node.js的安装过程中由编译器编译到二进制文件中,在运行时可以直接使用,无需引入任何文件。这些模块叫做原生模块或内置模块

### 1. 常用的原生模块

1. fs:文件模块,提供文件读写能力。
2.  http:HTTP 模块,提供 HTTP 服务器和客户端功能。
3.  path:提供路径相关的工具方法。

### 2. 原生模块的好处（了解）

1. 无需安装,直接引入使用。
2.  编译到二进制文件,运行效率高。
3.  稳定性高,维护由 Node.js 团队完成。
4.  覆盖范围广,满足大多数基础需求。
5. 但是原生模块也有一定的限制:
  1.  更新周期长,无法使用最新特性。
  2. 功能相对简单,无法满足复杂需求。
  3. 不支持自定义或定制

所以,在实际开发中,我们通常会同时使用原生模块和第三方模块

原生模块用于满足基础需求，第三方模块用于满足特定或高级需求

### 3. http模块 

创建http的服务器

```js
//引入http模块
const http = require("http")

http.createServer((req,res)=>{
    console.log(req.url)
    res.end('向客户端传输数据')
}).listen(8000)
```

### 4. fs模块 (了解)

- 引入模块

  ```js
  //引入文件系统模块 FileSystem
  const fs = require("fs");  
  ```

- 读取文件

  ```js
  // 读取文件
  fs.readFile('./test/01.txt',function(err,data){
      if (err){
          console.log('err');
      }else{
          console.log(data.toString());
      }
  })
  ```

- 写入文件

  ```js
  // 写入文件
  // flag:'a' 表示追加内容
  fs.writeFile('./test/01.txt','happy new year',{flag: 'a'},function(err){
      if (err){
          console.log('写入err');
      }else{
          console.log('写入成功');
      }
  })
  ```

- 复制一个文件

  ```js
  const fs = require("fs")
  //读
  function read() {
      return new Promise((resolve, reject) => {
          fs.readFile("./test/old.txt", function (err, data) {
              if (err) {
                  console.log('文件地址不对');
                  reject()
              } else {
                  resolve(data)
              }
          })
      })
  }
  
  //写
  function write(data) {
      fs.writeFile("./test/new.txt", data, function (err) {
          if (err) {
              console.log('写入错误');
          } else {
              console.log('写入成功')
          }
      })
  }
  
  // read()
  // .then(write)
  // .catch()
  
  async function task(){
      let result = await read()
      write(result)
  }
  task()
  ```

  

- 重命名

  ```js
  //重命名
  fs.rename('./test/01.txt','./test/02.txt',function(err){
      if (err){
          console.log('err');
      }else{
          console.log('success');
      }
  })
  ```

- 删除文件

  ```js
  // 删除一个文件
  fs.unlink('./test/01.txt',function(err){
      if (err){
          console.log('err');
      }else{
          console.log('success');
      }
  })
  ```

- 读取文件

  ```js
  //读取文件信息
  fs.stat("./test",function(err,stats){
      // console.log(stats); //返回文件详细信息
      console.log(stats.isFile()); //判断是否文件
      console.log(stats.isDirectory());  //判断是否目录
  })
  ```

- 创建空目录

  ```js
  //创建空目录
  fs.mkdir("./test/demo1",function(err){
  
  })
  ```

- 读取目录

  ```js
  //读取目录 
  fs.readdir("./test",function(err,files){
      if (err){
          console.log(err);
      }else{
          console.log(files);
      }
  })
  ```

- 删除目录

  ```js
  //删除目录 
  fs.rmdir("./test/demo",function(err){
      if (err){
          console.log('err');
      }
  })
  ```

### 5. path模块

- 引入模块

  ```js
  const path = require("path");
  ```

- path.join() 方法

  使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径

  ```js
  const path = require("path");
  
  // "\foo\child\cc\index.html"
  var url = path.join("/foo","child",'cc',"./index.html");
  
  // "\foo\child\index.html"
  var url = path.join("/foo","child",'cc',"../index.html");
  console.log(url);
  
  
  // 抛出异常 (只接收字符串)
  var url = path.join("/foo","child",{},"../index.html");
  console.log(url);
  ```

- path.normalize() 方法

  会规范化给定的 path，并解析 '..' 和 '.' 片段

  ```js
  var path = require("path");
  
  // var url = path.normalize('C:\\temp\\\\foo\\bar\\..\\');// 返回: 'C:\temp\foo\'
  
  var url = path.normalize('C:\\temp\\\\foo\\bar\\');// 返回: 'C:\temp\foo\bar\'
  
  console.log(url);
  ```

- path.resolve() 方法

  会把一个路径或路径片段的序列解析为一个绝对路径。(以盘符开头)

  ```js
  const path = require("path")
  
  let url = path.resolve('/foo', '/bar', 'baz') //返回： "G:\bar\baz"
  
  var url = path.resolve('/foo/bar','./baz');// 返回: 'G:/foo/bar/baz'
  
  var url = path.resolve('/foo/bar','/tmp/file/');// 返回: 'G:/tmp/file'
  
  // 如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上。
  var url = path.resolve('./tmp/file/');// 返回: '当前工作目录所在路径/tmp/file'
  
  console.log(url)
  ```

- path.extname( )方法

  返回文件的扩展名

  ```js
  const path = require("path")
  // let url = "http://www.yts.com/css/index.css";
  let url = "http://www.yts.com/js/index.js";
  let ext = path.extname(url);
  console.log(ext)
  ```

## 3. 文件模块（重要）

在 Node.js 中,主要使用 CommonJS 规范实现模块化

1. require():用于加载模块
2.  exports / module.exports:用于导出当前模块的成员，供外部模块使用

### 用module.exports导出模块

例如,在模块 a.js 中:

```js
let name = 'John'

function sayHi(){
  console.log('Hi!')
}
//导出模块
module.exports = {
  name, 
  sayHi
} 
```

然后在 b.js 中就可以通过 require() 加载并使用 a.js 中导出的成员:

```js
//加载模块
let a = require('./a.js')

a.sayHi()  // Hi!
console.log(a.name) // John
```

### 用exports导出模块

例如,在模块 a.js 中:

```js
let name = 'John'

function sayHi(){
  console.log('Hi!')
}
//导出模块
exports.name = name
export.sayHi = sayHi
```

然后在 b.js 中就可以通过 require() 加载并使用 a.js 中导出的成员:

```js
//加载模块
let module = require('./module.js')

module.sayHi()  // Hi!
console.log(module.name) // John
```

在一个模块中,我们可以使用 exports 或 module.exports 来导出成员,但请勿同时使用两者

优先推荐使用 module.exports

###　require() 函数

用于在当前模块中加载和使用外部模块

它有 3 个主要用法:

1. 加载核心（原生）模块

   ```js
   require('模块名')
   ```

2.  加载文件模块

   ```js
   require('./相对路径/模块名')  
   或 require('../相对路径/模块名')
   ```

3. 加载 node_modules 中的第三方模块

   ```js
   require('模块名')
   ```

## 4. 第三方模块

以uuid模块为例

UUID(Universally Unique IDentifier)是一种由算法生成的唯一标识符。

在 Node.js 中,我们可以使用 uuid 模块来生成 UUID

- 安装 

  ```js
  //-S表示本地安装，只能在当前项目中使用
  //会自动安装到node_modules文件夹中
  // -S   等价于 --save
  npm install uuid -S 
  ```

- 在文件中使用

  ```js
  const uuid = require('uuid')
  
  // 生成 UUID v1,基于时间戳
  uuid.v1()  
  // '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
  
  // 生成 UUID v4,随机生成
  uuid.v4()  
  // '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  ```

## 5. 了解package-lock.json

### package.json的不足
   - 因为package.json只能锁定模块的大版本号（版本号的第一位），不能锁定后面的小版本，所以你每次重新npm install时候拉取的都是该大版本下面最新的版本。一般我们为了稳定性考虑我们不能随意升级依赖包，因为如果换包导致兼容性bug出现很难排查，这样很容易出现问题，所以package-lock.json就是来解决包锁定不升级问题的
- 另外，package.json文件只记录你通过npm install方式安装的模块信息，而这些模块所依赖的其他子模块的信息不会记录。
###  package-lock.json的作用
- 如果重新 npm install 的时候以及当node_modules文件夹并不存在或被删除时，需要用到npm install重新装载全部依赖时，通过package-lock.json可以直接表明下载地址和相关依赖，就无需再从package.json逐个分析包的依赖项，因此会大大加快安装速度，package-lock.json目的就是确保所有库包与你上次安装的完全一样。        
- 如果要升级package-lock.json里面的库包 （安装时指定版本即可）

        npm install XXX@x.x.x 