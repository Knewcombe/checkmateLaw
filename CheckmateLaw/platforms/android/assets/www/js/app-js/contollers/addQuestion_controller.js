angular.module('app').controller('ReportAddQuestionController', function ($rootScope, $scope, $localStorage, $sessionStorage, $location, $interval) {

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

	$scope.dateAndTime = function(id){
		var date = new Date();
		var dateAndTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes();
		$scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[id].inputs[0];
		$scope.currentQuestion.dateChange = dateAndTime;
		$scope.$apply();
	}

	//To insure everything looks right on load.
	$scope.init = function () {

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
			}, 1000);
		}, 100);
	};

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
				$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[id].state = true;
				$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].count++;
			}else{
				if(state === null){
					$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[id].state = true;
				}
			}
		}
		if (state === true) {
			$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[id].state = false;
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

		$rootScope.output = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[index];
		$sessionStorage.notePath = $scope.currentPath;
		$location.path('/report/note');
	};

	//Camera stuff below

	$scope.takePic = function (type, inputId) {
		
		$scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[inputId].inputs[0];
		$scope.questionId = inputId;
		var options = {
			quality: 10,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
			encodingType: 0, // 0=JPG 1=PNG
			correctOrientation: 1,
			saveToPhotoAlbum: 1
		};
		navigator.camera.getPicture(onSuccess, onFail, options);
	};

	var onSuccess = function (FILE_URI) {
		movePic(FILE_URI);
	};
	var onFail = function (e) {
		alert('Error taking picture');
	};

	function movePic(file) {
		window.resolveLocalFileSystemURI(file, resolveOnSuccessImage, resOnError);
	}

	//Callback function when the file system uri has been resolved
	function resolveOnSuccessImage(entry) {
		var d = new Date();
		var n = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDay()+'-'+d.getHours()+d.getMinutes()+d.getSeconds();//This is where to get the formate for the time.
		//new file name
		var newFileName = $scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output+"-"+($scope.questionId + 1)+ "_" + n + ".jpg";;
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
		$scope.currentQuestion.photos.push(path);
		$scope.$apply();
	}

	function resOnError(error) {
		alert(error.code);
	}

	$scope.deleteImage = function (type, questionId, index) {

		$scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[questionId].inputs[0];
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
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
			fileSys.root.getDirectory('media', {create: true});
		})
		var date = new Date();
		var src = 'documents://media/'+$scope.viewReport.title+"-"+$scope.viewReport.sections[$scope.selectedSection].title+"-"+$scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output+"-"+($scope.questionId + 1)+"_"+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+date.getMinutes() + ".wav";
		$scope.myMedia = new Media(src);
		// Record audio
		$scope.myMedia.startRecord();
		$scope.timer = 0;
		$scope.promise = $interval(function () {
			$scope.timer = $scope.timer + 1;
		}, 1000);
	};

	$scope.stopRecording = function (type, questionId) {

		$scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[questionId].inputs[0];
		$interval.cancel($scope.promise);
		$scope.timer = 0;
		$scope.myMedia.stopRecord();
		$scope.currentQuestion.recording.push($scope.myMedia.src);
		clearInterval($scope.recInterval);
		$scope.$apply();
	};

	var mediaTimer = null;
	$scope.playRecording = function (memo) {
		$scope.currentMemo = memo;
		$scope.newMediaObject = new Media(memo);
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