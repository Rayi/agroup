'use strict';

angular.module('agroupApp').directive('msglist', ['$http','socket',
function($http,socket) {
	
	
	
	return {
		templateUrl : 'app/message/msglist/msglist.html',
		restrict : 'EA',
		link : function(scope, element, attrs) {
			socket.joinGroup('group1',function(data){
				console.info(data);
			});
			$http.get('api/message/list').success(function(data,status){
				scope.datas = data.datas;
				scope.$apply();
			});
			scope.postText = '';
			scope.onPostMessage = function(){
				$http.post('api/message/post',{
					'message':scope.postText,
					'type':'plain'
				}).success(function(){
					
				});
			}
			
		}
	};
}]);
