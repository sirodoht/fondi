/**
 * @fileOverview Home page tests
 */
var chai = require('chai');
var expect = chai.expect;
var req = require('request');

describe('Homepage', function () {
  it('should get a 200 on the home page', function (done) {
    req.get('http://localhost:3000/', function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
