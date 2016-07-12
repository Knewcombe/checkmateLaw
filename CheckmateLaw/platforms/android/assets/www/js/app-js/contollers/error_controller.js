/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * Error Controller that will handel any menus that is not avalible.
 *
 */
angular.module("app").controller('ErrorController', function($rootScope) {
    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = false;
});