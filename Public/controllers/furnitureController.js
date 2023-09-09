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

// テーブル作成処理
const createFurnitureTable = () => {
  try {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS furniture (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        furniture_data TEXT
      )
    `;

    connection.query(createTableSql, (error) => {
      if (error) {
        console.error('Error creating furniture table:', error);
        return;
      }
      console.log('Furniture table created successfully!');
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

router.post('/user-data2', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const newData = req.body;

  const insertDataSql = 'INSERT INTO furniture (username, furniture_data) VALUES (?, ?)';
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

router.get('/get-new-data2', authenticateSession, async (req, res) => {
  const username = req.session.username;

  const selectLastFurnitureDataSql = 'SELECT furniture_data FROM furniture WHERE username = ? ORDER BY id DESC LIMIT 1';
  connection.query(selectLastFurnitureDataSql, [username], (error, results, fields) => {
    if (error) {
      console.error('Error while fetching last furniture data:', error);
      res.status(500).send('An error occurred while fetching last furniture data.');
    } else {
      if (results.length > 0) {
        const lastFurnitureData = JSON.parse(results[0].furniture_data);
        res.json(lastFurnitureData);
      } else {
        res.status(404).send('No furniture data found for the user.');
      }
    }
  });
});

createFurnitureTable();

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