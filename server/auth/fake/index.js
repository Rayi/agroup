// 测试用的帐号，每次登录随机选一个用户名

var contributors = require('../../../package.json').contributors;

module.exports = function(req, res, next) {
  var randomIndex = Math.floor(Math.random() * contributors.length);
  req.session.user = contributors[randomIndex];
  res.redirect('/');
}
