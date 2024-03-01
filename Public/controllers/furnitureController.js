const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection(process.env.MYSQL_URL);

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

router.post('/user-data3', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const furnitureFormValue = req.body.furnitureName; // クライアントから送信されたデータ

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


// POSTリクエストを処理するエンドポイント
router.post('/user-data4', (req, res) => {
  const username = req.session.username; // リクエストボディからusernameを取得
  const selectAllFurnitureFormValuesSql = 'SELECT JSON_EXTRACT(furniture_data, "$.furnitureFormValue") AS furnitureFormValue FROM furniture WHERE username = ?';
  connection.query(selectAllFurnitureFormValuesSql, [username], (error, results, fields) => {
    if (error) {
      console.error('Error fetching furniture data:', error);
      res.status(500).send('An error occurred while fetching furniture data.');
    } else {
      const furnitureFormValues = [];

      console.log("A");
      console.log(results);


      // データベースから取得したすべての行に対して処理を行う
      results.forEach(row => {
        try {
          const furnitureFormValue = JSON.parse(row.furnitureFormValue);
          if (furnitureFormValue !== null && furnitureFormValue !== "") {
            furnitureFormValues.push(furnitureFormValue);
          } 
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      });

      console.log(furnitureFormValues);

      res.json(furnitureFormValues);
    }
  });
});


router.post('/user-data5', (req, res) => {
  const username = req.session.username; // リクエストボディからusernameを取得
  const selectAllGenreFormValuesSql = 'SELECT JSON_EXTRACT(furniture_data, "$.genreFormValue") AS genreFormValue FROM furniture WHERE username = ?';
  connection.query(selectAllGenreFormValuesSql, [username], (error, results, fields) => {
    if (error) {
      console.error('Error fetching furniture data:', error);
      res.status(500).send('An error occurred while fetching furniture data.');
    } else {
      const genreFormValues = [];

      console.log("A");
      console.log(results);

    
      // データベースから取得したすべての行に対して処理を行う
      results.forEach(row => {
        try {
          const genreFormValue = JSON.parse(row.genreFormValue);
          if (genreFormValue !== null && genreFormValue !== "") {
            genreFormValues.push(genreFormValue);
          } 
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      });

      console.log(genreFormValues);

      res.json(genreFormValues);
    }
  });
});


router.post('/user-data6', (req, res) => {
  const username = req.session.username; 
  const genreFormValue = req.body.checkText;

  const selectGenreAllFurnitureFormValuesSql = 'SELECT JSON_EXTRACT(furniture_data, "$.furnitureFormValue") AS furnitureFormValue FROM furniture WHERE username = ? AND JSON_EXTRACT(furniture_data, "$.genreFormValue") = ?';
  const values = [username, genreFormValue];

  // データベースクエリを実行してfurnitureFormValueを取得
  connection.query(selectGenreAllFurnitureFormValuesSql, values, (error, results) => {
      if (error) {
          console.error('Error fetching furniture data:', error);
          res.status(500).send('An error occurred while fetching furniture data.');
      } else {
        const furnitureFormValues = [];

        console.log("A");
        console.log(results);
  
  
        // データベースから取得したすべての行に対して処理を行う
        results.forEach(row => {
          try {
            const furnitureFormValue = JSON.parse(row.furnitureFormValue);
            if (furnitureFormValue !== null && furnitureFormValue !== "") {
              furnitureFormValues.push(furnitureFormValue);
            } 
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        });
  
        console.log(furnitureFormValues);
  
        res.json(furnitureFormValues);
      }
  });
});


router.post('/user-data7', (req, res) => {
  const username = req.session.username; // リクエストボディからusernameを取得
  const selectAllGenreFormValuesSql = 'SELECT JSON_EXTRACT(furniture_data, "$.furnitureFormValue") AS furnitureFormValue FROM furniture WHERE username = ?';
  connection.query(selectAllGenreFormValuesSql, [username], (error, results) => {

          const furnitureFormValues = [];

      console.log("A");
      console.log(results);


      // データベースから取得したすべての行に対して処理を行う
      results.forEach(row => {
        try {
          const furnitureFormValue = JSON.parse(row.furnitureFormValue);
          if (furnitureFormValue !== null && furnitureFormValue !== "") {
            furnitureFormValues.push(furnitureFormValue);
          } 
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      });
    console.log(furnitureFormValues);
    res.json(furnitureFormValues);
    
  });
});

router.post('/user-newdata8', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const furnitureFormValue = req.body.furnitureFormValue; // クライアントから送信されたデータ

  console.log(furnitureFormValue);

  // furnitureFormValue と一致するデータを furniture テーブルから検索
  const searchFurnitureSql = 'SELECT * FROM furniture WHERE username = ? AND JSON_EXTRACT(furniture_data, "$.furnitureFormValue") = ?';
  const values = [username, furnitureFormValue];

  connection.query(searchFurnitureSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error searching for furniture data:', error);
      res.status(500).send('An error occurred while searching for furniture data.');
    } else {
      if (results.length > 0) {
        console.log('Matching furniture data found.');
        res.json({ exists: true });
      } else {
        console.log('No matching furniture data found.');
        res.json({ exists: false });
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