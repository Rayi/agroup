'use strict';

var express = require('express');
var config = require('../config/environment');
var fake = require('./fake');
var uuap = require('./uuap');

var router = express.Router();

if (config.auth === 'fake') {
  router.use('/login', fake);
}

if (config.auth === 'uuap') {
  router.use('/login', uuap.login);
  router.use('/callback', uuap.callback);
}

router.use('/logout', function(req, res, next) {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
