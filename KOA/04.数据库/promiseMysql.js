async function main() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'nodesql',
        password: '16969dongerqian'
    });
    let sql = 'select * from users where name = ?';
    const [ rows,fields ] = await conn.execute(sql,['admin']);
    console.log(rows);
}

main();