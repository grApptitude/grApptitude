'use strict';

angular.module('grApptitudeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newGrapp', {
        url: '/newGrapp',
        templateUrl: 'app/newGrapp/newGrapp.html',
        controller: 'NewGrappCtrl'
      });
  });