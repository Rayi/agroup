var updateNotifier = require('update-notifier');
var pkg = require('./package.json');

updateNotifier({packageName: pkg.name, packageVersion: pkg.version}).notify();

var config      = require('./config.json');
// 方便其它模块获取 docPath 等全局信息
global.config   = config;

var http        = require('http');
var sockjs      = require('sockjs');
var path        = require('path');
var fs          = require('fs');
var express     = require('express');
var moment      = require('moment');
var serveIndex  = require('serve-index');
var bodyParser  = require('body-parser');
var session     = require('cookie-session');
var logger      = require('morgan');
var favicon     = require('serve-favicon');
var swig        = require('swig');

var fileHandler = require('./lib/fileHandler');
var editorSync  = require('./lib/editorSync');
var sendFile    = require('./lib/sendFile');
var api         = require('./lib/api');
var thumb       = require('./lib/thumb');
var localPath   = require('./lib/localPath');


var app = express();

app.disable('x-powered-by');

app.use(session({
  keys: ['ts', 'sop', 'searchfe']
}));

//var debug = require('debug')('http');

app.use(favicon(__dirname + '/public/favicon.ico'));

var errorhandler = require('errorhandler');
app.use(errorhandler());

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
app.use(logger());

app.use('/.public/', express.static('public'));
app.use('/.public/', serveIndex('public', {'icons': true}));

app.use(localPath);

app.use('/.playground/', function(req, res) {
  res.render('playground');
});

app.post('/.api/upload', api.upload);
app.get('/.api/ls', api.ls);
app.get('/.api/cp', api.cp);
app.get('/.api/mv', api.mv);
app.get('/.api/mkdir', api.mkdir);

app.use(thumb);

// 获取原始文件方法
app.use(function(req, res, next) {
  if ('raw' in req.query) {
    sendFile(req, res);
  } else {
    next();
  }
});

// 针对特定文件的处理
app.use(function(req, res, next) {
  fileHandler(config, req, res, next);
});

app.get('/', function(req, res) {
  res.end();
});

// 默认当成静态文件请求
app.use(function(req, res, next) {
  sendFile(req, res);
});

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.disable('view cache');
  swig.setDefaults({ cache: false });
  console.log('in development mode');
}

var server = http.createServer(app)

editorSync(server);

server.listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});