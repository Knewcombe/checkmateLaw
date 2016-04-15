angular.module('app').controller('ReportQuestionController', function ($rootScope, $scope, dataContext, $localStorage, $sessionStorage, $location, $interval, ImageService, FileSystemService, MediaService) {


	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = true;
	$scope.currentPath = $location.path();
	$localStorage.saveIndex = [];
	$scope.$storage = $localStorage;
	$scope.viewReport = ($localStorage.savedChecklist[$localStorage.savedIndex]);
	$scope.selectedSection = $sessionStorage.sectionIndex;
	$scope.selectedQuestion = $sessionStorage.questionIndex;
	$('.loading').show();
	$('.content').hide();

	if($rootScope.scrollPos != undefined){
		$scope.scrollPos = $rootScope.scrollPos;
		console.log("True");
	}else{
		$scope.scrollPos = {};
		console.log("False");
	}

	function gotFS(fileSystem){
		$scope.fileSystem = fileSystem.root.toURL();
	}

	function fail(){
		alert("Derp");
	}

	//Used for header title.
	$scope.headerTitle = {
		text: '',
		word: /^\s*\w*\s*$/

	};

	$scope.dateAndTime = function(){
		var date = new Date();
		var dateAndTime = date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);
		console.log("Date: "+dateAndTime);
		return dateAndTime;
	}

	//To insure everything looks right on load.
	$scope.init = function () {
		$scope.dateAndTime();
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		setTimeout(function () {    
			$('.section').show();
			$('.additionalOutput').hide();
			$('.topDiv').show();
			$('.sectionOption').hide();
			$('.titleTop').show();
			if ($scope.currentPath === '/sections') {

				for (var i = 0; $scope.viewReport.sections.length - 1 >= i; i++) {
					if ($scope.viewReport.sections[i].type === 'selectionSection') {
						if($scope.viewReport.sections[i].selected.length >= 1){
							$('.' + $scope.viewReport.sections[i].options[$scope.viewReport.sections[i].selected].title).show();
						}
					}
				}
			}
			setTimeout(function () {
				$('.loading').hide();
				$('.content').show();
				if($sessionStorage.questionselected != null){
					$('.additionalOutput' + $sessionStorage.questionselected).slideDown("slow");
				}
			}, 1000);
		}, 100);
	};

	$scope.$on('$routeChangeStart', function() {
		$scope.okSaveScroll = false;
		$rootScope.scrollPos = $scope.scrollPos;
	});

	$scope.$on('$routeChangeSuccess', function() {
		setTimeout(function() { // wait for DOM, then restore scroll position
			//			angular.element(window).css('overflow', 'hidden');
			$(document).scrollTop($scope.scrollPos[$location.path()]);
			$("body").animate({scrollTop: $scope.scrollPos[$location.path()]}, "slow");
			$scope.okSaveScroll = true;
			console.log($scope.scrollPos[$location.path()]);
		}, 100);
		//		angular.element(window).css('overflow', 'scroll');
	});
	$(document).on('scroll', function() {
		if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
			$scope.scrollPos[$location.path()] = $(document).scrollTop();
			console.log($scope.scrollPos);
		}
	});

	$scope.nan = function (state, type, id) {

		$scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[id];
		$scope.previousSection = $scope.viewReport.sections[$scope.selectedSection];

		if(state !== true){
			if(state === null){
				$scope.currentQuestion.state = false;
				$scope.previousSection.count--;
			}else{
				$scope.currentQuestion.state = null;
				$scope.previousSection.count++;
			}
		}else{
			if(state === true){
				$scope.currentQuestion.state = null;
			}
		}
	};

	//When users select checkmark it will add count and toggle boolean values.
	$scope.count = function (state, type, id) {
		if (state !== true) {
			if(state === false){
				$scope.viewReport.sections[$scope.selectedSection].questions[id].state = true;
				$scope.viewReport.sections[$scope.selectedSection].count++;
			}else{
				if(state === null){
					$scope.viewReport.sections[$scope.selectedSection].questions[id].state = true;
				}
			}
		}
		if (state === true) {
			$scope.viewReport.sections[$scope.selectedSection].questions[id].state = false;
			$scope.viewReport.sections[$scope.selectedSection].count--;
		}
		if ($scope.viewReport.sections[$scope.selectedSection].count === $scope.viewReport.sections[$scope.selectedSection].amount) {
			if ($scope.viewReport.sections[$scope.selectedSection].state !== true) {
				$scope.viewReport.sections[$scope.selectedSection].state = true;
			}

		} else {
			if ($scope.viewReport.sections[$scope.selectedSection].state === true) {
				$scope.viewReport.sections[$scope.selectedSection].state = false;
			}
		}
	};

	//Funtion to change the pages within the report menu.
	$scope.changeMenus = function (type, index) {

		$sessionStorage.questionIndex = index;
		$location.path('/addQuestions');
		$sessionStorage.selectedDiv = type + index;

	};

	//This is for selection sections and questions.
	$scope.showHideInfo = function (id) {

		$sessionStorage.questionselected = null;

		if ($('.additionalOutput').is(':visible')) {
			if ($('.additionalOutput' + id).is(':visible')) {
				$('.additionalOutput' + id).slideUp("slow");
				$sessionStorage.questionselected = null;
			} else {
				$('.additionalOutput').slideUp("slow");
				$('.additionalOutput' + id).slideDown("slow");
				$sessionStorage.questionselected = id;
			}
		} else {
			$('.additionalOutput' + id).slideDown("slow");
			$sessionStorage.questionselected = id;
		}
	};

	//Note function will take the user to the notes menu and allow them to enter a new note.
	$scope.note = function(index, type){
		$rootScope.output = $scope.viewReport.sections[$scope.selectedSection].questions[index];
		$sessionStorage.notePath = $scope.currentPath;
		$location.path('/report/note');
	};

	//Camera stuff below
	$scope.takePic = function (type, question) {
		//Image service is called with the question and fileName is passed to the function
		var newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+(question.id + 1)+ "_" + $scope.dateAndTime()+"-"+(question.inputs[0].photos.length+1)+ ".jpg";
		
		var imagePromise = ImageService.image(question, newFileName);
		//Waiting for the results of the image
		imagePromise.then(function (data) {
			question.inputs[0].photos.push(data);
			$scope.$apply();
		});
	}
	//REMOVE IMAGE FROM APP
	$scope.deleteImage = function (question, index) {
		question.inputs[0].photos.splice(index, 1);
		//Calling the File service to remove the image for the application file system.
		FileSystemService.removeFile($scope.fileSystem+question.inputs[0].photos[index]);
		$scope.$apply
	};

	$scope.editImage = function (rootUrl, imageUrl) {
		$localStorage.tempImage = rootUrl + imageUrl;
		$sessionStorage.imagePath = $scope.currentPath;
		$location.path('/report/image');
	};

	//MEMO SECTION
	$scope.startRecording = function (question) {
		
		var newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+(question.questionId + 1)+ "_"+$scope.dateAndTime()+"-"+(question.inputs[0].recording.length+1)+".m4a";
		
		MediaService.media();
		
		$scope.timer = 0;
		$scope.promise = $interval(function () {
			$scope.timer = $scope.timer + 1;
		}, 1000);
	};

	$scope.stopRecording = function (question) {
		
		var mediaPromise = MediaService.stopMedia(fileName);
		mediaPromise.then( function(data){
			question.inputs[0].photos.push(data);
		});

//		window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, fileGot, fail);
//
//		function fileGot(fileSys){
//			fileSys.root.getFile("tempRecording.m4a", {create: true, exclusive: false}, gotFileEntry, fail);
//		}
//
//		function gotFileEntry(fileEntry){
//			moveMedia(fileEntry.toURL());
//		}
//
//		function moveMedia(file) {
//			window.resolveLocalFileSystemURL(file, resolveOnSuccessMeida, resOnError);
//		}

		//Callback function when the file system uri has been resolved
//		function resolveOnSuccessMeida(entry) {
//			//new file name
//			var newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+($scope.questionId + 1)+ "_"+$scope.dateAndTime()+"-"+($scope.currentQuestion.inputs[0].recording.length+1)+".m4a";
//			var myFolderApp = "Media";
//
//			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
//				//The folder is created if doesn't exis
//				var root  = fileSys.root;
//				$scope.fileSystem = root.toURL();
//				fileSys.root.getDirectory(myFolderApp,
//										  {create: true, exclusive: false},
//										  function (directory) {
//					entry.moveTo(directory, newFileName, successMoveMedia, resOnError);
//				},
//										  resOnError);
//			},
//									 resOnError);
//		}

//		//Callback function when the file has been moved successfully - inserting the complete path
//		function successMoveMedia(entry) {
//			//I do my insert with "entry.fullPath" as for the path
//			var path = entry.fullPath;
//			$scope.currentQuestion.inputs[0].recording.push(path);
//			$scope.$apply();
//			document.addEventListener('deviceready', onDeviceReady);
//			function onDeviceReady()
//			{
//				var success = function(status) {
//					//				alert('Message: ' + status);
//				}
//
//				var error = function(status) {
//					//				alert('Error: ' + status);
//				}
//
//				window.cache.clear( success, error );
//				window.cache.cleartemp(); //  
//			}
//		}
//
//		function resOnError(error) {
//			alert("Error"+error.code);
//		}
		$interval.cancel($scope.promise);
		$scope.timer = 0;
		clearInterval($scope.recInterval);
		//		$scope.$apply();
	};

	var mediaTimer = null;
	$scope.playRecording = function (memo) {
		//WILL NEED TO CHECK HOW TO DO THIS WITH ANDROID.
		//		if(device.platform === "Android"){
		//			$scope.currentMemo = $scope.fileSystem+memo;
		//		}else{
		//		}
		$scope.currentMemo = 'documents:/'+memo;
		$scope.newMediaObject = new Media($scope.currentMemo);
		$scope.newMediaObject.play();
		if (mediaTimer === null) {
			mediaTimer = setInterval(function () {
				$scope.duration = $scope.newMediaObject.getDuration();
				// get my_media position
				$scope.newMediaObject.getCurrentPosition(
					// success callback
					function (position) {
						if (position > -1 && position <= $scope.duration) {
							$scope.currentPosition = Math.round(position);
							$scope.roundedDuration = Math.round($scope.duration);
							$scope.$apply();
						} else {
							$scope.currentPosition = 0;
							$scope.roudedDuration = 0;
						}
					},
					// error callback
					function (e) {
						alert("Error playing memo");
					}
				);
			}, 1000);
		}
	};
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
		$scope.newMediaObject.stop();
		$interval.cancel($scope.playPromise);
	};

	$scope.deleteRecording = function (question, index) {
		question.inputs[0].recording.splice(index, 1);
		alert("Deleted");
	};
});
