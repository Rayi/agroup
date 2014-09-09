//百度内部 UUAP 的登录

var unirest = require('unirest');

var CALLBACK = encodeURIComponent('http://agroup.baidu.com/auth/callback');

var UUAP_PROXY_URL = 'http://ext256.offline.bae.baidu.com/uuap-proxy/?url=' + CALLBACK;

function getUserName(ticket, callback) {
  var Request = unirest.get(UUAP_PROXY_URL);
  Request.followRedirect(false);
  Request.headers({
    'Cookie': 'PHPSESSID=' + ticket
  }).end(function(response) {
    var name = response.headers['x-uuap-user'];
    callback(name)
  });
}

module.exports = {
  login: function(req, res) {
    res.redirect(UUAP_PROXY_URL);
  },
  callback: function(req, res) {
    var ticket = req.param('ticket');

    getUserName(ticket, function(name) {
      if (name) {
        success = true;
        res.end(name);
      } else {
        //重试一次
        getUserName(ticket, function(name) {
          res.end(name);
        })
      }
    });
  }
}
