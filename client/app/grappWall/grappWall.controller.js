'use strict';

angular.module('grapptitude')
  .controller('GrappWallCtrl', function ($scope, $http, Auth, User) {
    $scope.users = User.query();
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.newGrapps = [];
      $http.get('/api/newGrapps').success(function(newGrapps) {
        $scope.newGrapps = newGrapps;

        console.log(newGrapps);
        // var users = [];

        // User.find({ id: user._id });
        // angular.forEach($scope.users, function(u, i) {
        //   if (u === user) {
        //     $scope.users.splice(i, 1);


        // angular.forEach(newGrapps, function(author_Id) {

        //   $http.get('/api/users/:id'+author_Id).success(function(users) {
        //     console.log(users);
        // })

        // })
      // });
      });

      // Show more grapps on the screen"
      var limitStep = 2;
      $scope.limit = limitStep;
      $scope.incrementLimit = function() {
          $scope.limit += limitStep;
      };


      var limitTextGrapp = 19;
      var showTextGrapp = true;

      $scope.limitTextGrapp = limitTextGrapp;
      $scope.showTextGrapp = showTextGrapp;

      // console.log($scope.newGrapps.grapp);

      $scope.prueba = function(valor) {
        if (limitTextGrapp <= valor.length) {
          console.log('nojoda');
          $scope.showTextGrapp = false;
        }
      };


      $scope.showMoreText = function(grappText) {
        // console.log(grappText.length);
        if (grappText.length > limitTextGrapp) {
          // console.log('SI');
          $scope.showTextGrapp = false;
          $scope.limitTextGrapp = grappText.length;
        }
      };





  });
