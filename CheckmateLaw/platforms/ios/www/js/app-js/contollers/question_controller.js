angular.module('app').controller('ReportQuestionController', function ($rootScope, $scope, dataContext, $localStorage, $sessionStorage, $location, $interval) {


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

	$scope.takePic = function (type, inputId, question) {
		console.log(question);
		$scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[inputId];
		$scope.questionId = inputId;
		var options = {
			quality: 10,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
			encodingType: 0, // 0=JPG 1=PNG
			correctOrientation: 1,
			saveToPhotoAlbum: 0
		};
		navigator.camera.getPicture(onSuccess, onFail, options);
	};

	var onSuccess = function (FILE_URI) {
		console.log(FILE_URI);
		movePic(FILE_URI);
	};
	var onFail = function (e) {
		alert('Error taking picture');
	};

	function movePic(file) {
		window.resolveLocalFileSystemURL(file, resolveOnSuccessImage, resOnError);
	}

	//Callback function when the file system uri has been resolved
	function resolveOnSuccessImage(entry) {
		//new file name
		var newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+($scope.questionId + 1)+ "_" + $scope.dateAndTime()+"-"+($scope.currentQuestion.inputs[0].photos.length+1)+ ".jpg";
		var myFolderApp = "Images";

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
			//The folder is created if doesn't exis
			var root  = fileSys.root;
			$scope.fileSystem = root.toURL();
			fileSys.root.getDirectory(myFolderApp,
									  {create: true, exclusive: false},
									  function (directory) {
				entry.moveTo(directory, newFileName, successMoveImage, resOnError);
			},
									  resOnError);
		},
								 resOnError);
	}

	//Callback function when the file has been moved successfully - inserting the complete path
	function successMoveImage(entry) {
		//I do my insert with "entry.fullPath" as for the path
		var path = entry.fullPath;
		$scope.currentQuestion.inputs[0].photos.push(path);
		$scope.$apply();
		document.addEventListener('deviceready', onDeviceReady);
		function onDeviceReady()
		{
			var success = function(status) {
				//				alert('Message: ' + status);
			}

			var error = function(status) {
				//				alert('Error: ' + status);
			}

			window.cache.clear( success, error );
			window.cache.cleartemp(); //  
		}
	}

	function resOnError(error) {
		alert("Error"+error.code);
	}

	$scope.deleteImage = function (type, questionId, index) {
		//REMOVE IMAGE FROM APP
		$scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[questionId].inputs[0];
		$scope.currentQuestion.photos.splice(index, 1);
	};

	$scope.editImage = function (rootUrl, imageUrl) {
		$localStorage.tempImage = rootUrl + imageUrl;
		$sessionStorage.imagePath = $scope.currentPath;
		$location.path('/report/image');
	};

	//MEMO SECTION
	$scope.startRecording = function (questionId) {
		$scope.questionId = questionId;

		$scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[questionId];
		
		var src = "tempRecording.m4a";
		$scope.myMedia = new Media(src);
		var options = {
			SampleRate: 12000,
			NumberOfChannels: 1
		}

		// Record audio
		//		$scope.myMedia.startRecord();
		$scope.myMedia.startRecordWithCompression(options);
		$scope.timer = 0;
		$scope.promise = $interval(function () {
			$scope.timer = $scope.timer + 1;
		}, 1000);
	};

	$scope.stopRecording = function (questionId) {
		
		window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, fileGot, fail);
		
		function fileGot(fileSys){
			fileSys.root.getFile("tempRecording.m4a", {create: true, exclusive: false}, gotFileEntry, fail);
		}
		
		function gotFileEntry(fileEntry){
			moveMedia(fileEntry.toURL());
		}

		function moveMedia(file) {
			window.resolveLocalFileSystemURL(file, resolveOnSuccessMeida, resOnError);
		}

		//Callback function when the file system uri has been resolved
		function resolveOnSuccessMeida(entry) {
			//new file name
			var newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+($scope.questionId + 1)+ "_"+$scope.dateAndTime()+"-"+($scope.currentQuestion.inputs[0].recording.length+1)+".m4a";
			var myFolderApp = "Media";

			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
				//The folder is created if doesn't exis
				var root  = fileSys.root;
				$scope.fileSystem = root.toURL();
				fileSys.root.getDirectory(myFolderApp,
										  {create: true, exclusive: false},
										  function (directory) {
					entry.moveTo(directory, newFileName, successMoveMedia, resOnError);
				},
										  resOnError);
			},
									 resOnError);
		}

		//Callback function when the file has been moved successfully - inserting the complete path
		function successMoveMedia(entry) {
			//I do my insert with "entry.fullPath" as for the path
			var path = entry.fullPath;
			$scope.currentQuestion.inputs[0].recording.push(path);
			$scope.$apply();
			document.addEventListener('deviceready', onDeviceReady);
			function onDeviceReady()
			{
				var success = function(status) {
					//				alert('Message: ' + status);
				}

				var error = function(status) {
					//				alert('Error: ' + status);
				}

				window.cache.clear( success, error );
				window.cache.cleartemp(); //  
			}
		}

		function resOnError(error) {
			alert("Error"+error.code);
		}
		$interval.cancel($scope.promise);
		$scope.timer = 0;
		$scope.myMedia.stopRecord();
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
