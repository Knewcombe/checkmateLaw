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
		tempReport.dateStamp = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes();
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
	};

	$scope.homeButton = function (){
		$location.path('/');
	}

	$scope.sectionButton = function(){
		$location.path('/sections');
	}

})
//Saved reports controller.
	.controller('ReportSavedController', function ($scope, $location, dataContext, PdfFromat, $localStorage, $interval, $rootScope, $sessionStorage) {

	$scope.$storage = $localStorage;
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = false;

	function gotFS(fileSystem){
		console.log("gotFS called");
		$scope.fileSystem = fileSystem.root.toURL();
	}

	function fail(){
		alert("Derp");
	}

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

	$scope.emailList = function($index){
		console.log("Called");
		$scope.$storage.savedIndex = $index;
		$localStorage.checklistPdf = $localStorage.savedChecklist[$index];

		function email(path, fileName, zipFileName){
			console.log("Works");
			cordova.plugins.email.open({
				//			to:          [""], // email addresses for TO field
				//			cc:          [""], // email addresses for CC field
				//			bcc:         [""], // email addresses for BCC field
				attachments: [path+fileName, path+zipFileName],// file paths or base64 data streams
				subject:    $localStorage.checklistPdf.title +"_"+$localStorage.checklistPdf.name+"_"+$localStorage.checklistPdf.dateStamp, // subject of the email
				body:       "", // email body (for HTML, set isHtml to true)
				isHtml:    true, // indicats if the body is HTML or plain text
			}, function () {
				console.log('email view dismissed');
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
					//Removing the pdf file after the email.
					fileSystem.root.getFile(fileName, {create:false}, function(fileEntry){
						fileEntry.remove(function(file){
							console.log("PDF File removed!");
							document.addEventListener('deviceready', onDeviceReady);
							function onDeviceReady()
							{
								var success = function(status) {
									//									alert('Message: ' + status);
								}

								var error = function(status) {
									//									alert('Error: ' + status);
								}

								window.cache.clear( success, error );
								window.cache.cleartemp();
							}
						},function(){
							console.log("error deleting the file " + error.code);
						});
					},function(){
						console.log("file does not exist");
					});
					//Removing the zip file after the email is complete.
					fileSystem.root.getFile(zipFileName, {create:false}, function(fileEntry){
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
			},
									   this);
		}
		//For the zip file.
		var inputsArray = [];
		$.each($localStorage.checklistPdf.sections, function(sections){
			$.each($localStorage.checklistPdf.sections[sections].questions, function(questions){
				if($localStorage.checklistPdf.sections[sections].questions[questions].type == "multiQuestion"){
					$.each($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions, function(additional){
						if($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].photos.length > 0){
							$.each($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].photos, function(photos){
								//ADDING TO IMAGE ARRAY
								inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].photos[photos]);
							});
						}
						if($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].recording.length > 0){
							$.each($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].recording, function(recording){		
								//ADDING TO RECORDING ARRAY
								inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].recording[recording].replace('documents://',''));
							});
						}
					});
				}else{
					if($localStorage.checklistPdf.sections[sections].questions[questions].type == "question"){
						if($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].photos.length > 0){
							$.each($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].photos, function(photos){
								//ADDING TO IMAGE ARRAY
								inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].photos[photos]);
							});
						}
						if($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].recording.length > 0){
							$.each($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].recording, function(recording){
								//ADDING TO RECORDING ARRAY
								inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].recording[recording].replace('documents://',''));
							});
						}
					}
				}
			});
		});
		var zip = new JSZip();
		var arrayList = [];
		var zipFileName = $localStorage.checklistPdf.title +"_"+$localStorage.checklistPdf.name+".zip";
		function saveZip(){
			console.log("_______THIS IS WRITING THE FILE ZIP FILE________");
			var content = zip.generate({
				type: 'blob',
				compressionOptions : {level:9}
			});
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
				console.log("File system root toURL - "+fileSystem.root.toURL());
				path = fileSystem.root.toURL();
				fileSystem.root.getFile(zipFileName, {create: true}, function(entry) {
					console.log("File system First path - "+path);
					var fileEntry = entry;
					console.log(entry);
					entry.createWriter(function(writer) {
						writer.onwrite = function(evt) {
							console.log("write success");
							//USING A CALLBACK FOR THE PDF STUFF
							PdfFromat.getPDF($localStorage.checklistPdf, email, zipFileName);
						};
						console.log("writing to file");
						console.log("File system Third path - "+path);
						writer.write(content);
					}, function(error) {
						console.log(error);
					});

				}, function(error){
					console.log(error);
				});
			},
									 function(event){
				console.log( evt.target.error.code );
			});
		}
		function addToZip(link, zip){
			var deferred = $.Deferred();
			JSZipUtils.getBinaryContent($scope.fileSystem+link, function (err, data) {
				if(err) {
					console.log(err);
					deferred.resolve(zip);
				}
				zip.file(link, data, {base64:true});
				deferred.resolve(zip);
			});
			return deferred;
		}
		if(inputsArray.length > 0){
			for(var pIndex=0; pIndex<inputsArray.length; pIndex++){
				arrayList.push(addToZip(inputsArray[pIndex], zip))
			}
			$.when.apply(window, arrayList).done(saveZip);	
		}else{
			PdfFromat.getPDF($localStorage.checklistPdf, email, "");
		}
	}

	$scope.deleteList = function ($index) {
		var deleteChecklist = confirm('You sure?');

		if (deleteChecklist) {
			$scope.$storage.savedChecklist.splice($index, 1);
			$location.path('/report/saved');
		}
	};

	$scope.edit = function ($index) {
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

	$scope.init = function () {
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

	//This is how I will be able to pass in the comments with the time stamp for repeating..
	//When the user submits the comment, I will take the time stamp and note I will pass it into the array, when the user wants to view the items, they will select the button and will be taken to the page that they are able to view it....
	$scope.submitComment = function(){
		if($scope.input == ""){
			alert("Note is empty");
		}else{
			var date = new Date();
			$scope.time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes();

			$scope.inputArray = {key: $scope.time, value: $scope.input};

			$scope.testOutput.inputs[0].notes.push($scope.inputArray);
			$scope.input = "";
			$scope.$apply();
		}
	}
})

	.controller('ImageController', function ($localStorage, $sessionStorage, $scope, $location, $rootScope){
	$scope.fullImage = $localStorage.tempImage;
});