var path = require('path');

var docPath = global.config.docPath;

module.exports = function(req, res, next) {
  var filePath = req._parsedUrl.pathname;
  req._localPath = path.join(docPath, decodeURIComponent(filePath));
  req._localABSPath = path.resolve(req._localPath);
  next();
}
