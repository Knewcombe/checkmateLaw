/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:
 * 
 * Move File Service will allow images and recordings that are created to be moved from the * temp directory in the app directory to a different folder.
 *
 * Will use the callback to send the path of the file and the fileName.
 */

angular.module("app").service('FileSystemService', ['$q', function($q) {
	//This function is used when a file is created and needs to be moved from the temp directory in the applicaiton file system.
	this.moveFile = function(file, folder, fileName) {
		var deferred = $q.defer();
		window.resolveLocalFileSystemURL(file, resolveOnSuccessImage, resOnError);

		//Callback function when the file system uri has been resolved
		function resolveOnSuccessImage(entry) {
			//new file name and folder.
			var newFileName = fileName;
			var myFolderApp = folder;

			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
				//The folder is created if doesn't exis
				var fileSystem = fileSys.root.toURL();
				fileSys.root.getDirectory(myFolderApp,
										  {create: true, exclusive: false},
										  function (directory) {
					entry.moveTo(directory, newFileName, successMoveImage, resOnError);
				},
										  resOnError);
			},
									 resOnError);
		}

		//Callback function when the file has been moved successfully - inserting the complete path
		function successMoveImage(entry) {
			//I do my insert with "entry.fullPath" as for the path
			deferred.resolve(entry.fullPath);
			//**This is where the callback will occur.**
			//$scope.currentQuestion.inputs[0].photos.push(path);
			//$scope.$apply();
			document.addEventListener('deviceready', onDeviceReady);
			function onDeviceReady()
			{
				var success = function(status) {
					//				alert('Message: ' + status);
				}

				var error = function(status) {
					//				alert('Error: ' + status);
				}

				window.cache.clear( success, error );
				window.cache.cleartemp(); //  
			}
		}

		function resOnError(error) {
			deferred.reject(error.code);
			alert("Error"+error.code);
		}
		return  deferred.promise;
	}
	//Function is used when a file needs to be removed from the application file directory.
	this.removeFile = function(fileUri){
		window.resolveLocalFileSystemURL(fileUri, resolveOnSuccessImage, resOnError);

		//Callback function when the file system uri has been resolved
		function resolveOnSuccessImage(entry) {
			//Removeing the file from the file directory.
			entry.remove;
		}
		function resOnError(error) {
			alert("Error"+error.code);
		}
	}
}]);