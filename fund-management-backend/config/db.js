const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2049',
  database: 'fundmanager',
  connectionLimit: 10, 
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL Connection Failed:', err.code, err.sqlMessage);
    return;
  }
  console.log('✅ Connected to MySQL!');
  connection.release();
});


module.exports = pool;
