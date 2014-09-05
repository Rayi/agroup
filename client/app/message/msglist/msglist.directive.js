'use strict';

angular.module('agroupApp').directive('msglist', function() {
	return {
		templateUrl : 'app/message/msglist/msglist.html',
		restrict : 'EA',
		link : function(scope, element, attrs) {
			var datas = [];
			for(var i = 0;i<10;i++){
				datas.push({
					data:{
						avartar:"http://tp4.sinaimg.cn/2129028663/180/5684393877/1",
						nickname:"张自萌",
						time:"12:23PM",
						content:"擦擦擦啊擦擦擦擦擦"
					},
					type:"plain"
				});
			}
			scope.datas = datas;
			
		}
	};
}); 