
module.exports = function(req, res, next) {
  res.render('viewer', {
    fileName: fileName + '?raw=true'
  });
}