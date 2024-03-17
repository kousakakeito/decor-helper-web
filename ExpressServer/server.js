const path = require('path');
const config = require('../config/config');
const port = 3000;
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.set("trust proxy",1);
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");

let redisClient = redis.createClient({
  host: config.redis_host, 
  port: 6379,    
  legacyMode: false, 
  socket: {
      connectTimeout: 20000
  }
});

redisClient.connect().catch(err => {
  console.error('Redisクライアントの接続に失敗しました:', err);
});

let redisStore = new RedisStore({
  client: redisClient,
});



// 静的ファイルの設定
const publicPath = path.join(__dirname, '..', 'Public');
app.use(express.static(publicPath));
app.use(express.json()); // JSONパースのためのミドルウェアを追加
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // cookie-parserミドルウェアを使用
app.use(
  session({
    store: redisStore,
    secret: config.redis_password,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 24時間
    }
  })
);

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

const resetController = require('../Public/controllers/resetController'); 
app.use(resetController);

const registerUser = require('../Public/controllers/registerController');

//resetContloルーティング

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'Form', 'register', 'register.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/reset.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'Form', 'reset', 'reset.html'));
});

app.get('/reset1.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'Form', 'reset1', 'reset1.html'));
});

app.get('/reset2.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'Form', 'reset2', 'reset2.html'));
});

app.get('/reset3.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'Form', 'reset3', 'reset3.html'));
});

app.get('/reset4.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'Form', 'reset4', 'reset4.html'));
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
