'use strict';

describe('Controller: GrappWallCtrl', function () {

  // load the controller's module
  beforeEach(module('grapptitude'));

  var GrappWallCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GrappWallCtrl = $controller('GrappWallCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
