var contributors = require('../../package.json').contributors;

module.exports = function(req, res, next) {
  var randomIndex = Math.floor(Math.random() * contributors.length);
  req.session.user = contributors[randomIndex];
  res.redirect('/');
}
