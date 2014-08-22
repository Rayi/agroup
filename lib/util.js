var path = require('path');

var config = global.config;

var rootPath = path.resolve(path.normalize(config.docPath));

function isSubPathOfRoot(localPath) {
  return localPath.indexOf(rootPath) == 0;
}

function validatePath(localPath, res, callback) {
  if (isSubPathOfRoot(path.resolve(localPath))) {
    callback();
  } else {
    res.status(404).json({
      'status': 'error',
      'message': 'should be sub directory of ROOT'
    });
  }
}

module.exports = {
  validatePath: validatePath
}