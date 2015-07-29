'use strict';

angular.module('grapptitude')
  .controller('GrappWallCtrl', function ($scope, $http, Auth, User) {
    $scope.users = User.query();
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.newGrapps = [];
      $http.get('/api/newGrapps').success(function(newGrapps) {
        $scope.newGrapps = newGrapps;
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

  });
