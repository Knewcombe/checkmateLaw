angular.module("app").service('PdfFromat', ['$localStorage', '$sessionStorage', '$q', '$rootScope', function ($localStorage, $sessionStorage, $q, $rootScope) {
	//FIRST GENERATE THE PDF DOCUMENT
	//$localStorage.checklistName is where the file will be saved, and I will need to figure
	//Out how to output it to the PDF...
	//Code provided by ANDREW TRICE @ http://www.tricedesigns.com/2014/01/08/generating-pdf-inside-of-phonegap-apps/
	this.getPDF = function (data, name) {

		var deferred = $q.defer();
		var doc = new jsPDF;
		var fileName = name;
		var path;
		var checklist = data;

		var checkedImagePath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAYAAAD8BaggAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0JFM0I2NjJEQjg2MTFFMzk5NkFBMzc0OUU5QzYxREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0JFM0I2NjNEQjg2MTFFMzk5NkFBMzc0OUU5QzYxREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQkUzQjY2MERCODYxMUUzOTk2QUEzNzQ5RTlDNjFEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQkUzQjY2MURCODYxMUUzOTk2QUEzNzQ5RTlDNjFEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PskUqzAAAAMhSURBVHjavFhfSFNRHL5tYxINg8HASEVoISSF9FAYQb2Ui4IQZkUQLIyCsEdhUATBokEEhj1F0MCnaBAGg8kgCsJBDxbGBtL6QyZJg0GyECWj37d+V8+93e2ec73zg+9hd79z7nd+/845d8u9qSOaA+wlDhB3EjuJIX5eJc4SK8Qs8ZXqxD4FW7x0hHiWRdSDvsI4sUzMEO8SizIv8UjYBIjXiZ9YUKfiImLEGeIjYttGBSE0BWKChTmFlzhE/ECMOhWEgVOKHpHx9lPiTVVB53lgQGsObhHHZAUdID7Wmo9h4mU7QUi6CaJf2xyMCVVpKeiOTCWooMUX0ELbwvX+9rMor1UfQkVdcFMMhJzZM1oTVaq81p7P3qhXyXhvyuyhhKjUDZzuTtTEAOHg4UamCT1NdEHYAk66KaavI6a1tqxHf3F5oZH52vt1QQNuegdC+tpjhmeTpaTdsKgoKOKmd/rDccNv5M/c4ju7YRFRUK9bYvbviGodrevTLf+uapMfkzJDgwgdBG3lGLpS4uZQvfzyoCZKEt0e4SwjVcbwgJishlDtiq9VFYAwFcpZlTUFfbJdGWEY7Bn9V0HkhfGZS4bKQVmLpV0LVSmp6mQ/PLQkY9m+vdcQGvQY8ffRrmGD/fRC2q7UrbDk4VPdqp1l4UfWkAsIn15N8JgYxvKvkpafSzlJwwoErRC/2llitUhQET2hSM0zyCtzIjtEUS/7vIw1EnT6e/q/MjeEiv6X6DlWgFPKuqAXsqOweoSknhfz31JOvZMRG+Mz2eQGJmjXtuotij3HjCeiINyjxmVHwhPmowS2B9AhEOPaYG//UJf+8C0fKf2yokCUPEKI7WH1z4pTQRf5RmI4oM0T7/MdTJNNcsVObIUc33Itj7C32X2bBfTAq43O1EjsU2zYbCC+55B+dtegeRZVbaIY7AzXrNpNvYviG+JBs3qXUOUFP1S9ShdZVM5FMZjzkJjEqh8b0J+OE08Q329ACLb9K8R9dvN4JCfM8mSDRGxmPyWTNsNCdnOIbE8VPsWVppm4oRzjLyNtwhEYHv3MVZpzUhh/BRgANlrp2TJPJlgAAAAASUVORK5CYII=";

		var nanCheckedPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAYAAAD8BaggAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AUCDDknGu03bAAABLRJREFUWMO9mG1oHEUYx/8zu3t3SS5p7vImPbUpVopwJbVoBAM9qKkfgsY0oiUNaawYwQ+VgpomWEHBL0Y/HGisJVKo5RooobZaT20iJgRBK4RCSlSIL7SkNsl5ubxc7mV3Z/xwveT2bvdu73o6X3Z3Zmf2t/+Z55nnGYI8CvfY3QBa5ArLXkhiA12J1hKFSZp3RCqzypIAGJ+R/lkfBeAnE2vXzX6DmAVRSqSjhLEuGlNtyX5GnXnKLbOJMbVUOm8JRt43A5YTKP60s4PG1U9oVK0w/Qc6cKxUCiuOkldt526dLgiIe+zueFVZnxhaP0RUTvIF0QPjAuHyNoff+kewz0gtYgSjWoUxGlPrClEll1pqmWVJDMf36kER/fUijgsRpapYIHpgaqUtIoaijelQNP1lxSqe+y9hkioIoWiJXGm7lN6mAYoe2voijSnuoqjgrAMfWwD/Pgj+XQC8qSXjHWE5un2t331CF4h77G5pfvUUATIWMPdeTgw8Og9+pN8c0ZkfAUG88xUKNO7LUIlwENvPN96Rn6xsyABSrIKPKFzUnaqGxxNXUQIOvwHe0pVdnaEJwL5FWzk1qTt1VGYUNvGCBoh77G4aV3cZfuHPGe3z615DKP7eeWBH2lAjJ4HJLw2HpyvR7fFnqh/eAFIkOkg4jH1NfwcQCqT8GtGF4i/0AY3N2r4/jYIMvgnCmOECJxwEhJzeMHvliYpVqjB7Lsvivilga31KBQc+OAbiPwvurANGZrQrcHYapMdjyg0wqxgTr4RsFACIyspMmWvnHuDWX/pKnb2qhQnOm4LZGCquWACAcI/dzYHpfPxOhlLpRVVAmmvzdpbrj93fTFWCt/N2bOlKpZd3Xy7Id1lmF09QbhUtBXnbzj1AJJzZ8OsUyPjFwpypJEgUpLC9kz/gBmylmQ07diXaCvpLKlCw1HgqjzL4LXQdhSgBJ8cKg2JMpTSu3MxbneFrgLVks0KOA0uLm8+SpTAogSwQAFA9dkYAU0EYH5rI9MSvHQCZmgC/8BvgqNGCvtIM8vv13MEbgNsXX6qld8iYKWXe+jQT5msfyNREYgm07yxcKZFwl8O7mNjLJBrKCdN9HNjXrq28OgYycFS7LguEYjZpbXNz5fg8LVvQwjQ0Ad292sqbsyDHn9c3Fj2oj77JngRUWMc2gKQryz1cILIh/u6mzG3hcGN2C06H0nMRSRiJssDHB5/TxEOqTfQZqnTtB0BVEveRMMizD5lzK+07gbWVxEPyqhf015V/5XJ41YwgX26tWhCWYzXFzDRyZSByTVnYOjJv142pF850bWMSZfifCrMIPDDUsdswyHc5vBFmET7LtsCLmp9Vl15yObyzWdMgi3/pSLze4U91WMUESY63/si9v1iH/z5gOpWOt1X7hFC0g/DsBwv5qsIJuOLactnqm2vN+7BhbumYs7pn+Ia0GC7L67hE/yQEcl15LHDq4KMuh3f6ro5jYp2uL8S55aeSauXqnD7NnIDHH6weDw607U+a910BbWS23ff5xbnlZiprD6mMrYgqcr1zMjjQ1upyeNeKdmClM5UCgP3O3ou94u1VNygVk/GMck/5dHCg7UMAo2YhUsu/AsHWN6SWCusAAAAASUVORK5CYII=";

		doc.page = 1;
		doc.text(20, 20, checklist.title +" : "+checklist.occurranceNumber+", "+checklist.name);
		doc.setFont("courier");
		doc.setFontSize(10);
		doc.setFontType("normal");
		doc.text(20, 30, checklist.dateStamp);

		var pageHeight= (doc.internal.pageSize.height - 10);
		var pageWidth = (doc.internal.pageSize.width*2);
		//        doc.text(20, 50, ); this is what I use to insert text
		var sectionsCount = 40;
		var questionCount = sectionsCount + 10;
		var addQuestionsCount = questionCount + 10;
		var lineCount = 0;
		doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
		//Output sections
		//When outputting the comments and images, I could use the cells table
		//This will make it neat and tidey for the user to be able to read.
		$.each(checklist.sections, function(secIndex){
			console.log("section called");
			if(checklist.sections[secIndex].type != "selectionSection" && checklist.sections[secIndex].type != "sectionOption"){
				if(checklist.sections[secIndex].state == true){
					doc.addImage(checkedImagePath, 'PNG', 0, sectionsCount-6, 0, 0);
				}else{
					if(checklist.sections[secIndex].state == null){
						doc.addImage(nanCheckedPath, 'PNG', 0, sectionsCount-6, 0, 0);
					}
				}
				doc.text(15, sectionsCount, (checklist.sections[secIndex].id+1)+". "+checklist.sections[secIndex].title);
				questionCount = sectionsCount + 10;
				if (questionCount >= pageHeight)
				{
					doc.addPage();
					doc.page++;
					doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
					questionCount = 10 // Restart height position
				}
				//Output questions within section
				$.each(checklist.sections[secIndex].questions, function(quesIndex){
					if(checklist.sections[secIndex].questions[quesIndex].state == true){
						doc.addImage(checkedImagePath, 'PNG', 0, questionCount-6, 0, 0);
					}else{
						if(checklist.sections[secIndex].questions[quesIndex].state == null){
							doc.addImage(nanCheckedPath, 'PNG', 0, questionCount-6, 0, 0);
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
								doc.page++;
								doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
								addQuestionsCount = 10 // Restart height position
							}
							var addQuestionWrap = doc.splitTextToSize((checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].id+1)+". "+checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].output, pageWidth);
							console.log(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].output);
							doc.text(25, addQuestionsCount, addQuestionWrap);
							if(addQuestionWrap.length >= 2){
								$.each(addQuestionWrap, function(newLine){
									addQuestionsCount += 2 * newLine;
									if (addQuestionsCount >= pageHeight)
									{
										doc.addPage();
										doc.page++;
										doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
										questionCount = 10 // Restart height position
									}
									//Question count added.
									addQuestionsCount = addQuestionsCount + 2;
								});
							}
							if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].state == true){
								doc.addImage(checkedImagePath, 'PNG', 0, addQuestionsCount-6, 0, 0);
							}else{
								if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].state == null){
									doc.addImage(nanCheckedPath, 'PNG', 0, addQuestionsCount-6, 0, 0);
								}
							}
							if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs){
								if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes.length > 0){
									addQuestionsCount = addQuestionsCount + 5;
									$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes, function(noteIndex){
										var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes[noteIndex].key +" : "+ checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes[noteIndex].value, pageWidth);
										doc.text(30, addQuestionsCount, noteWrap);
										if(noteWrap.length >= 2){
											$.each(noteWrap, function(newLine){
												addQuestionsCount += 2 * newLine;
												if (addQuestionsCount >= pageHeight)
												{
													doc.addPage();
													doc.page++;
													doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
													addQuestionsCount = 10; // Restart height position
												}
											});
										}
										//Question count added.
										addQuestionsCount = addQuestionsCount + 5;
									});
									if (addQuestionsCount >= pageHeight)
									{
										doc.addPage();
										doc.page++;
										doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
										addQuestionsCount = 10; // Restart height position
									}
								}
								if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos.length > 0){
									addQuestionsCount = addQuestionsCount + 5;
									$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos, function(photoIndex){
										var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos[photoIndex], pageWidth);
										doc.text(30, addQuestionsCount, noteWrap);
										if(noteWrap.length >= 2){
											$.each(noteWrap, function(newLine){
												addQuestionsCount += 2 * newLine;
												if (addQuestionsCount >= pageHeight)
												{
													doc.addPage();
													doc.page++;
													doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
													addQuestionsCount = 10; // Restart height position
												}
											});
										}
										//Question count added.
										addQuestionsCount = addQuestionsCount + 5;
									});
									if (addQuestionsCount >= pageHeight)
									{
										doc.addPage();
										doc.page++;
										doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
										addQuestionsCount = 10; // Restart height position
									}
								}
								if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].recording.length > 0){
									addQuestionsCount = addQuestionsCount + 5;
									$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos, function(recordingIndex){
										var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].recording[recordingIndex], pageWidth);
										doc.text(30, addQuestionsCount, noteWrap);
										if(noteWrap.length >= 2){
											$.each(noteWrap, function(newLine){
												addQuestionsCount += 2 * newLine;
												if (addQuestionsCount >= pageHeight)
												{
													doc.addPage();
													doc.page++;
													doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
													addQuestionsCount = 10; // Restart height position
												}
											});
										}
										//Question count added.
										addQuestionsCount = addQuestionsCount + 5;
									});
									if (addQuestionsCount >= pageHeight)
									{
										doc.addPage();
										doc.page++;
										doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
										addQuestionsCount = 10; // Restart height position
									}
								}
								if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].videos.length > 0){
									addQuestionsCount = addQuestionsCount + 5;
									$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos, function(videoIndex){
										var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].videos[videoIndex], pageWidth);
										doc.text(30, addQuestionsCount, noteWrap);
										if(noteWrap.length >= 2){
											$.each(noteWrap, function(newLine){
												addQuestionsCount += 2 * newLine;
												if (addQuestionsCount >= pageHeight)
												{
													doc.addPage();
													doc.page++;
													doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
													addQuestionsCount = 10; // Restart height position
												}
											});
										}
										//Question count added.
										addQuestionsCount = addQuestionsCount + 5;
									});
									if (addQuestionsCount >= pageHeight)
									{
										doc.addPage();
										doc.page++;
										doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
										addQuestionsCount = 10; // Restart height position
									}
								}
							}
							//MultiQuestion count added
							questionCount = addQuestionsCount;
							//Additional question count
							addQuestionsCount = questionCount;
							if (addQuestionsCount >= pageHeight || questionCount >= pageHeight)
							{
								doc.addPage();
								doc.page++;
								doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
									doc.page++;
									doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
									questionCount = 10; // Restart height position
								}
								questionCount = questionCount + 2;
							});
						}
						if(checklist.sections[secIndex].questions[quesIndex].inputs){

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
												doc.page++;
												doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
									doc.page++;
									doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
									questionCount = 10; // Restart height position
								}
							}
							if(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos.length > 0){
								questionCount = questionCount + 5;
								$.each(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos, function(photoIndex){
									var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos[photoIndex], pageWidth);
									doc.text(30, questionCount, noteWrap);
									if(noteWrap.length >= 2){
										$.each(noteWrap, function(newLine){
											questionCount += 2 * newLine;
											if (questionCount >= pageHeight)
											{
												doc.addPage();
												doc.page++;
												doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
									doc.page++;
									doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
									questionCount = 10; // Restart height position
								}
							}
							if(checklist.sections[secIndex].questions[quesIndex].inputs[0].recording.length > 0){
								questionCount = questionCount + 5;
								$.each(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos, function(recordingIndex){
									var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].inputs[0].recording[recordingIndex], pageWidth);
									doc.text(30, questionCount, noteWrap);
									if(noteWrap.length >= 2){
										$.each(noteWrap, function(newLine){
											questionCount += 2 * newLine;
											if (questionCount >= pageHeight)
											{
												doc.addPage();
												doc.page++;
												doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
									doc.page++;
									doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
									questionCount = 10; // Restart height position
								}
							}
							if(checklist.sections[secIndex].questions[quesIndex].inputs[0].videos.length > 0){
								questionCount = questionCount + 5;
								$.each(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos, function(videoIndex){
									var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].inputs[0].videos[videoIndex], pageWidth);
									doc.text(30, questionCount, noteWrap);
									if(noteWrap.length >= 2){
										$.each(noteWrap, function(newLine){
											questionCount += 2 * newLine;
											if (questionCount >= pageHeight)
											{
												doc.addPage();
												doc.page++;
												doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
									doc.page++;
									doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
									questionCount = 10; // Restart height position
								}
							}
						}
					}
					//Question count added.
					questionCount = questionCount + 10;
					if (questionCount >= pageHeight)
					{
						doc.addPage();
						doc.page++;
						doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
						questionCount = 10; // Restart height position
					}
				});
				//Section count added
				sectionsCount = questionCount;
				if (sectionsCount >= pageHeight)
				{
					doc.addPage();
					doc.page++;
					doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
					sectionsCount = 10; // Restart height position
				}
			}else{
				if(checklist.sections[secIndex].type == "sectionOption"){
					console.log(checklist.sections[1].options[checklist.sections[1].selected].title +" : "+ checklist.sections[secIndex].option);
					if(checklist.sections[1].options[checklist.sections[1].selected].title == checklist.sections[secIndex].option){
						
						if(checklist.sections[secIndex].state == true){
							doc.addImage(checkedImagePath, 'PNG', 0, sectionsCount-6, 0, 0);
						}else{
							if(checklist.sections[secIndex].state == null){
								doc.addImage(nanCheckedPath, 'PNG', 0, sectionsCount-6, 0, 0);
							}
						}
						doc.text(15, sectionsCount, (checklist.sections[secIndex].id+1)+". "+checklist.sections[secIndex].title);
						questionCount = sectionsCount + 10;
						if (questionCount >= pageHeight)
						{
							doc.addPage();
							doc.page++;
							doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
							questionCount = 10 // Restart height position
						}
						//Output questions within section
						$.each(checklist.sections[secIndex].questions, function(quesIndex){
							if(checklist.sections[secIndex].questions[quesIndex].state == true){
								doc.addImage(checkedImagePath, 'PNG', 0, questionCount-6, 0, 0);
							}else{
								if(checklist.sections[secIndex].questions[quesIndex].state == null){
									doc.addImage(nanCheckedPath, 'PNG', 0, questionCount-6, 0, 0);
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
										doc.page++;
										doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
										addQuestionsCount = 10 // Restart height position
									}
									var addQuestionWrap = doc.splitTextToSize((checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].id+1)+". "+checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].output, pageWidth);
									doc.text(25, addQuestionsCount, addQuestionWrap);
									if(addQuestionWrap.length >= 2){
										$.each(addQuestionWrap, function(newLine){
											addQuestionsCount += 2 * newLine;
											if (addQuestionsCount >= pageHeight)
											{
												doc.addPage();
												doc.page++;
												doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
												questionCount = 10 // Restart height position
											}
											//Question count added.
											addQuestionsCount = addQuestionsCount + 2;
										});
									}
									if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].state == true){
										doc.addImage(checkedImagePath, 'PNG', 0, addQuestionsCount-6, 0, 0);
									}else{
										if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].state == null){
											doc.addImage(nanCheckedPath, 'PNG', 0, addQuestionsCount-6, 0, 0);
										}
									}
									if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs){
										if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes.length > 0){
											addQuestionsCount = addQuestionsCount + 5;
											$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes, function(noteIndex){
												var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes[noteIndex].key +" : "+ checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].notes[noteIndex].value, pageWidth);
												doc.text(30, addQuestionsCount, noteWrap);
												if(noteWrap.length >= 2){
													$.each(noteWrap, function(newLine){
														addQuestionsCount += 2 * newLine;
														if (addQuestionsCount >= pageHeight)
														{
															doc.addPage();
															doc.page++;
															doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
															addQuestionsCount = 10; // Restart height position
														}
													});
												}
												//Question count added.
												addQuestionsCount = addQuestionsCount + 5;
											});
											if (addQuestionsCount >= pageHeight)
											{
												doc.addPage();
												doc.page++;
												doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
												addQuestionsCount = 10; // Restart height position
											}
										}
										if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos.length > 0){
											addQuestionsCount = addQuestionsCount + 5;
											$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos, function(photoIndex){
												var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos[photoIndex], pageWidth);
												doc.text(30, addQuestionsCount, noteWrap);
												if(noteWrap.length >= 2){
													$.each(noteWrap, function(newLine){
														addQuestionsCount += 2 * newLine;
														if (addQuestionsCount >= pageHeight)
														{
															doc.addPage();
															doc.page++;
															doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
															addQuestionsCount = 10; // Restart height position
														}
													});
												}
												//Question count added.
												addQuestionsCount = addQuestionsCount + 5;
											});
											if (addQuestionsCount >= pageHeight)
											{
												doc.addPage();
												doc.page++;
												doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
												addQuestionsCount = 10; // Restart height position
											}
										}
										if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].recording.length > 0){
											addQuestionsCount = addQuestionsCount + 5;
											$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos, function(recordingIndex){
												var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].recording[recordingIndex], pageWidth);
												doc.text(30, addQuestionsCount, noteWrap);
												if(noteWrap.length >= 2){
													$.each(noteWrap, function(newLine){
														addQuestionsCount += 2 * newLine;
														if (addQuestionsCount >= pageHeight)
														{
															doc.addPage();
															doc.page++;
															doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
															addQuestionsCount = 10; // Restart height position
														}
													});
												}
												//Question count added.
												addQuestionsCount = addQuestionsCount + 5;
											});
											if (addQuestionsCount >= pageHeight)
											{
												doc.addPage();
												doc.page++;
												doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
												addQuestionsCount = 10; // Restart height position
											}
										}
										if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].videos.length > 0){
											addQuestionsCount = addQuestionsCount + 5;
											$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].photos, function(videoIndex){
												var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].inputs[0].videos[videoIndex], pageWidth);
												doc.text(30, addQuestionsCount, noteWrap);
												if(noteWrap.length >= 2){
													$.each(noteWrap, function(newLine){
														addQuestionsCount += 2 * newLine;
														if (addQuestionsCount >= pageHeight)
														{
															doc.addPage();
															doc.page++;
															doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
															addQuestionsCount = 10; // Restart height position
														}
													});
												}
												//Question count added.
												addQuestionsCount = addQuestionsCount + 5;
											});
											if (addQuestionsCount >= pageHeight)
											{
												doc.addPage();
												doc.page++;
												doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
												addQuestionsCount = 10; // Restart height position
											}
										}
									}
									//MultiQuestion count added
									questionCount = addQuestionsCount;
									//Additional question count
									addQuestionsCount = questionCount;
									if (addQuestionsCount >= pageHeight || questionCount >= pageHeight)
									{
										doc.addPage();
										doc.page++;
										doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
											doc.page++;
											doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
											questionCount = 10; // Restart height position
										}
										questionCount = questionCount + 2;
									});
								}
								if(checklist.sections[secIndex].questions[quesIndex].inputs){

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
														doc.page++;
														doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
											doc.page++;
											doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
											questionCount = 10; // Restart height position
										}
									}
									if(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos.length > 0){
										questionCount = questionCount + 5;
										$.each(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos, function(photoIndex){
											var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos[photoIndex], pageWidth);
											doc.text(30, questionCount, noteWrap);
											if(noteWrap.length >= 2){
												$.each(noteWrap, function(newLine){
													questionCount += 2 * newLine;
													if (questionCount >= pageHeight)
													{
														doc.addPage();
														doc.page++;
														doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
											doc.page++;
											doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
											questionCount = 10; // Restart height position
										}
									}
									if(checklist.sections[secIndex].questions[quesIndex].inputs[0].recording.length > 0){
										questionCount = questionCount + 5;
										$.each(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos, function(recordingIndex){
											var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].inputs[0].recording[recordingIndex], pageWidth);
											doc.text(30, questionCount, noteWrap);
											if(noteWrap.length >= 2){
												$.each(noteWrap, function(newLine){
													questionCount += 2 * newLine;
													if (questionCount >= pageHeight)
													{
														doc.addPage();
														doc.page++;
														doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
											doc.page++;
											doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
											questionCount = 10; // Restart height position
										}
									}
									if(checklist.sections[secIndex].questions[quesIndex].inputs[0].videos.length > 0){
										questionCount = questionCount + 5;
										$.each(checklist.sections[secIndex].questions[quesIndex].inputs[0].photos, function(videoIndex){
											var noteWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].inputs[0].videos[videoIndex], pageWidth);
											doc.text(30, questionCount, noteWrap);
											if(noteWrap.length >= 2){
												$.each(noteWrap, function(newLine){
													questionCount += 2 * newLine;
													if (questionCount >= pageHeight)
													{
														doc.addPage();
														doc.page++;
														doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
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
											doc.page++;
											doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
											questionCount = 10; // Restart height position
										}
									}
								}
							}
							//Question count added.
							questionCount = questionCount + 10;
							if (questionCount >= pageHeight)
							{
								doc.addPage();
								doc.page++;
								doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
								questionCount = 10; // Restart height position
							}
						});
						//Section count added
						sectionsCount = questionCount;
						if (sectionsCount >= pageHeight)
						{
							doc.addPage();
							doc.page++;
							doc.text((doc.internal.pageSize.width-20), 5, "Page "+doc.page);
							sectionsCount = 10; // Restart height position
						}
					}
				}
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
						console.log(" test write success");
						PDF = null;
						doc = null;
						//						callback(path, fileName, zipFileName);
						deferred.resolve(entry.nativeURL);
					};

					console.log("writing to file");
					console.log("File system Third path - "+path);
					writer.write(PDF);
				}, function(error) {
					console.log("Error on writing "+error);
					deferred.reject();
				});

			}, function(error){
				console.log("Error getting file "+ error);
				deferred.reject();
			});
		},
								 function(event){
			console.log( evt.target.error.code );
			deferred.reject();
		});
		return deferred.promise;
	}
}]);