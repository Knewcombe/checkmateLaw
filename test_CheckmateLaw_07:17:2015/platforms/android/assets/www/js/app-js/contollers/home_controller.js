angular.module("app").controller('HomeController', function($scope, $location, $rootScope) {

    $rootScope.isHomepage = true;

    $scope.newReport = function()
    {
        $location.path('/report/new/');
    };

    $scope.savedReports = function()
    {
        $location.path('/report/saved/');
    };

    $scope.about = function(){
        $location.path('/about');
    };
    
    $scope.test = function(){
        $location.path('/test');
    };
});
