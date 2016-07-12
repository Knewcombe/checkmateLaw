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
angular.module('app').controller('ReportQuestionController', function ($rootScope, $scope, dataContext, $localStorage, $sessionStorage, $location, $interval, VideoService, FileSystemService, MediaService) {

	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = true;
	$scope.currentPath = $location.path();
	$localStorage.saveIndex = [];
	$scope.$storage = $localStorage;
	$scope.viewReport = ($localStorage.savedChecklist[$localStorage.savedIndex]);
	$scope.selectedSection = $sessionStorage.sectionIndex;
	$scope.selectedQuestion = $sessionStorage.questionIndex;
	$rootScope.footerBool = true;
	$('.loading').show();
	$('.content').hide();

	$scope.section = function(){
		$location.path("/sections");
	};

	$scope.question = function(){
		$location.path("/questions");
	};
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
		var dateAndTime = date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2)+"-"+("0" + date.getHours()).slice(-2)+"-"+("0" + date.getMinutes()).slice(-2)+"-"+("0" + date.getSeconds()).slice(-2);
		console.log("Date: "+dateAndTime);
		return dateAndTime;
	}

	$scope.questionYes = function(question){
		question.state = true;
	};

	$scope.questionNo = function(question){
		question.state = false;
	};

	$scope.questionnaireCheck = function(questionnaire){
		if(questionnaire.state === true){
			questionnaire.state = false;
			$scope.viewReport.sections[$scope.selectedSection].count--;
		}
		for(var i = 0; questionnaire.questions.length - 1 >= i; i++){
			if(questionnaire.questions[i].state === true){
				console.log("True");
				questionnaire.state = true;
			};
		};
		if(questionnaire.state === true){
			$scope.viewReport.sections[$scope.selectedSection].count++;
		}
	};

	//To insure everything looks right on load.
	$scope.init = function () {
		//Getting file system request.
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		//This will determain if the selected will be additional questions or questions.
		console.log("Question ID "+$scope.selectedQuestion);
		if($scope.currentPath === '/addQuestions'){
			console.log("Additional Questions Path "+$scope.currentPath);
			$scope.questionOutput = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions;
			console.log($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion]);
		}
		if($scope.currentPath === '/questions'){
			console.log("Questions Path "+$scope.currentPath);
			$scope.questionOutput = $scope.viewReport.sections[$scope.selectedSection].questions;
		}

		if($scope.currentPath === '/questionnaireItem'){
			console.log("Additional Questions Path "+$scope.currentPath);
			$scope.questionOutput = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].questions;
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
			if ($scope.previousSection.count === $scope.previousSection.amount) {
				if ($scope.previousSection.state !== true) {
					$scope.previousSection.state = true;
				}

			} else {
				if ($scope.previousSection.state === true) {
					$scope.previousSection.state = false;
				}
			}
		}else{
			if(question.type === 'additionalQuestion'){
				console.log("Nan counting");
				if(state !== true){
					if(state === null){
						console.log("Item is null and will true to false and remove count from previous");
						$scope.currentQuestion.state = false;
						$scope.previousSection.questions[$scope.selectedQuestion].count--;
					}else{
						$scope.currentQuestion.state = null;
						$scope.previousSection.questions[$scope.selectedQuestion].count++;
					}
				}else{
					if(state === true){
						console.log("The selecting was true and does not count");
						$scope.currentQuestion.state = null;
					}
				}
				if ($scope.previousSection.questions[$scope.selectedQuestion].count === $scope.previousSection.questions[$scope.selectedQuestion].amount) {
					console.log("Count is conpaied and is true, will updated the section items as well");
					console.log($scope.previousSection.questions[$scope.selectedQuestion]);
					if ($scope.previousSection.questions[$scope.selectedQuestion].state !== true) {
						$scope.previousSection.questions[$scope.selectedQuestion].state = true;
						$scope.previousSection.count++;
						if ($scope.previousSection.count === $scope.previousSection.amount) {
							if ($scope.previousSection.state !== true) {
								$scope.previousSection.state = true;
							}
						} else {
							if ($scope.previousSection.state === true) {
								$scope.previousSection.state = false;
							}
						}
					}
				} else {
					if ($scope.previousSection.questions[$scope.selectedQuestion].state === true) {
						$scope.previousSection.questions[$scope.selectedQuestion].state = false;
						$scope.previousSection.count--;
					}
					if ($scope.previousSection.count === $scope.previousSection.amount) {
						if ($scope.previousSection.state !== true) {
							$scope.previousSection.state = true;
						}
					} else {
						if ($scope.previousSection.state === true) {
							$scope.previousSection.state = false;
						}
					}
				}
			}
		}
	};

	//When users select checkmark it will add count and toggle boolean values.
	$scope.count = function (state, question) {
		console.log(question);
		if(question.type === 'question' || question.type === 'questionnaireItem'){
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

		if(type === 'multiQuestion'){
			console.log(index);
			$location.path('/addQuestions');
		}
		if(type === 'questionnaire'){
			$location.path('/questionnaireItem');
		}
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

	$scope.takePic = function (question) {
		$location.path('/report/imageList');
		$rootScope.question = question;
		$rootScope.browsPath = $scope.currentPath;
		console.log(question);
	}

	$scope.video = function(question){
		$location.path('/report/videoList');
		$rootScope.question = question;
		$rootScope.browsPath = $scope.currentPath;
		console.log(question);
	}

	//MEMO SECTION
	//Start recroding will call the media service.
	$scope.startRecording = function (question) {
		$location.path('/report/audioList');
		$rootScope.browsPath = $scope.currentPath;
		$rootScope.question = question;
	}
});
