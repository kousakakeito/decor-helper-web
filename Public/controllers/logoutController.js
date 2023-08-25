const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  // セッションを破棄してログアウト
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('An error occurred during logout.');
    } else {
      res.status(200).send('Logout successful');
    }
  });
});

module.exports = router;
