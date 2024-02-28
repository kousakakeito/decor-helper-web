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

// エラーメッセージをクリアする関数
function clearErrorMessages() {
  const errorElements = document.getElementsByClassName('error-message');
  Array.from(errorElements).forEach(element => {
    element.innerText = '';
  });
}

// エラーメッセージを表示する関数1
function displayErrorMessage(field, message) {
  const errorElement = document.getElementById(`${field}-error`);
  errorElement.innerText = message;
}


// エラーメッセージを表示する関数2
function displayErrors(errors) {

  const passwordError = document.getElementById('password-error');

  // エラーメッセージをクリア
  passwordError.innerText = '';

  // サーバーからのエラーメッセージを表示
  if (errors && errors.errors && Array.isArray(errors.errors) && errors.errors.length > 0) {
    errors.errors.forEach((error) => {
      if (error.path === 'password') {
        passwordError.innerText = error.msg;
      } else if (error.path === 'passwordConfirm') {
        displayErrorMessage('password-confirm', error.msg);
        window.setTimeout(() => {
          document.querySelector("#password-confirm-error").innerText = "";
        }, 2000);
      }
    });
  }
}

document.querySelector('#loginForm').addEventListener("submit", async (e) => {
  e.preventDefault();

  // エラーメッセージをクリア
  clearErrorMessages();

  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;

  const data = {
    password: password,
    passwordConfirm: passwordConfirm,
  };

  try {
    const response = await fetch('/changePass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });




    if (!response.ok) {
      // レスポンスがエラーの場合、サーバーから返されたエラーメッセージを取得
      const errors = await response.json();
      // エラーメッセージを表示
      displayErrors(errors);
      
      return; // レスポンスがエラーの場合はここで処理を終了
    }

    // パスワード変更成功時の処理
    const result = await response.json();
    window.location.href = result.redirect;
  } catch (error) {
    console.error('Error:', error);
  }
});

