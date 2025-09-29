
const btn = document.getElementById('btnLogin');
btn.addEventListener('click', async () => {
  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ login, senha })
  });
  if(res.ok){
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    if(data.user.role === 'ADMIN') window.location = 'admin.html';
    else window.location = 'form.html';
  } else alert('Login inválido');
});
