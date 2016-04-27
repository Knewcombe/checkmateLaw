
/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * Home Controller, this will only have path change functions
 *
 */
angular.module("app").controller('HomeController', function($scope, $location, $localStorage, $sessionStorage, $rootScope) {

	$rootScope.isHomepage = true;
	$rootScope.isResizeDiv = false;

	document.addEventListener('deviceready', onDeviceReady);

	function checkCode(path){
		if($localStorage.userCode == undefined){
			$sessionStorage.return = path;
			$location.path('/enterCode');
		}else{
			if($sessionStorage.userCode == undefined){
				$sessionStorage.return = path;
				$location.path('/securityCode');
			}else{
				$location.path(path);
			}
		}
	};

	$scope.newReport = function()
	{
		checkCode('/newReport/');
		//		$location.path('/newReport/');
	};

	$scope.savedReports = function()
	{
		checkCode('/report/saved/');
	};

	$scope.about = function(){
		checkCode('/about');
	};
	$scope.guidelines =  function(){
		checkCode('/guidelines');
	};
	$scope.test = function(){
		checkCode('/note');
	}
});
