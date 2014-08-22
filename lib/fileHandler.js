var path = require('path');
var markdown = require('./filetype/markdown');
var pdf = require('./filetype/pdf');

function fileHandler(config, req, res, next) {
  var pathName = req._parsedUrl.pathname;
  var extension = pathName.split('.').pop();
  extension = extension.toLowerCase();
  var localPath = path.join(config.docPath, pathName)
  
  switch (extension) {
    case 'md':
    case 'markdown':
      markdown(localPath, req, res, next);
      break;
    case 'pdf':
      pdf(localPath, req, res, next);
      break;
    default:
      next();
  }
}

module.exports = fileHandler;