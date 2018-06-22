angular.module("app").service('FingerPrintAuth', ['$q', '$rootScope', '$localStorage', function($q, $rootScope, $localStorage) {

	this.fingerPrintAndroid = function(){
		var deferred = $q.defer();
		FingerprintAuth.isAvailable(function(result) {
			console.log(result);
				if (result.isAvailable) {
						console.log("Has Finger print");
						if(result.hasEnrolledFingerprints){
							console.log("Has enrolled");
							FingerprintAuth.encrypt({
									clientId: "app",
									clientSecret: $localStorage.userCode,
									disableBackup: true
							}, function (result) {
								console.log(result);
									if (result.withFingerprint) {
											deferred.resolve(true);
									}
							}, function(error) {
									console.log(error); // "Fingerprint authentication not available"
									if(error == "FINGERPRINT_CANCELLED"){
										deferred.resolve(false);
									}
									if(error == "FINGERPRINT_ERROR"){
										deferred.resolve(false);
									}
							});
						}else{
							console.log("false");
								deferred.resolve(false);
						}
				}else{
					console.log("Nope");
					deferred.resolve(false);
				}
		}, function(message) {
				deferred.resolve(false);
		});
		return deferred.promise;
	}

	this.fingerPrintiOS = function(){
		console.log("Calling iOS");
		var deferred = $q.defer();
		window.plugins.touchid.isAvailable(
    //success handler; available
    function(type) {
			console.log("Finger Print avalible");
			console.log("type : " + type);
      window.plugins.touchid.verifyFingerprint(
				'Scan your fingerprint please',
          function(msg) {
            console.log("Message : "+msg);
						deferred.resolve(true);
          },
					function(msg){
						console.log(msg);
						deferred.resolve(false);
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
