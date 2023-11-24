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
const createRoomTable = () => {
  try {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS room (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        room_data TEXT
      )
    `;

    connection.query(createTableSql, (error) => {
      if (error) {
        console.error('Error creating room table:', error);
        return;
      }
      console.log('Room table created successfully!');
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


router.post('/get-layer-data2', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const requestData = req.body;

  // データベースから特定の furnitureFormValue のデータを取得する処理
  const selectDataSql = 'SELECT furniture_data FROM furniture WHERE username = ? AND furniture_data->"$.furnitureFormValue" = ?';
  const values = [username, requestData.furnitureFormValue];

  connection.query(selectDataSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error while fetching data:', error);
      res.status(500).send('An error occurred while fetching data.');
    } else {
      if (results.length > 0) {
        const layerData = JSON.parse(results[0].furniture_data);
        res.json(layerData);
        console.log(results[0].furniture_data)
      } else {
        res.status(404).send('Data not found.');
      }
    }
  });
});


router.post('/delete-data', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const spaceFormValue = req.body.spaceFormValue; // クライアントから送信されたデータ

  console.log(spaceFormValue);

  // spaceFormValue と一致するデータを space テーブルから削除
  const deleteSpaceSql = 'DELETE FROM space WHERE username = ? AND JSON_EXTRACT(space_data, "$.spaceFormValue") = ?';
  const values = [username, spaceFormValue];

  connection.query(deleteSpaceSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error deleting space data:', error);
      res.status(500).send('An error occurred while deleting space data.');
    } else {
      if (results.affectedRows > 0) {
        console.log('Space data deleted successfully.');
        res.json({ message: 'Space data deleted successfully.' });
      } else {
        console.log('No matching space data found.');
        res.status(404).send('No matching space data found.');
      }
    }
  });
});


router.post('/delete-data2', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const furnitureFormValue = req.body.furnitureFormValue; // クライアントから送信されたデータ

  console.log(furnitureFormValue);

  // furnitureFormValue と一致するデータを furniture テーブルから削除
  const deleteFurnitureSql = 'DELETE FROM furniture WHERE username = ? AND JSON_EXTRACT(furniture_data, "$.furnitureFormValue") = ?';
  const values = [username, furnitureFormValue];

  connection.query(deleteFurnitureSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error deleting furniture data:', error);
      res.status(500).send('An error occurred while deleting furniture data.');
    } else {
      if (results.affectedRows > 0) {
        console.log('Furniture data deleted successfully.');
        res.json({ message: 'Furniture data deleted successfully.' });
      } else {
        console.log('No matching furniture data found.');
        res.status(404).send('No matching furniture data found.');
      }
    }
  });
});

router.post('/user-data8', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const newData = req.body;

  const insertDataSql = 'INSERT INTO room (username, room_data) VALUES (?, ?)';
  const values = [username, JSON.stringify(newData)];

  console.log(values);

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

router.get('/get-new-data8', authenticateSession, async (req, res) => {
  const username = req.session.username;

  const selectLastRoomDataSql = 'SELECT room_data FROM room WHERE username = ? ORDER BY id DESC LIMIT 1';
  connection.query(selectLastRoomDataSql, [username], (error, results, fields) => {
    if (error) {
      console.error('Error while fetching last room data:', error);
      res.status(500).send('An error occurred while fetching last room data.');
    } else {
      if (results.length > 0) {
        const lastRoomData = JSON.parse(results[0].room_data);
        res.json(lastRoomData);
      } else {
        res.status(404).send('No room data found for the user.');
      }
    }
  });
});

router.get('/get-new-data9', authenticateSession, async (req, res) => {
  const username = req.session.username;

  const selectLastRoomDataSql = 'SELECT room_data FROM room WHERE username = ? ORDER BY id DESC LIMIT 1';
  connection.query(selectLastRoomDataSql, [username], (error, results, fields) => {
    if (error) {
      console.error('Error while fetching last room data:', error);
      res.status(500).send('An error occurred while fetching last room data.');
    } else {
      if (results.length > 0) {
        const lastRoomData = JSON.parse(results[0].room_data);
        res.json(lastRoomData);
      } else {
        res.status(404).send('No room data found for the user.');
      }
    }
  });
});





createRoomTable();


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
