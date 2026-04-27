### **🔍 模板引擎（EJS vs Pug）详解**

在 Node.js + Express 中，模板引擎用于**将数据动态渲染成 HTML**。其中 `EJS` 和 `Pug` 是最常见的两个模板引擎。

| **模板引擎**                  | **语法风格**                          | **可读性**                     | **性能** | **特色**                           |
| ----------------------------- | ------------------------------------- | ------------------------------ | -------- | ---------------------------------- |
| **EJS (Embedded JavaScript)** | 类似 HTML，使用 `<%= %>` 语法插入数据 | ⭐⭐⭐⭐（接近 HTML，易读）        | ⭐⭐⭐      | 语法直观，易学习，前端开发者上手快 |
| **Pug（原 Jade）**            | **缩进风格**，类似 Python，省略 `<>`  | ⭐⭐（缩进格式，可读性因人而异） | ⭐⭐⭐⭐     | 代码更简洁，不用写 HTML 标签       |

------

## **📌 1️⃣ EJS 详解**

### **✅ EJS 语法特点**

- 语法接近 HTML，**适合有 HTML 基础的开发者**

- 嵌入 JavaScript 代码

  ：

  - `<%= %>` 👉 **输出变量**（自动转义）
  - `<%- %>` 👉 **输出 HTML**（不转义）
  - `<% %>` 👉 **执行 JavaScript 代码**（但不输出）
  - `<% include '文件名' %>` 👉 **引入模板**

------

### **📌 示例 1：EJS 模板**

📌 **文件：`views/index.ejs`**

```ejs
<!DOCTYPE html>
<html>
<head>
    <title>EJS 示例</title>
</head>
<body>
    <h1>欢迎, <%= name %>!</h1>
    
    <% if (isAdmin) { %>
        <p>您是管理员</p>
    <% } else { %>
        <p>您是普通用户</p>
    <% } %>

    <ul>
        <% users.forEach(user => { %>
            <li><%= user.name %> - <%= user.age %> 岁</li>
        <% }) %>
    </ul>
</body>
</html>
```

------

### **📌 示例 2：EJS 配合 Express**

📌 **文件：`server.js`**

```javascript
const express = require('express');
const app = express();

// 设置 EJS 作为模板引擎
app.set('view engine', 'ejs');

// 路由
app.get('/', (req, res) => {
    res.render('index', {
        name: '小明',
        isAdmin: true,
        users: [
            { name: '张三', age: 20 },
            { name: '李四', age: 25 }
        ]
    });
});

// 启动服务器
app.listen(8000, () => console.log('🚀 服务器运行在 http://localhost:8000'));
```

✅ **运行后访问 `http://localhost:8000`**，会渲染出：

```html
<h1>欢迎, 小明!</h1>
<p>您是管理员</p>
<ul>
    <li>张三 - 20 岁</li>
    <li>李四 - 25 岁</li>
</ul>
```

------

## **📌 2️⃣ Pug 详解**

### **✅ Pug 语法特点**

- **没有 `<>` HTML 标签**
- **使用缩进代替 `{}` 和 `<>`**
- **代码更简洁，但初学者可能不适应**
- **可以直接嵌入 JavaScript 逻辑**

------

### **📌 示例 1：Pug 模板**

📌 **文件：`views/index.pug`**

```pug
doctype html
html
  head
    title Pug 示例
  body
    h1 欢迎, #{name}!
    
    if isAdmin
      p 您是管理员
    else
      p 您是普通用户

    ul
      each user in users
        li #{user.name} - #{user.age} 岁
```

------

### **📌 示例 2：Pug 配合 Express**

📌 **文件：`server.js`**

```javascript
const express = require('express');
const app = express();

// 设置 Pug 作为模板引擎
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {
        name: '小明',
        isAdmin: true,
        users: [
            { name: '张三', age: 20 },
            { name: '李四', age: 25 }
        ]
    });
});

app.listen(8000, () => console.log('🚀 服务器运行在 http://localhost:8000'));
```

✅ **运行后访问 `http://localhost:8000`**，会渲染出：

```html
<h1>欢迎, 小明!</h1>
<p>您是管理员</p>
<ul>
    <li>张三 - 20 岁</li>
    <li>李四 - 25 岁</li>
</ul>
```

------

## **📊 EJS vs Pug 对比**

| 对比点       | **EJS**                      | **Pug**                              |
| ------------ | ---------------------------- | ------------------------------------ |
| **语法**     | 传统 HTML 结构，嵌入 JS 代码 | **缩进风格**，不写 `<html>` 标签     |
| **可读性**   | **容易上手**（类似 HTML）    | **简洁但难适应**（类似 Python 语法） |
| **性能**     | ⭐⭐⭐                          | ⭐⭐⭐⭐（解析速度更快）                 |
| **适合场景** | **需要和 HTML 结合的项目**   | **需要精简代码的项目**               |
| **学习成本** | ⭐⭐（前端容易上手）           | ⭐⭐⭐⭐（缩进语法需适应）               |

------

## **🔹 什么时候用 EJS？什么时候用 Pug？**

✅ **EJS 适合：**

- **前端开发者**（HTML 语法熟悉，学习成本低）
- 需要使用 **完整 HTML 结构**
- **团队项目**，方便维护

✅ **Pug 适合：**

- 需要**更简洁的代码**
- **喜欢缩进风格**（类似 Python）
- 追求**更快的解析速度**

🚀 **如果你习惯 HTML，建议用 EJS；如果喜欢简洁语法，Pug 也不错！**
 **你是准备在 Vue 项目里用模板引擎，还是在 Express 里用？** 😃