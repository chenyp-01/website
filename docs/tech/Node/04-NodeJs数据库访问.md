## 1. 创建Mysql数据库和表

### 认识MySQL数据库

MySQL是世界上最流行的开源数据库,用于Web应用开发中的数据持久化存储。

在MySQL中,表中的数据是以记录(record)的形式存储的。每条记录都包含多条字段(field)的数据。

**记录(row)和字段(column)是表中最基本的数据单元**。

- 记录(row):一条完整的信息,包含字段及其值。。

- 字段(column):一块数据域,用于描述记录的某一特定属性。

### 创建Mysql数据库和表

- 下载并安装 phpStudy (小皮)

  https://www.xp.cn/download.html

- 启动小皮，并启动Apache和MySQL服务

- 安装数据库工具 SQL_Front

- 新建数据库

- 新建表格

  表和字段的名字要避免使用： name key  desc

## 2.  SQL语句

SQL(Structured Query Language)是关系型数据库的标准语言,用于存取数据和对数据库进行定义及管理

### 1. INSERT语句

- INSERT语句用于向表中插入新数据行

```sql
INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
```

- 在插入值时,需要注意:
  	1. 列名和值的顺序应该一致。
   2. 如果表中有自增主键,插入语句中可以省略该列。
   3. 字符串型数据应使用单引号' '包裹。

- 示例

```js 
// 插入一条记录
INSERT INTO students (name, age) VALUES ('John', 18);
```

### 2. DELETE语句

- DELETE语句用于删除表中的数据行

```
DELETE FROM table_name WHERE some_column = some_value;
```

- WHERE条件用于过滤要删除的数据,如果没有指定WHERE条件,将删除表中所有数据,所以需要谨慎使用

- 示例

``` js
// 删除id=3的记录
DELETE FROM students WHERE id = 3;
```

### 3. UPDATE语句

- UPDATE语句用于更新表中的数据

```
UPDATE table_name SET column1 = value1, column2 = value2, ... 
WHERE some_column = some_value;
```

- 示例

```js
// 1. 将id为2的学生年龄更改为20
UPDATE students SET age = 20 WHERE id = 2;

// 2.将所有男生的年龄增加1岁
UPDATE students SET age = age + 1 WHERE gender = 'male';

//3. 将id为1的学生名字和年龄都进行更改 （一次更新多个列）
UPDATE students SET name = 'Apple', age = 15 WHERE id = 1;

//4. 将id为1和3和5的学生年龄都改为2倍 (一次更新多行)
UPDATE students SET age = age * 2 WHERE id IN (1, 3, 5);
```

### 4. SELECT语句

SELECT语句用于从表中查询数据

SELECT语句是SQL语言中最重要和最常用的语句之一

SELECT 语句通常由以下几个部分组成:

1.  SELECT 关键字
2.  表名:要操作的数据表名。
3.  要查询的表字段,,多个字段用逗号分隔。
4.  条件表达式:用于过滤数据,指定查询条件,使用WHERE语句指定。
5.  排序方式:使用ORDER BY语句指定查询结果的排序方式。
6.  分页参数:使用LIMIT语句指定查询结果的分页参数。

- 示例

```js
// 1. 查询students表所有列
SELECT * FROM students;

// 2. 查询指定列
SELECT id, name, age FROM students;

// 3. 查询 age>23 的学生信息
SELECT id, name, age FROM students WHERE age > 23

// 4. 查询 age>23 并且 grade ='三' 的学生信息
SELECT id, name, age FROM students WHERE age > 23 and grade = '三'

// 5. 查询 age > 23 或者 grade = '三' 的学生信息
SELECT id, name, age FROM students WHERE age > 23 or grade = '三'

// 6. 查询 user中姓”李"的学生信息 (模糊查询)
// % 通配符，代表不限个数的字符
SELECT id, name, age FROM students WHERE user like '李%'

// 7. 查询的结果按id降序排列
// order by id asc为升序 ， desc为降序
SELECT id, name, age FROM students WHERE user like '李%' order by id desc

// 8. 查询的结果按id降序排列后，只取第三条后面的8条
// limit 3,8  表示从第三条开始数够8条， 不包括第三条， 
SELECT id, name, age FROM students WHERE user like '李%' order by id desc limit 3,8

// 9. 查询 age > 20 的学生记录，并获取这些记录的总条数

// 方案一: 用两条语句分别查询
SELECT * FROM students WHERE age > 20;
SELECT COUNT(*) AS total FROM students WHERE age > 20;
// 方案二：使用内层查询,一条语句完成
//****************************特别注意： count(*)中 count后面不能有空格
SELECT *, (SELECT COUNT(*) FROM students WHERE age > 20) AS total 
FROM students WHERE age > 20;

// 10. 多表联查,查所有字段
// 这会把goods表的classId 和 goods_class表的classId列值相等的行连接起来,并选出我们指定的列
SELECT *
FROM goods
JOIN goods_class ON goods.classId = goods_class.classId where 条件;

// 11. 多表联查，查询指定字段
SELECT goods.goodsId, goods.goodsName, goods_class.className
FROM goods
JOIN goods_class ON goods.classId = goods_class.classId;
```


## 3.  Node.js中数据库访问

### 1. 安装mysql模块

```
npm i mysql -S
```

### 2. 在项目中引入mysql模块

```js
const mysql = require("mysql")
```

### 3. 建立数据库连接

```javascript 
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: "yunheshop",
    port: '3306'
})
```

### 4. 构建sql语句，执行并返回结果

#### 1. 查询


前端代码部分：

