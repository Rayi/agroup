'use strict';

var _ = require('lodash');
var fs = require('fs');
var Message = require('./message.model');
var observe = require('./message.observe');
exports.list = function(req, res) {
	
	Message.find(function(err,messages){
		if (err)
			return console.error(err);
		var datas = [];
		messages.forEach(function(message){
			datas.push(message.getMessage());
		});
		return res.jsonp({err:0,data:datas});
	});
	
	
};

var user = {
	_id : "540ec253323a62a0179a215f",
	avartar : "http://tp4.sinaimg.cn/2129028663/180/5684393877/1",
	nickname : "张自萌"
}

exports.post = function(req, res) {
	//todo:save mongodb

	//get mime info

	var message = new Message({
		'content' : req.body['message'],
		'type' : req.body['type'],
		'user' : user._id
	});

	message.save(function(err, message) {
		if (err)
			return console.error(err);
		var data = message.getMessage();
		observe.groupEmit("group1", data);
		return res.jsonp({err:0,data:data});
	})

	

}

