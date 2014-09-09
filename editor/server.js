var cluster = require('cluster');
var http = require('http');
var app = require('./app');
var fileSync = require('./app/fileSync');

var count = require('os').cpus().length;

if(false && !process.env.NO_CLUSTER && cluster.isMaster) {
    for(var i = 0; i < count; i++) {
        cluster.fork();
    }
    cluster.on('exit', function(worker) {
        console.log('Worker died. Spawning a new process...');
        cluster.fork();
    });
}
else {
    // Listen on port 3000
    var port = process.env.PORT || 3000;
    var server = http.createServer(app);
    fileSync(server);

    server.listen(port, null, function() {
        console.log('Server started: http://localhost:' + port);
    });
}

