/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * Home Controller, this will only have path change functions
 *
 */
angular.module("app").controller('HomeController', function($scope, $location, $localStorage, $sessionStorage, $rootScope, FingerPrintAuth) {

    $rootScope.isHomepage = true;
    $rootScope.isResizeDiv = false;
		$rootScope.optionsList = false;
		$rootScope.fingerPrint = false;
		$rootScope.fingerAuth = false;

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        console.log("------------ DEVICE CALL ------------  " + device.platform);
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

    function gotFS(fileSystem) {
        $rootScope.fileSys = cordova.file.externalCacheDirectory;
        $rootScope.root = fileSystem.root.toURL();
        $rootScope.www = cordova.file.applicationDirectory;
        console.log("--------- GOT FILE SYSTEM ---------" + $rootScope.www);
    }

    function fail() {
        alert("An error occured in the application. Please close and relaunch the app.");
    }

    function checkCode(path) {
        if ($localStorage.userCode == undefined) {
						$sessionStorage.return = path
            $location.path('/enterCode');
        } else {
            if ($sessionStorage.userCode == undefined) {
							$sessionStorage.return = path;
						if($rootScope.platform == 'Android'){
							var fingerPromis = FingerPrintAuth.fingerPrintAndroid();
						}else if($rootScope.platform == 'iOS'){
							var fingerPromis = FingerPrintAuth.fingerPrintiOS();
						}
							fingerPromis.then(function(data){
								if(data == true){
									console.log(data);
									$sessionStorage.userCode = $localStorage.userCode;
									$location.path(path);
								}else{
									$sessionStorage.return = path;
	                $location.path('/securityCode');
								}
							});
            } else {
                $location.path(path);
            }
        }
    };

    $scope.newReport = function() {
        checkCode('/newReport/');
        //		$location.path('/newReport/');
    };

    $scope.savedReports = function() {
        checkCode('/report/saved/');
    };
    $scope.guidelines = function() {
        checkCode('/guidelines');
    };
    $scope.test = function() {
        checkCode('/note');
    }
    $scope.tempMedia = function() {
        checkCode('/temp');
    }
    $scope.settings = function() {
        checkCode('/settings')
    }
});
