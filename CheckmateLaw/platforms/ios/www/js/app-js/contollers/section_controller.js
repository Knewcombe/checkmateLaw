/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * Section controller that will handle all functionality for the section menu.
 *
 */

angular.module('app').controller('ReportSectionController', function ($rootScope, $scope, dataContext, $localStorage, $sessionStorage, $location, $interval) {


	//Using currentPath for Header to show the title of the report, this will change
	//Reprot name will be removed from the header.
	$scope.currentPath = $location.path();
	$localStorage.saveIndex = [];
	$scope.$storage = $localStorage;
	$scope.viewReport = ($localStorage.savedChecklist[$localStorage.savedIndex]);
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = true;
	$scope.selectedSection = $sessionStorage.sectionIndex;
	$scope.selectedQuestion = $sessionStorage.questionIndex;
	$('.loading').show();
	$('.content').hide();
	$sessionStorage.questionselected = null;
	
	function gotFS(fileSystem){
		console.log("gotFS called");
		$scope.fileSystem = fileSystem.root.toURL();
	}

	function fail(){
		alert("Derp");
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
						if($scope.viewReport.sections[i].selected !== ''){
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

	//Funtion to change the pages within the report menu.
	$scope.changeMenus = function (type, index) {
		$sessionStorage.sectionIndex = index;
		$location.path('/questions');
		$sessionStorage.selectedDiv = type + index;
	};

	//This is for selection sections and questions.
	$scope.showHideInfo = function (type, id, option) {
		$('.sectionOption').hide();
		$('.' + $scope.viewReport.sections[id].options[option].title).show();
		$scope.selectOption = option;
		$scope.viewReport.sections[id].selected = option;
	};
});

