angular.module('app').controller('ImageController', function($rootScope, $scope, dataContext, $localStorage, $sessionStorage, $location, $interval, ImageService, FileSystemService) {

    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = true;
		$rootScope.optionsList = false;
    $scope.currentPath = $location.path();
    $localStorage.saveIndex = [];
    $scope.$storage = $localStorage;
    $scope.itemArray = [];
    $scope.selectedSection = $sessionStorage.sectionIndex;
    $scope.selectedQuestion = $sessionStorage.questionIndex;
    $scope.imageList = [];
    $scope.folder = ''

    $('.loading').show();
    $('.content').hide();

    if ($location.path() === '/temp/image' || $location.path() === "/temp/image/select") {
        $scope.imageQuestion = $localStorage.tempInputs;
        $rootScope.footerBool = false;
        $scope.folder = 'Temp'
    } else {
        $scope.imageQuestion = $rootScope.question;
        $scope.viewReport = ($localStorage.savedChecklist[$localStorage.savedIndex]);
        $rootScope.footerBool = true;
        $scope.folder = 'Images'
    }
    window.plugins.toast.showWithOptions({
        message: "Gathering files",
        duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
        position: "bottom",
        addPixelsY: 0 // added a negative value to move it up a bit (default 0)
    })
    if($scope.imageQuestion.inputs[0].photos == 0){
      $('.loading').hide();
      $('.content').show();
    }
    $.each($scope.imageQuestion.inputs[0].photos, function(index, value){
      FileSystemService.findFile(value, $scope.folder).then(function(data){
        $('.loading').hide();
        $('.content').show();
        $scope.imageList.push({'path': data, 'name': value.replace('/Images/', '').replace('/Temp/', '')});
      })
      $scope.$apply();
    })

    $scope.init = function() {
        console.log("INIT");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        // setTimeout(function() {
        //     $('.loading').show();
        //     $('.content').hide();
        //     setTimeout(function() {
        //         $('.loading').hide();
        //         $('.content').show();
        //     }, 1000);
        // }, 100);
    };

    $scope.section = function() {
        $location.path("/sections");
    };

    $scope.question = function() {
        $location.path("/questions");
    };
    //Getting the root directory from the file system to the Documents.
    //This function is called when the window.fileSystem is resolved.
    function gotFS(fileSystem) {
        $scope.imagePath = fileSystem.root.toURL();
    }
    //File system is not called.
    function fail() {
        alert("An error occured in the application. Please kill and relaunch the app.");
    }

    //Used for header title.
    $scope.headerTitle = {
        text: '',
        word: /^\s*\w*\s*$/

    };
    //Date and time function that is called when a date formate is needed in the questions.
    $scope.dateAndTime = function() {
        var date = new Date();
        var dateAndTime = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + "-" + ("0" + date.getHours()).slice(-2) + "-" + ("0" + date.getMinutes()).slice(-2) + "-" + ("0" + date.getSeconds()).slice(-2);
        return dateAndTime;
    }

    //Camera stuff below
    $scope.takePic = function() {
            //Image service is called with the question and fileName is passed to the function
            var newFileName;
            if ($location.path() === '/temp/image') {
                newFileName = $scope.imageQuestion.output + "_" + $scope.dateAndTime() + "-" + ($scope.imageQuestion.inputs[0].recording.length + 1) + ".jpg";
                var imagePromise = ImageService.image(newFileName, "Temp");
            } else {
                if ($scope.imageQuestion.type === 'additionalQuestion') {
                    newFileName = $scope.viewReport.title + "-" + $scope.viewReport.sections[$scope.selectedSection].title + "-" + $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output + "-" + ($scope.imageQuestion.id + 1) + "_" + $scope.dateAndTime() + "-" + ($scope.imageQuestion.inputs[0].photos.length + 1) + ".jpg";
                }
                if ($scope.imageQuestion.type === 'question') {
                    newFileName = $scope.viewReport.title + "-" + $scope.viewReport.sections[$scope.selectedSection].title + "-" + ($scope.imageQuestion.id + 1) + "_" + $scope.dateAndTime() + "-" + ($scope.imageQuestion.inputs[0].photos.length + 1) + ".jpg";
                }
                var imagePromise = ImageService.image(newFileName, "Images");
            }

            //Waiting for the results of the image
            imagePromise.then(function(data) {
                $scope.imageQuestion.inputs[0].photos.push(data);
                FileSystemService.findFile(data, $scope.folder).then(function(imageData){
                  $scope.imageList.push({'path': imageData, 'name': data.replace('/Images/', '').replace('/Temp/', '')});
                })
                $scope.$apply();
            });
        }
        //REMOVE IMAGE FROM APP
    $scope.deleteImage = function(index) {
            //Calling the File service to remove the image for the application file system.
            var filePromise = FileSystemService.removeFile($rootScope.root + $scope.imageQuestion.inputs[0].photos[index]);
            filePromise.then(function() {
                $scope.imageQuestion.inputs[0].photos.splice(index, 1);
                $scope.imageList.splice(index, 1);
                $scope.$apply();
            })
        }
        //Edit image will take the user to the HTML page with a fullscreen image.
    $scope.editImage = function(imageUrl) {
        $localStorage.tempImage = imageUrl;
        $sessionStorage.imagePath = $scope.currentPath;
        $location.path('/report/image');
    }


    $scope.browse = function() {
            if ($scope.imageQuestion.type === 'additionalQuestion') {
                $rootScope.fileName = $scope.viewReport.title + "-" + $scope.viewReport.sections[$scope.selectedSection].title + "-" + $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].output + "-" + ($scope.imageQuestion.id + 1);
                $rootScope.length = ($scope.imageQuestion.inputs[0].photos.length + 1);
            }
            if ($scope.imageQuestion.type === 'question') {
                $rootScope.fileName = $scope.viewReport.title + "-" + $scope.viewReport.sections[$scope.selectedSection].title + "-" + ($scope.imageQuestion.id + 1);
                $rootScope.length = ($scope.imageQuestion.inputs[0].photos.length + 1);
            }
            $location.path("/temp/image/select");
            $rootScope.previousPath = $location.path();
            $rootScope.input = $scope.imageQuestion.inputs[0].photos;
        }
        //Adding the path of the item when radio button in selected.
    $scope.itemSelect = function(value, item) {
        if (value) {
            $scope.itemArray.push(item);
        } else {
            for (var i = 0; i < $scope.itemArray.length; i++) {
                if ($scope.itemArray[i] === item) {
                    $scope.itemArray.splice(i, 1);
                }
            }
        }
    }

    $scope.selectionFinish = function() {
        if ($scope.itemArray.length != 0) {
            for (var i = 0; i <= ($scope.itemArray.length - 1); i++) {
                var extension = $scope.itemArray[i].split(".").pop();
                var itemPromise = FileSystemService.moveTempFile($rootScope.root + $scope.itemArray[i], "Images", $scope.itemArray[i].replace("/Temp/Temporary_", $rootScope.fileName + "-").replace("." + extension, "") + "-" + $rootScope.length + "." + extension);
                for (var e = 0; e <= ($localStorage.tempInputs.inputs[0].photos.length - 1); e++) {
                    if ($localStorage.tempInputs.inputs[0].photos[e] == $scope.itemArray[i]) {
                        $localStorage.tempInputs.inputs[0].photos.splice(e, 1);
                    } else {}
                }
                itemPromise.then(function(data) {
                    $rootScope.input.push(data);
                    $location.path("/report/imageList");
                    FileSystemService.findFile(data, $scope.folder).then(function(imageData){
                      // $scope.imageList.push({'path': imageData, 'name': data.replace('/Images/', '').replace('/Temp/', '')});
                      window.plugins.toast.showWithOptions({
                          message: "Item has been moved successfully",
                          duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                          position: "bottom",
                          addPixelsY: 0 // added a negative value to move it up a bit (default 0)
                      })
                    })
                })
            }
        }
    }

})

.controller('FullImageController', function($localStorage, $sessionStorage, $scope, $location, $rootScope) {
    $scope.fullImage = $localStorage.tempImage;
		$rootScope.optionsList = false;
});
