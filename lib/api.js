var shell = require('shelljs');
var path = require('path');
var upload = require('./api/upload');
var util = require('./util');

var config = global.config;

var rootPath = path.resolve(path.normalize(config.docPath));

function pathIsValue(req, res) {
  return false;
}

function copy(req, res, next) {
  var src = req.query.src;
  var dest = req.query.dest;
  if (src && dest) {
    var srcLocal = path.resolve(rootPath, src);
    var destLocal = path.resolve(rootPath, dest);
    util.validatePath(srcLocal, res, function() {
      util.validatePath(destLocal, res, function() {
        //todo
      });
    });
  } else {
    res.status(401).json({
      'status': 'error',
      'message': 'must have "src" and "dest" in query'
    });
  }
  var srcLocal = path.join
  shell.cp('-rf', src, dest);
}

function move(src, dest) {
  shell.mv('-rf', src, dest);
}

function mkdir(pathName) {
  shell.mkdir('-p', pathName);
}

function allFiles(req, res) {
  res.json(shell.find('.'));
}

function find(req, res) {
  //TODO
}

function write(req, res) {

}

function ls(req, res) {
  var queryPath = req.query.path;
  if (queryPath) {
    var localPath = path.resolve(rootPath, queryPath);
    util.validatePath(localPath, res, function() {
      res.json(shell.ls(localPath));
    });
  } else {
    res.status(401).json({
      'status': 'error',
      'message': 'must have "path" in query'
    });
  }
}

module.exports = {
  upload: upload,
  ls: ls,
  cp: copy,
  mv: move,
  mkdir: mkdir
}