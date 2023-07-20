const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = 3000;

// 静的ファイルの設定
const publicPath = path.join(__dirname, '..','Public');
app.use(express.static(publicPath));
app.use(express.json()); // JSONパースのためのミドルウェアを追加
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0627ikik',
  database: 'decorhelper',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');

  // データベースにテーブルが存在しない場合は作成する
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      PRIMARY KEY (username)
    )
  `;
  connection.query(createUsersTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
      return;
    }
    console.log('Users table created successfully!');
  });
});

const registerUser = require('../Public/controllers/registerController');


app.get('/register.html', (req, res) => {
  res.sendFile(path.join(publicPath,'Form','register','register.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(publicPath,'index.html'));
});

app.get('/reset.html', (req, res) => {
  res.sendFile(path.join(publicPath,'Form','reset','reset.html'));
});

app.post('/register', (req, res) => {
  registerUser(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});