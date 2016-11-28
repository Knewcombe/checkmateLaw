angular.module("app").service('FingerPrintAuth', ['$q', '$rootScope', '$localStorage', function($q, $rootScope, $localStorage) {

	this.fingerPrintAndroid = function(){
		var deferred = $q.defer();
		FingerprintAuth.isAvailable(function(result) {
			console.log(result);
				if (result.isAvailable) {
						if(result.hasEnrolledFingerprints){
							console.log("True");
							FingerprintAuth.show({
									clientId: "app",
									clientSecret: $localStorage.userCode,
									disableBackup: true
							}, function (result) {
									if (result.withFingerprint) {
											deferred.resolve(true);
									}
							}, function(error) {
									console.log(error); // "Fingerprint authentication not available"
									if(error == "Cancelled"){
										deferred.resolve(false);
									}
							});
						}else{
							console.log("false");
								deferred.reject();
						}
				}
		}, function(message) {
				deferred.reject();
		});
		return deferred.promise;
	}

	this.fingerPrintiOS = function(){
		console.log("Called");
		var deferred = $q.defer();
		window.plugins.touchid.isAvailable(
    // success handler; available
    function() {
      window.plugins.touchid.verifyFingerprint(
				'Scan your fingerprint please',
          function(msg) {
            console.log(msg);
						deferred.resolve(true);
          },
					function(msg){
						console.log(msg);
						deferred.reject();
					}
      );
    },
    // error handler; not available
    function(msg) {
      // use a more traditional auth mechanism
			console.log("iOS not there");
			deferred.resolve(false);
    }
	);
	return deferred.promise;
	}
}]);
