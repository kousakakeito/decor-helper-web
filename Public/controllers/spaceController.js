const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection(process.env.MYSQL_URL);

// テーブル作成処理
const createSpaceTable = () => {
  try {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS space (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        space_data TEXT
      )
    `;

    connection.query(createTableSql, (error) => {
      if (error) {
        console.error('Error creating space table:', error);
        return;
      }
      console.log('Space table created successfully!');
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

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
router.post('/user-data', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const newData = req.body;

  const insertDataSql = 'INSERT INTO space (username, space_data) VALUES (?, ?)';
  const values = [username, JSON.stringify(newData)];

  connection.query(insertDataSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error while saving data:', error);
      res.status(500).send('An error occurred while saving data.');
    } else {
      console.log('Data saved successfully.');
      res.json({ message: 'Data saved successfully.' });
    }
  });
});

// クライアントに新しい入力データを送信するエンドポイント

router.get('/get-new-data', authenticateSession, async (req, res) => {
  const username = req.session.username;

  const selectLastSpaceDataSql = 'SELECT space_data FROM space WHERE username = ? ORDER BY id DESC LIMIT 1';
  connection.query(selectLastSpaceDataSql, [username], (error, results, fields) => {
    if (error) {
      console.error('Error while fetching last space data:', error);
      res.status(500).send('An error occurred while fetching last space data.');
    } else {
      if (results.length > 0) {
        const lastSpaceData = JSON.parse(results[0].space_data);
        res.json(lastSpaceData);
      } else {
        res.status(404).send('No space data found for the user.');
      }
    }
  });
});

createSpaceTable();


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
