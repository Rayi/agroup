'use strict';

var _ = require('lodash');
var fs = require('fs');
var Message = require('./message.model');

exports.list = function(req, res) {
	return res.jsonp(JSON.parse(fs.readFileSync(__dirname+"/datas/list.json")));
};

exports.post = function(req,res){
	//todo:save mongodb
	
	//get mime info
	var type = req.params['type'];
	var message = req.params['message'];
	var user = {
		avartar:"http://tp4.sinaimg.cn/2129028663/180/5684393877/1",
		nickname:"张自萌"
	}
	
	console.info({
		"type":type,
		"content":message,
		"avartar":user.avartar,
		"nickname":user.nickname
	})
	
	return res.jsonp({
		err:0,
		message:"成功发送消息"
	})
	
	
}

