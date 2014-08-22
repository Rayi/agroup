var mime = require('mime');

module.exports = function(req, res) {
  res.set('Content-Type', mime.lookup(req._localPath));
  res.sendFile(req._localABSPath);
};