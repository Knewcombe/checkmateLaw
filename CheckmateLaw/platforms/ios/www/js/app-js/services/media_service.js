/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * Media service will allow the user to record audio and be able to play it back.
 * All functions are seperated into different controls needed to create and play the audio.
 *
 */
angular.module('app').service('MediaService', ['$q', 'FileSystemService','$rootScope', function($q, FileSystemService, $rootScope){
	//All variables that are shared for each function
	var src = "tempRecording.m4a";
	var myMedia;
	var deferred;
	var options = {
		SampleRate: 12000,
		NumberOfChannels: 1
	}
	var mediaTimer = null;
	//media function will allow the user to begin the recording of the media.
	this.media = function(fileName, folder){
		deferred = $q.defer();
		var onSuccess = function(media){
			//Creating promise for the callback.
			console.log(media);
			var extension = media[0].name.split(".").pop();
			var file = FileSystemService.moveFile(media[0].localURL, folder, fileName+"."+extension);
			//Waiting for a promise from file service and will resolve this service promise.
			file.then(function(data){
				console.log("PROMIS: "+data);
				deferred.resolve(data);
			});
		}

		var onError = function(err){
			console.log(err);
			var promptCallback = function(buttonIndex){
				if(buttonIndex == 1){
					window.open('https://play.google.com/store/apps/details?id=com.sonymobile.androidapp.audiorecorder&hl=en', '_blank');
				}
			}
			navigator.notification.confirm("There is no audio recording app install on your device. Please go to Google Play to install one now.", promptCallback, "Unable to record audio", ["Go to Google Play", "Not now"]);
			deferred.reject();
		}

		if($rootScope.platform != "Android"){
			console.log("----------iOS Media----------");
			myMedia  = new Media(src);
			console.log(myMedia);
			myMedia.startRecordWithCompression(options);
		}else{
			console.log("----------Android Media----------");
			myMedia  = navigator.device.capture;
			myMedia.captureAudio(onSuccess, onError);
		}
		return deferred.promise;
	}
	//-----THIS IS FOR IOS ONLY, THIS IS TO ALLOW COMPRESSION----
	this.stopMedia = function(fileName, folder){
		myMedia.stopRecord();
		myMedia = null;
		//Creating promise for the callback.
		deferred = $q.defer();
		//Getting file system to find the media n the Tmp folder of the app file system.
		window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, fileGot, fail);
		//Once the file system is defined, the media file will be taken from the tmp directory.
		function fileGot(fileSys){
			fileSys.root.getFile(src, {create: true, exclusive: false}, gotFileEntry, fail);
		}
		//If the file is found, will call the file service and move the file to the proper location the we will set.
		function gotFileEntry(fileEntry){
			var file = FileSystemService.moveFile(fileEntry.toURL(), folder, fileName);
			//Waiting for a promise from file service and will resolve this service promise.
			file.then(function(data){
				deferred.resolve(data);
			});
		}
		//Unable to find the file.
		function fail(){
			deferred.reject();
		}
		//Return the promise to controller.
		return deferred.promise;
	}

	//Play file will take the path to the file and a callback function.
	this.playFile = function(recording, callback){
		var duration = 0;
		var currentPosition = 0;
		var roundedDuration = 0;
		console.log("MEDIA LOCATION "+recording);
		mediaTimer = null;
		myMedia = null;
		var onSucess = function(){
			console.log("----------MEDIA CREATED----------");
		}
		var onError = function(error){
			console.log("------MEDIA ERROR------");
			console.log(error);
		}

		myMedia = new Media(recording, onSucess, onError);
		myMedia.play();
		//Media timer will be setting the duration and position for the media file that is playing.
		if (mediaTimer === null) {
			//Setting an interval to loop for the position of the media file.
			//This will be stoped when the Stop playing is called.
			mediaTimer = setInterval(function () {
				//Getting duration of the media file.
				duration = myMedia.getDuration();
				//Getting current position media file.
				myMedia.getCurrentPosition(function (position) {
					if (position > -1 && position <= duration) {
						//Setting the position and duration of the media file.
						currentPosition = Math.round(position);
						roundedDuration = Math.round(duration);
						//Callback is called and will return the values to display to the user.	
						callback(currentPosition, roundedDuration);
					} else {
						currentPosition = 0;
						roudedDuration = 0;
					}					
				},
										   // error callback
										   function (e) {
					alert("Error playing memo");
				}
										  );
			}, 1000);
		}
	}
	//Stop playing will stop the media file playback and set the media object to null
	//This will also clear the interval to stop the position and duration values.
	this.stopPlaying = function(){
		myMedia.stop();
		myMedia.release();
		myMedia = null;
		clearInterval(mediaTimer);
	};
}]);