const registerForm = document.getElementById('loginForm');
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // エラーメッセージをクリア
  clearErrorMessages();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value; // パスワード再確認の値を取得
  const email = document.getElementById('email').value;

  const data = {
    username: username,
    password: password,
    email: email,
    passwordConfirm: passwordConfirm // パスワード再確認の値をデータに追加
  };

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log(response); 

    if (!response.ok) {
      console.log(response.status);
      
      // レスポンスがエラーの場合、サーバーから返されたエラーメッセージを取得
      const errors = await response.json();
      if(errors.error2){

        const divReset = document.createElement('div');
        divReset.classList.add("balloon-reset");
        const pReset = document.createElement('p');
        pReset.append("このユーザーネームは既に使用されています。");
        divReset.append(pReset);
        document.querySelector('.balloon-resetText').append(divReset);
        window.setTimeout(() => {
          document.querySelector('.balloon-resetText').removeChild(divReset);
        }, 2000);

      }else if(errors.error3){

        const divReset = document.createElement('div');
        divReset.classList.add("balloon-reset2");
        const pReset = document.createElement('p');
        pReset.append("このメールアドレスは既に使用されています。");
        divReset.append(pReset);
        document.querySelector('.balloon-resetText2').append(divReset);
        window.setTimeout(() => {
          document.querySelector('.balloon-resetText2').removeChild(divReset);
        }, 2000);
      }
      console.log(errors); 

      // エラーメッセージを表示
      displayErrors(errors);


      return; // レスポンスがエラーの場合はここで処理を終了
    }

    console.log('User registered successfully!');
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
  } catch (error) {
    console.error('Error registering user:', error);
  }
});


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
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const emailError = document.getElementById('email-error');

  // エラーメッセージをクリア
  usernameError.innerText = '';
  passwordError.innerText = '';
  emailError.innerText = '';

  // サーバーからのエラーメッセージを表示
  if (errors && errors.errors && Array.isArray(errors.errors) && errors.errors.length > 0) {
    errors.errors.forEach((error) => {
      if (error.path === 'username') {
        usernameError.innerText = error.msg;
        window.setTimeout(() => {
          usernameError.innerText = "";
        }, 2000);
      } else if (error.path === 'password') {
        passwordError.innerText = error.msg;
        window.setTimeout(() => {
          passwordError.innerText = "";
        }, 2000);
      } else if (error.path === 'email') {
        emailError.innerText = error.msg;
        window.setTimeout(() => {
          emailError.innerText = "";
        }, 2000);
      } else if (error.path === 'passwordConfirm') {
        displayErrorMessage('password-confirm', error.msg);
        window.setTimeout(() => {
          document.querySelector("#password-confirm-error").innerText = "";
        }, 2000);
      }
    });
  }
}

document.querySelector('.user-login').addEventListener("click",function(){
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