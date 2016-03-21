angular.module("app", ["ngResource", "ngRoute", "ngStorage"]).run(function($rootScope, $location) {
	$rootScope.home = function(){
		$location.path('/');
	};
});
