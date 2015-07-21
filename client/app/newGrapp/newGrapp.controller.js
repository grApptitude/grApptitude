'use strict';

angular.module('grapptitude')
  .controller('NewGrappCtrl', function ($scope, $http, Auth, User) {
    $scope.users = User.query();
  });
