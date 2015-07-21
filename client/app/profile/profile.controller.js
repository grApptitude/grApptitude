'use strict';

angular.module('grapptitude')
  .controller('ProfileCtrl', function ($scope, Auth) {
    // $scope.message = 'Hello';

    $scope.getCurrentUser = Auth.getCurrentUser;

  });
