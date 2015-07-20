'use strict';

angular.module('grApptitude')
  .controller('ProfileCtrl', function ($scope, Auth) {
    // $scope.message = 'Hello';

    $scope.getCurrentUser = Auth.getCurrentUser;

  });
