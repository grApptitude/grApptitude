'use strict';

describe('Controller: NewGrappCtrl', function () {

  // load the controller's module
  beforeEach(module('grApptitude'));

  var NewGrappCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewGrappCtrl = $controller('NewGrappCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
