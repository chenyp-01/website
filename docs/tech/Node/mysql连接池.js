const mysql = require("mysql");
//创建连接池
const pool = mysql.createPool({
  host: "localhost", //连接主机
  port: 3306, //端口号  *
  database: "ff", //连接的是哪一个库  *
  user: "root", //用户名  *
  password: "root", //密码 *
  connectionLimit: 50, //用于指定连接池中最大的链接数，默认属性值为10.
  queueLimit: 3, //用于指定允许挂起的最大连接数，如果挂起的连接数超过该数值，就会立即抛出一个错误，默认属性值为0.代表不允许被挂起的最大连接数。
});

function query(sql, data = []) {
  return new Promise((resolve, reject) => {
    //建立数据库连接
    pool.getConnection(function (err, connection) {
      if (err) {
        // console.log('与mysql数据库建立连接失败');
        reject(`与mysql数据库建立连接失败---${err}`);
        pool.releaseConnection(); //释放链接，释放内存
      } else {
        console.log("与mysql数据库建立连接成功");
        // select * from  ? where category in (?, ?, ?)
        // connection.query(sql语句,['book','轻小说','历史','都市'],回调函数)
        connection.query(sql, data, function (err, rows) {
          if (err) {
            // console.log('执行sql语句失败，查询数据失败--');
            reject(`执行sql语句失败，查询数据失败-${err}`);
            connection.release(); //释放链接
            // pool.end();
          } else {
            //rows为结果
            // console.log(rows);
            resolve(rows);
            //关闭连接池
            // pool.end();
            connection.release(); //释放链接
          }
        });
      }
    });
  });
}

module.exports = query;


