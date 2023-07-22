const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const fs = require('fs'); // ファイルシステムモジュールを追加

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0627ikik',
  database: 'decorhelper',
});

const router = express.Router();

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

// テーブル作成処理
const createUsersTable = () => {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        PRIMARY KEY (username)
      )
    `;

    connection.query(sql, (err) => {
      if (err) {
        console.error('Error creating users table:', err);
        return;
      }
      console.log('Users table created successfully!');
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

// パスワードをハッシュ化する関数
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// ユーザーの登録フォームのバリデーションルール
const registrationValidationRules = [
  check('username')
    .isLength({ min: 5 }).withMessage('ユーザーネームは5文字以上で入力してください。')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('ユーザーネームは半角英数字とアンダーバーのみ使用可能です。'),
  check('password')
    .isLength({ min: 8 }).withMessage('パスワードは8文字以上で入力してください。')
    .matches(/[0-9]/).withMessage('パスワードは英数字を含む必要があります。')
    .matches(/[a-zA-Z]/).withMessage('パスワードは英数字を含む必要があります。'),
  check('email').isEmail().withMessage('有効なメールアドレスを入力してください。'),
  check('passwordConfirm').custom((value, { req }) => {
  // パスワードが空でない場合のみ一致チェックを行う
  if (req.body.password && value !== req.body.password) {
   throw new Error('パスワードが一致しません。');
  }
  return true;
  }),
];


// ユーザー登録処理
router.post('/register', registrationValidationRules, async (req, res) => {
  // バリデーションエラーのチェック
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()); // この行を追加して、errors オブジェクトの内容を確認します
    // バリデーションエラーがある場合、エラーメッセージをJSON形式で返す
    return res.status(400).json({ errors: errors.array() });
  }


  const { username, password, email } = req.body;

  try {
    // パスワードのハッシュ化
    const hashedPassword = await hashPassword(password);

    // ユーザー情報をデータベースに保存
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    const values = [username, hashedPassword, email];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'An error occurred while registering the user.' });
      }

      console.log('User registered successfully!');
      return res.status(200).json({ message: 'User registered successfully!' });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
});

// テーブル作成
createUsersTable();

// ルーターオブジェクトではなく、ルーティング処理をエクスポートする
module.exports = (req, res) => {
  // ユーザー登録処理のルーティングをエクスポート
  router(req, res);
};
