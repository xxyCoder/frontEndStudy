const mysql = require('mysql2');

// 创建数据库连接
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodesql',
    password: '16969dongerqian'
});
// 查询
let sql = 'select * from users where name = "admin"';
conn.query(sql,function(err,result,fields) {
    console.log(result);
    // console.log(fields);    // 额外元数据
})
// 使用占位符查询
sql = 'select * from users where name = ?';
conn.query(sql,['admin'],function(err,result) {
    console.log(result);
})
// execute 在内部调用prepare 和 query
// 第一次执行进行缓存，后面执行相同语句会从缓存中获取
conn.execute(sql,['xxy'],function(err,result,fields) {
    console.log(result);
}) 

// 创建连接池
// 该池不会预先创建所有连接，而是根据需要创建它们，直到达到连接限制
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodesql',
    password: '16969dongerqian',
    waitForConnections: true,   // 使用完保持打开状态 避免建立新连接导致时间损耗
    connectionLimit: 10,
    queueLimit: 0
});
pool.query(sql,['xxy'],function(err,result,fields) {
    console.log(result);
})