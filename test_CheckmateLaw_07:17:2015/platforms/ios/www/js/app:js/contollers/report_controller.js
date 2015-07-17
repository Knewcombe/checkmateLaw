angular.module('app').controller('ReportQuestionController', function($scope, dataContext, $localStorage, $location, $interval) {
    //Camera stuff below

    $scope.takePic = function(photoArray) {
        $scope.tempArray = photoArray;
        var options =   {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0,     // 0=JPG 1=PNG
            correctOrientation: 1,
            saveToPhotoAlbum: 1
        };
        navigator.camera.getPicture(onSuccess,onFail,options);
    };

    var onSuccess = function(FILE_URI) {
        $scope.tempArray.photos.push(FILE_URI);
        $scope.$apply();
    };
    var onFail = function(e) {
        alert('Error taking picture');
    };

    $scope.deleteImage = function(question, index){
        question.photos.splice(index, 1);
    };

    $scope.editImage = function(question, index){
        $localStorage.tempQuestion = question;
        $localStorage.tempIndex = index;
        $location.path('/report/image/');
    };

//MEMO SECTION
    $scope.startRecording = function(question) {
        var src = "Sounds/" + $localStorage.checklistName + new Date().getTime() + ".wav";
        $scope.currentQuestion = question;
        $scope.myMedia = new Media(src);
        // Record audio
        $scope.myMedia.startRecord();

        $scope.timer = 0;
        $scope.promise = $interval(function(){
            $scope.timer = $scope.timer + 1;
        }, 1000);
    };

    $scope.stopRecording = function(question){
        $interval.cancel($scope.promise);
        $scope.timer = 0;
        $scope.memoArray = question;
        $scope.myMedia.stopRecord();
        $scope.memoArray.memos.push($scope.myMedia.src);
        clearInterval($scope.recInterval);
    };
    var mediaTimer = null;
    $scope.playRecording = function(memo){
        $scope.currentMemo = memo;
        $scope.newMediaObject = new Media(memo);
        $scope.newMediaObject.play();
        if (mediaTimer == null) {

            mediaTimer = setInterval(function() {
                $scope.duration = $scope.newMediaObject.getDuration();
                // get my_media position
                $scope.newMediaObject.getCurrentPosition(
                    // success callback
                    function(position) {
                        if (position > -1 && position <= $scope.duration) {
                            $scope.currentPosition = Math.round(position);
                            $scope.roundedDuration = Math.round($scope.duration);
                            $scope.$apply();
                        }else{
                            $scope.currentPosition = 0;
                            $scope.roudedDuration = 0;
                        }
                    },
                    // error callback
                    function(e) {
                        alert("Error playing memo");
                    }
                );
            }, 1000);
        }
    };
    $scope.getTime = function(tracker){
        var minutes = Math.floor((tracker / 60)).toFixed(0);
        var seconds = (tracker % 60);
        if(minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds <= 9){
            seconds = "0" + seconds;
        }
        return (minutes + ":" + seconds);
    };

    $scope.stopPlayRecording = function(){
        $scope.newMediaObject.stop();
        $interval.cancel($scope.playPromise);
    };

    $scope.deleteRecording = function(question, index){
        question.memos.splice(index, 1);
        alert("Deleted");
    };
})

