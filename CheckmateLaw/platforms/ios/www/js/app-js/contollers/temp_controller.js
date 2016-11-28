angular.module('app').controller('TempMediaController', function ($scope, $localStorage, $location, $interval, $rootScope, $sessionStorage) {

	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = true;
	$rootScope.optionsList = false;
	$scope.currentPath = $location.path();
	$localStorage.saveIndex = [];
	$scope.$storage = $localStorage;
	//	$scope.viewReport = ($localStorage.savedChecklist[$localStorage.savedIndex]);
	$scope.selectedSection = $sessionStorage.sectionIndex;
	$scope.selectedQuestion = $sessionStorage.questionIndex;

	// $('.loading').show();
	// $('.content').hide();

	$scope.tempAudio = function(){
		console.log("Called");
		$location.path("/temp/audio");
	}

	$scope.tempImage = function(){
		console.log("Called");
		$location.path("/temp/image");
	}

	$scope.tempVideo = function(){
		console.log("Called");
		$location.path("/temp/video");
	}

	$scope.init = function () {
		console.log("INIT");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	};

	function gotFS(fileSystem){
		$scope.fileSystem = fileSystem.root.toURL();
		//Setting up the Temporary JSON formate into localstorage.
		if($localStorage.tempInputs === undefined){
			$localStorage.tempInputs = {
				"output": "Temporary",
				"inputs": [
					{
						"photos": [],
						"recording": [],
						"videos":[]
					}
				]
			}
			console.log("Called");
			console.log($localStorage.tempInputs);
		}
	};
	//File system is not called.
	function fail(){
		alert("An error occured in the application. Please kill and relaunch the app.");
	}

});
