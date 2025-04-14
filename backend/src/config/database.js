const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Thay đổi username theo cấu hình của bạn
  password: '', // Thay đổi password theo cấu hình của bạn
  database: 'career_db',
});

module.exports = pool;
