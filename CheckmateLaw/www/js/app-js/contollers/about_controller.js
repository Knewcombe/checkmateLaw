/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * About controller to display all legal information.
 *
 */
angular.module("app").controller('AboutController', function($scope, $rootScope) {
    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = false;

        $scope.versionNumber = "1.0";
        $scope.currentDate = new Date();
        $scope.copyright = "Copyright " + $scope.year + " Checkmate";
});