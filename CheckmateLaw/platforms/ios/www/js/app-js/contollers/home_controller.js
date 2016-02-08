angular.module("app").controller('HomeController', function($scope, $location, $rootScope) {

    $rootScope.isHomepage = true;
    $rootScope.isResizeDiv = false;

    $scope.newReport = function()
    {
        $location.path('/newReport/');
    };

    $scope.savedReports = function()
    {
        $location.path('/report/saved/');
    };

    $scope.about = function(){
        $location.path('/about');
    };
    $scope.guidelines =  function(){
        $location.path('/guidelines');
    };
    $scope.test = function(){
        $location.path('/note');
    }
	
	console.log($location.path());
});
