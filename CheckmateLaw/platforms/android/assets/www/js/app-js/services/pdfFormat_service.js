angular.module("app").service('PdfFromat', function ($localStorage, $sessionStorage) {
	//FIRST GENERATE THE PDF DOCUMENT
	//$localStorage.checklistName is where the file will be saved, and I will need to figure
	//Out how to output it to the PDF...
	//Code provided by ANDREW TRICE @ http://www.tricedesigns.com/2014/01/08/generating-pdf-inside-of-phonegap-apps/
	this.getPDF = function (data, callback, zipFileName) {
		var doc = new jsPDF;
		var fileName = $localStorage.checklistPdf.title+"-"+$localStorage.checklistPdf.name+".pdf";
		var path; 
		var checklist = data;

		var checkedImagePath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAYAAAD8BaggAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0JFM0I2NjJEQjg2MTFFMzk5NkFBMzc0OUU5QzYxREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0JFM0I2NjNEQjg2MTFFMzk5NkFBMzc0OUU5QzYxREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQkUzQjY2MERCODYxMUUzOTk2QUEzNzQ5RTlDNjFEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQkUzQjY2MURCODYxMUUzOTk2QUEzNzQ5RTlDNjFEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PskUqzAAAAMhSURBVHjavFhfSFNRHL5tYxINg8HASEVoISSF9FAYQb2Ui4IQZkUQLIyCsEdhUATBokEEhj1F0MCnaBAGg8kgCsJBDxbGBtL6QyZJg0GyECWj37d+V8+93e2ec73zg+9hd79z7nd+/845d8u9qSOaA+wlDhB3EjuJIX5eJc4SK8Qs8ZXqxD4FW7x0hHiWRdSDvsI4sUzMEO8SizIv8UjYBIjXiZ9YUKfiImLEGeIjYttGBSE0BWKChTmFlzhE/ECMOhWEgVOKHpHx9lPiTVVB53lgQGsObhHHZAUdID7Wmo9h4mU7QUi6CaJf2xyMCVVpKeiOTCWooMUX0ELbwvX+9rMor1UfQkVdcFMMhJzZM1oTVaq81p7P3qhXyXhvyuyhhKjUDZzuTtTEAOHg4UamCT1NdEHYAk66KaavI6a1tqxHf3F5oZH52vt1QQNuegdC+tpjhmeTpaTdsKgoKOKmd/rDccNv5M/c4ju7YRFRUK9bYvbviGodrevTLf+uapMfkzJDgwgdBG3lGLpS4uZQvfzyoCZKEt0e4SwjVcbwgJishlDtiq9VFYAwFcpZlTUFfbJdGWEY7Bn9V0HkhfGZS4bKQVmLpV0LVSmp6mQ/PLQkY9m+vdcQGvQY8ffRrmGD/fRC2q7UrbDk4VPdqp1l4UfWkAsIn15N8JgYxvKvkpafSzlJwwoErRC/2llitUhQET2hSM0zyCtzIjtEUS/7vIw1EnT6e/q/MjeEiv6X6DlWgFPKuqAXsqOweoSknhfz31JOvZMRG+Mz2eQGJmjXtuotij3HjCeiINyjxmVHwhPmowS2B9AhEOPaYG//UJf+8C0fKf2yokCUPEKI7WH1z4pTQRf5RmI4oM0T7/MdTJNNcsVObIUc33Itj7C32X2bBfTAq43O1EjsU2zYbCC+55B+dtegeRZVbaIY7AzXrNpNvYviG+JBs3qXUOUFP1S9ShdZVM5FMZjzkJjEqh8b0J+OE08Q329ACLb9K8R9dvN4JCfM8mSDRGxmPyWTNsNCdnOIbE8VPsWVppm4oRzjLyNtwhEYHv3MVZpzUhh/BRgANlrp2TJPJlgAAAAASUVORK5CYII=";
		var unCheckedImagePath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAYAAAD8BaggAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDcwOEVFRkJEQjg2MTFFM0I3RTFDMTYyRTlDQkM2MUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDcwOEVFRkNEQjg2MTFFM0I3RTFDMTYyRTlDQkM2MUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENzA4RUVGOURCODYxMUUzQjdFMUMxNjJFOUNCQzYxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENzA4RUVGQURCODYxMUUzQjdFMUMxNjJFOUNCQzYxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvIqC6gAAAK7SURBVHjavJjPixJhHMbfXWNgYT2kRKtBeAiChYFACDwpQSKsl4U5dapLf0KXoFOnrkGnYA+dIqRLQRiIwqInKZI9ZEjWwYUNJZhwSVbs+8g7wztvo/POD+eBBxx5h/cz3x/vvO9ssWDSyYfka+Tr5Cv8/z/kr+QJ+QO5xTYoTPqM/IO8UPQZ+Yi8HyXILvkx2fQBIvuC/JK8FxZG9xkRL+OhjKAwRsiorPMTvzD3NgQi+rkqzG3y3xiA4IdeMCi605hgFvzBi+uAjqKcUNO0RTqd9hr3hZywABJSR70gb0exVhAIMwyD6bq+/D0YDFYNvUr+Tv7MpMmfSoChVC6XGUVo+TuXy3kNx9yaCIRXwEFUMPl8niWTSfvaNE2vW+z5LaDDqKIDEACJarVaquueDVSJKjrForNphsMhG41GKrdWRKBbUcCggLPZrH09m81Ys9lUvT2F1AFoh+cwlFDAcqra7fYSyodubgt7Gc82RgTEYhVVKpXsroKQpn6/7/e5UpesdlsnpKFardodVKvVHJ2DthZbG1FRLOT/Ao0InXuNymQyjtRgjRGvC4WCY3yv11NpdTedA+gXeb5uFEIv1gLShxS5rTnj8Zh1u92gpThJcJj75MurRgFmOp060gIoRAd1JarRaASNDvTIavuO10hECamQ21xOleKa46afyJYF1FC5o9PpLFPiJkQlRKqg9+LC+FaluKF6ve66tgDW55oj67UIhHPUK5W7EAlAya8HOISw9TiW90Of+JZSU4GCUdRIIV4P8/k8DNAD8rdV+5JFzK6vI93hkYoLBifbGyqbpbOYNvh3/ByFzA3CXKgcgWTt80KLGsYMsyFM8aKLCuaEn25Cq8LPT0FBTnmKIjvViBvxN+TfikX7joPsqk6wFRAMT3qXfz3bE7bAE37ow5bmI/+i5kv/BBgAaWkUrOYyTlMAAAAASUVORK5CYII=";
		var nanCheckedPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAYAAAD8BaggAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wgSDR0rvtTWgAAAA35JREFUWMO9mF1oFFcUx387k/1IdtUkGBCW+iBCGaTiUKhQQUGIKKYFwZKLUCkUKpQWfRFaKIWWlD6UguKTvigqckMexK8iDQQqJYIEriDJpXShoBSElDWa7Edms6sPmWx3VndzZzPx/zY758789nzcOefGfp3cR1gJx30POAJkga3AgH9rAfgLyAN3pVZ/hH12zBRIOO4AcBoY9iFMNAvcAX6RWs1EAiQcNwOcBL4BMnSmKnAJ+E5q9bSdoWUQmmlgZA0wADbwOfC3cNyjHQH5CydDhMdEGWBMOO73oYCE4x4DxtbolXb6QTjuOSMg4bgfABdZf30lHPeLtkDCcbcAN4AEb0fnhOPua+ehn4EtUb7RiqWJ29lWtxM+lP0akF9Rn0YJE7ezDGw4zebMKfp6PmtlFnhvo4dG/PKMTH09x7FiaQBS8R3tTEeE4ybqQMJxs8DhKGE2pA5gW/3/74y1fDvz+vtXPHQkSu/YVi+Z5GDgt+elsdWWHW0EOhildzZ1Dweuy5VpFpdyqy072Ai0KyqYdHIPya7t9evay4KJdwD6heNmLeG43X4MIynx5lDNl29Te1kwfcS7VkMvY1TG6eQebKu3Rag+qVcVwOJSjqI3FeY/9XeZ7srJru30p08sfyGTg/y3cIZqba5+PxXfESjt5VCNhnVywgJKRpZd2wKh6es5HrjemPo4YF/0JgPAhipZfldXXc2y6D0I5ELcfofeHrHssdT+wJ5TqT5hvvx7J2mYt6RWHvB41ZavNsd8+Xbgt+74+2zs/oh0Ym9TIv/WaV3MrJT9fRProjdFwbsXLPMmmIJ3z2TPeZMeS61mV4AmTFe9KN2iUn3Swot5FsoTnXrnTuPGeN00uQGeFS+/cW95Ub4ZZs9p1mgdSGqVB64YjxC1OeaKV1/7PJQr053CPAT+bG4/fvQHPSMtLuV4XhplcSlHuTJt+nlopW+lVtUAkNTqX+BsmKcUvSnyhfM8K15aS6jGpVZ3W7WwP/nue1uaBb5s2VNLrUrAkG+43vIAIbXKtR2D/NANhcmnDkfrr6VWE0aDotTqAbAbyK0DzAIwJLW6EGqU9k8rdgPjEcLMAB82JnGowwapVV5qdQA4BDxaA8hT4ASwU2r1KJLzoYYDiGFgENhkkLTjwE3gmtTKKCdjHZ6g2T7UVn/SXWmB88A/fpWOm0I06hXX7y5XRowSigAAAABJRU5ErkJggg==";

		doc.text(20, 20, checklist.title +", "+checklist.name);
		doc.setFont("courier");
		doc.setFontSize(10);
		doc.setFontType("normal");
		doc.text(20, 30, checklist.dateStamp);
		var pageHeight= doc.internal.pageSize.height;
		var pageWidth = doc.internal.pageSize.width*2;
		//        doc.text(20, 50, ); this is what I use to insert text
		var sectionsCount = 40;
		var questionCount = sectionsCount + 10;
		var addQuestionsCount = questionCount + 10;
		var lineCount = 0;

		//Output sections
		//When outputting the comments and images, I could use the cells table
		//This will make it neat and tidey for the user to be able to read.
		$.each(checklist.sections, function(secIndex){
			if(checklist.sections[secIndex].state == true){
				doc.addImage(checkedImagePath, 'PNG', 0, sectionsCount-6, 0, 0);
			}else{
				if(checklist.sections[secIndex].state == false){
					doc.addImage(unCheckedImagePath, 'PNG', 0, sectionsCount-6, 0, 0);
				}else{
					doc.addImage(nanCheckedPath, 'PNG', 0, addQuestionsCount-6, 0, 0);
				}
				doc.text(15, sectionsCount, checklist.sections[secIndex].title);
			}
			questionCount = sectionsCount + 10;
			if (questionCount >= pageHeight)
			{
				doc.addPage();
				questionCount = 10 // Restart height position
			}
			//Output questions within section
			$.each(checklist.sections[secIndex].questions, function(quesIndex){
				if(checklist.sections[secIndex].questions[quesIndex].state == true){
					doc.addImage(checkedImagePath, 'PNG', 0, questionCount-6, 0, 0);
				}else{
					if(checklist.sections[secIndex].questions[quesIndex].state == false){
						doc.addImage(unCheckedImagePath, 'PNG', 0, questionCount-6, 0, 0);
					}else{
						doc.addImage(nanCheckedPath, 'PNG', 0, addQuestionsCount-6, 0, 0);
					}
				}
				if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions){
					doc.text(20, questionCount, (checklist.sections[secIndex].questions[quesIndex].id+1)+". "+checklist.sections[secIndex].questions[quesIndex].output);
					//Output additionalQuestions
					$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions, function(addIndex){
						addQuestionsCount = questionCount +10;
						if (addQuestionsCount >= pageHeight)
						{
							doc.addPage();
							addQuestionsCount = 10 // Restart height position
						}
						var addQuestionWrap = doc.splitTextToSize((checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].id+1)+". "+checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].output, pageWidth);
						doc.text(25, addQuestionsCount, addQuestionWrap);
						if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].state == true){
							doc.addImage(checkedImagePath, 'PNG', 0, addQuestionsCount-6, 0, 0);
						}else{
							if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].state == false){
								doc.addImage(unCheckedImagePath, 'PNG', 0, addQuestionsCount-6, 0, 0);
							}else{
								doc.addImage(nanCheckedPath, 'PNG', 0, addQuestionsCount-6, 0, 0);
							}
						}
						//MultiQuestion count added
						questionCount = addQuestionsCount;
						//Additional question count
						addQuestionsCount = questionCount;
						if (addQuestionsCount >= pageHeight || questionCount >= pageHeight)
						{
							doc.addPage();
							addQuestionsCount = 10;// Restart height position
							questionCount = 10;
						}
					});
				}else{
					var questionWrap = doc.splitTextToSize((checklist.sections[secIndex].questions[quesIndex].id+1)+". "+checklist.sections[secIndex].questions[quesIndex].output, pageWidth);
					doc.text(20, questionCount, questionWrap);
					if(questionWrap.length >= 2){
						$.each(questionWrap, function(newLine){
							questionCount += 2 * newLine;
							if (questionCount >= pageHeight)
							{
								doc.addPage();
								questionCount = 10; // Restart height position
							}
						});
					}
					if(checklist.sections[secIndex].questions[quesIndex].inputs[0].notes.length > 0){
						questionCount = questionCount + 5;
						$.each(checklist.sections[secIndex].questions[quesIndex].inputs[0].notes, function(noteIndex){
							var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].inputs[0].notes[noteIndex].key +" : "+ checklist.sections[secIndex].questions[quesIndex].inputs[0].notes[noteIndex].value, pageWidth);
							doc.text(30, questionCount, noteWrap);
							if(noteWrap.length >= 2){
								$.each(noteWrap, function(newLine){
									questionCount += 2 * newLine;
									if (questionCount >= pageHeight)
									{
										doc.addPage();
										questionCount = 10; // Restart height position
									}
								});
							}
							//Question count added.
							questionCount = questionCount + 5;
						});
						if (questionCount >= pageHeight)
						{
							doc.addPage();
							questionCount = 10; // Restart height position
						}
					}
				}
				//Question count added.
				questionCount = questionCount + 10;
				if (questionCount >= pageHeight)
				{
					doc.addPage();
					questionCount = 10; // Restart height position
				}
			});
			//Section count added
			sectionsCount = questionCount;
			if (sectionsCount >= pageHeight)
			{
				doc.addPage();
				sectionsCount = 10; // Restart height position
			}
		});

		var PDF = doc.output('arraybuffer');
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

			//			console.log("File system name"+fileSystem.name);
			//			console.log("File system root name"+fileSystem.root.name);
			console.log("File system root toURL - "+fileSystem.root.toURL());
			path = fileSystem.root.toURL();
			fileSystem.root.getFile(fileName, {create: true}, function(entry) {
				console.log("File system First path - "+path);
				var fileEntry = entry;
				console.log(entry);

				entry.createWriter(function(writer) {
					writer.onwrite = function(evt) {
						console.log("write success");
						PDF = null;
						doc = null;
						callback(path, fileName, zipFileName);
					};

					console.log("writing to file");
					console.log("File system Third path - "+path);
					writer.write(PDF);
				}, function(error) {
					console.log(error);
				});

			}, function(error){
				console.log(error);
			});
		},
								 function(event){
			console.log( evt.target.error.code );
		});
	}
});