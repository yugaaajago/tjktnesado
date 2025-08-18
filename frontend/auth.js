// login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Login berhasil');
      location.href = 'index.html'; // atau dashboard
    } else alert(data.msg);
  });
}

// register
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Register berhasil, silakan login');
      location.href = 'login.html';
    } else alert(data.msg);
  });
}