var request = require('supertest');
// Sample test to see if jest works
describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})
//Server test
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../src/server/index.js');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
