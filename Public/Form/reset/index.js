const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = event.target.email.value;

  // サーバーにメールアドレスを送信する
  fetch('/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      if (response.ok) {
        alert('パスワードリセットリンクを送信しました。');
      } else {
        console.error('パスワードリセットリンクの送信に失敗しました。');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
