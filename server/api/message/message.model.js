'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ago = require('../../components/dateformate/ago');
    
    
var User = new Schema({
	avartar:String,
	nickname:String
});

var User = mongoose.model('User', User);



var MessageSchema = new Schema({
	  content: String,
	  filepath: String,
	  type:String,
	  date: {type: Date, default: Date.now },
	  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

MessageSchema.methods.getMessage = function(){
	var res;
	switch(this.type){
		case 'plain':
		res = this.getPlain();
		break;
	}
	return res;
}

MessageSchema.methods.getPlain = function(){
	return {
		data:{
			id:this._id,
			avartar:'http://tp4.sinaimg.cn/2129028663/180/5684393877/1',
			nickname:'张自萌',
			time:ago(this.date),
			content:this.content
		},
		'type':'plain'
		
	}
}

module.exports = mongoose.model('Message', MessageSchema);