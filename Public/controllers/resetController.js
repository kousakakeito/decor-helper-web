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
