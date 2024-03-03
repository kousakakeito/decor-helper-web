const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');


const connection = mysql.createConnection(process.env.MYSQL_URL);


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

router.post('/get-layer-data3', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const requestData = req.body;

  // データベースから特定の homeFormValue のデータを取得する処理
  const selectDataSql = 'SELECT room_data FROM room WHERE username = ? AND room_data->"$.homeFormValue" = ?';
  const values = [username, requestData.homeFormValue];

  connection.query(selectDataSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error while fetching data:', error);
      res.status(500).send('An error occurred while fetching data.');
    } else {
      if (results.length > 0) {
        const layerData = JSON.parse(results[0].room_data);
        console.log(results[0].room_data);
        res.json(layerData);
      } else {
        res.status(404).send('Data not found.');
      }
    }
  });
});

router.post('/get-layer-data4', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const requestData = req.body;

  // データベースから特定の homeFormValue のデータを取得する処理
  const selectDataSql = 'SELECT room_data FROM room WHERE username = ? AND room_data->"$.homeFormValue" = ?';
  const values = [username, requestData.homeFormValue];

  connection.query(selectDataSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error while fetching data:', error);
      res.status(500).send('An error occurred while fetching data.');
    } else {
      if (results.length > 0) {
        const layerData = JSON.parse(results[0].room_data);
        res.json(layerData);
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

router.post('/delete-data3', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const homeFormValue = req.body.homeFormValue; // クライアントから送信されたデータ

  console.log(homeFormValue);

  // homeFormValue と一致するデータを room テーブルから削除
  const deleteRoomSql = 'DELETE FROM room WHERE username = ? AND JSON_EXTRACT(room_data, "$.homeFormValue") = ?';
  const values = [username, homeFormValue];

  connection.query(deleteRoomSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error deleting room data:', error);
      res.status(500).send('An error occurred while deleting room data.');
    } else {
      if (results.affectedRows > 0) {
        console.log('Room data deleted successfully.');
        res.json({ message: 'Room data deleted successfully.' });
      } else {
        console.log('No matching room data found.');
        res.status(404).send('No matching room data found.');
      }
    }
  });
});

