const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser'); // cookie-parserモジュールを追加

// 静的ファイルの設定
const publicPath = path.join(__dirname, '..', 'Public');
app.use(express.static(publicPath));
app.use(express.json()); // JSONパースのためのミドルウェアを追加
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // cookie-parserミドルウェアを使用

// ログイン機能のルーティング
const loginController = require('../Public/controllers/loginController');
app.use(loginController);
// ログアウト機能のルーティング
const logoutController = require('../Public/controllers/logoutController'); 
app.use(logoutController);

const spaceController = require('../Public/controllers/spaceController'); 
app.use(spaceController);

const furnitureController = require('../Public/controllers/furnitureController'); 
app.use(furnitureController);

const homeController = require('../Public/controllers/homeController'); 
app.use(homeController);

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

// リダイレクト先のURLにクエリが反映されるように、/redirect-home エンドポイントを追加
app.get('/redirect-home', (req, res) => {
  res.redirect(`/App/home.html`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
