angular.module('app').service('ZipService', ['$rootScope', '$q', '$localStorage', 'SecurityService', function ($rootScope, $q, $localStorage, SecurityService){

	this.getZip = function(name){
		var zipDeffered = $q.defer();
		var path;
		//For the zip file.
		var inputsArray = [];
		$.each($localStorage.checklistPdf.sections, function(sections){
			if($localStorage.checklistPdf.sections[sections].type != "selectionSection"){
				console.log("Called");
				$.each($localStorage.checklistPdf.sections[sections].questions, function(questions){
					if($localStorage.checklistPdf.sections[sections].questions[questions].type == "multiQuestion"){
						$.each($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions, function(additional){
							if($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].photos.length > 0){
								$.each($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].photos, function(photos){
									//ADDING TO IMAGE ARRAY
									inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].photos[photos]);
								});
							}
							if($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].recording.length > 0){
								$.each($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].recording, function(recording){
									//ADDING TO RECORDING ARRAY
									inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].recording[recording].replace('documents://',''));
								});
							}
							if($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].videos.length > 0){
								$.each($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].videos, function(video){
									//ADDING TO RECORDING ARRAY
									inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].additionalQuestions[additional].inputs[0].videos[video].replace('documents://',''));
								});
							}
						});
					}else{
						if($localStorage.checklistPdf.sections[sections].questions[questions].type == "question"){
							if($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].photos.length > 0){
								$.each($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].photos, function(photos){
									//ADDING TO IMAGE ARRAY
									inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].photos[photos]);
								});
							}
							if($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].recording.length > 0){
								$.each($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].recording, function(recording){
									//ADDING TO RECORDING ARRAY
									inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].recording[recording].replace('documents://',''));
								});
							}
							if($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].videos.length > 0){
								$.each($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].videos, function(video){
									//ADDING TO RECORDING ARRAY
									inputsArray.push($localStorage.checklistPdf.sections[sections].questions[questions].inputs[0].videos[video].replace('documents://',''));
								});
							}
						}
					}
				});
			}
		});
		var zip = new JSZip();
		var arrayList = [];
		var zipFileName = name;
		function saveZip(){
			console.log("_______THIS IS WRITING THE FILE ZIP FILE________");
			var content = zip.generate({
				type: 'blob',
				compressionOptions : {level:9}
			});
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
				console.log("File system root toURL - "+fileSystem.root.toURL());
				path = fileSystem.root.toURL();
				fileSystem.root.getFile(zipFileName, {create: true}, function(entry) {
					console.log("File system First path - "+path);
					var fileEntry = entry;
					console.log(entry);
					entry.createWriter(function(writer) {
						writer.onwrite = function(evt) {
							console.log("write success");
							//USING A CALLBACK FOR THE PDF STUFF
//							PdfFromat.getPDF($localStorage.checklistPdf, email, zipFileName);
							console.log(zipFileName);
							zipDeffered.resolve(entry.nativeURL);
						};
						console.log("writing to file");
						console.log("File system Third path - "+path);
						writer.write(content);
					}, function(error) {
						zipDeffered.reject();
						console.log(error);
					});

				}, function(error){
					zipDeffered.reject();
					console.log(error);
				});
			},
									 function(event){
				zipDeffered.reject();
				console.log( evt.target.error.code );
			});
		}
		function addToZip(link, zip){
			console.log("------ADD TO ZIP------");
			console.log(link);
			console.log(zip);
			var deferred = $.Deferred();
			// JSZipUtils.getBinaryContent($rootScope.root+link, function (err, data) {
			// 	if(err) {
			// 		console.log(err);
			// 		deferred.resolve(zip);
			// 	}
			//
			// });

			SecurityService.decyptFileBase64($rootScope.root+link).then(function(data){
				zip.file(link, data, {base64:true});
				deferred.resolve(zip);
			})
			return deferred;
		}

		if(inputsArray.length > 0){
			console.log("No files are added.");
			for(var pIndex=0; pIndex<inputsArray.length; pIndex++){
				arrayList.push(addToZip(inputsArray[pIndex], zip))
			}
			$.when.apply(window, arrayList).done(saveZip);
		}else{
			console.log("File are in");
//			PdfFromat.getPDF($localStorage.checklistPdf, email, "");
			zipDeffered.resolve("");
		}
		return zipDeffered.promise;
	}
}]);
