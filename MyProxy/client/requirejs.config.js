/*jshint unused: vars */
require.config({
    paths: {
        'modulePath': 'client/modules',
        'base': 'client/base/app',
        'nhanlib':'public/js/nhan.lib.min'
    }
    //shim: {
    //    'modulePath/admin/app': ['nhanlib']
    //},
    //deps: ['public/js/nhan.lib.min'],
    //priority: [
    //  'nhanlib'
    //]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require(['modulePath/admin/app'], function (app) {
    'use strict';
    /* jshint ignore:start */
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    /* jshint ignore:end */
    angular.element().ready(function () {
        angular.resumeBootstrap([app.name]);
    });
});
