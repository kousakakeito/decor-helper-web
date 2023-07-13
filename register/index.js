document.querySelector('#loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
  
  // フォームの入力値を取得
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  
  // アカウント登録の処理を呼び出す
  registerAccount(username, password, email);
});

function registerAccount(username, password, email) {
  // APIリクエストを送信してアカウント登録の処理を実行する
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email
    })
  })
  .then(function(response) {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('アカウント登録に失敗しました');
    }
  })
  .then(function(data) {
    console.log(data); // 登録成功時のメッセージを表示するなどの処理
  })
  .catch(function(error) {
    console.error(error); // エラーメッセージを表示するなどの処理
  });
}

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  
  // ここにデータベースへの登録処理を実装する
  const insertQuery = INSERT INTO users (username, password,email) VALUES ('user1', 'password1','email1');

  // MySQLクエリを使用してデータベースにデータを保存するなどの処理
  connection.query(insertQuery, ['user1', 'password1', 'email1'], (error, results) => {
    if (error) {
      // エラーハンドリング
      console.error(error);
    } else {
      // 成功時の処理
      console.log('データが正常に挿入されました');
    }
  });
  
  // レスポンスを返す
  res.status(200).send('アカウントが登録されました');
});

app.listen(3000, () => {
  console.log('サーバーがポート3000で起動しました');
});
