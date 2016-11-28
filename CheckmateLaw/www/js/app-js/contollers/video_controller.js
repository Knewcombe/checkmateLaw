angular.module('app').controller('VideoController', function ($rootScope, $scope, dataContext, $localStorage, $sessionStorage, $location, $interval, VideoService, FileSystemService) {

	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = true;
	$rootScope.optionsList = false;
	$scope.currentPath = $location.path();
	$localStorage.saveIndex = [];
	$scope.$storage = $localStorage;
	$scope.selectedSection = $sessionStorage.sectionIndex;
	$scope.selectedQuestion = $sessionStorage.questionIndex;
	$scope.itemArray = [];

	$('.loading').show();
	$('.content').hide();

	$scope.init = function () {
		console.log("INIT");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		setTimeout(function () {
			$('.loading').show();
			$('.content').hide();
			setTimeout(function () {
				$('.loading').hide();
				$('.content').show();
			}, 1000);
		}, 100);
	};

	if($location.path() === '/temp/video' || $location.path() === "/temp/video/select"){
		$scope.videoQuestion = $localStorage.tempInputs;
		$rootScope.footerBool = false;
	}else{
		$scope.videoQuestion = $rootScope.question;
		$scope.viewReport = ($localStorage.savedChecklist[$localStorage.savedIndex]);
		$rootScope.footerBool = true;
	}

	$scope.section = function(){
		$location.path("/sections");
	};

	$scope.question = function(){
		$location.path("/questions");
	};
	//Getting the root directory from the file system to the Documents.
	//This function is called when the window.fileSystem is resolved.
	function gotFS(fileSystem){
		console.log("Got File System");
		$scope.imagePath = fileSystem.root.toURL();
		console.log($scope.imagePath);
	}
	//File system is not called.
	function fail(){
		alert("An error occured in the application. Please kill and relaunch the app.");
	}

	//Used for header title.
	$scope.headerTitle = {
		text: '',
		word: /^\s*\w*\s*$/

	};
	//Date and time function that is called when a date formate is needed in the questions.
	$scope.dateAndTime = function(){
		var date = new Date();
		var dateAndTime = date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2)+"-"+("0" + date.getHours()).slice(-2)+"-"+("0" + date.getMinutes()).slice(-2)+"-"+("0" + date.getSeconds()).slice(-2);
		console.log("Date: "+dateAndTime);
		return dateAndTime;
	}

	$scope.video = function(){
		var newFileName;
		if($location.path() === '/temp/video'){
			newFileName = $scope.videoQuestion.output+"_"+$scope.dateAndTime();
			var videoPromise = VideoService.getVideo(newFileName, "Temp");
		}else{
			if($scope.videoQuestion.type === 'additionalQuestion'){
				newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output+"-"+($scope.videoQuestion.id + 1)+ "_"+$scope.dateAndTime()+"-"+($scope.videoQuestion.inputs[0].videos.length+1);
			}
			if($scope.videoQuestion.type === 'question'){
				newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+($scope.videoQuestion.id + 1)+ "_"+$scope.dateAndTime()+"-"+($scope.videoQuestion.inputs[0].videos.length+1);
			}
			var videoPromise = VideoService.getVideo(newFileName, "Video");
		}


		videoPromise.then(function(data){
			$scope.videoQuestion.inputs[0].videos.push(data);
			$scope.$apply();
		})
	}

	$scope.playVideo = function(video){
		console.log($scope.fileSystem+video)
		VideoService.playVideo(video);
	}

	$scope.deleteVideo = function (index) {
		//Calling the File service to remove the recording for the application file system.
		var filePromise = FileSystemService.removeFile($rootScope.root+$scope.videoQuestion.inputs[0].videos[index]);
		filePromise.then(function(){
			$scope.videoQuestion.inputs[0].videos.splice(index, 1);
			$scope.$apply();
		})
	};

	$scope.browse = function(){
		if($scope.videoQuestion.type === 'additionalQuestion'){
			$rootScope.fileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output+"-"+($scope.videoQuestion.id + 1);
			$rootScope.length = ($scope.videoQuestion.inputs[0].videos.length+1);
		}
		if($scope.videoQuestion.type === 'question'){
			$rootScope.fileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+($scope.videoQuestion.id + 1);
			$rootScope.length = ($scope.videoQuestion.inputs[0].videos.length+1);
		}
		$location.path("/temp/video/select");
		$rootScope.previousPath = $location.path();
		$rootScope.input = $scope.videoQuestion.inputs[0].videos;
	}
	//Adding the path of the item when radio button in selected.
	$scope.itemSelect = function(value, item){
		if(value){
			$scope.itemArray.push(item);
		}else{
			for(var i = 0; i < $scope.itemArray.length; i++){
				if($scope.itemArray[i] === item){
					$scope.itemArray.splice(i,1);
				}
			}
		}
	}

	$scope.selectionFinish = function(){
		if($scope.itemArray.length != 0){
			for(var i = 0; i <= ($scope.itemArray.length - 1); i++){
				var extension = $scope.itemArray[i].split(".").pop();
				var itemPromise = FileSystemService.moveFile($rootScope.root+$scope.itemArray[i], "Video", $scope.itemArray[i].replace("/Temp/Temporary_",$rootScope.fileName+"-").replace("."+extension, "")+"-"+$rootScope.length+"."+extension);
				for(var e = 0; e <= ($localStorage.tempInputs.inputs[0].videos.length -1); e++){
					if($localStorage.tempInputs.inputs[0].videos[e] == $scope.itemArray[i]){
						$localStorage.tempInputs.inputs[0].videos.splice(e,1);
					}else{
					}
				}
				itemPromise.then(function(data){
					$rootScope.input.push(data);
					$location.path("/report/videoList");
					window.plugins.toast.showWithOptions(
		    	{
		      	message: "Items have been moved successfully",
		      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
		      	position: "bottom",
		      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
		    	})
				})
			}
		}
	}

});
