document.querySelector('.cansel-btn').addEventListener("click",function(e){
  e.preventDefault();
  fetch('/resetCancel-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json()) // レスポンスをJSONとして解析
    .then((data) => {
      window.location.href = data.redirect; // サーバーからのリダイレクト先に移動
    })
    .catch((error) => {
      console.error('Error:', error);
    });
 
})


document.querySelector('#loginForm').addEventListener("submit", (e) =>{
  e.preventDefault();

  fetch('/get-user-confirmCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json()) // レスポンスをJSONとして解析
    .then((data) => {
      if(data.code === document.querySelector(".confirm-form").value){
      window.location.href = data.redirect; // サーバーからのリダイレクト先に移動
      }else if(data.error){
        const divReset = document.createElement('div');
        divReset.classList.add("balloon-reset2");
        const pReset = document.createElement('p');
        pReset.append("コード発行から5分が経過した為、要求は無効となります。前の手順に戻って再度新しいコードをリクエストしてください。"); 
        divReset.append(pReset);
        document.querySelector('.balloon-resetText').append(divReset);
        window.setTimeout(() => {
          document.querySelector('.balloon-resetText').removeChild(divReset);
        }, 8000);
      }else{
        const divReset = document.createElement('div');
        divReset.classList.add("balloon-reset");
        const pReset = document.createElement('p');
        pReset.append("コードが一致しません"); // サーバーからのエラーメッセージを表示
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