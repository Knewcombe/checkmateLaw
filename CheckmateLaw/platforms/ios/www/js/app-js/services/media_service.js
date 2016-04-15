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
angular.module('app').service('MediaService', ['$q', 'FileSystemService', function($q, FileSystemService){
	//All variables that are shared for each function
	var src = "tempRecording.m4a";
	var myMedia;
	var deferred;
	var mediaTimer = null;
	//media function will allow the user to begin the recording of the media.
	this.media = function(){
		//Creating the new media object
		myMedia = new Media(src);
		//Options will hold th bit rate and channels of the media
		//This can be changed if the quality is too low.
		var options = {
			SampleRate: 12000,
			NumberOfChannels: 1
		}
		//Starting recording with comporession. This will take the options object to compress.
		myMedia.startRecordWithCompression(options);
	}
	//Stop media will stop the media object recording defined above.
	this.stopMedia = function(fileName){
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
			var file = FileSystemService.moveFile(fileEntry.toURL(), "Media", fileName);
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
		mediaTimer = null;
		myMedia = new Media(recording);
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
		myMedia = null;
		clearInterval(mediaTimer);
	};
}]);