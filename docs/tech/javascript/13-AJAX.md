---
layoutClass: m-nav-layout
---

# AJAX

## 1. JSON数据

JSON（[JavaScript](https://baike.baidu.com/item/JavaScript?fromModule=lemma_inlink) Object Notation, JS对象简谱）是一种轻量级的数据交换格式。它基于 [ECMAScript](https://baike.baidu.com/item/ECMAScript?fromModule=lemma_inlink)（European Computer Manufacturers Association, 欧洲计算机协会制定的js规范）的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。JSON可以简单理解为JS中的数组和对象的集合

```js
{"name": "张三"}
```

```js
;[{ name: '张三' }, { name: '李四' }]
```

> JSON本质是一个字符串，对象中的属性应该添加引号，而且必须是双引号。

在JS中使用JSON时会涉及到两个概念：json对象和json字符串

```js
//符合json规则的字符串即为json字符串
"{\"name\": \"张三\"}"
```

```js
JSON.parse(JSON字符串) // 得到的就是一个对象
JSON.stringify(JSON对象) // 得到的就是一个字符串
```

## 2. 网络服务

在我们进行ajax请求时，需要请求网络上的url。这里有几个概念

- method 请求方法

GET、POST、PUT、DELETE、Patch (RestFul风格的API)

- URL地址

我们要请求的地址，www.baidu.com就是个URL地址

- 请求参数

我们通过传递不同的参数，获得到不同的资源。具体参数的作用是什么，我们还需要和后台沟通。

> 以上的三个东西，都是由后台提供好的文档，我们只需要在ajax特定的地方填入特定的内容即可。

## 3. 什么是ajax

- Ajax即Asynchronous Javascript And XML（异步JavaScript和[XML](https://baike.baidu.com/item/XML/86251?fromModule=lemma_inlink)）

  async 异步 sync 同步

- 使用Ajax技术网页应用能够快速地将增量更新呈现在[用户界面](https://baike.baidu.com/item/用户界面/6582461?fromModule=lemma_inlink)上，而不需要重载（刷新）整个页面，这使得程序能够更快地回应用户的操作。

- ajax最早是通过XMLHttpRequest对象生成的，后来在ES6提出了Fetch进行请求。但是一般我们使用ajax时，不会自己封装Ajax，会直接使用现成的ajax库——axios。

## 4. ajax请求的实现

想要发起ajax请求有很多方法，原生xhr或者fetch都可以，我们先了解xhr

### 4.1 通过xhr对象实现ajax请求

```js
// 新建xhr对象的实例，通过xhr的方法和属性实现服务器端数据的请求
let xhr = new XMLHttpRequest()

xhr.onload = function () {
  // 我们请求到的结果，就是xhr.responseText
  console.log(xhr.responseText)
}

xhr.open(
  'get',
  'https://sspai.com/api/v1/article/tag/special/page/get?limit=10&offset=0&created_at=1681804179&tag=效率技巧&search_type=1',
)
xhr.send()
```

我们获取到的responseText是一个JSON字符串，使用时需要将其转换为JSON对象。

```js
JSON.parse(xhr.response)
```

#### 查看请求结果

> 请求成功后，可以在F12中的网络（network）里筛选出所有的ajax请求。然后下方就是所有的ajax请求列表

##### 标头

点击请求的列表项, 可以显示标头请求中的请求头以及响应头信息，在这里只需要查看常规里的三个信息，就可以判断这个请求是否成功

- 请求url
- 请求方法
- HTTP状态码 200

##### 负载(payload)

有的浏览器显示，有的不显示

指的是我们携带的参数。用来判断我们的参数是否传递正确

##### 预览

就是请求的结果

### 4.2 通过Fetch实现

ES6中出现的替代xhr对象进行异步请求的一个对象。它默认是基于promise（以后讲）解决异步操作。fetch的用法很简单

```js
fetch('请求地址?参数', options)
  .then((res) => res.json()) // 把请求到的结果转换为JSON对象 在我们接下来的例子中，这一步是完全固定的
  .then((data) => {
    // data就是我们请求到的结果
  })
```

#### Fetch实现GET请求

```js
fetch(
  'https://sspai.com/api/v1/article/tag/special/page/get?limit=10&offset=0&created_at=1681804179&tag=%E6%95%88%E7%8E%87%E6%8A%80%E5%B7%A7&search_type=1',
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
  })
```

#### Fetch实现POST请求 （现在先不要练）

```js
fetch('http://localhost:3000/list', {
  method: 'POST',
  //请求头： contentType: 发送信息至服务器时内容编码类型，简单说告诉服务器请求类型的数据。
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  }),
}).then((res) => {
  console.log(res)
})
```

### 4.3 通过axios库实现数据请求

这是一个库！！！http请求库，使用时需要我们引入才能够使用。

#### GET请求: 查询数据

```js
axios
  .get(url, {
    params: {
      参数名: 参数值,
      参数名2: 参数值2,
    },
  })
  .then((res) => {
    // res.data就是对应的结果
  })
```

#### POST请求：添加数据

```js
axios
  .post(url, {
    参数名1: 参数值1,
    参数名2: 参数值2,
  })
  .then((res) => {
    // res.data就是我们的结果
  })
```

#### PUT请求: 修改全部数据

```JS
axios.put(url, {
  参数名1: 参数值1,
  参数名2: 参数值2
}).then(res => {
  // res.data就是我们的结果

})
```

#### DELETE请求： 删除数据

```js
axios
  .delete(url, {
    params: {
      参数名: 参数值,
      参数名2: 参数值2,
    },
  })
  .then((res) => {
    // res.data就是对应的结果
  })
```

## 5. 了解接口文档

我们和后台进行合作开发需要接口文档的支持。后台开发接口，前端调用接口。

根据少数派的请求后台会提供下面的接口文档。

### 5.1 获取文章列表接口

#### 请求地址

https://sspai.com/api/v1/article/index/page/get

#### 请求方法

GET

#### 请求参数

?offset=10

| 参数名 | 参数值         | 描述信息 |
| ------ | -------------- | -------- |
| offset | 从第几条开始查 |          |

不同的请求方法，参数写的位置不同。具体怎么写，看后面的操作。

#### 响应结果

这个东西我们要不要都行，只要我们请求到内容，就可以看到响应结果了。

```js
{
  "error": 0,
  "msg": "",
  "data": [
    { ...}
   ],
  "total": 3353
}
```

> 注意不是所有网上的接口都可以直接请求，
>
> 如果控制台有以下红色的报错信息，表明该接口限定了访问它的客户端的域名，有跨域限制。
>
> Access to fetch at 'https://sspai.com/post/79067' from origin 'http://127.0.0.1:5501' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

### 5.2 获取文章详情接口

#### 请求地址

https://sspai.com/api/v1/article/info/get

#### 请求方法

GET

#### 请求参数

| 参数名 | 参数值      | 描述信息       |
| ------ | ----------- | -------------- |
| id     | 例如：75666 | 文章的唯一标识 |

#### 响应结果
