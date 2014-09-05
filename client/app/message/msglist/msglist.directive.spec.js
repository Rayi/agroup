'use strict';

describe('Directive: msglist', function() {

	// load the directive's module and view
	beforeEach(module('agroupApp'));
	beforeEach(module('app/msglist/msglist.html'));

	var element, scope;

	beforeEach(inject(function($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should make hidden element visible', inject(function($compile) {
		element = angular.element('<msglist></msglist>');
		element = $compile(element)(scope);
		scope.$apply();
		expect(element.text()).toBe('this is the msglist directive');
	}));
}); 