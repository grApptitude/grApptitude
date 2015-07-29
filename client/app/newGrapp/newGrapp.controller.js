'use strict';

angular.module('grapptitude')
  .controller('NewGrappCtrl', function ($scope, $http, User, Auth) {
    $scope.users = User.query();
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.newGrapp = {};
    var $input = $('#photoCover');

      $scope.newGrapp = function() {
        if($scope.newGrapp === '') {
          return;
        }
        $http.post('/api/newGrapps', {
          authorId: $scope.getCurrentUser()._id,
          userName: $scope.getCurrentUser().name,
          user: $scope.getCurrentUser().username,
          userImg: $scope.getCurrentUser().img,
          grapp: $scope.newGrapp.grapp,
          timestamp: new Date(),
          attachUrl: $input.val()
          // tagedUser: $scope.newGrapp.tagedUser
        });
        $scope.newGrapp = '';
        $input.val('');
      };

  });
