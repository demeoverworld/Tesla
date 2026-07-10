const fetch = global.fetch;
(async () => {
  const url = 'http://localhost:3000/api/auth/signin/credentials';
  const body = new URLSearchParams({ email: 'test@example.com', password: 'password' });
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  console.log('status', res.status);
  console.log('content-type', res.headers.get('content-type'));
  const text = await res.text();
  console.log(text.slice(0, 1200));
})();
