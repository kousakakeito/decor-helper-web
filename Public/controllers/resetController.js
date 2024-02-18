const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const config = require('../../config/config');
const session = require('express-session');

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
  const sql = 'SELECT * FROM users WHERE email = ? OR username = ?';
  const values = [email,email];
  console.log(values)

  connection.query(sql, values, (err, results) => {

    if (err) {
      // SQL実行時のエラー
      console.error('Error executing query', err);
      res.status(500).send('Internal Server Error');
    } else if (results.length > 0) {
      // ユーザーが見つかった場合、特定のHTMLファイルをロード
      console.log("ok")
      req.session.userEmail = results[0].email;
      res.redirect('/redirect-reset1');
    } else {
      // ユーザーが見つからなかった場合、エラーメッセージを返す
      console.log("error")
      res.status(404).send('User not found');
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

router.post('/send-email', (req, res) => {
  const { email } = req.body;
  
  // ランダムな8桁の文字列を生成
  const randomString = Math.random().toString(36).substring(2, 10);

  // nodemailerの設定
  const transporter = nodemailer.createTransport({
    service: 'gmail', // 使用するメールサービス
    auth: {
      user: 'princxfieldkillz@gmail.com', // 送信者のメールアドレス
      pass: '0627ikik', // 送信者のパスワード
    },
  });

  const mailOptions = {
    from: 'princxfieldkillzl@gmail.com',
    to: email, // 受信者のメールアドレス
    subject: '確認コードを入力画面に入力してください',
    text: `確認コード: ${randomString}`, // 送信する内容
  };

  // メールを送信
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Send Mail Error:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
      res.json({ redirect: '/Form/reset2/reset2.html' });
    }
  });
});



router.get('/redirect-reset1', (req, res) => {

  res.redirect(`/Form/reset1/reset1.html`);
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
