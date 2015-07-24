'use strict';

angular.module('grapptitude')
  .config(function ($stateProvider) {
    $stateProvider
      .state('grappWall', {
        url: '/grappWall',
        templateUrl: 'app/grappWall/grappWall.html',
        controller: 'GrappWallCtrl'
      });
  });
