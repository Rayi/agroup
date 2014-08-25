var socketIO = require('socket.io');
var ot = require('./ot');
var fs = require('fs');

var socketPool = {};

function addClient(socketIOServer, username, socket) {
  socketIOServer.addClient(socket);
  socketIOServer.setName(socket, username);
  socket.emit('logged_in', {});
}

function saveFile(socketIOServer) {
  if (socketIOServer) {
    var filePath = socketIOServer.docId;
    var content = socketIOServer.document;
    fs.writeFile(filePath, content, function (err) {
      if (err) throw err;
      console.log('save file : ', filePath);
    });
  }
}

function startSync(filePath, username, socket) {
  var socketIOServer;
  if (filePath in socketPool) {
    socketIOServer = socketPool[filePath];
    addClient(socketIOServer, username, socket);
  } else {
    fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
      if (err) throw err;

      socketIOServer = new ot.EditorSocketIOServer(data, [], filePath);
      socketPool[filePath] = socketIOServer;

      var version = 0;
      var saveTimer = setInterval(function() {
        var lastVersion = socketIOServer.operations.length;
        if (lastVersion != version) {
          saveFile(socketIOServer);
          version = lastVersion;
        }
      }, 10000);

      socketIOServer.on('empty-room', function() {
        console.log('empty room');
        clearInterval(saveTimer);
        saveFile(socketIOServer);
        delete socketPool[filePath];
      });
      
      addClient(socketIOServer, username, socket);
    });
  }
}

module.exports = function(server) {
  var io = socketIO.listen(server);

  io.sockets.on('connection', function (socket) {
    socket.on('editorSync', function (message) {
      startSync(message.path, message.username, socket);
    });
  });
}