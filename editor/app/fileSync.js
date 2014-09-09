var socketIO = require('socket.io');
var fs = require('fs');
var path = require('path');

var servicePool = {};

function SyncService(content, path, io) {
    this.content = content;
    this.users = [];
    this.clientNum = 0;
    this.path = path;
    this.io = io;
}

SyncService.prototype.addClient = function(username, socket) {
    socket.join(this.path);
    this.users.push(username);
    var self = this;
    this.clientNum += 1;
    socket.on('disconnect', function() {
        self.clientNum -= 1;
        if (self.clientNum == 0) {
            console.log('all client leave')
            delete servicePool[self.path];
            delete self;
        }
    });
    socket.on('patch', function(message) {
        console.log('received patch: ', message);
        self.onPatch(socket, message);
    });
};

SyncService.prototype.onPatch = function(socket, message) {
    var patch = message.patch;
    this.sendMessage(socket, 'server:patch', message);
}

SyncService.prototype.sendMessage = function(socket, messageName, message) {
    socket.broadcast['in'](this.path).emit(messageName, message);
};

function startSync(filePath, username, socket) {
    var syncService;
    if (filePath in servicePool) {
        syncService = servicePool[filePath];
        syncService.addClient(username, socket);
    } else {
        fs.readFile(filePath, {
            encoding: 'utf-8'
        }, function(err, content) {
            if (err) throw err;
            syncService = new SyncService(content, filePath);
            servicePool[filePath] = syncService;
            syncService.addClient(username, socket);
        });
    }
}


module.exports = function(server) {
    var io = socketIO.listen(server);
    var serverIO = io.of('/file-sync');
    serverIO.on('connection', function(socket) {
        socket.on('login', function(message) {
            var filepath = path.join(__dirname,'../public/',message.path);
            //console.log(filepath);
            startSync(filepath, message.username, socket);
        });
    });
};
