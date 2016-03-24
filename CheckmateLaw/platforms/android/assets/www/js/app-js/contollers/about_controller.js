angular.module("app").controller('AboutController', function($scope, $rootScope) {
    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = false;

        $scope.versionNumber = "1.0";
        $scope.currentDate = new Date();
        $scope.copyright = "Copyright " + $scope.year + " Checkmate";
});