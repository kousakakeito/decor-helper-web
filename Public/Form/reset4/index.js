function rotateImage() {
  document.querySelector(".icon").classList.add('rotating'); // 回転クラスを追加

  setTimeout(function() {
    document.querySelector(".icon").classList.remove('rotating');
  }, 2000);

  setTimeout(rotateImage, 7000);
}

// 最初の回転を開始
rotateImage();


document.querySelector('.send-btn4').addEventListener("click",function(e){
  e.preventDefault();
  fetch('/user-login', {
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


