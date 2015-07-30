define([], function () {
  'use strict';

  /**
   * @ngdoc function
   * @name myProxyApp.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the myProxyApp
   */
  angular.module('myProxyApp.controllers.HomeCtrl', [])
    .controller('HomeCtrl', ['$scope', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }]);
});
