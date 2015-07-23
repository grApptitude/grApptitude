'use strict';

angular.module('grapptitude')
  .controller('NewGrappCtrl', function ($scope, $http, Auth, User) {
    $scope.users = User.query();

    $scope.newGrapp = {};

      $scope.newGrapp = function() {
        if($scope.newGrapp === '') {
          return;
        }
        $http.post('/api/newGrapps', {
          author_Id: $scope.getCurrentUser()._id,
          grapp: $scope.newGrapp.grapp,
          timestamp: date.getDate(),
          attachUrl: $scope.newGrapp.attachUrl,
          tagedUser: $scope.newGrapp.tagedUser
        });
        $scope.newGrapp = '';
      };

  });