router.post('/delete-data4', authenticateSession, async (req, res) => {
  const username = req.session.username;
  const homeFormValue = req.body.homeFormValueTarget; // クライアントから送信されたデータ

  console.log(homeFormValue);

  // homeFormValue と一致するデータを room テーブルから削除
  const deleteRoomSql = 'DELETE FROM room WHERE username = ? AND JSON_EXTRACT(room_data, "$.homeFormValue") = ?';
  const values = [username, homeFormValue];

  connection.query(deleteRoomSql, values, (error, results, fields) => {
    if (error) {
      console.error('Error deleting room data:', error);
      res.status(500).send('An error occurred while deleting room data.');
    } else {
      if (results.affectedRows > 0) {
        console.log('Room data deleted successfully.');
        res.json({ message: 'Room data deleted successfully.' });
      } else {
        console.log('No matching room data found.');
        res.status(404).send('No matching room data found.');
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

router.post('/user-data9', authenticateSession, async (req, res) => {
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


router.get('/get-new-data10', authenticateSession, async (req, res) => {
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


router.post('/mailcert-send', async (req, res) => {
  const username = req.session.username;
  
  // usernameを使用してusersテーブルからemailを取得する
  connection.query('SELECT email FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      console.error('Error fetching email from database:', err);
      return res.status(500).json({ error: 'データベースからのメール取得に失敗しました' });
    }
  
    const email = results[0].email; // 取得したemail
    const randomString = Math.random().toString(36).substring(2, 10);
    req.session.confirmCode = randomString;
  
    // nodemailerの設定
    const transporter = nodemailer.createTransport({
      host: 'smtp.fastmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@decorhelper.net',
        pass: process.env.PASSWORD2,
      },
    });
  
    const mailOptions = {
      from: 'info@decorhelper.net',
      to: email, // 取得したemailを使用
      subject: '確認コードを入力画面に入力してください',
      text: `確認コード: ${randomString}`,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
  
      setTimeout(() => {
        delete req.session.confirmCode;
        console.log('Session confirmCode deleted');
      }, 300000); // 5分後にセッションからconfirmCodeを削除
  
      res.json({ message: 'ok' });
    } catch (error) {
      console.error('Send Mail Error:', error);
      res.status(500).json({ error: 'メールの送信に失敗しました' });
    }
  });
});

router.post('/get-cert-confirmCode', function(req, res) {
  // セッションからemailを取得
  const confirmCode = req.session.confirmCode;
  console.log(confirmCode)
  if (confirmCode) {
    res.json({ code: confirmCode });
  } else {
    res.status(404).json({ error: 'confirmCode not found in session' });
  }
});

router.post('/get-change-icon', function(req, res) {
  const username = req.session.username;
  
  // cert_mail列の値をtrueに更新するSQLクエリ
  const sql = 'UPDATE users SET cert_mail = TRUE WHERE username = ?';
  
  connection.query(sql, [username], (err, result) => {
    if (err) {
      // SQL実行時のエラーハンドリング
      console.error('Error updating cert_mail in database:', err);
      return res.status(500).json({ error: 'データベースの更新中にエラーが発生しました' });
    }
    
    // 更新が成功した場合、成功メッセージをレスポンス
    if (result.affectedRows > 0) {
      // 実際に更新が行われた場合（影響を受けた行が1以上）
      console.log('cert_mail updated successfully for user:', username);
      res.json({ message: 'cert_mailが正常に更新されました' });
    } else {
      // 影響を受けた行が0（該当するユーザーが見つからない場合）
      console.log('No user found with the provided username:', username);
      res.status(404).json({ error: '指定されたユーザー名のユーザーが見つかりません' });
    }
  });
});


router.post('/change-tutorial', function(req, res) {
  const username = req.session.username;
  
  // first_login列の値をtrueに更新するSQLクエリ
  const sql = 'UPDATE users SET first_login = TRUE WHERE username = ?';
  
  connection.query(sql, [username], (err, result) => {
    if (err) {
      // SQL実行時のエラーハンドリング
      console.error('Error updating first_login in database:', err);
      return res.status(500).json({ error: 'データベースの更新中にエラーが発生しました' });
    }
    
    // 更新が成功した場合、成功メッセージをレスポンス
    if (result.affectedRows > 0) {
      // 実際に更新が行われた場合（影響を受けた行が1以上）
      console.log('first_login updated successfully for user:', username);
      res.json({ message: 'first_loginが正常に更新されました' });
    } else {
      // 影響を受けた行が0（該当するユーザーが見つからない場合）
      console.log('No user found with the provided username:', username);
      res.status(404).json({ error: '指定されたユーザー名のユーザーが見つかりません' });
    }
  });
});


// ユーザーの登録フォームのバリデーションルール
const registrationValidationRules = [
  check('email').isEmail().withMessage('有効なメールアドレスを入力してください。'),
  check('emailConfirm').custom((value, { req }) => {
  // パスワードが空でない場合のみ一致チェックを行う
  if (req.body.email && value !== req.body.email) {
    throw new Error('メールアドレスが一致しません。');
   }
   return true;
  }),
];

router.post('/changeMail', registrationValidationRules, async (req, res) => {
  // バリデーションエラーのチェック
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  const username = req.session.username; // セッションからusernameを取得

  try {
    // メールアドレスをデータベースに更新
    const sqlUpdateEmail = 'UPDATE users SET email = ? WHERE username = ?';
    connection.query(sqlUpdateEmail, [email, username], (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'メールアドレスの更新中にエラーが発生しました。' });
      }

      // cert_mail列をfalseに更新
      const sqlUpdateCertMail = 'UPDATE users SET cert_mail = FALSE WHERE username = ?';
      connection.query(sqlUpdateCertMail, [username], (errUpdate, resultUpdate) => {
        if (errUpdate) {
          console.error('Error executing SQL query for cert_mail:', errUpdate);
          // cert_mailの更新中にエラーが発生した場合でも、メールアドレスの更新は成功しているので、その旨をレスポンスに含める
          return res.status(500).json({ message: 'メールアドレスは更新されましたが、cert_mailの更新中にエラーが発生しました。' });
        }
        // メールアドレスとcert_mailの更新が成功したことをレスポンス
        return res.status(200).json({ message: 'メールアドレスとcert_mailが正常に更新されました。', email: email });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'メールアドレスの更新中にエラーが発生しました。' });
  }
});


// プロミスを返す非同期関数の定義
function queryAsync(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

// ルーター内での使用例
router.post('/user-delete-data', async (req, res) => {
  const username = req.session.username; // セッションからusernameを取得

  try {
    // 各テーブルからデータを削除
    await queryAsync('DELETE FROM space WHERE username = ?', [username]);
    await queryAsync('DELETE FROM furniture WHERE username = ?', [username]);
    await queryAsync('DELETE FROM room WHERE username = ?', [username]);
    await queryAsync('DELETE FROM login_attempts WHERE username = ?', [username]);
    await queryAsync('DELETE FROM users WHERE username = ?', [username]);

    // 削除が完了したらレスポンスを返す
    res.json({ redirect: '../Form/register/register.html' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'ユーザーデータの削除中にエラーが発生しました。' });
  }
});



// お問い合わせフォームのデータを受け取るルート
router.post('/send-contact-email', (req, res) => {
  const username = req.session.username;
  const { message } = req.body;

  connection.query('SELECT email FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      console.error('Error fetching email from database:', err);
      return res.status(500).json({ error: 'データベースからのメール取得に失敗しました' });
    }
  
    const email = results[0].email; 
      // nodemailerの設定
    const transporter = nodemailer.createTransport({
      host: 'smtp.fastmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@decorhelper.net',
        pass: process.env.PASSWORD2,
      },
    });

  const mailOptions = {
    from: email, // 送信者アドレス
    to: 'info@decorhelper.net', // 受信者アドレス（自分のメールアドレス）
    subject: 'DecorHelperからのお問い合わせ',
    text: `名前: ${username}\nメール: ${email}\nメッセージ: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Send Mail Error:', error);
      return res.status(500).json({ error: 'メールの送信に失敗しました' });
    }
    res.json({ message: 'お問い合わせありがとうございます。' });
  });
});
});

router.post('/contact-certMail', (req, res) => {
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




router.post('/load-session-judge', (req, res) => {
  const username = req.session.username;
  setTimeout(() => {
    if (!username) {
      res.json({ redirect: '../index.html' });
    }
  }, 2000);
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
