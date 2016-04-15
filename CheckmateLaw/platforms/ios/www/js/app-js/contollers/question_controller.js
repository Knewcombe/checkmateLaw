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
	//Date and time function that is called when a date formate is needed in the questions.
	$scope.dateAndTime = function(){
		var date = new Date();
		var dateAndTime = date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);
		console.log("Date: "+dateAndTime);
		return dateAndTime;
	}

	//To insure everything looks right on load.
	$scope.init = function () {
		//Getting file system request.
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
	$scope.note = function(question){
		$rootScope.output = question;
		$sessionStorage.notePath = $scope.currentPath;
		$location.path('/report/note');
	};

	//Camera stuff below
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
		}

		var imagePromise = ImageService.image(newFileName);
		//Waiting for the results of the image
		imagePromise.then(function (data) {
			question.inputs[0].photos.push(data);
			$scope.$apply();
		});
	}
	//REMOVE IMAGE FROM APP
	$scope.deleteImage = function (question, index) {
		//Calling the File service to remove the image for the application file system.
		FileSystemService.removeFile($scope.fileSystem+question.inputs[0].photos[index]);
		question.inputs[0].photos.splice(index, 1);
		$scope.$apply();
	};
	//Edit image will take the user to the HTML page with a fullscreen image.
	$scope.editImage = function (rootUrl, imageUrl) {
		$localStorage.tempImage = rootUrl + imageUrl;
		$sessionStorage.imagePath = $scope.currentPath;
		$location.path('/report/image');
	};

	//MEMO SECTION
	//Start recroding will call the media service.
	$scope.startRecording = function (question) {

		$scope.currentQuestion = question;

		MediaService.media();
		//Timer to indicate the amount of time the recording is.
		$scope.timer = 0;
		$scope.promise = $interval(function () {
			$scope.timer = $scope.timer + 1;
		}, 1000);
	};
	//Stop recording will call the media service to stop the recording and set the name of the file.
	$scope.stopRecording = function (question) {

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

		var mediaPromise = MediaService.stopMedia(newFileName);
		mediaPromise.then( function(data){
			question.inputs[0].recording.push(data);
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
