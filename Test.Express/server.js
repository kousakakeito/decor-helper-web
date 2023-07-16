const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/Form/register/register.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/index.html'));
});

app.get('/reset.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/Form/reset/reset.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
