var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');

function upload(req, res) {
  console.log('start uploading');
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    console.log('Field [' + fieldname + ']: value: ' + val);
  });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('upload [' + fieldname + ']');
    var saveTo = path.join(config.docPath, path.basename(filename));
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function() {
    res.writeHead(200, { 'Connection': 'close' });
    res.end("ok");
  });
  req.pipe(busboy);
}

module.exports = upload;