var request = require('supertest');
var express = require('express');
var should = require('should');

global.config = {
  docPath: 'test/doc'
}
var api = require('../lib/api');

var app = express();

app.post('/.api/upload', api.upload);
app.get('/.api/ls', api.ls);
app.get('/.api/cp', api.cp);
app.get('/.api/mv', api.mv);
app.get('/.api/mkdir', api.mkdir);


describe('api', function(){
  describe('.ls', function(){
    it('normal', function(done){
      request(app)
        .get('/.api/ls?path=ls')
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          res.body.should.eql(['nwind']);
          done();
        });
    });
    it('miss query', function(done){
      request(app)
        .get('/.api/ls')
        .expect(401)
        .end(function(err, res){
          if (err) throw err;
          res.body.should.containEql({'status': 'error'});
          done();
        });
    });
    it('out of root path', function(done) {
      request(app)
        .get('/.api/ls?path=../..')
        .expect(404)
        .end(function(err, res){
          if (err) throw err;
          res.body.should.containEql({'status': 'error'});
          done();
        });
    })
  })
})