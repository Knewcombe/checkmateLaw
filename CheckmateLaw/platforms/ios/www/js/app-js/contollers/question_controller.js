/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * Question controller is used to control all functionality in the Question page.
 * - Image control: User will be able to take pictures and save it in the app file system
 * - Media control: User will be able to record audio to attach to the question objecy
 * - Change check state: the user will be able to change the state of the checkmark for the 
 * Questions. This can be either true/false/null;
 *
 */
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
	//If the user has a previous scroll position, the page will scroll to the position.
	if($rootScope.scrollPos != undefined){
		$scope.scrollPos = $rootScope.scrollPos;
		console.log("True");
	}else{
		//If the user does no have a scroll position, it will be defined.
		$scope.scrollPos = {};
		console.log("False");
	}
	//Getting the root directory from the file system to the Documents.
	//This function is called when the window.fileSystem is resolved.
	function gotFS(fileSystem){
		$scope.fileSystem = fileSystem.root.toURL();
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
<<<<<<< HEAD

=======
	//Date and time function that is called when a date formate is needed in the questions.
>>>>>>> ImproveCode
	$scope.dateAndTime = function(){
		var date = new Date();
		var dateAndTime = date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);
		console.log("Date: "+dateAndTime);
		return dateAndTime;
	}

	//To insure everything looks right on load.
	$scope.init = function () {
<<<<<<< HEAD
		$scope.dateAndTime();
=======
		//Getting file system request.
>>>>>>> ImproveCode
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		//This will determain if the selected will be additional questions or questions.
		if($scope.currentPath === '/addQuestions'){
			console.log("Additional Questions Path "+$scope.currentPath);
			$scope.questionOutput = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions;
			console.log($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions);
		}
		if($scope.currentPath === '/questions'){
			console.log("Questions Path "+$scope.currentPath);
			$scope.questionOutput = $scope.viewReport.sections[$scope.selectedSection].questions;
		}
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
	//Setting up variables used for the scroll position.
	$scope.$on('$routeChangeStart', function() {
		$scope.okSaveScroll = false;
		$rootScope.scrollPos = $scope.scrollPos;
	});
	//Function is used to scroll to the area that the user was last locationed.
	$scope.$on('$routeChangeSuccess', function() {
		setTimeout(function() { // wait for DOM, then restore scroll position
			//			angular.element(window).css('overflow', 'hidden');
			$(document).scrollTop($scope.scrollPos[$location.path()]);
			$("body").animate({scrollTop: $scope.scrollPos[$location.path()]}, "slow");
			$scope.okSaveScroll = true;
		}, 100);
	});
	$(document).on('scroll', function() {
		if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
			$scope.scrollPos[$location.path()] = $(document).scrollTop();
		}
	});
	//Nan function is used to give the nan checkmark value.
	$scope.nan = function (state, question) {

		$scope.currentQuestion = question;
		$scope.previousSection = $scope.viewReport.sections[$scope.selectedSection];

		if(question.type === 'question'){
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
		}else{
			if(question.type === 'additionalQuestion'){

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
			}
		}
	};

	//When users select checkmark it will add count and toggle boolean values.
	$scope.count = function (state, question) {
		console.log(question);
		if(question.type === 'question'){
			if (state !== true) {
				if(state === false){
					question.state = true;
					$scope.viewReport.sections[$scope.selectedSection].count++;
				}else{
					if(state === null){
						question.state = true;
					}
				}
			}
			if (state === true) {
				question.state = false;
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
		}else{
			if(question.type === 'additionalQuestion'){
				if (state !== true) {
					if(state === false){
						question.state = true;
						$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].count++;
					}else{
						if(state === null){
							question.state = true;
						}
					}
				}
				if (state === true) {
					question.state = false;
					$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].count--;
				}
				if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].count ===                                   $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount) {
					if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].state !== true) {
						$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].state = true;
						$scope.viewReport.sections[$scope.selectedSection].count++;
						if ($scope.viewReport.sections[$scope.selectedSection].count === $scope.viewReport.sections[$scope.selectedSection].amount) {
							if ($scope.viewReport.sections[$scope.selectedSection].state !== true) {
								$scope.viewReport.sections[$scope.selectedSection].state = true;
							}
						} else {
							if ($scope.viewReport.sections[$scope.selectedSection].state === true) {
								$scope.viewReport.sections[$scope.selectedSection].state = false;
							}
						}
					}
				} else {
					if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].state === true) {
						$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].state = false;
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
				}
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
<<<<<<< HEAD
	$scope.note = function(index, type){
		$rootScope.output = $scope.viewReport.sections[$scope.selectedSection].questions[index];
=======
	$scope.note = function(question){
		$rootScope.output = question;
>>>>>>> ImproveCode
		$sessionStorage.notePath = $scope.currentPath;
		$location.path('/report/note');
	};

	//Camera stuff below
<<<<<<< HEAD

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
=======
	$scope.takePic = function (type, question) {
		//Image service is called with the question and fileName is passed to the function
		var newFileName;
		console.log(question);
		if(question.type === 'additionalQuestion'){
			newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output+"-"+(question.id + 1)+ "_"+$scope.dateAndTime()+"-"+(question.inputs[0].recording.length+1)+".jpg";
			console.log(newFileName);
		}
		if(question.type === 'question'){
			newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+(question.id + 1)+ "_"+$scope.dateAndTime()+"-"+(question.inputs[0].recording.length+1)+".jpg";	console.log(newFileName);
>>>>>>> ImproveCode
		}

		var imagePromise = ImageService.image(newFileName);
		//Waiting for the results of the image
		imagePromise.then(function (data) {
			question.inputs[0].photos.push(data);
			$scope.$apply();
		});
	}
<<<<<<< HEAD

	$scope.deleteImage = function (type, questionId, index) {
		//REMOVE IMAGE FROM APP
		$scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[questionId].inputs[0];
		$scope.currentQuestion.photos.splice(index, 1);
=======
	//REMOVE IMAGE FROM APP
	$scope.deleteImage = function (question, index) {
		//Calling the File service to remove the image for the application file system.
		FileSystemService.removeFile($scope.fileSystem+question.inputs[0].photos[index]);
		question.inputs[0].photos.splice(index, 1);
		$scope.$apply();
>>>>>>> ImproveCode
	};
	//Edit image will take the user to the HTML page with a fullscreen image.
	$scope.editImage = function (rootUrl, imageUrl) {
		$localStorage.tempImage = rootUrl + imageUrl;
		$sessionStorage.imagePath = $scope.currentPath;
		$location.path('/report/image');
	};

	//MEMO SECTION
<<<<<<< HEAD
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
=======
	//Start recroding will call the media service.
	$scope.startRecording = function (question) {

		$scope.currentQuestion = question;

		MediaService.media();
		//Timer to indicate the amount of time the recording is.
>>>>>>> ImproveCode
		$scope.timer = 0;
		$scope.promise = $interval(function () {
			$scope.timer = $scope.timer + 1;
		}, 1000);
	};
	//Stop recording will call the media service to stop the recording and set the name of the file.
	$scope.stopRecording = function (question) {

<<<<<<< HEAD
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
=======
		var newFileName;
		$interval.cancel($scope.promise);
		$scope.timer = 0;
		clearInterval($scope.recInterval);
		if(question.type === 'additionalQuestion'){
			newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output+"-"+(question.id + 1)+ "_"+$scope.dateAndTime()+"-"+(question.inputs[0].recording.length+1)+".m4a";
		}
		if(question.type === 'question'){
			newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+(question.id + 1)+ "_"+$scope.dateAndTime()+"-"+(question.inputs[0].recording.length+1)+".m4a";	
		}
>>>>>>> ImproveCode

		var mediaPromise = MediaService.stopMedia(newFileName);
		mediaPromise.then( function(data){
			question.inputs[0].recording.push(data);
		});
	};
	//Playing recording will pass the recording path to the Media Service.
	$scope.playRecording = function (memo) {
<<<<<<< HEAD
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
=======

		$scope.currentMemo = memo;
		//Function is a callback from the Media service.
		//This will get the position of duration of the media playback and will diplay it to the user.
		var mediaTimer = function(position, duration){
			$scope.currentPosition = position;
			$scope.roundedDuration = duration;
			console.log("Called- "+ position +" : "+duration);
			$scope.$apply();
>>>>>>> ImproveCode
		}
		MediaService.playFile('documents:/'+memo, mediaTimer);
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

	$scope.deleteRecording = function (question, index) {
		//Calling the File service to remove the recording for the application file system.
		FileSystemService.removeFile($scope.fileSystem+question.inputs[0].recording[index]);
		question.inputs[0].recording.splice(index, 1);
		$scope.$apply();
	};
});
