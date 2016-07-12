angular.module("app").controller('EnterCodeController', function($scope, $rootScope, $localStorage, $sessionStorage, $location) {
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = false;

	$scope.init = function () {
		var promptCallback = function(buttonIndex){
			if(buttonIndex == 1){
				console.log("True");
				$localStorage.version = BuildInfo.versionCode;
			}else{
				$location.path("/");
				$scope.$apply();
			}
		}
		navigator.notification.confirm("I, the user, hereby agree to the following terms and conditions. Invention description(s), technical and business information relating to proprietary ideas and inventions, unique processes, procedures. and software applications, patentable ideas, trade secrets, drawings and/or illustrations, patent searches, existing and/or contemplated products and services, research and development, production, costs, profit and margin information, finances and financial projections, customers, clients, marketing, and current or future business plans and models, regardless of whether such information is designated as “Confidential Information” at the time of its disclosure.", promptCallback, "Confidential Information", ["I Agree", "Not now"]);
	}

	$scope.userCode;
	$scope.confirmCode;

	$scope.submitCode = function(){
		if($scope.userCode === undefined || $scope.confirmCode === undefined){
			alert("Please enter a security code");
		}else{
			if($scope.userCode === $scope.confirmCode){
				$localStorage.userCode = $scope.userCode;
				$sessionStorage.userCode = $scope.userCode;
				$location.path($sessionStorage.return);

			}else{
				alert("Codes do not match, please try again.");
			}
		}
	};
})

angular.module("app").controller('CodeController', function($scope, $rootScope, $localStorage, $sessionStorage, $location) {
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = false;
	$scope.userCode;

	$scope.init = function () {
		var promptCallback = function(buttonIndex){
			if(buttonIndex == 1){
				console.log("True");
				$localStorage.version = BuildInfo.versionCode;
			}else{
				$location.path("/");
				$scope.$apply();
			}
		}
		if($localStorage.version != BuildInfo.versionCode){
			navigator.notification.confirm("I, the user, hereby agree to the following terms and conditions. Invention description(s), technical and business information relating to proprietary ideas and inventions, unique processes, procedures. and software applications, patentable ideas, trade secrets, drawings and/or illustrations, patent searches, existing and/or contemplated products and services, research and development, production, costs, profit and margin information, finances and financial projections, customers, clients, marketing, and current or future business plans and models, regardless of whether such information is designated as “Confidential Information” at the time of its disclosure.", promptCallback, "Confidential Information", ["I Agree", "Not now"]);	
		}
	}

	console.log($localStorage.userCode);
	$scope.checkCode = function(){
		console.log($scope.userCode);
		if($scope.userCode === undefined){
			alert("Please enter a security code");
		}else{
			if($localStorage.userCode == $scope.userCode){
				$sessionStorage.userCode = $scope.userCode;
				$location.path($sessionStorage.return);
			}else{
				alert("Code does not match. Please try again");
			}
		}
	};
});