// var express = require('express');
// var app = express();
// app.get('/', function (req, res) {
//   res.status(200).send('ok');
// });
// var server = app.listen(3000, function () {
//   var port = server.address().port;
//   console.log('Example app listening at port %s', port);
// });
// module.exports = server;

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Simple calculator routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Simple Calculator API</h1>
    <p>Available endpoints:</p>
    <ul>
      <li>GET /add/:a/:b - Add two numbers</li>
      <li>GET /subtract/:a/:b - Subtract two numbers</li>
      <li>GET /multiply/:a/:b - Multiply two numbers</li>
      <li>GET /divide/:a/:b - Divide two numbers</li>
    </ul>
    <p>Example: <a href="/add/5/3">/add/5/3</a></p>
  `);
});

app.get('/add/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const result = a + b;
  res.json({ operation: 'add', a, b, result });
});

app.get('/subtract/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const result = a - b;
  res.json({ operation: 'subtract', a, b, result });
});

app.get('/multiply/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const result = a * b;
  res.json({ operation: 'multiply', a, b, result });
});

app.get('/divide/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  if (b === 0) {
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }
  const result = a / b;
  res.json({ operation: 'divide', a, b, result });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Calculator app listening at http://localhost:${port}`);
});

module.exports = app;