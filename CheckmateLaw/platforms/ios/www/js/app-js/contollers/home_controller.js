
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

	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		console.log("------------ DEVICE CALL ------------  "+device.platform);
		$rootScope.platform = device.platform;
		console.log('BuildInfo.packageName    =' + BuildInfo.packageName);
		console.log('BuildInfo.basePackageName=' + BuildInfo.basePackageName);
		console.log('BuildInfo.displayName    =' + BuildInfo.displayName);
		console.log('BuildInfo.name           =' + BuildInfo.name);
		console.log('BuildInfo.version        =' + BuildInfo.version);
		console.log('BuildInfo.versionCode    =' + BuildInfo.versionCode);
		console.log('BuildInfo.debug          =' + BuildInfo.debug);
		console.log('BuildInfo.buildType      =' + BuildInfo.buildType);
		console.log('BuildInfo.flavor         =' + BuildInfo.flavor);
	}

	function gotFS(fileSystem){
		$rootScope.fileSys = cordova.file.externalCacheDirectory; 
		$rootScope.root = fileSystem.root.toURL();
		//		console.log("--------- GOT FILE SYSTEM ---------" + $scope.fileSystem);
	}

	function fail(){
		alert("An error occured in the application. Please close and relaunch the app.");
	}

	//	document.addEventListener('deviceready', onDeviceReady);

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
	$scope.tempMedia = function(){
		checkCode('/temp');
	}
});
