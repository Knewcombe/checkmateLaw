/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * Controller will be called when the Report menu is loaded
 * This controller handles all variables that are needed, with 
 * functions that are needed for the functions that are used.
 *
 */

//Controler for when creating a new report.
angular.module('app').controller('ReportNewController', function ($scope, dataContext, JsonTemplateService, $localStorage, $location, $interval, $rootScope) {
	$scope.templates = dataContext.templates.getAll();
	$scope.currentPath = $location.path();
	$scope.$storage = $localStorage;
	$scope.contentLoaded = false;
	$scope.loadDropdown = true;
	$rootScope.isHomepage = false;

	var promise = JsonTemplateService.getList();
	$scope.$storage = $localStorage;
	promise.then(function (data) {
		$scope.pass = data;
		console.log($scope.pass);
	});
	$scope.selectTemplate = function (selection) {
		$scope.selection = selection;
		$scope.tempReport = $scope.selection;
		console.log(selection);
	};
	$scope.next = function (tempReport) {
		if (typeof $localStorage.savedChecklist === 'undefined') {
			$localStorage.savedChecklist = [];
		}

		var date = new Date();
		tempReport.dateStamp = date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2)+"-"+("0" + date.getHours()).slice(-2)+"-"+("0" + date.getMinutes()).slice(-2)+"-"+("0" + date.getSeconds()).slice(-2);

		$localStorage.savedChecklist.unshift(tempReport);
		if ($localStorage.savedChecklist.length >= 1) {
			$scope.$storage.savedIndex = 0;
		} else {
			$scope.$storage.savedIndex = 0;
		}
		console.log($scope.$storage.savedIndex);
		$location.path('/sections');
	};

	$rootScope.isHomepage = false;

	$scope.saveChecklist = function () {
		alert('Checklist saved!');
		$location.path('/');
	};

})
//Header controller to add functionality in the report menu.
	.controller('ReportHeaderController', function ($rootScope, $scope, $location, $sessionStorage) {
	$('.dropdown-toggle').dropdown();
	$rootScope.isResizeDiv = true;
	console.log($rootScope.footerBool);

	$scope.backButton = function () {
		$scope.currentPath = $location.path();
		if ($scope.currentPath === '/questions') {
			$location.path('/sections');
			$scope.scrollPos[$scope.currentPath] = 0;
		}
		if ($scope.currentPath === '/addQuestions') {
			$location.path('/questions');
		}
		if($scope.currentPath === '/questionnaireItem'){
			$location.path('/questions');
		}
		if($scope.currentPath === '/report/image'){
			$location.path($sessionStorage.imagePath);
		}
		if($scope.currentPath === '/report/note'){
			$location.path($sessionStorage.notePath);
		}
		if($scope.currentPath === '/referanceList'){
			$location.path('/guidelines');
		}
		if($scope.currentPath === '/referanceListItems'){
			$location.path('/referanceList');
		}
		if($scope.currentPath === '/referanceListAddItems'){
			$location.path('/referanceListItems');
		}
		if($scope.currentPath === '/questionnaire'){
			$location.path('/guidelines');
		}
		if($scope.currentPath === '/report/imageList'){
			$location.path($rootScope.browsPath);
		}
		if($scope.currentPath === '/report/audioList'){
			$location.path($rootScope.browsPath);
		}
		if($scope.currentPath === '/report/videoList'){
			$location.path($rootScope.browsPath);
		}
		if($scope.currentPath === '/temp/image'){
			$location.path('/temp');
		}
		if($scope.currentPath === '/temp/video'){
			$location.path('/temp');
		}
		if($scope.currentPath === '/temp/audio'){
			$location.path('/temp');
		}
		if($scope.currentPath === "/temp/video/select"){
			$location.path("/report/videoList");
		}
		if($scope.currentPath === "/temp/audio/select"){
			$location.path("/report/audioList");
		}
		if($scope.currentPath === "/temp/image/select"){
			$location.path("/report/imageList");
		}

	};

	$scope.homeButton = function (){
		$location.path('/');
	}

	$scope.sectionButton = function(){
		$location.path('/sections');
	}

})
//Saved reports controller.
	.controller('ReportSavedController', function ($scope, $location, dataContext, PdfFromat, FileSystemService, ZipService, $localStorage, $interval, $rootScope, $sessionStorage, TxtService) {

	$scope.$storage = $localStorage;
	console.log($scope.$storage.savedChecklist);
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = false;
	
	$('.loading').hide();
	$('.content').show();

	function gotFS(fileSystem){
		console.log("gotFS called");
		$scope.fileSystem = fileSystem.root.toURL();
	}

	function fail(){
		alert("Derp");
	}

	function emailView(attachments){
		$('.loading').show();
		$('.content').hide();
		console.log("Email");
		console.log(attachments)
		cordova.plugins.email.open({
			//			to:          [""], // email addresses for TO field
			//			cc:          [""], // email addresses for CC field
			//			bcc:         [""], // email addresses for BCC field
			attachments: attachments,// file paths or base64 data streams
			subject:    $localStorage.checklistPdf.title +"_"+$localStorage.checklistPdf.name+"_"+$localStorage.checklistPdf.dateStamp, // subject of the email
			body:       "", // email body (for HTML, set isHtml to true)
			isHtml:    true, // indicats if the body is HTML or plain text
		}, function () {
			console.log('email view dismissed');
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
				//Removing the pdf file after the email.
				fileSystem.root.getFile($scope.pdfFileName, {create:false}, function(fileEntry){
					fileEntry.remove(function(file){
						console.log("PDF File removed!");
						document.addEventListener('deviceready', onDeviceReady);
					},function(){
						console.log("error deleting the file " + error.code);
					});
				},function(){
					console.log("file does not exist");
				});
				//Removing the pdf file after the txt.
				fileSystem.root.getFile($scope.txtFileName, {create:false}, function(fileEntry){
					fileEntry.remove(function(file){
						console.log("Txt File removed!");
						document.addEventListener('deviceready', onDeviceReady);
					},function(){
						console.log("error deleting the file " + error.code);
					});
				},function(){
					console.log("file does not exist");
				});
				//Removing the zip file after the email is complete.
				fileSystem.root.getFile($scope.zipFileName, {create:false}, function(fileEntry){
					fileEntry.remove(function(file){
						console.log("ZIP File removed!");
					},function(){
						console.log("error deleting the file " + error.code);
					});
				},function(){
					console.log("file does not exist");
				});
			},function(evt){
				console.log(evt.target.error.code);
			});
			$('.loading').hide();
			$('.content').show();
		},
								   this);
	}

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

	$scope.emailList = function($index){
		$scope.$storage.savedIndex = $index;
		$localStorage.checklistPdf = $localStorage.savedChecklist[$index];

		$scope.pdfFileName = $localStorage.checklistPdf.title+"-"+$localStorage.checklistPdf.name+".pdf";

		$scope.zipFileName = $localStorage.checklistPdf.title +"_"+$localStorage.checklistPdf.name+".zip";

		$scope.txtFileName = $localStorage.checklistPdf.title +"_"+$localStorage.checklistPdf.name+".txt";

		cordova.plugins.email.isAvailable(
			function (isAvailable){
				var attachments = [];
				// alert('Service is not available') unless isAvailable;
				console.log("------ EMAIL ------");
				console.log(cordova.file.externalCacheDirectory);
				console.log(isAvailable);
				if(isAvailable){
					console.log("Called");
					if($rootScope.platform == "Android"){
						var pdfPromise = PdfFromat.getPDF($localStorage.checklistPdf, $scope.pdfFileName);
						pdfPromise.then(function(pdfPath){
							console.log(pdfPath);
							var pdfFilePromise = FileSystemService.moveEmailFiles(pdfPath, $scope.pdfFileName);
							pdfFilePromise.then(function (newPdfName){
								attachments.push($rootScope.fileSys+newPdfName);
								console.log("------PDF File Complete------");
								var txtPromise = TxtService.writeTxt($localStorage.checklistPdf, $scope.txtFileName);
								txtPromise.then(function(txtPath){
									if(txtPath != ""){
										var txtFilePromise = FileSystemService.moveEmailFiles(txtPath, $scope.txtFileName);
										txtFilePromise.then(function(newTxtName){
											console.log("------Txt file complete------");
											console.log(newTxtName);
											attachments.push($rootScope.fileSys+newTxtName);
											console.log(attachments);
										});
									}
									var zipPromise = ZipService.getZip($scope.zipFileName);
									zipPromise.then(function (zipPath){
										console.log("------Zip File Complete------");
										console.log(zipPath);
										if(zipPath != ""){
											console.log("ZIP FILE FOUND");
											var zipFilePromise = FileSystemService.moveEmailFiles(zipPath, $scope.zipFileName);
											zipFilePromise.then(function (newZipName){
												console.log("------Zip File Complete------");
												console.log(newZipName);
												attachments.push($rootScope.fileSys+newZipName);
												//CALLING THE EMAIL
												//IF the zip file is not generated due to the user not have any images or memos
												//A check must occur to insure the attachments section for the email plugin does not crash
												emailView(attachments);
											})
										}else{
											emailView(attachments);
										}
									})
								});
							});
						})
					}else{
						console.log("------IOS------");
						var pdfPromise = PdfFromat.getPDF($localStorage.checklistPdf, $scope.pdfFileName);
						pdfPromise.then(function(pdfPath){
							console.log("------PDF File Complete------");
							console.log(pdfPath);
							$scope.pdfFile = $scope.pdfFileName;
							attachments.push($rootScope.root+$scope.pdfFile);
							var txtPromise = TxtService.writeTxt($localStorage.checklistPdf, $scope.txtFileName);
							txtPromise.then(function(txtPath){
								$scope.txtFile = $scope.txtFileName;
								if(txtPath != ""){
									attachments.push($rootScope.root+$scope.txtFile);
								}
								var zipPromise = ZipService.getZip($scope.zipFileName);
								zipPromise.then(function (zipPath){
									console.log("------Zip File Complete------");
									console.log(zipPath);
									$scope.zipFile = $scope.zipFileName;
									//CALLING THE EMAIL
									//IF the zip file is not generated due to the user not have any images or memos
									//A check must occur to insure the attachments section for the email plugin does not crash
									if(zipPath != ""){
										console.log("ZIP FILE FOUND");
										attachments.push($rootScope.root+$scope.zipFile);
									}
									emailView(attachments);
								})
							})
						})
					}
				}else{
					alert("Email not available at this time.");
				}
			});
	}

	$scope.deleteList = function ($index) {
		$('.loading').show();
		$('.content').hide();
		var deleteChecklist = confirm('You sure?');

		if (deleteChecklist) {
			$scope.$storage.savedChecklist.splice($index, 1);
			$location.path('/report/saved');
		}
	};

	$scope.edit = function ($index) {
		$('.loading').show();
		$('.content').hide();
		$scope.$storage.savedIndex = $index;
		$localStorage.checklistName = $localStorage.savedChecklist[$index].title;
		$localStorage.occurranceNumber = $localStorage.savedChecklist[$index].occurranceNumber;
		$location.path('/report/saved/edit');
	};

	$scope.saveEdit = function () {
		$location.path('/sections');
	};

	$scope.switchChecklist = function (template) {
		if (template.name !== $scope.loadedChecklist.name) {
			$scope.currentChecklist = template.questions;
		} else {
			$scope.currentChecklist = $scope.loadedQuestions;
		}
	};
})
//
	.controller('QuestionnaireController', function($scope, $location, $rootScope, ListService, $sessionStorage, $localStorage){

	$scope.currentPath = $location.path;
	$rootScope.isHomepage = false;
	var promise = ListService.getList();
	//    $scope.$storage = $localStorage.savedChecklist;
	promise.then(function (data) {
		$scope.pass = data;
		$scope.quesionAir = data[0];
		$scope.outPut = $scope.quesionAir.sections[0];
	})

	$scope.continue = function(){
		$scope.outPut = $scope.quesionAir.sections[0].yes[1];
	}
	$scope.yes = function(){
		$scope.outPut = $scope.outPut.yes[0];
	}
	$scope.no = function(){
		$scope.outPut = $scope.outPut.no[0];
	}

	$scope.done = function(){
		$location.path('/guidelines');
	}

})

	.controller('GuidelinesController', function($scope, $location, $rootScope, ListService){

	$scope.currentPath = $location.path;
	$rootScope.isHomepage = true;
	var promise = ListService.getList();
	//    $scope.$storage = $localStorage.savedChecklist;
	promise.then(function (data) {
		$scope.pass = data;
		$scope.quesionAir = data;
		$scope.buttonNames = $scope.quesionAir;
	})
	$scope.selected = function(item){
		console.log(item);
		$location.path('/'+item);
	}
})

	.controller('ReferanceListController', function($sessionStorage, $scope, $location, $rootScope, ListService){

	$scope.currentPath = $location.path;
	$rootScope.isHomepage = false;

	var promise = ListService.getList();
	promise.then(function (data){
		$scope.pass = data;
		$scope.referanceList = data[1];
		$scope.outPut = $scope.referanceList.sections;
	})
	$scope.itemSelect = function(id){
		console.log("Called "+id);
		$sessionStorage.itemId = id;
		$location.path('/referanceListItems');
	}
})

	.controller('ReferenceListControllerItems', function($sessionStorage, $scope, $location, $rootScope, ListService){

	$scope.currentPath = $location.path;
	$rootScope.isHomepage = false;

	var promise = ListService.getList();
	promise.then(function (data){
		$scope.pass = data;
		$scope.referanceList = data[1];
		$scope.outPut = $scope.referanceList.sections[$sessionStorage.itemId];
	})
	$scope.itemSelect = function(id){
		console.log("This is the id " + id);
		$sessionStorage.sectionId = id;
		$location.path('/referanceListAddItems');
	}
})

	.controller('ReferenceListControllerAddItems', function($sessionStorage, $scope, $location, $rootScope, ListService){

	$scope.currentPath = $location.path;
	$rootScope.isHomepage = false;

	console.log($sessionStorage.sectionId);

	var promise = ListService.getList();
	promise.then(function (data){
		$scope.pass = data;
		$scope.referanceList = data[1];
		$scope.outPut = $scope.referanceList.sections[$sessionStorage.itemId].items[$sessionStorage.sectionId];
	})
})

	.controller('NoteController', function($localStorage, $sessionStorage, $scope, $location, $rootScope){

	//Need to figure out how to do this, could just add the timestamp at the begining of the note, but im not sure...
	//Unless I make a array and pass it in
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = true;

	$scope.inputArray = [];
	$scope.input = "";
	$scope.mainTitle = $localStorage.savedChecklist[$localStorage.savedIndex].title;

	$scope.dateStamp = $localStorage.savedChecklist[$localStorage.savedIndex].dateStamp;

	$scope.output = $rootScope.output.output;
	$scope.testOutput = $rootScope.output;

	$('.loading').show();
	$('.content').hide();

	$scope.init = function () {
		console.log("INIT");
		setTimeout(function () {    
			$('.loading').show();
			$('.content').hide();
			setTimeout(function () {
				$('.loading').hide();
				$('.content').show();
			}, 1000);
		}, 100);
	};

	//This is how I will be able to pass in the comments with the time stamp for repeating..
	//When the user submits the comment, I will take the time stamp and note I will pass it into the array, when the user wants to view the items, they will select the button and will be taken to the page that they are able to view it....
	$scope.submitComment = function(){
		if($scope.input == ""){
			alert("Note is empty");
		}else{
			var date = new Date();
			$scope.time = date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2)+"-"+("0" + date.getHours()).slice(-2)+"-"+("0" + date.getMinutes()).slice(-2)+"-"+("0" + date.getSeconds()).slice(-2);

			$scope.inputArray = {key: $scope.time, value: $scope.input};

			$scope.testOutput.inputs[0].notes.push($scope.inputArray);
			$scope.input = "";
			$scope.$apply();
		}
	}

	$scope.done = function(){
		$location.path('/questions');
	}
})