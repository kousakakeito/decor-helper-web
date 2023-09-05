const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session');
const config = require('../../config/config');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.password,
  database: 'decorhelper',
});



// セッション認証のミドルウェア
const authenticateSession = (req, res, next) => {
  const username = req.session.username;
  if (!username) {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
};

// ユーザー専用のエンドポイント
router.post('/get-layer-data', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const requestData = req.body;

  // データベースから特定の spaceFormValue のデータを取得する処理
  const selectDataSql = 'SELECT space_data FROM space WHERE username = ? AND space_data->"$.spaceFormValue" = ?';
  const values = [username, requestData.spaceFormValue];

  connection.query(selectDataSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error while fetching data:', error);
      res.status(500).send('An error occurred while fetching data.');
    } else {
      if (results.length > 0) {
        const layerData = JSON.parse(results[0].space_data);
        res.json(layerData);
      } else {
        res.status(404).send('Data not found.');
      }
    }
  });
});

router.post('/user-data2', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const newData2 = req.body;

  // データベースから該当のデータをクエリするSQL文を定義
  const selectDataSql = 'SELECT * FROM space WHERE username = ? AND space_data = ?';
  const values = [username, JSON.stringify(newData2)];

  // SQLクエリを実行して該当のデータを取得
  connection.query(selectDataSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error while querying data:', error);
      res.status(500).send('An error occurred while querying data.');
    } else {
      if (results.length > 0) {
        // データが存在する場合
        console.log('Data already exists.');
        res.json({ result: true });
      } else {
        // データが存在しない場合
        // データをデータベースに挿入する処理を追加することもできます
        console.log('Data does not exist. Inserting data...');
        // ここでデータを挿入する処理を追加
        res.json({ message: 'Data does not exist. Inserting data...' });
      }
    }
  });
});






// モジュールが終了するときにMySQL接続を閉じる
process.on('exit', () => {
  connection.end(); // 接続を閉じる
});

// 未処理のエラーでモジュールが終了する場合もMySQL接続を閉じる
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  connection.end(); // 接続を閉じる
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:', reason);
  connection.end(); // 接続を閉じる
  process.exit(1);
});

module.exports = router;
