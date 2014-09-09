'use strict';

var express = require('express');

var router = express.Router();

router.get('/me', function(req, res) {
  if ('session' in req && 'user' in req.session) {
    res.json(req.session.user);
  } else {
    res.json({});
  }
});

router.get('/:id/avatar', function(req, res) {
  //TODO
});

module.exports = router;
