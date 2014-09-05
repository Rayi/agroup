'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  avar: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);