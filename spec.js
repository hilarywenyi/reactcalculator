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
const app = require('./server');

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