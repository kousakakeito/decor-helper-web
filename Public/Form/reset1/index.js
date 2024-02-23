
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

function saltEmailParts(email) {

  const atIndex = email.indexOf('@');
  const localPart = email.substring(0, atIndex);
  const domain = email.substring(atIndex + 1);
  
  const lastDotIndex = domain.lastIndexOf('.');
  
  const saltedLocalPart = localPart.substring(0, 2) + "*".repeat(localPart.length - 2);
  
  const domainFirstPart = domain.substring(0, lastDotIndex);
  const saltedDomainFirstPart = domainFirstPart.substring(0, 1) + "*".repeat(domainFirstPart.length - 1);
  
  const domainLastPart = domain.substring(lastDotIndex + 1);
  const saltedDomainLastPart = "*".repeat(domainLastPart.length);
  
  return `${saltedLocalPart}@${saltedDomainFirstPart}.${saltedDomainLastPart}`;
}

let email;

fetch('/get-user-email')
  .then(response => response.json())
  .then(data => {
    email = data.email;
    document.querySelector('.get-mail').append(saltEmailParts(data.email));
  })
  .catch(error => console.error('Error fetching user email:', error));

  document.querySelector('#loginForm').addEventListener("submit", (e) =>{
    e.preventDefault();
    document.querySelector(".submitButton").disabled = true;
    const loader = document.createElement('div');
    loader.classList.add("loader"); 
    document.querySelector('.form-outer').append(loader);
    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }), 
    })
    .then((response) => response.json()) 
    .then((data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      } else if (data.error) {
        console.log(data.error)
        window.alert("メールの送信に失敗しました")
      }
      document.querySelector(".submitButton").disabled = false;
      document.querySelector('.form-outer').removeChild(loader);
      })
      .catch((error) => {
        console.error('Error:', error);
        document.querySelector(".submitButton").disabled = false;
        document.querySelector('.form-outer').removeChild(loader);
      });
  });

  