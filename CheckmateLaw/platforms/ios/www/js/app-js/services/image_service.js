/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * Image Service will be called from any controller that will need the deivce to take a
 * with the device camera. This will call the file_move_service to palce the image away
 * From the temp folder in the app file directory.
 *
 * Callback will be required to return the path of the image to place in the report.
 *
 */
angular.module("app").service('ImageService', ['$q','FileSystemService', function($q, FileSystemService) {
	//Function will take picture. It will require a callback to pass to the move_file_service and the question that the picture is beign take from.
	this.image = function(newFileName, folder){
		console.log("Image service: "+ newFileName);
		var deferred = $q.defer();
		//When picture has been taken will call the move_file_Service.
		var onSuccess = function (FILE_URI) {
			console.log(" --------TMP FILE NAME--------- "+FILE_URI); 
			//Change this to allow the Move file service to move the file.
			//movePic(FILE_URI, callback);
			var promise = FileSystemService.moveFile(FILE_URI, folder, newFileName);
			promise.then(function(data){
				deferred.resolve(data);
			})
		};
		//Either the image was not able to be taken, or the user cancels the picture.
		var onFail = function (e) {
			deferred.reject();
			alert('Error taking picture' + e);
		};
		//Options to define the qulity and type of the image.
		var options = {
			quality: 10,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
			encodingType: 0, // 0=JPG 1=PNG
			correctOrientation: 1,
			saveToPhotoAlbum: 0
		};
		//Using camera on deivce to take an image.
		navigator.camera.getPicture(onSuccess, onFail, options);
		//Returning promise to controller, this will allow the rest of the code to run in the controller.
		return deferred.promise;
	}
}]);