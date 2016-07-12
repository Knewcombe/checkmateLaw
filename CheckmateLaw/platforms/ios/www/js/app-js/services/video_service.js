angular.module("app").service('VideoService', ['$localStorage', '$sessionStorage', '$q', '$rootScope', 'FileSystemService', function ($localStorage, $sessionStorage, $q, $rootScope, FileSystemService) {
	var myMedia;
	var deferred;

	this.getVideo = function(fileName, folder){
		deferred = $q.defer();
		var captureSuccess = function(media) {
			var extension = media[0].name.split(".").pop();
			var file = FileSystemService.moveFile(media[0].localURL, folder, fileName+"."+extension);

			//Waiting for a promise from file service and will resolve this service promise.
			file.then(function(data){
				console.log("PROMIS: "+data);
				deferred.resolve(data);
			});
		};

		// capture error callback
		var captureError = function(error) {
			navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
			deferred.reject();
		};

		// start video capture
		navigator.device.capture.captureVideo(captureSuccess, captureError);

		return deferred.promise;
	}
	
	this.playVideo = function(video){
		//If the file is found, will call the file service and move the file to the proper location the we will set.
		function fail(){
			alert("An error occured in the application. Please kill and relaunch the app.");
		}
		function gotFileEntry(fileEntry){
			console.log(fileEntry)
			//Waiting for a promise from file service and will resolve this service promise.
			var options = {
				successCallback: function() {
					console.log("Video was closed without error.");
				},
				errorCallback: function(errMsg) {
					console.log("Error! " + errMsg);
				},
				orientation: 'landscape'
			};
			window.plugins.streamingMedia.playVideo(fileEntry.toURL(), options);
		}
		//Once the file system is defined, the media file will be taken from the tmp directory.
		function fileGot(fileSys){
			fileSys.root.getFile(video, {create: true, exclusive: false}, gotFileEntry, fail);
		}
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileGot, fail);
	}

}]);