'use strict';

angular.module('grapptitude')
  .controller('ProfileCtrl', function ($scope, Auth, User) {
    // $scope.message = 'Hello';
    $scope.users = User.query();
    $scope.getCurrentUser = Auth.getCurrentUser;

  });
