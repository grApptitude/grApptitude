'use strict';

angular.module('grapptitude')
  .controller('NewGrappCtrl', function ($scope, $http, Auth, User) {
    $scope.users = User.query();
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.newGrapp = {};

      $scope.newGrapp = function(form) {
        if($scope.newGrapp === '') {
          return;
        }
        $http.post('/api/newGrapps', {
          author_Id: Auth.getCurrentUser._id,
          grapp: $scope.newGrapp.grapp,
          timestamp: new Date(),
          attachUrl: $input.val()
          // tagedUser: $scope.newGrapp.tagedUser
        });
        $scope.newGrapp = '';
      };

  });
