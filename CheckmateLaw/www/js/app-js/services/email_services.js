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

angular.module("app").service('EmailServices', ['$q', '$rootScope', 'PdfFromat', 'FileSystemService', 'ZipService', '$interval', '$localStorage', 'TxtService',
function($q, $rootScope, PdfFromat, FileSystemService, ZipService, $interval, $localStorage, TxtService) {

	emailView = function(attachments){
		console.log("Email");
		console.log(attachments)
		cordova.plugins.email.open({
			to:          $localStorage.emailList, // email addresses for TO field
			//			cc:          [""], // email addresses for CC field
			//			bcc:         [""], // email addresses for BCC field
			attachments: attachments,// file paths or base64 data streams
			subject:    $localStorage.checklistPdf.title +"_"+$localStorage.checklistPdf.name+"_"+$localStorage.checklistPdf.dateStamp, // subject of the email
			body:       "", // email body (for HTML, set isHtml to true)
			isHtml:    true, // indicats if the body is HTML or plain text
		}, function () {
			console.log('email view dismissed');
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
				//Removing the pdf file after the email.
				fileSystem.root.getFile($rootScope.pdfFileName, {create:false}, function(fileEntry){
					fileEntry.remove(function(file){
						console.log("PDF File removed!");
						document.addEventListener('deviceready', onDeviceReady);
					},function(){
						console.log("error deleting the file " + error.code);
					});
				},function(){
					console.log("file does not exist");
				});
				//Removing the pdf file after the txt.
				fileSystem.root.getFile($rootScope.txtFileName, {create:false}, function(fileEntry){
					fileEntry.remove(function(file){
						console.log("Txt File removed!");
						document.addEventListener('deviceready', onDeviceReady);
					},function(){
						console.log("error deleting the file " + error.code);
					});
				},function(){
					console.log("file does not exist");
				});
				//Removing the zip file after the email is complete.
				fileSystem.root.getFile($rootScope.zipFileName, {create:false}, function(fileEntry){
					fileEntry.remove(function(file){
						console.log("ZIP File removed!");
					},function(){
						console.log("error deleting the file " + error.code);
					});
				},function(){
					console.log("file does not exist");
				});
			},function(evt){
				console.log(evt.target.error.code);
			});
		},this);
	}

	this.email = function(pdfFileName, zipFileName, txtFileName){

		$rootScope.pdfFileName = pdfFileName;
		$rootScope.zipFileName = zipFileName;
		$rootScope.txtFileName = txtFileName;

		var deferred = $q.defer();

		cordova.plugins.email.isAvailable(
			function (isAvailable){
				var attachments = [];
				// alert('Service is not available') unless isAvailable;
				console.log("------ EMAIL ------");
				console.log(cordova.file.externalCacheDirectory);
				console.log(isAvailable);
				if(isAvailable){
					console.log("Called");
					if($rootScope.platform == "Android"){
						var pdfPromise = PdfFromat.getPDF($localStorage.checklistPdf, $rootScope.pdfFileName);
						pdfPromise.then(function(pdfPath){
							console.log(pdfPath);
							var pdfFilePromise = FileSystemService.moveEmailFiles(pdfPath, $rootScope.pdfFileName);
							pdfFilePromise.then(function (newPdfName){
								attachments.push($rootScope.fileSys+newPdfName);
								console.log("------PDF File Complete------");
								var txtPromise = TxtService.writeTxt($localStorage.checklistPdf, $rootScope.txtFileName);
								txtPromise.then(function(txtPath){
									if(txtPath != ""){
										var txtFilePromise = FileSystemService.moveEmailFiles(txtPath, $rootScope.txtFileName);
										txtFilePromise.then(function(newTxtName){
											console.log("------Txt file complete------");
											console.log(newTxtName);
											attachments.push($rootScope.fileSys+newTxtName);
											console.log(attachments);
										});
									}
									var zipPromise = ZipService.getZip($rootScope.zipFileName);
									zipPromise.then(function (zipPath){
										console.log("------Zip File Complete------");
										console.log(zipPath);
										if(zipPath != ""){
											console.log("ZIP FILE FOUND");
											var zipFilePromise = FileSystemService.moveEmailFiles(zipPath, $rootScope.zipFileName);
											zipFilePromise.then(function (newZipName){
												console.log("------Zip File Complete------");
												console.log(newZipName);
												attachments.push($rootScope.fileSys+newZipName);
												//CALLING THE EMAIL
												//IF the zip file is not generated due to the user not have any images or memos
												//A check must occur to insure the attachments section for the email plugin does not crash
												emailView(attachments);
												deferred.resolve();
											})
										}else{
											deferred.resolve();
											emailView(attachments);
										}
									})
								});
							});
						})
					}else{
						console.log("------IOS------");
						var pdfPromise = PdfFromat.getPDF($localStorage.checklistPdf, $rootScope.pdfFileName);
						pdfPromise.then(function(pdfPath){
							console.log("------PDF File Complete------");
							console.log(pdfPath);
							$rootScope.pdfFile = $rootScope.pdfFileName;
							attachments.push($rootScope.root+$rootScope.pdfFile);
							var txtPromise = TxtService.writeTxt($localStorage.checklistPdf, $rootScope.txtFileName);
							txtPromise.then(function(txtPath){
								$rootScope.txtFile = $rootScope.txtFileName;
								if(txtPath != ""){
									attachments.push($rootScope.root+$rootScope.txtFile);
								}
								var zipPromise = ZipService.getZip($rootScope.zipFileName);
								zipPromise.then(function (zipPath){
									console.log("------Zip File Complete------");
									console.log(zipPath);
									$rootScope.zipFile = $rootScope.zipFileName;
									//CALLING THE EMAIL
									//IF the zip file is not generated due to the user not have any images or memos
									//A check must occur to insure the attachments section for the email plugin does not crash
									if(zipPath != ""){
										console.log("ZIP FILE FOUND");
										attachments.push($rootScope.root+$rootScope.zipFile);
									}
									deferred.resolve();
									emailView(attachments);
								})
							})
						})
					}
				}else{
					window.plugins.toast.showWithOptions({
						message: "Email services are not available, please make sure you have email setup on the device.",
						duration: "long", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
						position: "bottom",
						addPixelsY: 0  // added a negative value to move it up a bit (default 0)
					})
					deferred.reject();
				}
			});
			return deferred.promise;

			}
}]);
