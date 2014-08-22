/**
 * query like 'picture.png?thumb=100x100'
 */
var gm = require('gm');
var path = require('path');
var shell = require('shelljs');
var fs = require('fs');
var util = require('./util');

var config = global.config;

console

var thumbRoot = path.join(config.cachePath, "thumbs");
// create thumbs directory
shell.mkdir('-p', thumbRoot);

module.exports = function(req, res, next) {
  if ('thumb' in req.query) {
    var thumbSize = req.query.thumb;
    if (thumbSize.match(/\d+x\d+/)) {
      var width = parseInt(thumbSize.split('x')[0]);
      var height = parseInt(thumbSize.split('x')[1]);
      // TODO：check extension
      var localPath = req._localPath;
      var thumbName = width + 'x' + height + encodeURIComponent(localPath);
      var thumbPath = path.resolve(path.join(thumbRoot, thumbName));
      util.validatePath(localPath, res, function() {
        fs.exists(thumbPath, function (exists) {
          if (exists) {
            res.sendFile(thumbPath);
          } else {
            gm(localPath).thumb(width, height, thumbPath, function(err) {
              if (err) {
                res.sendFile(localPath);
                console.error(err)
              } else {
                res.sendFile(thumbPath);
              }
            });
          }
        });
      });
    } else {
      res.status(401).json({
        'status': 'error',
        'message': 'invalid value, should be like "100x100"'
      })
    }
  } else {
    next();
  }

}