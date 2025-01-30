import mysql from "mysql2/promise";
/*let conn;

conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passaword: 'Suporte99',
    database: 'libertadores',
})

const conexao = await conn.connect()*/

const pool = mysql.createPool({
    host: 'localhost',
    user: 'libertadores',
    password: 'liberta123',
    database: 'libertadores'
})

export default pool;