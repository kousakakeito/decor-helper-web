const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const config = require('../../config/config');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER, 
  password: process.env.MYSQLPASSWORD, 
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT 
});

const router = express.Router();

router.post('/reset-password', (req, res) => {
  const email = req.body.email;

  connection.query('SELECT username FROM users WHERE username = ? OR email = ?', [email, email], function(error, results, fields) {
    if (error) {
      // エラー処理
      console.error('Error executing query', error);
      return;
    }
    
    // クエリ結果の処理
    if (results.length > 0) {
      req.session.userName = results[0].username;
      req.session.save(err => {
        if (err) {
          // セッション保存エラーのログ
          console.error('Session save error userName:', err);
        } else {
          // セッションの正常な保存のログ
          console.log('Session saved successfully userName');
        }
      });
      console.log('Found username:', results[0].username);
    } else {
      console.log('User not found');
    }
  });

  // データベースから入力されたメールアドレスのユーザー情報を検索するクエリ
  const sql = 'SELECT * FROM users WHERE email = ? OR username = ?';
  const values = [email,email];
  console.log(values)

  connection.query(sql, values, (err, results) => {

    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length > 0) {
      req.session.userEmail = results[0].email;
      res.json({ redirect: '../reset1/reset1.html' }); // ここを変更
    } else {
      res.status(404).json({ error: 'User not found' }); // ここを変更
    }

  });
});

router.get('/get-user-email', function(req, res) {
  // セッションからemailを取得
  const userEmail = req.session.userEmail;
  if (userEmail) {
    res.json({ email: userEmail });
  } else {
    res.status(404).send('Email not found in session');
  }
});


router.post('/send-email', async (req, res) => {
  const { email } = req.body;
  const randomString = Math.random().toString(36).substring(2, 10);
  req.session.confirmCode = randomString;

  // nodemailerの設定をFastMailに対応させる
  const transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com', // FastMailのSMTPサーバー
    port: 465, // SSLを使用するポート
    secure: true, // trueで465ポートを使用し、falseで他のポートを使用
    auth: {
      user: 'info@decorhelper.net', // あなたのFastMailのメールアドレス
      pass: config.password2, // FastMailで生成したアプリパスワード
    },
  });

  const mailOptions = {
    from: 'info@decorhelper.net', // 送信者のメールアドレス
    to: email, // 受信者のメールアドレス
    subject: '確認コードを入力画面に入力してください',
    text: `確認コード: ${randomString}`, // 送信する内容
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    setTimeout(() => {
      delete req.session.confirmCode;
      console.log('Session confirmCode deleted');
      req.session.save(err => {
        if (err) {
          // セッション保存エラーのログ
          console.error('Session save error after deleting confirmCode:', err);
        } else {
          // セッションの正常な保存のログ
          console.log('Session saved successfully after deleting confirmCode');
        }
      });
    }, 300000);

    res.json({ redirect: '/Form/reset2/reset2.html' });
  } catch (error) {
    console.error('Send Mail Error:', error);
    res.status(500).json({ error: 'メールの送信に失敗しました' });
  }
});




router.post('/get-user-confirmCode', function(req, res) {
  // セッションからemailを取得
  const confirmCode = req.session.confirmCode;
  console.log(confirmCode)
  if (confirmCode) {
    res.json({ code: confirmCode , redirect: '/Form/reset3/reset3.html'});
  } else {
    res.status(404).json({ error: 'confirmCode not found in session' });
  }
});




// パスワードをハッシュ化する関数
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// ユーザーの登録フォームのバリデーションルール
const registrationValidationRules = [
  check('password')
    .isLength({ min: 8 }).withMessage('パスワードは8文字以上で入力してください。')
    .matches(/[0-9]/).withMessage('パスワードは英数字を含む必要があります。')
    .matches(/[a-zA-Z]/).withMessage('パスワードは英数字を含む必要があります。'),
  check('passwordConfirm').custom((value, { req }) => {
  // パスワードが空でない場合のみ一致チェックを行う
  if (req.body.password && value !== req.body.password) {
   throw new Error('パスワードが一致しません。');
  }
  return true;
  }),
];


router.post('/changePass', registrationValidationRules, async (req, res) => {
  console.log(req.body);  // 受け取ったリクエストの内容をログに出力
  
  // バリデーションエラーのチェック
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    // バリデーションエラーがある場合、エラーメッセージをJSON形式で返す
    return res.status(400).json({ errors: errors.array() });
  }

  const { password , passwordConfirm } = req.body;
  const userName = req.session.userName;
  console.log(userName)

  try {
    // パスワードのハッシュ化
    const hashedPassword = await hashPassword(password);


    // ユーザー情報をデータベースに更新
    const sql = 'UPDATE users SET password = ? WHERE username = ?';
    connection.query(sql, [hashedPassword, userName], (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'An error occurred while updating the password.' });
      }

      return res.status(200).json({ message: 'Password updated successfully!', redirect: '/Form/reset4/reset4.html' });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred while updating the password.' });
  }
});





router.post('/resetCancel-password', (req, res) => {
  res.json({ redirect: '/Form/reset/reset.html' });
});

router.post('/user-register2', (req, res) => {
  res.json({ redirect: '/Form/register/register.html' });
});

router.post('/user-register3', (req, res) => {
  res.json({ redirect: '/Form/register/register.html' });
});


module.exports = router;
