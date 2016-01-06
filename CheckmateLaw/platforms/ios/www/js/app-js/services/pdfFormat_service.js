angular.module("app").service('PdfFromat', function ($localStorage, $sessionStorage) {
	//FIRST GENERATE THE PDF DOCUMENT
	//$localStorage.checklistName is where the file will be saved, and I will need to figure
	//Out how to output it to the PDF...
	//Code provided by ANDREW TRICE @ http://www.tricedesigns.com/2014/01/08/generating-pdf-inside-of-phonegap-apps/
	this.getPDF = function (data) {
		var doc = new jsPDF;
		var fileName = $localStorage.checklistPdf.title +"-"+$localStorage.checklistPdf.name+".pdf";
		var path = ""; 
		var checklist = data;


		var checkedImagePath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAYAAAD8BaggAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wgSDR0rvtTWgAAAA35JREFUWMO9mF1oFFcUx387k/1IdtUkGBCW+iBCGaTiUKhQQUGIKKYFwZKLUCkUKpQWfRFaKIWWlD6UguKTvigqckMexK8iDQQqJYIEriDJpXShoBSElDWa7Edms6sPmWx3VndzZzPx/zY758789nzcOefGfp3cR1gJx30POAJkga3AgH9rAfgLyAN3pVZ/hH12zBRIOO4AcBoY9iFMNAvcAX6RWs1EAiQcNwOcBL4BMnSmKnAJ+E5q9bSdoWUQmmlgZA0wADbwOfC3cNyjHQH5CydDhMdEGWBMOO73oYCE4x4DxtbolXb6QTjuOSMg4bgfABdZf30lHPeLtkDCcbcAN4AEb0fnhOPua+ehn4EtUb7RiqWJ29lWtxM+lP0akF9Rn0YJE7ezDGw4zebMKfp6PmtlFnhvo4dG/PKMTH09x7FiaQBS8R3tTEeE4ybqQMJxs8DhKGE2pA5gW/3/74y1fDvz+vtXPHQkSu/YVi+Z5GDgt+elsdWWHW0EOhildzZ1Dweuy5VpFpdyqy072Ai0KyqYdHIPya7t9evay4KJdwD6heNmLeG43X4MIynx5lDNl29Te1kwfcS7VkMvY1TG6eQebKu3Rag+qVcVwOJSjqI3FeY/9XeZ7srJru30p08sfyGTg/y3cIZqba5+PxXfESjt5VCNhnVywgJKRpZd2wKh6es5HrjemPo4YF/0JgPAhipZfldXXc2y6D0I5ELcfofeHrHssdT+wJ5TqT5hvvx7J2mYt6RWHvB41ZavNsd8+Xbgt+74+2zs/oh0Ym9TIv/WaV3MrJT9fRProjdFwbsXLPMmmIJ3z2TPeZMeS61mV4AmTFe9KN2iUn3Swot5FsoTnXrnTuPGeN00uQGeFS+/cW95Ub4ZZs9p1mgdSGqVB64YjxC1OeaKV1/7PJQr053CPAT+bG4/fvQHPSMtLuV4XhplcSlHuTJt+nlopW+lVtUAkNTqX+BsmKcUvSnyhfM8K15aS6jGpVZ3W7WwP/nue1uaBb5s2VNLrUrAkG+43vIAIbXKtR2D/NANhcmnDkfrr6VWE0aDotTqAbAbyK0DzAIwJLW6EGqU9k8rdgPjEcLMAB82JnGowwapVV5qdQA4BDxaA8hT4ASwU2r1KJLzoYYDiGFgENhkkLTjwE3gmtTKKCdjHZ6g2T7UVn/SXWmB88A/fpWOm0I06hXX7y5XRowSigAAAABJRU5ErkJggg==";
		var unCheckedImagePath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAYAAAD8BaggAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wgSDR0rvtTWgAAAA35JREFUWMO9mF1oFFcUx387k/1IdtUkGBCW+iBCGaTiUKhQQUGIKKYFwZKLUCkUKpQWfRFaKIWWlD6UguKTvigqckMexK8iDQQqJYIEriDJpXShoBSElDWa7Edms6sPmWx3VndzZzPx/zY758789nzcOefGfp3cR1gJx30POAJkga3AgH9rAfgLyAN3pVZ/hH12zBRIOO4AcBoY9iFMNAvcAX6RWs1EAiQcNwOcBL4BMnSmKnAJ+E5q9bSdoWUQmmlgZA0wADbwOfC3cNyjHQH5CydDhMdEGWBMOO73oYCE4x4DxtbolXb6QTjuOSMg4bgfABdZf30lHPeLtkDCcbcAN4AEb0fnhOPua+ehn4EtUb7RiqWJ29lWtxM+lP0akF9Rn0YJE7ezDGw4zebMKfp6PmtlFnhvo4dG/PKMTH09x7FiaQBS8R3tTEeE4ybqQMJxs8DhKGE2pA5gW/3/74y1fDvz+vtXPHQkSu/YVi+Z5GDgt+elsdWWHW0EOhildzZ1Dweuy5VpFpdyqy072Ai0KyqYdHIPya7t9evay4KJdwD6heNmLeG43X4MIynx5lDNl29Te1kwfcS7VkMvY1TG6eQebKu3Rag+qVcVwOJSjqI3FeY/9XeZ7srJru30p08sfyGTg/y3cIZqba5+PxXfESjt5VCNhnVywgJKRpZd2wKh6es5HrjemPo4YF/0JgPAhipZfldXXc2y6D0I5ELcfofeHrHssdT+wJ5TqT5hvvx7J2mYt6RWHvB41ZavNsd8+Xbgt+74+2zs/oh0Ym9TIv/WaV3MrJT9fRProjdFwbsXLPMmmIJ3z2TPeZMeS61mV4AmTFe9KN2iUn3Swot5FsoTnXrnTuPGeN00uQGeFS+/cW95Ub4ZZs9p1mgdSGqVB64YjxC1OeaKV1/7PJQr053CPAT+bG4/fvQHPSMtLuV4XhplcSlHuTJt+nlopW+lVtUAkNTqX+BsmKcUvSnyhfM8K15aS6jGpVZ3W7WwP/nue1uaBb5s2VNLrUrAkG+43vIAIbXKtR2D/NANhcmnDkfrr6VWE0aDotTqAbAbyK0DzAIwJLW6EGqU9k8rdgPjEcLMAB82JnGowwapVV5qdQA4BDxaA8hT4ASwU2r1KJLzoYYDiGFgENhkkLTjwE3gmtTKKCdjHZ6g2T7UVn/SXWmB88A/fpWOm0I06hXX7y5XRowSigAAAABJRU5ErkJggg==";
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
			doc.text(15, sectionsCount, checklist.sections[secIndex].title+'\n'); 
			console.log("Sections: " + sectionsCount);
			if(checklist.sections[secIndex].state == true){
				doc.addImage(checkedImagePath, 'PNG', 0, sectionsCount, 0, 0);
				console.log("Checked");
			}else{
				if(checklist.sections[secIndex].state == false){
					doc.addImage(unCheckedImagePath, 'PNG', 0, sectionsCount, 0, 0);
					console.log("UnChecked");
				}else{
					doc.addImage(nanCheckedPath, 'PNG', 0, addQuestionsCount, 0, 0);
					console.log("NanChecked");
				}
			}
			questionCount = sectionsCount + 10;
			if (questionCount >= pageHeight)
			{
				doc.addPage();
				questionCount = 10 // Restart height position
			}
			//			console.log("Questions: " + questionCount);
			//Output questions within section
			$.each(checklist.sections[secIndex].questions, function(quesIndex){
				if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions){
					doc.text(20, questionCount, checklist.sections[secIndex].questions[quesIndex].output+'\n');
					console.log("Multi Questions: " + questionCount);
					//Output additionalQuestions
					$.each(checklist.sections[secIndex].questions[quesIndex].additionalQuestions, function(addIndex){
						addQuestionsCount = questionCount +10;
						if (addQuestionsCount >= pageHeight)
						{
							doc.addPage();
							addQuestionsCount = 10 // Restart height position
						}
						var addQuestionWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].output, pageWidth);
						doc.text(25, addQuestionsCount, addQuestionWrap);
						console.log("addQuestion: " + addQuestionsCount);
						if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].state == true){
							doc.addImage(checkedImagePath, 'PNG', 0, addQuestionsCount, 0, 0);
							console.log("Checked");
						}else{
							if(checklist.sections[secIndex].questions[quesIndex].additionalQuestions[addIndex].state == false){
								doc.addImage(unCheckedImagePath, 'PNG', 0, addQuestionsCount, 0, 0);
								console.log("UnChecked");
							}else{
								doc.addImage(nanCheckedPath, 'PNG', 0, addQuestionsCount, 0, 0);
								console.log("NanChecked");
							}

						}
						//MultiQuestion count added
						questionCount = addQuestionsCount;

						//Additional question count
						addQuestionsCount = questionCount + 10;
						if (addQuestionsCount >= pageHeight || questionCount >= pageHeight)
						{
							doc.addPage();
							addQuestionsCount = 10;// Restart height position
							questionCount = 10;
						}
					});
				}else{
					var questionWrap = doc.splitTextToSize(checklist.sections[secIndex].questions[quesIndex].output, pageWidth);
					doc.text(20, questionCount, questionWrap);
					console.log("Questions: " + questionCount);
					if(questionWrap.length >= 2){
						$.each(questionWrap, function(newLine){
							questionCount += 5 * newLine;
						});
						console.log(questionWrap);
					}
					if(checklist.sections[secIndex].questions[quesIndex].state == true){
						doc.addImage(checkedImagePath, 'PNG', 0, questionCount, 0, 0);
						console.log("Checked");
					}else{
						if(checklist.sections[secIndex].questions[quesIndex].state == false){
							doc.addImage(unCheckedImagePath, 'PNG', 0, questionCount, 0, 0);
							console.log("UnChecked");
						}else{
							doc.addImage(nanCheckedPath, 'PNG', 0, addQuestionsCount, 0, 0);
							console.log("NanChecked");
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

//			console.log(fileSystem.name);
//			console.log(fileSystem.root.name);
			path = fileSystem.root.toURL();

			fileSystem.root.getFile(fileName, {create: true}, function(entry) {
				var fileEntry = entry;
				console.log(entry);

				entry.createWriter(function(writer) {
					writer.onwrite = function(evt) {
						console.log("write success");
					};

					console.log("writing to file");
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
		return path + fileName;
	}
});