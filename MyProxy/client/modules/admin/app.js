/*jshint unused: vars */
;
define(['base', 'modulePath/admin/controllers/home']/*deps*/, function (base, HomeCtrl)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name myProxyApp
   * @description
   * # myProxyApp
   *
   * Main module of the application.
   */
  return angular
    .module('admin', ['myProxyApp.controllers.HomeCtrl',
/*angJSDeps*/]);
});
