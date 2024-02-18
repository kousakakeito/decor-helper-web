
document.querySelector('.cansel-btn').addEventListener("click",function(){
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

document.querySelector('.user-register3').addEventListener("click",function(){
  fetch('/user-register3', {
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