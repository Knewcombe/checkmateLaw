angular.module('app').controller('ReportQuestionController', function ($rootScope, $scope, dataContext, $localStorage, $sessionStorage, $location, $interval) {

    //Using currentPath for Header to show the title of the report, this will change
    //Reprot name will be removed from the header.
    $scope.currentPath = $location.path();
    $localStorage.saveIndex = [];
    $scope.$storage = $localStorage;
    $scope.viewReport = ($localStorage.savedChecklist[$localStorage.savedIndex]);
    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = true;
    $scope.questionCount;
    $scope.selectedSection = $sessionStorage.sectionIndex;
    $scope.selectedQuestion = $sessionStorage.questionIndex;
    $scope.fullImage = $localStorage.tempImage;
    $('.loading').show();
    $('.content').hide();
    
    console.log("This is a test for the console plugin, just to see what is hapening");

    function gotFS(fileSystem){
        $scope.tryThis = fileSystem.root.toURL();
    }

    function fail(){
        alert("Derp");
    }

    //Used for header title.
    $scope.headerTitle = {
        text: '',
        word: /^\s*\w*\s*$/

    };

    $scope.dateAndTime = function(id){
        var date = new Date();
        var dateAndTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes();
        $scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[id].inputs[0];
        $scope.currentQuestion.dateChange = dateAndTime;
        $scope.$apply();
    }
    //To insure everything looks right on load.
    $scope.init = function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        setTimeout(function () {    
            $('.section').show();
            $('.additionalOutput').hide();
            $('.topDiv').show();
            $('.sectionOption').hide();
            $('.titleTop').show();
            if ($scope.currentPath === '/sections') {

                for (var i = 0; $scope.viewReport.sections.length - 1 >= i; i++) {
                    if ($scope.viewReport.sections[i].type === 'selectionSection') {
                        if($scope.viewReport.sections[i].selected.length >= 1){
                            $('.' + $scope.viewReport.sections[i].options[$scope.viewReport.sections[i].selected].title).show();
                        }
                    }
                }

            }
            setTimeout(function () {
                $('.loading').hide();
                $('.content').show();
            }, 1000);
        }, 100);
    };

    $scope.nan = function (state, type, id) {
        if(type === 'question'){
            $scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[id];
            $scope.previousSection = $scope.viewReport.sections[$scope.selectedSection];
        }else{
            if(type === 'additionalQuestion'){
                $scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[id];
                $scope.previousSection = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion];
            }
        }
        if(state !== true){
            if(state === null){
                $scope.currentQuestion.state = false;
                $scope.previousSection.count--;
            }else{
                $scope.currentQuestion.state = null;
                $scope.previousSection.count++;
            }
        }else{
            if(state === true){
                $scope.currentQuestion.state = null;
            }
        }
    };


    //When users select checkmark it will add count and toggle boolean values.
    $scope.count = function (state, type, id) {
        if (type === 'question') {
            if (state !== true) {
                if(state === false){
                    $scope.viewReport.sections[$scope.selectedSection].questions[id].state = true;
                    $scope.viewReport.sections[$scope.selectedSection].count++;
                }else{
                    if(state === null){
                        $scope.viewReport.sections[$scope.selectedSection].questions[id].state = true;
                    }
                }

            }
            if (state === true) {
                $scope.viewReport.sections[$scope.selectedSection].questions[id].state = false;
                $scope.viewReport.sections[$scope.selectedSection].count--;
            }
            if ($scope.viewReport.sections[$scope.selectedSection].count === $scope.viewReport.sections[$scope.selectedSection].amount) {
                if ($scope.viewReport.sections[$scope.selectedSection].state !== true) {
                    $scope.viewReport.sections[$scope.selectedSection].state = true;
                }

            } else {
                if ($scope.viewReport.sections[$scope.selectedSection].state === true) {
                    $scope.viewReport.sections[$scope.selectedSection].state = false;
                }
            }
        }
        if (type === 'additionalQuestion') {
            if (state !== true) {
                if(state === false){
                    $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[id].state = true;
                    $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].count++;
                }else{
                    if(state === null){
                        $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[id].state = true;
                    }
                }
            }
            if (state === true) {
                $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[id].state = false;
                $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].count--;

            }
            if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].count ===                                   $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount) {
                if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].state !== true) {
                    $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].state = true;
                    $scope.viewReport.sections[$scope.selectedSection].count++;
                    if ($scope.viewReport.sections[$scope.selectedSection].count === $scope.viewReport.sections[$scope.selectedSection].amount) {
                        if ($scope.viewReport.sections[$scope.selectedSection].state !== true) {
                            $scope.viewReport.sections[$scope.selectedSection].state = true;
                        }
                    } else {
                        if ($scope.viewReport.sections[$scope.selectedSection].state === true) {
                            $scope.viewReport.sections[$scope.selectedSection].state = false;
                        }
                    }

                }
            } else {
                if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].state === true) {
                    $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].state = false;
                    $scope.viewReport.sections[$scope.selectedSection].count--;
                }
                if ($scope.viewReport.sections[$scope.selectedSection].count === $scope.viewReport.sections[$scope.selectedSection].amount) {
                    if ($scope.viewReport.sections[$scope.selectedSection].state !== true) {
                        $scope.viewReport.sections[$scope.selectedSection].state = true;
                    }
                } else {
                    if ($scope.viewReport.sections[$scope.selectedSection].state === true) {
                        $scope.viewReport.sections[$scope.selectedSection].state = false;
                    }
                }
            }

        }
        ;
    };
    //Funtion to change the pages within the report menu.
    $scope.changeMenus = function (type, index) {
        if (type === 'section' || type === 'sectionOption') {
            $sessionStorage.sectionIndex = index;
            $location.path('/questions');
        }
        if (type === 'multiQuestion') {
            $sessionStorage.questionIndex = index;
            $location.path('/addQuestions');
        }
    };

    //This is for selection sections and questions.
    $scope.showHideInfo = function (type, id, option) {
        if (type === 'selectionSection') {
            $('.sectionOption').hide();
            $('.' + $scope.viewReport.sections[id].options[option].title).show();
            $scope.selectOption = option;
            $scope.viewReport.sections[id].selected = option;

        } else {
            if (type === 'question') {
                $scope.questionselected = id;

                if ($('.additionalOutput').is(':visible')) {
                    if ($('.additionalOutput' + id).is(':visible')) {
                        $('.additionalOutput' + id).hide();
                    } else {
                        $('.additionalOutput').hide();
                        $('.additionalOutput' + id).show();
                    }
                } else {
                    $('.additionalOutput' + id).show();
                }
            } else {
                if (type === 'additionalQuestion') {
                    if ($('.additionalOutput').is(':visible')) {
                        if ($('.additionalOutput' + id).is(':visible')) {
                            $('.additionalOutput' + id).hide();
                        } else {
                            $('.additionalOutput').hide();
                            $('.additionalOutput' + id).show();
                        }
                    } else {
                        $('.additionalOutput' + id).show();
                    }
                }
            }
        }
    };

    //Camera stuff below

    $scope.takePic = function (type, inputId) {
        if(type === 'question'){
            $scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[inputId].inputs[0];
        }else{
            if(type === 'additionalQuestion'){
                $scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[inputId].inputs[0];
            }
        }

        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0, // 0=JPG 1=PNG
            correctOrientation: 1,
            saveToPhotoAlbum: 1
        };
        navigator.camera.getPicture(onSuccess, onFail, options);
    };

    var onSuccess = function (FILE_URI) {
        movePic(FILE_URI);
    };
    var onFail = function (e) {
        alert('Error taking picture');
    };

    function movePic(file) {
        window.resolveLocalFileSystemURI(file, resolveOnSuccessImage, resOnError);
    }

    //Callback function when the file system uri has been resolved
    function resolveOnSuccessImage(entry) {
        var d = new Date();
        var n = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDay()+'-'+d.getHours()+d.getMinutes();//This is where to get the formate for the time.
        //new file name
        var newFileName = $scope.viewReport.title + "-" + n + ".jpg";
        var myFolderApp = "Images";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
            //The folder is created if doesn't exis
            var root  = fileSys.root;
            $scope.tryThis = root.toURL();
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
        var path = entry.fullPath;
        $scope.currentQuestion.photos.push(path);
        $scope.$apply();
    }

    function resOnError(error) {
        alert(error.code);
    }

    $scope.deleteImage = function (type, questionId, index) {
        if(type === 'question'){
            $scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[questionId].inputs[0];
        }else{
            if(type === 'additionalQuestion'){
                $scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[questionId].inputs[0];
            }
        }
        $scope.currentQuestion.photos.splice(index, 1);
    };

    $scope.editImage = function (rootUrl, imageUrl) {
        $localStorage.tempImage = rootUrl + imageUrl;
        $sessionStorage.imagePath = $scope.currentPath;
        $location.path('/report/image');
    };

    //MEMO SECTION
    $scope.startRecording = function (type, questionId) {

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
            fileSys.root.getDirectory('media', {create: true});
        })
        var date = new Date();
        var src = 'documents://media/'+$scope.viewReport.title + "-" + date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+date.getMinutes() + ".wav";
        $scope.myMedia = new Media(src);
        // Record audio
        $scope.myMedia.startRecord();
        $scope.timer = 0;
        $scope.promise = $interval(function () {
            $scope.timer = $scope.timer + 1;
        }, 1000);
    };

    $scope.stopRecording = function (type, questionId) {
        if(type === 'question'){
            $scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[questionId].inputs[0];
        }else{
            if(type === 'additionalQuestion'){
                $scope.currentQuestion = $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[questionId].inputs[0];
            }
        }

        $interval.cancel($scope.promise);
        $scope.timer = 0;
        $scope.myMedia.stopRecord();
        $scope.currentQuestion.recording.push($scope.myMedia.src);
        clearInterval($scope.recInterval);
        $scope.$apply();
    };

    var mediaTimer = null;
    $scope.playRecording = function (memo) {
        $scope.currentMemo = memo;
        $scope.newMediaObject = new Media(memo);
        $scope.newMediaObject.play();
        if (mediaTimer === null) {

            mediaTimer = setInterval(function () {
                $scope.duration = $scope.newMediaObject.getDuration();
                // get my_media position
                $scope.newMediaObject.getCurrentPosition(
                    // success callback
                    function (position) {
                        if (position > -1 && position <= $scope.duration) {
                            $scope.currentPosition = Math.round(position);
                            $scope.roundedDuration = Math.round($scope.duration);
                            $scope.$apply();
                        } else {
                            $scope.currentPosition = 0;
                            $scope.roudedDuration = 0;
                        }
                    },
                    // error callback
                    function (e) {
                        alert("Error playing memo");
                    }
                );
            }, 1000);
        }
    };
    $scope.getTime = function (tracker) {
        var minutes = Math.floor((tracker / 60)).toFixed(0);
        var seconds = (tracker % 60);
        if (minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds <= 9) {
            seconds = "0" + seconds;
        }
        return (minutes + ":" + seconds);
    };

    $scope.stopPlayRecording = function () {
        $scope.newMediaObject.stop();
        $interval.cancel($scope.playPromise);
    };

    $scope.deleteRecording = function (question, index) {
        question.inputs[0].recording.splice(index, 1);
        alert("Deleted");
    };
})
//Controler for when creating a new report.
    .controller('ReportNewController', function ($scope, dataContext, JsonTemplateService, $localStorage, $location, $interval, $rootScope) {
    $scope.templates = dataContext.templates.getAll();
    $scope.currentPath = $location.path();
    $scope.contentLoaded = false;
    $scope.loadDropdown = true;
    $rootScope.isHomepage = false;

    var promise = JsonTemplateService.getList();
    $scope.$storage = $localStorage;
    promise.then(function (data) {
        $scope.pass = data;
        console.log($scope.pass);
    });
    $scope.selectTemplate = function (selection) {
        $scope.selection = selection;
        $scope.tempReport = $scope.selection;
        console.log($scope.tempReport);
    };
    $scope.next = function (tempReport) {
        if (typeof $localStorage.savedChecklist === 'undefined') {
            $localStorage.savedChecklist = [];
        }
        var date = new Date();
        tempReport.dateStamp = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes();
        $localStorage.savedChecklist.push(tempReport);
        if ($localStorage.savedChecklist.length >= 1) {
            $scope.$storage.savedIndex = $localStorage.savedChecklist.length - 1;
        } else {
            $scope.$storage.savedIndex = $localStorage.savedChecklist.length;
        }

        $location.path('/sections');
    };

    $rootScope.isHomepage = false;

    $scope.saveChecklist = function () {
        alert('Checklist saved!');
        $location.path('/');
    };
    setTimeout(function () {
        $scope.contentLoaded = true;
        $scope.$apply();
    }, 3000);
})
//Header controller to add functionality in the report menu.
    .controller('ReportHeaderController', function ($rootScope, $scope, $location, $sessionStorage) {
    $('.dropdown-toggle').dropdown();
    $rootScope.isResizeDiv = true;

    $scope.backButton = function () {

        if ($scope.currentPath === '/questions') {
            $location.path('/sections');
        }
        if ($scope.currentPath === '/addQuestions') {
            $location.path('/questions');
        }
        if($scope.currentPath === '/report/image'){
            $location.path($sessionStorage.imagePath);
        }
    };

    $scope.navMenuChange = function (index) {
        $sessionStorage.sectionIndex = index;
        $location.path('/questions');
        setTimeout(function () {
            window.location.reload();
        }, 100);
    };

})
//Saved reports controller.
    .controller('ReportSavedController', function ($scope, $location, dataContext, PdfFromat, $localStorage, $interval, $rootScope, $sessionStorage) {

    $scope.$storage = $localStorage;
    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = false;

    $scope.emailList = function($index){
        $scope.$storage.savedIndex = $index;
        $localStorage.checklistPdf = $localStorage.savedChecklist[$index];
		
        $scope.pdfAttachemtn = PdfFromat.getPDF($localStorage.checklistPdf);
        cordova.plugins.email.open({
                to:          [""], // email addresses for TO field
                cc:          [""], // email addresses for CC field
                bcc:         [""], // email addresses for BCC field
                attachments: [$scope.pdfAttachemtn], // file paths or base64 data streams
                subject:    $localStorage.checklistPdf.title +"_"+$localStorage.checklistPdf.name+"_"+$localStorage.checklistPdf.dateStamp, // subject of the email
                body:       "", // email body (for HTML, set isHtml to true)
                isHtml:    true, // indicats if the body is HTML or plain text
            }, function () {
                console.log('email view dismissed');
            },
            this);
        
//        $location.path('/report/email');
    }

    $scope.deleteList = function ($index) {
        var deleteChecklist = confirm('You sure?');

        if (deleteChecklist) {
            $scope.$storage.savedChecklist.splice($index, 1);
            $location.path('/report/saved');
        }
    };

    $scope.edit = function ($index) {
        $scope.$storage.savedIndex = $index;
        $localStorage.checklistName = $localStorage.savedChecklist[$index].title;
        $location.path('/report/saved/edit');
    };

    $scope.saveEdit = function () {
        $location.path('/sections');
    };

    $scope.switchChecklist = function (template) {
        if (template.name !== $scope.loadedChecklist.name) {
            $scope.currentChecklist = template.questions;
        } else {
            $scope.currentChecklist = $scope.loadedQuestions;
        }
    };
})
//
    .controller('questionnaireController', function($scope, $location, $rootScope, ListService, $sessionStorage, $localStorage){

    $scope.currentPath = $location.path;
    $rootScope.isHomepage = false;
    var promise = ListService.getList();
    //    $scope.$storage = $localStorage.savedChecklist;
    promise.then(function (data) {
        $scope.pass = data;
        $scope.quesionAir = data[0];
        $scope.outPut = $scope.quesionAir.sections[0];
    })

    $scope.continue = function(){
        $scope.outPut = $scope.quesionAir.sections[0].yes[1];
    }
    $scope.yes = function(){
        $scope.outPut = $scope.outPut.yes[0];
    }
    $scope.no = function(){
        $scope.outPut = $scope.outPut.no[0];
    }

    $scope.done = function(){
        $location.path('/guidelines');
    }

})

    .controller('guidelinesController', function($scope, $location, $rootScope, ListService){

    $scope.currentPath = $location.path;
    $rootScope.isHomepage = true;
    var promise = ListService.getList();
    //    $scope.$storage = $localStorage.savedChecklist;
    promise.then(function (data) {
        $scope.pass = data;
        $scope.quesionAir = data;
        $scope.buttonNames = $scope.quesionAir;
    })
    $scope.selected = function(item){
        $location.path('/'+item);
    }
})

    .controller('referanceListController', function($sessionStorage, $scope, $location, $rootScope, ListService){

    $scope.currentPath = $location.path;
    $rootScope.isHomepage = false;

    var promise = ListService.getList();
    promise.then(function (data){
        $scope.pass = data;
        $scope.referanceList = data[1];
        $scope.outPut = $scope.referanceList.sections;
    })
    $scope.itemSelect = function(id){
        $sessionStorage.itemId = id;
        $location.path('/referanceListItems');
    }
    $scope.backButton = function(){
        $location.path('/guidelines');
    };
})

    .controller('referanceListControllerItems', function($sessionStorage, $scope, $location, $rootScope, ListService){

    $scope.currentPath = $location.path;
    $rootScope.isHomepage = false;

    var promise = ListService.getList();
    promise.then(function (data){
        $scope.pass = data;
        $scope.referanceList = data[1];
        $scope.outPut = $scope.referanceList.sections[$sessionStorage.itemId];
    })
    $scope.itemSelect = function(id){
        $sessionStorage.sectionId = id;
        $location.path('/referanceListAddItems');
    }
    $scope.backButton = function(){
        $location.path('/referanceList');
    };
})

    .controller('referanceListControllerAddItems', function($sessionStorage, $scope, $location, $rootScope, ListService){

    $scope.currentPath = $location.path;
    $rootScope.isHomepage = false;

    console.log($sessionStorage.sectionId);

    var promise = ListService.getList();
    promise.then(function (data){
        $scope.pass = data;
        $scope.referanceList = data[1];
        $scope.outPut = $scope.referanceList.sections[$sessionStorage.itemId].items[$sessionStorage.sectionId];
    })
})
    .controller('testController', function($sessionStorage, $scope,$location, $rootScope, JsonTemplateService){
    var promise = JsonTemplateService.getList();
    promise.then(function (data){
        $scope.pass = data;
        $scope.referanceList = data[0];
        $scope.output = $scope.referanceList.sections[0].questions[0].inputs[0];
        console.log($scope.output);
        //Need to figure out how to do this, could just add the timestamp at the begining of the note, but im not sure...
        //Unless I make a array and pass it in
        $scope.array = [];
        //This is how I will be able to pass in the comments with the time stampe for repeating..
        //When the user submits the comment, I will take the time stamp and note I will pass it into the array, when the user wants to view the items, they will select the button and will be taken to the page that they are able to view it....
        $scope.array = {key:"First Key", value:"First Value"};

        $scope.output.notes.push($scope.array);

        $scope.array = {key:"Second Key", value:"second Value"}

        $scope.output.notes.push($scope.array);
    })


})
//$cordovaEmailComposer,

    .controller('emailController', function($localStorage, $sessionStorage, $scope, $location, $rootScope){
    PdfFormat.getPDF();
    $scope.email = function(){
        cordova.plugins.email.open({
                to:          ["kylen@checkmatesolutions.ca"], // email addresses for TO field
                cc:          [], // email addresses for CC field
                bcc:         [], // email addresses for BCC field
                attachments: [], // file paths or base64 data streams
                subject:    "Just a test", // subject of the email
                body:       "Emai test", // email body (for HTML, set isHtml to true)
                isHtml:    true, // indicats if the body is HTML or plain text
            }, function () {
                console.log('email view dismissed');
            },
            this);
    }

    $scope.cancel = function(){
        $location.path("/report/saved");
    }
});


