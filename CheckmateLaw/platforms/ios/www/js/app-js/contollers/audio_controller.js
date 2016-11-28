angular.module('app').controller('AudioController', function ($rootScope, $scope, dataContext, $localStorage, $sessionStorage, $location, $interval, MediaService, FileSystemService) {

	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = true;
	$rootScope.optionsList = false;
	$scope.currentPath = $location.path();
	$localStorage.saveIndex = [];
	$scope.$storage = $localStorage;
	$scope.itemArray = [];
	$scope.selectedSection = $sessionStorage.sectionIndex;
	$scope.selectedQuestion = $sessionStorage.questionIndex;

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
	}

	if($location.path() === '/temp/audio' || $location.path() === "/temp/audio/select"){
		console.log("PATH: "+$rootScope.previousPath);
		$scope.mediaQuestion = $localStorage.tempInputs;
		$rootScope.footerBool = false;
	}else{
		$scope.mediaQuestion = $rootScope.question;
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
	};
	//File system is not called.
	function fail(){
		alert("An error occured in the application. Please kill and relaunch the app.");
	};

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

	$scope.startRecording = function () {

		var newFileName;

		console.log("----Android----");
		if($location.path() === '/temp/audio'){
			newFileName = $scope.mediaQuestion.output+"_"+$scope.dateAndTime()+"-"+($scope.mediaQuestion.inputs[0].recording.length+1)+".m4a";
			var mediaPromise = MediaService.media(newFileName, "Temp");
		}else{
			if($scope.mediaQuestion.type === 'additionalQuestion'){
				newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output+"-"+($scope.mediaQuestion.id + 1)+ "_"+$scope.dateAndTime()+"-"+($scope.mediaQuestion.inputs[0].recording.length+1);
			}
			if($scope.mediaQuestion.type === 'question'){
				newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+($scope.mediaQuestion.id + 1)+ "_"+$scope.dateAndTime()+"-"+($scope.mediaQuestion.inputs[0].recording.length+1);
			}
			var mediaPromise = MediaService.media(newFileName, "Media");
		}
		mediaPromise.then(function(data){
			console.log("Promis called");
			$scope.mediaQuestion.inputs[0].recording.push(data);
		});
		if($rootScope.platform != "Android"){
			//Timer to indicate the amount of time the recording is.
			$scope.timer = 0;
			$scope.promise = $interval(function () {
				$scope.timer = $scope.timer + 1;
			}, 1000);
		}
	}

	//--------THIS IOS ONLY TO ALLOW TO RECORD WITH COMPRESSION------
	//Stop recording will call the media service to stop the recording and set the name of the file.
	$scope.stopRecording = function () {
		var newFileName;
		$interval.cancel($scope.promise);
		$scope.timer = 0;
		clearInterval($scope.recInterval);
		if($location.path() === '/temp/audio'){
			newFileName = $scope.mediaQuestion.output+"_"+$scope.dateAndTime()+"-"+($scope.mediaQuestion.inputs[0].recording.length+1)+".m4a";
			var mediaPromise = MediaService.stopMedia(newFileName, "Temp");
		}else{
			if($scope.mediaQuestion.type === 'additionalQuestion'){
				newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output+"-"+($scope.mediaQuestion.id + 1)+ "_"+$scope.dateAndTime()+"-"+($scope.mediaQuestion.inputs[0].recording.length+1)+".m4a";
			}
			if($scope.mediaQuestion.type === 'question'){
				newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+($scope.mediaQuestion.id + 1)+ "_"+$scope.dateAndTime()+"-"+($scope.mediaQuestion.inputs[0].recording.length+1)+".m4a";
			}
			console.log("New File name: "+ newFileName);
			var mediaPromise = MediaService.stopMedia(newFileName, "Media");
		}
		mediaPromise.then( function(data){
			$scope.mediaQuestion.inputs[0].recording.push(data);
		});
	};
	//Playing recording will pass the recording path to the Media Service.
	$scope.playRecording = function (memo) {

		$scope.currentMemo = memo;

		//Function is a callback from the Media service.
		//This will get the position of duration of the media playback and will diplay it to the user.
		var mediaTimer = function(position, duration){
			$scope.currentPosition = position;
			$scope.roundedDuration = duration;
			console.log("Called- "+ position +" : "+duration);
			$scope.$apply();
		}

		if($rootScope.platform != "Android"){
			MediaService.playFile('documents:/'+memo, mediaTimer);
		}else{
			MediaService.playFile($rootScope.root+memo, mediaTimer);
		}
	};
	//Get Time is called in the HTML. It will output the duration and position and in a time formate.
	$scope.getTime = function (tracker) {
		var minutes = Math.floor((tracker / 60)).toFixed(0);
		var seconds = (tracker % 60);
		if (minutes <= 9) {
			minutes = "0" + minutes;
		}
		if (seconds <= 9) {
			seconds = "0" + seconds;
		}
		return (minutes + ":" + seconds);
	};

	$scope.stopPlayRecording = function () {
		MediaService.stopPlaying();
		$scope.currentPosition = 0;
		$scope.roundedDuration = 0;
	};

	$scope.deleteRecording = function (index) {
		//Calling the File service to remove the recording for the application file system.
		console.log(index);
		console.log($scope.fileSystem+$scope.mediaQuestion.inputs[0].recording[index]);
		var filePromise = FileSystemService.removeFile($rootScope.root+$scope.mediaQuestion.inputs[0].recording[index]);
		filePromise.then(function(){
			$scope.mediaQuestion.inputs[0].recording.splice(index, 1);
			$scope.$apply();
		})
	};

	$scope.browse = function(){
		if($scope.mediaQuestion.type === 'additionalQuestion'){
			$rootScope.fileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output+"-"+($scope.mediaQuestion.id + 1);
			$rootScope.length = ($scope.mediaQuestion.inputs[0].recording.length+1);
		}
		if($scope.mediaQuestion.type === 'question'){
			$rootScope.fileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+($scope.mediaQuestion.id + 1);
			$rootScope.length = ($scope.mediaQuestion.inputs[0].recording.length+1);
		}
		$location.path("/temp/audio/select");
		$rootScope.input = $scope.mediaQuestion.inputs[0].recording;
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
				var itemPromise = FileSystemService.moveFile($rootScope.root+$scope.itemArray[i], "Media", $scope.itemArray[i].replace("/Temp/Temporary_",$rootScope.fileName+"-").replace("."+extension, "")+"-"+$rootScope.length+"."+extension);
				for(var e = 0; e <= ($localStorage.tempInputs.inputs[0].recording.length -1); e++){
					if($localStorage.tempInputs.inputs[0].recording[e] == $scope.itemArray[i]){
						$localStorage.tempInputs.inputs[0].recording.splice(e,1);
					}else{
					}
				}
				itemPromise.then(function(data){
					$rootScope.input.push(data);
					$location.path("/report/audioList");
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
