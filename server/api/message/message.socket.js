/**
 * Broadcast updates to client when the model changes
 */'use strict';

var Message = require('./message.model');

var observe = require('./message.observe');

exports.register = function(socket) {
	
	socket.on('subscribe', function(groupId) {
		console.log('joining room:'+groupId);
		socket.join(groupId);
		observe.onGroupCallback(groupId,function(data){
			if(typeof data == "object"){
				data = JSON.stringify(data);
			}
			
			console.info("group "+groupId+" send:"+data);
			socket.to(groupId).emit('message', data);
		});
	});
	socket.on('unsubscribe', function(groupId) {
		console.log('leaving room', groupId);
		socket.leave(groupId);
	});
	
	Message.schema.post('save', function(doc) {
		onSave(socket, doc);
	});
	Message.schema.post('remove', function(doc) {
		onRemove(socket, doc);
	});
}
function onMessage(socket, data, cb) {

}

function onSave(socket, doc, cb) {
	socket.emit('message:save', doc);
}

function onRemove(socket, doc, cb) {
	socket.emit('message:remove', doc);
}