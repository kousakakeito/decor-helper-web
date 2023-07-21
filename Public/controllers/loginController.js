const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0627ikik',
  database: 'decorhelper',
});

const router = express.Router();

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // データベースからユーザー情報を検索するクエリ
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const values = [username, password];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('An error occurred while logging in.');
      return;
    }

    if (results.length > 0) {
      // ログイン成功時の処理
      res.redirect('/App/home.html');
    } else {
      // ログイン失敗時の処理
      res.status(401).send('Invalid username or password.');
    }
  });
});

module.exports = router;
