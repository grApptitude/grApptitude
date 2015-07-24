'use strict';

angular.module('grapptitude')
  .controller('ProfileCtrl', function ($scope, Auth, User) {
    $scope.users = User.query(Auth.getCurrentUser()._id);
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          // Limpiar imputs
          $scope.user.oldPassword = $pristine;
          $scope.user.newPassword = $pristine;
          $scope.message = 'Password successfully changed.';

        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

  });
