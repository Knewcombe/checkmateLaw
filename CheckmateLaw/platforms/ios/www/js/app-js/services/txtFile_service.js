//This is were the txt file will be writen from the notes for the checklists
// - Is will look at the section and question numbers and place them like 1.1 1.2 1.3
// The first number will indicate the section and the second number indicates the question.
// This will sort them out, but I dought that anyone will like it...

angular.module("app").service('TxtService', ['$localStorage', '$sessionStorage', '$q', '$rootScope', function($localStorage, $sessionStorage, $q, $rootScope){

	this.writeTxt = function(data, name){
		var deferred = $q.defer();
		var fileName = name;
		var checklist = data;
		var noteCheck = false;
		var notes = name.replace(".txt", "")+"\n"+checklist.occurranceNumber+"\n"+"\n";

		$.each(checklist.sections, function(secIndex){
			if(checklist.sections[secIndex].type != "selectionSection"){
				$.each(checklist.sections[secIndex].questions, function(quesIndex){
					if(checklist.sections[secIndex].questions[quesIndex].type != "multiQuestion"){
						if(checklist.sections[secIndex].questions[quesIndex].inputs){
							if(checklist.sections[secIndex].questions[quesIndex].inputs[0].notes.length > 0){
								$.each(checklist.sections[secIndex].questions[quesIndex].inputs[0].notes, function(noteIndex){
									notes += ((secIndex+1)+"."+(quesIndex+1)+" "+checklist.sections[secIndex].questions[quesIndex].inputs[0].notes[noteIndex].key + " "+ checklist.sections[secIndex].questions[quesIndex].inputs[0].notes[noteIndex].value+"\n");
								});
								noteCheck = true;
								notes += "\n"
							}
						}
					}else{
						$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions, function(addIndex){
							if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs){
								if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes.length > 0){
									$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes, function(noteIndex){
										notes += ((secIndex+1)+"."+(quesIndex+1)+"."+(addIndex+1)+" "+checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes[noteIndex].key + " "+ checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes[noteIndex].value+"\n");
									});
									noteCheck = true;
									notes += "\n"
								}
							}
						});
					}
				})	
			}
		})
		if(noteCheck){
			console.log("True: Text file will be writen");
			
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

				console.log("File system root URL - " + fileSystem.root.toURL());
				var path = fileSystem.root.toURL();
				fileSystem.root.getFile(fileName, {create:true}, function(entry){
					console.log("File found - "+path);
					var fileEntry = entry;

					entry.createWriter(function(writer){
						writer.onwrite = function(evt){
							console.log("Write successfull");
							deferred.resolve(entry.nativeURL);
						}
						var blob = new Blob([notes], {type:'txt/plain'});
						writer.write(blob);
					},	function(error){
						console.log("Unable to write to file "+error);
						deferred.reject();
					});
				}, function(error){
					console.log("Unable to find or create file "+error);
					deferred.reject();
				});
			}, function(error){
				console.log("Unable to find fileSystem "+error);
				deferred.reject();
			});
		}else{
			console.log("False: Text File is not writen");
			deferred.resolve("");
		}
		return deferred.promise;
	}
}]);