angular.module('app').service('MediaService', ['$q', 'FileSystemService', function($q, FileSystemService){
	
	var src = "tempRecording.m4a";
	var myMedia;
	var deferred;
	
	this.media = function(){
		myMedia = new Media(src);
		var options = {
			SampleRate: 12000,
			NumberOfChannels: 1
		}
		myMedia.startRecordWithCompression(options);
	}
	
	this.stopMedia = function(fileName){
		myMedia.stopRecord();
		myMedia = null;
		deferred = $q.defer();
		
		window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, fileGot, fail);

		function fileGot(fileSys){
			fileSys.root.getFile(src, {create: true, exclusive: false}, gotFileEntry, fail);
		}

		function gotFileEntry(fileEntry){
			var file = FileSystemService.moveFile(fileEntry.toURL(), "Media", fileName);
			file.then(function(data){
				deferred.resolve(data);
			});
		}
		return deferred.promise;
	}
}]);