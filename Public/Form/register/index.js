const registerForm = document.getElementById('loginForm');
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const data = {
    username: username,
    password: password,
    email: email
  };

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('User registered successfully!');
      window.location.href = '/App/home.html';
    } else {
      console.error('Error registering user:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error registering user:', error);
  });
});
