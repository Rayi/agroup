'use strict';

describe('Directive: plainitem', function () {

  // load the directive's module and view
  beforeEach(module('agroupApp'));
  beforeEach(module('app/message/plainitem/plainitem/plainitem.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<plainitem></plainitem>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the plainitem directive');
  }));
});