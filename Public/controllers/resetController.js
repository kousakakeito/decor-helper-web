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
      pass: 'rqfwhsa8fbtwddh3', // FastMailで生成したアプリパスワード
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
    }, 60000);

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
