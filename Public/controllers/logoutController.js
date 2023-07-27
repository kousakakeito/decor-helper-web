const express = require('express');
const router = express.Router();

// ログアウト処理
router.post('/logout', (req, res) => {
  // クッキーを削除してログアウト
  res.clearCookie('username');
  res.status(200).send('Logout successful');
});

module.exports = router;