.controller('ReportNewController', function($scope, dataContext, $localStorage, $location, $interval, $rootScope) {
    $scope.templates = dataContext.templates.getAll();
    $scope.totalDisplayed = 7;
    $scope.radioDisplayed = 4;
    $scope.flatQuestions = [];
    $scope.radioPosition = [];
    $scope.totalRadioPositions = 0;
    $scope.totalHeaders = 0;
    $scope.myModel = 0;
    $scope.headerPositions = [];
    $scope.questionId = 0;
    $scope.totalRadioQuestions = 0;
    $scope.selectFlatQuestionsText = [];
    $scope.currentPath = $location.path();
    $scope.totalCount = 0;
    $scope.contentLoaded = false;
    $scope.loadDropdown = true;

    $("#loadingDiv").hide();
    $scope.toggleMenu = function (){ 
        $scope.loadDropdown = false;
        $scope.goToTop();
        $scope.resetList();
        setTimeout(function () {
            $('.collapse').toggle();
            $scope.getHeights();
            $scope.loadAll();
            $scope.loadDropdown = true;
            $scope.$apply();
        }, 100);


    };

    $scope.goToTop = function () {
        $('html, body').animate({ scrollTop: 1 }, 'fast');
    };

    $scope.setScope = function (index) {
        $scope.parentIndex = index;
    };

    $scope.loadAll = function () {
            $scope.jumpToThis = $scope.flatQuestions.length;
            $scope.loadMore($scope.jumpToThis);
    };

    $scope.getHeights = function () {
        for (var xx = 1; xx < $scope.selectFlatQuestionsText.length; xx++) {
            var height = $("#select" + xx).height();
            var paddingDifference = 25;
            var buffer = 15;
            var extraSpacing = paddingDifference + buffer;
            if(height >= 80){
                if(xx % 3 == 0){
                    //Third column
                    $("#select" + (xx-1)).height(height);
                    $("#select" + (xx-2)).height(height);
                    $("#outerSelect" + (xx)).height(height + extraSpacing);
                }else if(xx % 3 == 2){
                    //Second column
                    var other3 = $("#select" + (xx+1)).height();
                    if(other3 <= height){
                        $("#select" + (xx - 1)).height(height);
                        $("#select" + (xx + 1)).height(height);
                        $("#outerSelect" + (xx)).height(height + extraSpacing);
                    }
                }else{
                    //First column
                    var other1 = $("#select" + (xx+1)).height();
                    var other2 = $("#select" + (xx+2)).height();
                    if (other1 <= height && other2 <= height) {
                        $("#select" + (xx + 1)).height(height);
                        $("#outerSelect" + (xx + 2)).height(height);
                        $("#outerSelect" + (xx)).height(height + extraSpacing);
                    }
                }
            }
        }
    };

    $scope.jumpTo = function(jumpToThis){
        $scope.jumpToThis = jumpToThis;
        $("collapse").collapse({
            toggle:false
        });
        setTimeout(function(){$scope.goToElement($scope.jumpToThis);},500);
    };

    $scope.goToElement= function(eID){
        $location.hash($scope.jumpToThis);
        anchorSmoothScroll.scrollTo(eID);
    };
    $scope.incrementId = 0;

    $scope.resetList = function(){
        $scope.incrementId = 0;
        $scope.flatQuestions = [];
        $scope.totalRadioQuestions = 0;
        $scope.selectFlatQuestionsText = [];
        if ($localStorage.savedIndex >= 0) {
            $scope.allQuestions = $localStorage.savedChecklist[$localStorage.savedIndex].questions;
            $scope.loading = false;
            for (var x = 0; x < $localStorage.savedChecklist[$localStorage.savedIndex].questions.length; x++) {
                if ($scope.allQuestions[x].type === 'header') {
                    $scope.totalHeaders += 1;
                    $scope.flatQuestions.push($scope.allQuestions[x]);
                    $scope.headerPositions.push($scope.flatQuestions.length);
                }
                var shortName = $localStorage.savedChecklist[$localStorage.savedIndex].questions[x].subQuestions;
                for (var i = 0; i < shortName.length; i++) {
                    if (shortName[i].type === 'header') {
                        $scope.totalHeaders += 1;
                        $scope.flatQuestions.push(shortName[i]);
                        $scope.headerPositions.push($scope.flatQuestions.length);
                    }
                    if (shortName[i].hasOwnProperty('subQuestions')) {
                        for (var y = 0; y < shortName[i].subQuestions.length; y++) {
                            if (shortName[i].subQuestions[y].hasOwnProperty('subQuestions')) {
                                $scope.totalHeaders += 1;
                                $scope.flatQuestions.push(shortName[i].subQuestions[y]);
                                $scope.headerPositions.push($scope.flatQuestions.length);
                                for (var u = 0; u < shortName[i].subQuestions[y].subQuestions.length; u++) {
                                    shortName[i].subQuestions[y].subQuestions[u].incrementId = ($scope.incrementId++);
                                    $scope.flatQuestions.push(shortName[i].subQuestions[y].subQuestions[u]);
                                    $scope.selectFlatQuestionsText.push(shortName[i].subQuestions[y].subQuestions[u]);
                                }
                            } else {
                                shortName[i].subQuestions[y].incrementId = ($scope.incrementId++);
                                $scope.flatQuestions.push(shortName[i].subQuestions[y]);
                                $scope.selectFlatQuestionsText.push(shortName[i].subQuestions[y]);
                            }
                        }
                    } else if (shortName[i].type === 'radio') {
                        if (shortName[i].state === true) {
                            $scope.totalRadioQuestions += shortName[i].trueQuestions.length;
                            for (var t = 0; t < shortName[i].trueQuestions.length; t++) {
                                shortName[i].trueQuestions[t].incrementId = ($scope.incrementId++);
                                $scope.selectFlatQuestionsText.push(shortName[i].trueQuestions[t]);
                            }
                        } else {
                            $scope.totalRadioQuestions += shortName[i].falseQuestions.length;
                            for (var tt = 0; tt < shortName[i].falseQuestions.length; tt++) {
                                shortName[i].falseQuestions[tt].incrementId = ($scope.incrementId++);
                                $scope.selectFlatQuestionsText.push(shortName[i].falseQuestions[tt]);
                            }
                        }
                        $scope.radioPosition.push($scope.flatQuestions.length);
                        $scope.totalRadioPositions = $scope.radioPosition.length;
                        $scope.flatQuestions.push(shortName[i]);
                    } else {
                        shortName[i].incrementId = ($scope.incrementId++);
                        $scope.flatQuestions.push(shortName[i]);
                        $scope.selectFlatQuestionsText.push(shortName[i]);
                    }
                }
            }
        }
        setTimeout(function () {
            $scope.getHeights();
        }, 1000);
    };
    $scope.resetList();
    $localStorage.flatQuestions = $scope.flatQuestions;
    $scope.selectFlatQuestions =  $localStorage.flatQuestions.length - $scope.totalHeaders;

    $scope.setQuestionIds = function(){
        var p=0;
        $('.questionDiv').each(function(){
            p++;
            var newID = p;
            $(this).attr('id',newID);
            $(this).val(p);
        });
    };
    
    $(document).ready(function () {
        $scope.setQuestionIds();
        $(window).scroll(function () {
            if ($(window).scrollTop() > $(document).height() - $(window).height() - 300) {
                if ($scope.totalDisplayed <= ($scope.selectFlatQuestions + $scope.totalRadioQuestions)) {
                    $("#loadingDiv").show();
                    $("#loadingText").hide();
                    setTimeout(function () {
                        $scope.loadMore();
                        $scope.$apply();
                    }, 1000);
                }
            }
            $scope.setQuestionIds();
        });
    });

    $scope.setIndex = function(parentIndex, thisIndex){
        $scope.totalCount = parentIndex + thisIndex + $scope.totalCount;
    };

    $scope.loadMore = function (jump) {
        if(jump){
            for(var i=0;i<($scope.flatQuestions.length + $scope.totalRadioQuestions);i++){
                $scope.currentRadioPosition = $scope.totalRadioPositions;
                $scope.parentIndex += 1;
                for (var j = 0; j < $scope.radioPosition.length; j++) {
                    if ($scope.flatQuestions[$scope.radioPosition[j]].state === false) {
                        $scope.radioLength = $scope.flatQuestions[$scope.radioPosition[j]].falseQuestions.length;
                    } else {
                        $scope.radioLength = $scope.flatQuestions[$scope.radioPosition[j]].trueQuestions.length;
                    }
                    if ($scope.totalDisplayed >= $scope.radioPosition[j] && $scope.radioDisplayed <= $scope.radioLength) {
                        $scope.radioDisplayed += 4;
                    } else {
                        $scope.totalDisplayed += 4;
                    }
                }
                $scope.totalDisplayed += 4;
            }
            $scope.$apply();
        }else {
            if ($scope.radioPosition.length >= 1 && $scope.totalRadioPositions <= $scope.radioPosition.length) {
                $scope.currentRadioPosition = $scope.totalRadioPositions;
                for (var ii = 0; ii < $scope.radioPosition.length; ii++) {
                    $scope.parentIndex += 1;
                    if ($scope.flatQuestions[$scope.radioPosition[ii]].state === false) {
                        $scope.radioLength = $scope.flatQuestions[$scope.radioPosition[ii]].falseQuestions.length;
                    } else {
                        $scope.radioLength = $scope.flatQuestions[$scope.radioPosition[ii]].trueQuestions.length;
                    }
                    if ($scope.totalDisplayed >= $scope.radioPosition[ii] && $scope.radioDisplayed <= $scope.radioLength) {
                        $scope.radioDisplayed += 4;
                    } else {
                        $scope.totalDisplayed += 4;
                    }
                }
            } else {
                $scope.totalDisplayed += 4;
            }
        }
        if($scope.totalDisplayed > $scope.radioLength && $scope.totalRadioPositions <= $scope.currentRadioPosition){
            $scope.totalRadioPositions += 1;
        }
        $("#loadingDiv").hide();
        $("#loadingText").show();
    };

    var promise = dataContext.jsonTemplates.get();
    promise.then(
        function(data){
            $scope.sortedTemplates = data;
            $scope.templates = $scope.templates.concat($scope.sortedTemplates);
        },function(reason){}
    );

    $scope.$storage = $localStorage;
    $rootScope.isHomepage = false;

    $scope.selectTemplate = function (template) {
        $scope.template = template;
        $scope.templateCopy = angular.copy(template);
    };

    $scope.next = function (templateCopy) {
        $localStorage.checklistName = templateCopy.checklistName;
        if (typeof $localStorage.savedChecklist === 'undefined') {
            $localStorage.savedChecklist = [];
        }
        templateCopy.dateStamp = Date.now();
        $localStorage.savedChecklist.push(templateCopy);
        if ($localStorage.savedChecklist.length >= 1) {
            $scope.$storage.savedIndex = $localStorage.savedChecklist.length - 1;
        }else{
            $scope.$storage.savedIndex = $localStorage.savedChecklist.length;
        }
        $location.path('/report/new_details');
    };

    $scope.saveChecklist = function(){
        alert('Checklist saved!');
        $location.path('/');
    };
    setTimeout(function () {
        $scope.contentLoaded = true;
        $scope.$apply();
    }, 3000);
})
.controller('ReportSavedController', function($scope, $location,  dataContext, $localStorage, $interval, $rootScope) {
    $scope.$storage = $localStorage;
    $rootScope.isHomepage = false;

    $scope.deleteList = function($index) {
        var deleteChecklist = confirm('You sure?');

        if(deleteChecklist) {
            $scope.$storage.savedChecklist.splice($index, 1);
            $location.path('/report/saved');
        }
    };

    $scope.edit = function($index){
        $scope.$storage.savedIndex = $index;
        $localStorage.checklistName = $localStorage.savedChecklist[$index].checklistName;
        $location.path('/report/saved/edit');
    };

    $scope.saveEdit = function(){
        $location.path('/report/new_details');
    };

    $scope.switchChecklist = function(template){
        if (template.name !== $scope.loadedChecklist.name){
            $scope.currentChecklist = template.questions;
        }else{
            $scope.currentChecklist = $scope.loadedQuestions;
        }
    };
});

