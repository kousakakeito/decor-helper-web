const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const config = require('../../config/config');
const redis = require('redis');
const cache = redis.createClient(); 
const bcrypt = require('bcrypt');

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

      router.get('/get-spaceData', (req, res) => {
        const username = req.session.username; // リクエストボディからusernameを取得
      
        // テーブルの存在とspace_dataが1つでも存在するかを確認するSQLクエリ
        const checkDataExistsSql = `
          SELECT COUNT(*) AS count
          FROM space
          WHERE username = ?
          AND space_data IS NOT NULL;
        `;
      
        connection.query(checkDataExistsSql, [username], (error, results, fields) => {
          if (error) {
            console.error('Error checking space data exists:', error);
            res.status(500).send('An error occurred while checking space data existence.');
          } else if (results[0].count > 0) {
            // データが存在する場合の処理を実行
            const selectAllSpaceFormValuesSql = `
              SELECT JSON_EXTRACT(space_data, "$.spaceFormValue") AS spaceFormValue 
              FROM space WHERE username = ?;
            `;
            connection.query(selectAllSpaceFormValuesSql, [username], (error, results, fields) => {
              if (error) {
                console.error('Error fetching space data:', error);
                res.status(500).send('An error occurred while fetching space data.');
              } else {
                const spaceFormValues = [];
                results.forEach(row => {
                  try {
                    const spaceFormValue = JSON.parse(row.spaceFormValue);
                    if (spaceFormValue !== null && spaceFormValue !== "") {
                      spaceFormValues.push(spaceFormValue);
                    } 
                  } catch (e) {
                    console.error('Error parsing JSON:', e);
                  }
                });
                res.json(spaceFormValues);
              }
            });
          } else {
            // データが存在しない場合の処理
            console.log('No space data exists.');
            res.status(404).send('No space data exists.');
          }
        });
      });



      router.get('/get-furnitureData', (req, res) => {
        const username = req.session.username; // リクエストボディからusernameを取得
      
        // テーブルの存在とfurniture_dataが1つでも存在するかを確認するSQLクエリ
        const checkDataExistsSql = `
          SELECT COUNT(*) AS count
          FROM furniture
          WHERE username = ?
          AND furniture_data IS NOT NULL;
        `;
      
        connection.query(checkDataExistsSql, [username], (error, results, fields) => {
          if (error) {
            console.error('Error checking furniture data exists:', error);
            res.status(500).send('An error occurred while checking furniture data existence.');
          } else if (results[0].count > 0) {
            // データが存在する場合の処理を実行
            const selectAllFurnitureFormValuesSql = `
              SELECT JSON_EXTRACT(furniture_data, "$.furnitureFormValue") AS furnitureFormValue 
              FROM furniture WHERE username = ?;
            `;
            connection.query(selectAllFurnitureFormValuesSql, [username], (error, results, fields) => {
              if (error) {
                console.error('Error fetching furniture data:', error);
                res.status(500).send('An error occurred while fetching furniture data.');
              } else {
                const furnitureFormValues = [];
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
                res.json(furnitureFormValues);
              }
            });
          } else {
            // データが存在しない場合の処理
            console.log('No furniture data exists.');
            res.status(404).send('No furniture data exists.');
          }
        });
      });


      router.get('/get-genreData', (req, res) => {
        const username = req.session.username; // セッションからusernameを取得
      
        // テーブル存在チェックとfurniture_dataレコードの存在チェック
        const checkTableAndDataExistsSql = `
          SELECT EXISTS(
            SELECT 1
            FROM information_schema.tables 
            WHERE table_schema = 'decorhelper' AND table_name = 'furniture'
          ) AS tableExists,
          (SELECT COUNT(*) FROM furniture WHERE username = ? AND furniture_data IS NOT NULL) AS dataCount;
        `;
      
        connection.query(checkTableAndDataExistsSql, [username], (error, results, fields) => {
          if (error) {
            console.error('Error checking table and data existence:', error);
            res.status(500).send('An error occurred while checking furniture data.');
          } else if (results[0].tableExists && results[0].dataCount > 0) {
            // furnitureテーブルが存在し、かつfurniture_dataレコードが1つ以上存在する場合
            const selectAllGenreFormValuesSql = 'SELECT JSON_EXTRACT(furniture_data, "$.genreFormValue") AS genreFormValue FROM furniture WHERE username = ?';
            connection.query(selectAllGenreFormValuesSql, [username], (error, results, fields) => {
              if (error) {
                console.error('Error fetching furniture data:', error);
                res.status(500).send('An error occurred while fetching furniture data.');
              } else {
                const genreFormValues = results.map(row => JSON.parse(row.genreFormValue)).filter(value => value !== null && value !== "");
                res.json(genreFormValues);
              }
            });
          } else {
            // テーブルが存在しないか、furniture_dataレコードが0件の場合
            console.log('No furniture data exists or table does not exist.');
            res.status(404).send('No furniture data exists or table does not exist.');
          }
        });
      });

      router.get('/get-roomData', (req, res) => {
        const username = req.session.username; // リクエストボディからusernameを取得
      
        // テーブルの存在とroom_dataが1つでも存在するかを確認するSQLクエリ
        const checkDataExistsSql = `
          SELECT COUNT(*) AS count
          FROM room
          WHERE username = ?
          AND room_data IS NOT NULL;
        `;
      
        connection.query(checkDataExistsSql, [username], (error, results, fields) => {
          if (error) {
            console.error('Error checking room data exists:', error);
            res.status(500).send('An error occurred while checking room data existence.');
          } else if (results[0].count > 0) {
            // データが存在する場合の処理を実行
            const selectAllRoomFormValuesSql = `
              SELECT JSON_EXTRACT(room_data, "$.homeFormValue") AS homeFormValue 
              FROM room WHERE username = ?;
            `;
            connection.query(selectAllRoomFormValuesSql, [username], (error, results, fields) => {
              if (error) {
                console.error('Error fetching room data:', error);
                res.status(500).send('An error occurred while fetching room data.');
              } else {
                const homeFormValues = [];
                results.forEach(row => {
                  try {
                    const homeFormValue = JSON.parse(row.homeFormValue);
                    if (homeFormValue !== null && homeFormValue !== "") {
                      homeFormValues.push(homeFormValue);
                    } 
                  } catch (e) {
                    console.error('Error parsing JSON:', e);
                  }
                });
                res.json(homeFormValues);
              }
            });
          } else {
            // データが存在しない場合の処理
            console.log('No room data exists.');
            res.status(404).send('No room data exists.');
          }
        });
      });

      router.get('/get-mailCert', (req, res) => {
        const username = req.session.username; // セッションからusernameを取得
      
        // usernameに基づいてusersテーブルからcert_mailの値を取得するSQLクエリ
        const sql = 'SELECT cert_mail FROM users WHERE username = ?';
      
        // SQLクエリの実行
        connection.query(sql, [username], (err, results) => {
          if (err) {
            // SQL実行時のエラーハンドリング
            console.error('Error fetching cert_mail from database:', err);
            return res.status(500).json({ error: 'An error occurred while fetching cert_mail data.' });
          }
      
          if (results.length > 0) {
            // cert_mailの値が見つかった場合、その値をレスポンスする
            const certMail = results[0].cert_mail;
            res.json({ certMail: certMail }); // cert_mailの値をJSON形式でレスポンス
          } else {
            // 指定されたusernameのレコードが見つからない場合
            res.status(404).json({ error: 'User not found.' });
          }
        });
      });

      router.get('/get-userEmail', (req, res) => {
        const username = req.session.username; // セッションからusernameを取得
      
        // データベースからusernameに対応するemailを取得するSQLクエリを定義
        const sql = 'SELECT email FROM users WHERE username = ?';
      
        // SQLクエリを実行
        connection.query(sql, [username], (err, results) => {
          if (err) {
            // エラーが発生した場合、エラーメッセージをクライアントに送信
            console.error('Error fetching email from database:', err);
            return res.status(500).json({ error: 'データベースからメールアドレスの取得中にエラーが発生しました' });
          }
      
          if (results.length > 0) {
            // emailが見つかった場合、その値をクライアントにレスポンス
            const email = results[0].email;
            res.json({ email: email });
          } else {
            // 指定されたusernameに対応するユーザーが見つからない場合
            res.status(404).json({ error: '指定されたユーザー名に該当するメールアドレスが見つかりませんでした' });
          }
        });
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
  const { username, password } = req.body;

  try {
    // データベースからユーザー情報を検索するクエリ
    const sql = 'SELECT * FROM users WHERE username = ?';
    const values = [username];

    connection.query(sql, values, async (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).send('An error occurred while logging in.');
      }

      if (results.length > 0) {
        const user = results[0];
        // ハッシュ化されたパスワードと入力されたパスワードを比較
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          // パスワードが一致した場合の処理
          handleLoginSuccess(res, req, user.username);
          console.log("ok");
        } else {
          // パスワードが一致しない場合の処理
          const attempts = await getLoginAttempts(username);
          await handleLoginFailure(res, attempts, username);
          console.log("no");
        }
      } else {
        // ユーザーが見つからない場合の処理
        console.log("no user found");
        res.status(401).send('Login failed.');
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while logging in.');
  }
});

router.post('/pass-reset', (req, res) => {
  res.json({ redirect: '/Form/reset/reset.html' });
});

router.post('/user-register', (req, res) => {
  res.json({ redirect: '/Form/register/register.html' });
});

router.post('/user-login', (req, res) => {
  res.json({ redirect: '../../index.html' });
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
