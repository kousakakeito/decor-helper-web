const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const config = require('../../config/config');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.password,
  database: 'decorhelper',
});

const router = express.Router();

router.post('/reset-password', (req, res) => {
  const email = req.body.email;

  // データベースから入力されたメールアドレスのユーザー情報を検索するクエリ
  const sql = 'SELECT * FROM users WHERE email = ?';
  const values = [email];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('An error occurred while resetting the password.');
      return;
    }

    if (results.length === 0) {
      // ユーザーが存在しない場合の処理
      res.status(404).send('User not found.');
      return;
    }

    // メール送信の処理
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // または使用するメールサービス（Gmail以外の場合は適切な設定が必要）
      auth: {
        user: 'DecorHelperWeb@gmail.com', // メール送信に使用するGmailアカウント
        pass: config.password, // メール送信に使用するGmailアカウントのパスワード
      },
    });

    const mailOptions = {
      from: 'DecorHelperWeb@gmail.com', // 送信元メールアドレス
      to: email, // 送信先メールアドレス（リセット対象のユーザーのメールアドレス）
      subject: 'パスワードリセットリンク', // メールの件名
      text: 'パスワードリセットリンクをクリックしてパスワードをリセットしてください。', // メール本文
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('An error occurred while sending the reset link.');
      } else {
        console.log('Email sent:', info.response);
        res.sendStatus(200); // メール送信成功時のレスポンス
      }
    });
  });
});

module.exports = router;
