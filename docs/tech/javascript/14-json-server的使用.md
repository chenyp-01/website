---
layoutClass: m-nav-layout
---

## 什么是json-server

一个在前端本地运行，可以存储json数据的server
模拟（Mock）服务端接口数据，一般用在前后端分离后，前端人员可以不依赖API开发，而在本地搭建一个JSON服务，自己产生测试数据。
参考网址：

https://www.jianshu.com/p/bdbbd3314cf3

<https://www.npmjs.com/package/json-server>

## 安装nodejs

nodejs中文网： http://www.nodejs.com.cn/

下载nodejs,并安装

## 安装淘宝镜像

```js
npm config set registry https://registry.npm.taobao.org
```

### 打开命令行窗口，可以执行nodejs的命令

- 任意文件夹窗口中输入cmd,即可打开命令行窗口
- win10，在搜索框中输入cmd,也可打开命令行窗口
- 在vscode中，在文件列表上右键，选择“在集成终端中打开“ ， 也可打开命令行窗口

```js
// 输入以下命令，显示node的版本即表明node正常安装
node - v
```

## 安装 json-server

```js
//安装
npm install -g json-server
//显示json-server版本
json-server -v
```

## 系统上禁止运行脚本的解决办法

报错截图：

![å¨è¿éæå¥å¾çæè¿°](https://img-blog.csdnimg.cn/06dd1e404e92406e83a7c1c5411e87e1.png)

原因： 需要放开权限

解决方案：

1. Win+X, 在菜单中选择 Power Shell(管理员)

2. 在打开的窗口中输入

   ```js
   set-ExecutionPolicy RemoteSigned
   ```

3. 再输入 "y"
4. 重启vscode, 打开终端，即可执行命令

## 使用

### 准备好db.json

1. 为对象类型，每个键名即为将来的接口名，属性值是数组或对象
2. 唯一标识字段为"id"

```js
// 以下为两个接口:
// http://localhost:3000/product 和 http://localhost:3000/users
{
    "product":[],
    "users":[]
}
```

### 启动

```js
 // --watch会监听db.json的变化，从而重启服务
json-server --watch  db.json
 // 也可自定义端口
 json-server --watch --port 3001 db.json

```

### 关掉服务

```js
方式一： 在vscode中删除终端
方式二： 在命令行上输入Ctrl+C, 结束命令
```

### 增

```js
let newProduct = {
  proName: '手机',
  price: 300,
}
axios.post(`${baseUrl}/product`, newProduct).then((res) => {
  console.log(res)
})
```

### 删

```js
axios.delete(`${baseUrl}/product/5`).then((res) => {
  console.log(res)
})
```

### 改全部

```js
let newData = {
  proName: '手套',
  price: 10,
}
axios.put(`${baseUrl}/product/6`, newData).then((res) => {
  console.log(res)
})
```

### 改部分

```js
let newData = {
  proName: '手套',
}
axios.patch(`${baseUrl}/product/6`, newData).then((res) => {
  console.log(res)
})
```

### 查

```js
axios.get(`${baseUrl}/product`).then((res) => {
  console.log(res)
})
```

### json-server内置实现的过滤字段

「注」过滤字段，只针对数组数据。（毕竟只有数组需要过滤）

\_gte: 大于等于

\_lte: 小于等于

\_ne: 不等于

\_like: 包含

例：http://localhost:3001/data1?age_gte=20&age_lte=30

\_page：访问第几页数据

\_limit：一页多少条（默认一页10条）

\_sort：设定排序字段

\_order：设定排序的方式（升序：asc；降序：desc；默认升序）

例：http://localhost:3001/data1?\_sort=age&\_order=asc

q：全文搜索关键字

```js
axios.get('http://localhost:3000/product')
axios.get('http://localhost:3000/user')
axios.get('http://localhost:3000/user/6')
axios.get('http://localhost:3000/product?price=90')
axios.get('http://localhost:3000/product?price_gte=90')
axios.get('http://localhost:3000/product?_page=2&_limit=3&_sort=id&_order=desc')
axios.get('http://localhost:3000/product?proName_like=机')
axios.get('http://localhost:3000/product?q=机')
```
