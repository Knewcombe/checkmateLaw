angular.module("app").controller('EnterCodeController', function($scope, $rootScope, $localStorage, $sessionStorage, $location) {
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = false;
	$rootScope.optionsList = false;

	$("#usercode").keyup(function() {
    $("#usercode").val(this.value.match(/[0-9]*/));
	});

	$("#confirmCode").keyup(function() {
    $("#confirmCode").val(this.value.match(/[0-9]*/));
	});

	$scope.init = function () {
		var promptCallback = function(buttonIndex){
			if(buttonIndex == 1){
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
			window.plugins.toast.showWithOptions(
    	{
      	message: "Please enter a security code",
      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
      	position: "bottom",
      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
    	})
		}else{
			if($scope.userCode === $scope.confirmCode){
				if($scope.userCode.length == 6){
					$localStorage.userCode = $scope.userCode;
					$sessionStorage.userCode = $scope.userCode;
					$location.path($sessionStorage.return);
				}else{
					window.plugins.toast.showWithOptions(
		    	{
		      	message: "Security Codes must be at lest 6 characters long",
		      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
		      	position: "bottom",
		      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
		    	})
				}
			}else{
				window.plugins.toast.showWithOptions(
	    	{
	      	message: "Security Codes do not match, please try again.",
	      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
	      	position: "bottom",
	      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
	    	})
			}
		}
	};
})

.controller('CodeController', function($scope, $rootScope, $localStorage, $sessionStorage, $location) {
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = false;
	$scope.userCode;

	$("#code").keyup(function() {
    $("#code").val(this.value.match(/[0-9]*/));
	});

	$scope.init = function () {
		var promptCallback = function(buttonIndex){
			if(buttonIndex == 1){
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

	$scope.checkCode = function(){
		if($scope.userCode === undefined){
			window.plugins.toast.showWithOptions(
			{
				message: "Please enter a security code",
				duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
				position: "bottom",
				addPixelsY: 0  // added a negative value to move it up a bit (default 0)
			})
		}else{
			if($localStorage.userCode == $scope.userCode){
				$sessionStorage.userCode = $scope.userCode;
				$location.path($sessionStorage.return);
			}else{
				window.plugins.toast.showWithOptions(
	    	{
	      	message: "Security Codes do not match, please try again.",
	      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
	      	position: "bottom",
	      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
	    	})
			}
		}
	};
})

.controller('ChangeCodeController', function($scope, $rootScope, $localStorage, $sessionStorage, $location) {
	$rootScope.isHomepage = false;
	$rootScope.isResizeDiv = false;
	$rootScope.optionsList = false;
	// This will allow only numbers will be user ad limit the amount of characters
	$("#oldCode").keyup(function() {
    $("#oldCode").val(this.value.match(/[0-9]*/));
	});

	$("#newCode").keyup(function() {
    $("#newCode").val(this.value.match(/[0-9]*/));
	});

	$scope.oldCode = "";
	$scope.newCode = "";

	$scope.changeCode = function(){
		if($scope.oldCode === ""){
			window.plugins.toast.showWithOptions(
    	{
      	message: "Please enter current security code",
      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
      	position: "bottom",
      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
    	})
		}else if($scope.newCode === ""){
			window.plugins.toast.showWithOptions(
    	{
      	message: "Please enter new security code",
      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
      	position: "bottom",
      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
    	})
		}else{
			if($localStorage.userCode == $scope.oldCode){
				console.log($scope.newCode.length);
				if($scope.newCode.length == 6){
					$localStorage.userCode = $scope.newCode;
					$sessionStorage.userCode = $scope.newCode;
					window.plugins.toast.showWithOptions(
		    	{
		      	message: "Success! Security code has been changed",
		      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
		      	position: "bottom",
		      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
		    	})
				}else{
					window.plugins.toast.showWithOptions(
		    	{
		      	message: "Security code must be at least 6 characters.",
		      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
		      	position: "bottom",
		      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
		    	})
				}
			}else{
				window.plugins.toast.showWithOptions(
	    	{
	      	message: "Current security code is not correct",
	      	duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
	      	position: "bottom",
	      	addPixelsY: 0  // added a negative value to move it up a bit (default 0)
	    	})
			}
			$scope.oldCode = "";
			$scope.newCode = "";
		}
	};
});
