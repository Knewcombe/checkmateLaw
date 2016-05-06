angular.module("app").controller('EnterCodeController', function($scope, $rootScope, $localStorage, $sessionStorage, $location) {
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = false;

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