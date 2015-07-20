'use strict';

angular.module('grApptitude')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newGrapp', {
        url: '/newGrapp',
        templateUrl: 'app/newGrapp/newGrapp.html',
        controller: 'NewGrappCtrl'
      });
  });
