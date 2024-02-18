const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;

  // サーバーにログイン情報を送信する
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        
        // ログイン成功時の処理（リダイレクト）
        window.location.href = '/App/home.html';

      } else {
        // ログイン失敗時の処理（例：エラーメッセージ表示）
        console.error('Login failed.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

document.querySelector('.pass-reset').addEventListener("click",function(){
  fetch('/pass-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    window.location.href = data.redirect;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})



document.querySelector('.user-register').addEventListener("click",function(){
  fetch('/user-register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    window.location.href = data.redirect;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})
