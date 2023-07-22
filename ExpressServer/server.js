const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 静的ファイルの設定
const publicPath = path.join(__dirname, '..', 'Public');
app.use(express.static(publicPath));
app.use(express.json()); // JSONパースのためのミドルウェアを追加
app.use(express.urlencoded({ extended: true }));

// ログイン機能のルーティング
const loginController = require('../Public/controllers/loginController');
app.use(loginController);

const registerUser = require('../Public/controllers/registerController');

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'Form', 'register', 'register.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/reset.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'Form', 'reset', 'reset.html'));
});

app.post('/register', (req, res) => {
  registerUser(req, res);
});

// ログイン成功後のリダイレクト処理
app.get('/App/home.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'App', 'home.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
