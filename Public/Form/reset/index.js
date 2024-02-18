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
    .then((response) => {
      if (response.ok) {
        console.log("ok")
        window.location.href = '/Form/reset1/reset1.html';
      } else {

        const divReset = document.createElement('div');
        divReset.classList.add("balloon-reset");
        const pReset = document.createElement('p');
        pReset.append("アカウントが見つかりません");
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