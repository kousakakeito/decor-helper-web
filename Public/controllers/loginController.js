const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const config = require('../../config/config');
const redis = require('redis');
const cache = redis.createClient(); 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.password,
  database: 'decorhelper',
});

const router = express.Router();

// express-sessionミドルウェアを使用
router.use(session({
  secret: 'your_secret_key', // セッションの暗号化に使用するキー
  resave: false,
  saveUninitialized: false
}));

// テーブル作成処理
const createUsersTable = () => {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS login_attempts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        attempts INT DEFAULT 0,
        last_attempt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (username) REFERENCES users(username)
      )
    `;

    connection.query(sql, (err) => {
      if (err) {
        console.error('Error creating login_attempts table:', err);
        return;
      }
      console.log('Login_attempts table created successfully!');
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

// ログイン試行回数を取得する関数
async function getLoginAttempts(username) {
  try {
    const sql = 'SELECT attempts FROM login_attempts WHERE username = ?';
    const values = [username];
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (results.length === 0) {
          resolve(0);
        } else {
          resolve(results[0].attempts);
        }
      });
    });
  } catch (error) {
    throw new Error('Error while fetching login attempts:', error);
  }
}

// ログイン試行回数を更新する関数
async function updateLoginAttempts(username, attempts) {
  // 既にlogin_attemptsテーブルにレコードが存在するかチェック
  const selectSql = 'SELECT * FROM login_attempts WHERE username = ?';
  const selectValues = [username];
  const selectResult = await new Promise((resolve, reject) => {
    connection.query(selectSql, selectValues, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });

  if (selectResult.length === 0) {
    // レコードが存在しない場合はINSERT
    const insertSql = 'INSERT INTO login_attempts (username, attempts) VALUES (?, ?)';
    const insertValues = [username, attempts];
    await new Promise((resolve, reject) => {
      connection.query(insertSql, insertValues, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  } else {
    // レコードが存在する場合はUPDATE
    const updateSql = 'UPDATE login_attempts SET attempts = ? WHERE username = ?';
    const updateValues = [attempts, username];
    await new Promise((resolve, reject) => {
      connection.query(updateSql, updateValues, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}




// ログイン成功時の処理
function handleLoginSuccess(res, req, username) {

    // セッションにユーザー名を保存
    req.session.username = username;

    // Redis クライアントが有効であることを確認してから操作
    if (cache.connected) {
    // RedisにユーザーのセッションIDと関連するユーザーデータを保存
     const userSessionKey = `user:${username}`;
     const userSessionData = {
      sessionId: req.sessionID,
      // 他に必要なユーザー情報を含めることも可能
     };
     cache.set(userSessionKey, JSON.stringify(userSessionData));
    };
 
  // ログインに成功した場合は試行回数をリセット
  updateLoginAttempts(username, 0)
    .then(() => {

      // セッションからユーザー名を取得して返すエンドポイントを追加
      router.get('/get-session', (req, res) => {
        const sessionData = req.session.username;
        res.json({ username: sessionData });
      });     

      // リダイレクトを行うエンドポイントにリダイレクトする
      res.redirect('/redirect-home');
    })
    .catch((error) => {
      console.error('Error while resetting login attempts:', error);
      res.status(500).send('An error occurred while logging in.');
    });
}





// ログイン失敗時の処理
async function handleLoginFailure(res, attempts, username) {
  if (attempts >= 5) {
    // ログイン試行回数が5回を超えた場合はアカウントをロック
    const lockDurationMinutes = 5; // アカウントロック時間（例：5分）
    const lockTime = new Date(Date.now() + lockDurationMinutes * 60000); // 現在時刻からアカウントロック時間後の日時を計算

    // ログイン試行回数をリセットしてロック時間を登録
    try {
      const updateLockSql = 'UPDATE login_attempts SET attempts = 0, last_attempt = ? WHERE username = ?';
      const updateLockValues = [lockTime, username];
      await new Promise((resolve, reject) => {
        connection.query(updateLockSql, updateLockValues, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });

      res.status(401).send('Too many failed login attempts. Your account has been locked. Please try again later.');
      return;
    } catch (error) {
      console.error('Error while updating login attempts:', error);
      res.status(500).send('An error occurred while logging in.');
      return;
    }
  }

  // ログイン試行回数が5回未満の場合は試行回数を更新
  updateLoginAttempts(username, attempts + 1)
    .then(() => {
      res.status(401).send('Invalid username or password. Attempts remaining: ' + (5 - attempts));
    })
    .catch((error) => {
      console.error('Error while updating login attempts:', error);
      res.status(500).send('An error occurred while logging in.');
    });
}

// ログイン後のリダイレクト処理を行うエンドポイント
router.get('/redirect-home', (req, res) => {

  const username = req.session.username; // セッションからユーザー名を取得

  if (!username) {
    // セッションにユーザー名が存在しない場合はログインページにリダイレクト
    res.redirect('/index.html');
    return;
  }
  res.redirect(`/App/home.html`);
});

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // データベースからユーザー情報を検索するクエリ
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const values = [username, password];

    connection.query(sql, values, async (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('An error occurred while logging in.');
        return;
      }

      if (results.length > 0) {
        // ログイン成功時の処理
        const username = results[0].username; // ログイン成功時にusernameを取得
        handleLoginSuccess(res, req, username);
      } else {
        // ログイン失敗時の処理
        const attempts = await getLoginAttempts(username);
        await handleLoginFailure(res, attempts, username);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while logging in.');
  }
});



createUsersTable();

// モジュールが終了するときにRedisクライアントを閉じる
process.on('exit', () => {
  cache.quit(); // クライアントを閉じる
});

// モジュールが異常終了する場合もRedisクライアントを閉じる
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  cache.quit(); // クライアントを閉じる
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:', reason);
  cache.quit(); // クライアントを閉じる
  process.exit(1);
});


module.exports = router;
