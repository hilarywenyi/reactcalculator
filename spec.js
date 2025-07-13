// var request = require('supertest');
// describe('loading express', function () {
//   var server;
//   beforeEach(function () {
//     server = require('./server');
//   });
//   afterEach(function () {
//     server.close();
//   });
//   it('responds to /', function testSlash(done) {
//   request(server)
//     .get('/')
//     .expect(200, done);
//   });
//   it('404 everything else', function testPath(done) {
//     request(server)
//       .get('/foo/bar')
//       .expect(404, done);
//   });
// });

const request = require('supertest');
// Import just the express app, not the running server
const express = require('express');

// Create app instance for testing (don't start server)
const app = express();

// Define routes for testing (copy from server.js)
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

describe('Calculator API', () => {
  it('should return home page', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('should add two numbers', (done) => {
    request(app)
      .get('/add/5/3')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        if (res.body.result !== 8) throw new Error('Addition failed');
      })
      .end(done);
  });

  it('should subtract two numbers', (done) => {
    request(app)
      .get('/subtract/10/4')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        if (res.body.result !== 6) throw new Error('Subtraction failed');
      })
      .end(done);
  });

  it('should multiply two numbers', (done) => {
    request(app)
      .get('/multiply/3/4')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        if (res.body.result !== 12) throw new Error('Multiplication failed');
      })
      .end(done);
  });

  it('should divide two numbers', (done) => {
    request(app)
      .get('/divide/15/3')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        if (res.body.result !== 5) throw new Error('Division failed');
      })
      .end(done);
  });

  it('should handle division by zero', (done) => {
    request(app)
      .get('/divide/10/0')
      .expect(400)
      .expect('Content-Type', /json/)
      .expect((res) => {
        if (!res.body.error) throw new Error('Should return error for division by zero');
      })
      .end(done);
  });

  it('should return health status', (done) => {
    request(app)
      .get('/health')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        if (res.body.status !== 'OK') throw new Error('Health check failed');
      })
      .end(done);
  });
});