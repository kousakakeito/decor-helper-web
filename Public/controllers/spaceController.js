const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();
const config = require('../../config/config');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.password,
  database: 'decorhelper',
});


// JSONデータを解析するためのミドルウェアを追加
app.use(bodyParser.json());

// データを受信するエンドポイント
app.post("/api/send-data", (req, res) => {
  const receivedData = req.body;
  console.log("受信されたデータ:", receivedData);
  
  // ここでデータの処理やデータベースへの保存などを行う
  // ...

  res.sendStatus(200); // レスポンスとしてステータスコード200を送信
});

