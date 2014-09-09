'use strict';

var _ = require('lodash');
var fs = require('fs');
var Message = require('./message.model');
var observe = require('./message.observe');
exports.list = function(req, res) {
	return res.jsonp(JSON.parse(fs.readFileSync(__dirname+"/datas/list.json")));
};

exports.post = function(req,res){
	//todo:save mongodb
	
	//get mime info
	
	var type = req.body['type'];
	var message = req.body['message'];
	var user = {
		avartar:"http://tp4.sinaimg.cn/2129028663/180/5684393877/1",
		nickname:"张自萌"
	}
	
	observe.groupEmit("group1",{
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

