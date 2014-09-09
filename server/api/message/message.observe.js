function Group(id){
	
	var _callback;
	
	this.onCallback = function(callback){
		_callback = callback;
	}
	this.emit = function(data){
		console.info(_callback);
		_callback && _callback(data);
	}
	
}

var groupObj = {};

module.exports = {
	onGroupCallback:function(id,callback){
		if(!(id in groupObj)){
			groupObj[id] = new Group(id);
		}
		groupObj[id].onCallback(callback);
	},
	groupEmit:function(id,data){
		if(!(id in groupObj)){
			groupObj[id] = new Group(id);
		}
		groupObj[id].emit(data);
	}
}
