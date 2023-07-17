const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('debug', true);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json()); // JSONパースのためのミドルウェアを追加

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/Form/register/register.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/reset.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/Form/reset/reset.html'));
});

app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  try {
    // ユーザー登録処理をregisterController.jsに委譲
    // registerController.js内でデータベースへの登録等の処理を行う
    require('./controllers/registerController')(req, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while registering the user.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
