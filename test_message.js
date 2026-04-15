fetch('http://localhost:3000/api/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test', phone: '123', content: 'Test message' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
