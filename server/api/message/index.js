'use strict';

var express = require('express');
var controller = require('./message.controller');

var router = express.Router();
router.get("/list",controller.list);
router.get('/', controller.list);
router.post("/post",controller.post);


module.exports = router;