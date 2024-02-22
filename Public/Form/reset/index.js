const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = event.target.email.value;

  console.log(email)
  // サーバーにメールアドレスを送信する
  fetch('/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.redirect) {
      window.location.href = data.redirect;
    } else if (data.error) {
      // エラーメッセージがある場合、それを表示
      console.log("not");
      const divReset = document.createElement('div');
      divReset.classList.add("balloon-reset");
      const pReset = document.createElement('p');
      pReset.append("アカウントが見つかりません"); // サーバーからのエラーメッセージを表示
      divReset.append(pReset);
      document.querySelector('.balloon-resetText').append(divReset);
      window.setTimeout(() => {
        document.querySelector('.balloon-resetText').removeChild(divReset);
      }, 2000);
    }
  })
    .catch((error) => {
      console.error('Error:', error);
    });
});


document.querySelector('.user-register2').addEventListener("click",function(){
  fetch('/user-register2', {
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