```js
axios.get('/product',{
    params: {
        键值对
    }
})
.then((res)=>{
    console.log(res.data)
})
```

Express后端部分的代码
```js
// 数据接口逻辑  （Mock数据  模拟数据）
app.get("/product", (req, res) => {
    //接收参数
    let { productName } = req.query;
    let sql = "select * from product where productName = ?"
    conn.query(sql, [productName], function (err, result) {
        if (err) {
            console.log('查询数据库失败');
        } else {
            // console.log(result);
            let data;
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
            } else {
                data = {
                    code: 1,
                    msg: '没有结果 '
                }
            }
            res.send(data)
        }
    })
})
```

#### 2. 新增

前端代码部分：

```js
axios.post("/product",{键值对})
.then((res)=>{
    console.log(res.data)
})
```

后端部分代码

```js
 //*********************一定加上这条语句
app.use(express.json())
......
//添加商品
app.post("/product",(req,res)=>{
    //接收参数
    let { productName, price , imgUrl} = req.body;
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

#### 3. 删除

前端代码
```js

        let id = 42;
        axios.delete("/product", {
            params: {
                id
            }
        })
        .then((res) => {
            console.log(res.data);
        })

```

后端代码

```js
//删除商品
router.delete("/product",(req,res)=>{
    //接收参数
    let { id} = req.query;
    let sql = "delete from product where id = ?"
    conn.query(sql,[id],(err,result)=>{
        if (err){
            console.log('增加失败');
            return;
        }
        let data;
        if (result.affectedRows === 1){
            data = {
                code: 0,
                msg: '删除成功'
            }
        }else{
            data = {
                code: 1,
                msg: '删除失败'
            }
        }
        res.send(data)
    })
})
```

#### 4. 更新

前端代码

```js

        let productInfo = {
            id: 38,
            productName: '护手霜',
            price: 23,
            imgUrl: '23.jpg'
        }
        axios.put("/product", productInfo)
        .then((res) => {
            console.log(res.data);
        })

```


后端代码

```js
//更新商品
router.put("/product",(req,res)=>{
    //接收参数
    
    let { id,productName,price,imgUrl} = req.body;
    console.log(req.body);
    let sql = "update product set productName=?,price=?,imgUrl=? where id = ?"
    conn.query(sql,[productName,price,imgUrl,id],(err,result)=>{
        if (err){
            console.log('服务器异常');
            return;
        }
        let data;
        if (result.affectedRows === 1){
            data = {
                code: 0,
                msg: '更新成功'
            }
        }else{
            data = {
                code: 1,
                msg: '更新失败'
            }
        }
        res.send(data)
    })
})
```

## 4. 使用连接池（了解）

### 1. 不使用连接池的弊端

在 Node.js 程序中使用数据库时,如果不使用连接池,会有以下几个弊端

1. 慢速:每次请求都需要进行数据库连接的建立和释放,这是一个非常消耗资源的过程。如果并发请求很高,会严重影响性能。
2. 内存占用高:维持每个连接都需要一定的内存,如果连接数非常大,会占用很多内存。
3. 容易导致连接过载:如果有大量请求同时访问数据库,很容易导致超过数据库最大连接数,从而导致连接无法建立,出现各种报错。
4. 安全性较差:频繁的连接建立和释放,容易遭到中间人攻击,数据传输过程可能被劫持。
5.  稳定性差:大量短连接的建立和释放,会给数据库带来较大压力,可能出现各种连接异常问题。

### 2. 如何使用连接池

- 在util文件夹中创建mysql.js

  **以下代码只需要改动数据库信息即可**

```js
    const mysql = require("mysql");
    //创建连接池
    const pool = mysql.createPool({
        host: 'localhost', //连接主机
        port: 3306,   //端口号  *
        database: 'yunheedu',  //连接的是哪一个库  *
        user: 'root',   //用户名  * 
        password: 'root',    //密码 *
        connectionLimit: 50, //用于指定连接池中最大的链接数，默认属性值为10. 
        queueLimit: 3 //用于指定允许挂起的最大连接数，如果挂起的连接数超过该数值，就会立即抛出一个错误，默认属性值为0.代表不允许被挂起的最大连接数。
    })

    function query(sql, data = []) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    // console.log('与mysql数据库建立连接失败');
                    reject(`与mysql数据库建立连接失败---${err}`)
                    pool.releaseConnection();//释放链接
                } else {
                    console.log('与mysql数据库建立连接成功');
                    // select * from  ? where category in (?, ?, ?)
                    // connection.query(sql语句,['book','轻小说','历史','都市'],回调函数)
                    connection.query(sql, data, function (err, rows) {
                        if (err) {
                            // console.log('执行sql语句失败，查询数据失败--');
                            reject(`执行sql语句失败，查询数据失败-${err}`)
                            connection.release();//释放链接
                            // pool.end();
                        } else {
                            //rows为结果
                            // console.log(rows);
                            resolve(rows)
                            //关闭连接池
                            // pool.end();
                            connection.release();//释放链接
                        }
                    })
                }
            })

        })

    }
    module.exports = query 
```

- 在业务逻辑中使用

```js
const express = require("express")
const router = express.Router()
const query = require("../utils/mysql")

//首页数据
router.get("/homedata", (req, res) => {
    let sql = "select * from homedata"
    query(sql).then(result => {
        if (result.length) {
            res.send({
                code: 0,
                list: result
            })
        } else {
            res.send({
                code: 1,
                msg: '没数据'
            })
        }
    })
    .catch(err=>{})
})

module.exports = router
```

