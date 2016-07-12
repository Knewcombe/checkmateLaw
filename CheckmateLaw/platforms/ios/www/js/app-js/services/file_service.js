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

angular.module("app").service('FileSystemService', ['$q', '$rootScope', function($q, $rootScope) {
	//This function is used when a file is created and needs to be moved from the temp directory in the applicaiton file system.
	this.moveFile = function(file, folder, fileName) {
		var deferred = $q.defer();
		console.log("File service: "+fileName);
		window.resolveLocalFileSystemURL(file, resolveOnSuccessImage, resOnError);

		//Callback function when the file system uri has been resolved
		function resolveOnSuccessImage(entry) {
			//new file name and folder.
			console.log("-------Found file-------");
			console.log(entry);
			var newFileName = fileName;
			var myFolderApp = folder;

			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
				//The folder is created if doesn't exis
				var fileSystem = fileSys.root.toURL();
				fileSys.root.getDirectory(myFolderApp,
										  {create: true, exclusive: false},
										  function (directory) {
					console.log(directory);
					console.log(newFileName);
					if($rootScope.platform != "Android"){
						console.log("----IOS----");
						entry.moveTo(directory, newFileName, successMoveImage, resOnError);
					}else{
						console.log("----ANDROID----");
						entry.copyTo(directory, newFileName, successMoveImage, resOnError);
					}
				},
										  resOnError);
			},
									 resOnError);
		}

		//Callback function when the file has been moved successfully - inserting the complete path
		function successMoveImage(entry) {
			//I do my insert with "entry.fullPath" as for the path
			deferred.resolve(entry.fullPath);
			console.log("----------- MOVE FILE SUCCESS -----------");
			console.log(entry);
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
				}
		}

		function resOnError(error) {
			deferred.reject(error.code);
			alert("Error "+error.code);
			console.log(error);
		}
		return deferred.promise;
	}
	//Function is used when a file needs to be removed from the application file directory.
	this.removeFile = function(fileUri){
		var deferred = $q.defer();
		window.resolveLocalFileSystemURL(fileUri, resolveOnSuccessImage, resOnError);

		//Callback function when the file system uri has been resolved
		function resolveOnSuccessImage(entry) {
			//Removeing the file from the file directory.
			function removedFile(){
				alert("File has been removed");
			}
			function promptCallback(buttonIndex){
				if(buttonIndex == 1){
					entry.remove(removedFile);
					deferred.resolve();
				}else{
					deferred.reject();
				}
			}
			console.log(entry);
			navigator.notification.confirm("Are you sure?", promptCallback, "Delete File", ["Yes", "No"]);
		}
		function resOnError(error) {
			alert("Error "+error.code);
			deferred.reject();
		}
		return deferred.promise;
	}

	this.moveEmailFiles = function(path, fileName){

		document.addEventListener('deviceready', onDeviceReady);
		var deferred = $q.defer();
		function onDeviceReady(){
			console.log("---------File Service---------");
			console.log(path);
			console.log(fileName);

			window.resolveLocalFileSystemURL(path, resolveOnSuccessImage, resOnError);

			function resolveOnSuccessImage(entry){
				window.resolveLocalFileSystemURL(cordova.file.externalCacheDirectory, function (fileSys) {
					//The folder is created if doesn't exis
					//					var fileSystem = fileSys.root.toURL();
					console.log("------File System Cache------");
					console.log(fileSys);
					entry.copyTo(fileSys, fileName, successMoveImage, resOnError);
					//					fileSys.root.getDirectory(externalCacheDir,
					//											  {create: false, exclusive: false},
					//											  function (directory) {
					//						console.log("-----File Dir ----- "+directory);
					//					},
					//											  resOnError);
				},
												 resOnError);
			}

			//Callback function when the file has been moved successfully - inserting the complete path
			function successMoveImage(entry) {
				//I do my insert with "entry.fullPath" as for the path
				deferred.resolve(entry.fullPath);
				console.log("----------- MOVE IMAGE SUCCESS -----------");
				console.log(entry);
				//**This is where the callback will occur.**
				//$scope.currentQuestion.inputs[0].photos.push(path);
				//$scope.$apply();
				document.addEventListener('deviceready', onDeviceReady);
				function onDeviceReady(){
					var success = function(status) {
						//				alert('Message: ' + status);
					}

					var error = function(status) {
						//				alert('Error: ' + status);
					}
					}
			}

			function resOnError(error) {
				deferred.reject(error.code);
				console.log(error);
				alert("Error "+error.code);
			}
		}

		return  deferred.promise;
	}
}]);