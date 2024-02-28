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
        document.querySelector('.error-form').append("※アカウントが見つかりません※");
        window.setTimeout(() => {
          document.querySelector('.error-form').textContent = "";
        }, 2000);
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


function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

document.querySelector(".mobil-errorform").style.display = "none";

window.addEventListener("load",function(){
  if (isMobile()) {
    document.querySelector(".mobil-errorform").style.display = "block";
  }
});

document.querySelector(".cancel").addEventListener("click",function(){
  document.querySelector(".mobil-errorform").style.display = "none"
});
