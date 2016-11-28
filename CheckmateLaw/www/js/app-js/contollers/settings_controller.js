angular.module('app').controller('SettingsController', function($scope, dataContext, $localStorage, $location, $interval, $rootScope) {
    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = true;

    $scope.versionNumber = BuildInfo.version;
    $scope.buildNumber = BuildInfo.versionCode;

    $scope.about = function() {
        $location.path('/settings/about');
    };

    $scope.emailList = function() {
        $location.path('/settings/emailList');
    };
    $scope.changeCode = function() {
        $location.path('/settings/changeCode');
    };
    $scope.editChecklist = function() {
        $location.path('/settings/selectEditChecklist');
    }
})

.controller('EmailListController', function($scope, dataContext, $localStorage, $location, $interval, $rootScope) {
    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = true;

    $scope.dupFlag = false;
    $scope.displayEmail = [];
    $scope.emailItem = "";
    if (!$localStorage.emailList) {
        $localStorage.emailList = [];
    } else {
        $scope.displayEmail = $localStorage.emailList;
    };

    $scope.addEmail = function() {
        console.log($scope.emailItem);
        if ($scope.emailItem === undefined) {
            window.plugins.toast.showWithOptions({
                message: "Please enter a valid email to add to the list.",
                duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                position: "bottom",
                addPixelsY: 0 // added a negative value to move it up a bit (default 0)
            })
        } else {
            for (var i = 0; i < $localStorage.emailList.length; ++i) {
                if ($localStorage.emailList[i] == $scope.emailItem) {
                    $scope.dupFlag = true;
                };
            };
            if ($scope.dupFlag != true) {
                $localStorage.emailList.push($scope.emailItem);
                window.plugins.toast.showWithOptions({
                    message: "Email address has been added.",
                    duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                    position: "bottom",
                    addPixelsY: 0 // added a negative value to move it up a bit (default 0)
                })
                $scope.displayEmail = $localStorage.emailList;
                $scope.$apply();
                $scope.dupFlag = false;
								$scope.emailItem = "";
            } else {
                window.plugins.toast.showWithOptions({
                    message: "Please enter a different email from the list",
                    duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                    position: "bottom",
                    addPixelsY: 0 // added a negative value to move it up a bit (default 0)
                })
            }
        };
    };

    $scope.removeEmail = function(index) {
        $localStorage.emailList.splice(index, 1);
        $scope.displayEmail = $localStorage.emailList;
        window.plugins.toast.showWithOptions({
            message: "Email adress has been removed.",
            duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
            position: "bottom",
            addPixelsY: 0 // added a negative value to move it up a bit (default 0)
        })
        $scope.$apply();
    };
})

.controller('SelectEditChecklistController', function($scope, dataContext, JsonTemplateService, $sessionStorage, $localStorage, $location, $interval, $rootScope) {
    $scope.templates = dataContext.templates.getAll();
    $scope.currentPath = $location.path();
    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = true;
    $sessionStorage.selectOption = '';

    var promise = JsonTemplateService.getList();
    $scope.$storage = $localStorage;
    promise.then(function(data) {
        $scope.pass = data;
        console.log($scope.pass);
    });

    $scope.selectTemplate = function(selection) {
        $scope.selection = selection;
        $scope.tempReport = $scope.selection;
        console.log(selection);
    };
    $scope.next = function(selection) {
        console.log("Selection: " + selection);
        if (selection === undefined) {
            window.plugins.toast.showWithOptions({
                message: "No checklist selected",
                duration: "long", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                position: "bottom",
                addPixelsY: 0 // added a negative value to move it up a bit (default 0)
            })
        } else {
            $scope.selection = selection;
            $sessionStorage.tempReport = $scope.selection;
            $location.path('/settings/editChecklist/sections');
        }
    }

})

.controller('EditChecklistController', function($scope, $sessionStorage, $location, $interval, $rootScope, FileSystemService, JsonTemplateService) {
    $rootScope.isHomepage = false;
    $rootScope.isResizeDiv = true;
    $scope.currentPath = $location.path();
    $sessionStorage.tempReport;
    $scope.viewReport = $sessionStorage.tempReport;
    $scope.selectedSection = $sessionStorage.selectedSection;
    $scope.selectedQuestion = $sessionStorage.selectedQuestion;
    console.log("Section Optons " + $scope.selectOption);
    $scope.selectOption = $sessionStorage.selectOption;
    $('.loading').show();
    $('.content').hide();

    function gotFS(fileSystem) {
        console.log("gotFS called");
        $scope.fileSystem = fileSystem.root.toURL();
    }

    function fail() {
        alert("Derp");
    }

    $scope.init = function() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        setTimeout(function() {
            $('.section').show();
            $('.additionalOutput').hide();
            $('.topDiv').show();
            $('.sectionOption').hide();
            $('.titleTop').show();
            if ($scope.currentPath === '/settings/editChecklist/sections') {
                for (var i = 0; $scope.viewReport.sections.length - 1 >= i; i++) {
                    if ($scope.viewReport.sections[i].type === 'selectionSection') {
                        if ($scope.selectOption !== '') {
													console.log("test");
                            $('.' + $scope.viewReport.sections[i].options[$scope.selectOption].title).show();
                        }
                    }
                }
            }
            setTimeout(function() {
                $('.loading').hide();
                $('.content').show();
            }, 1000);
        }, 100);
    };

    $scope.showHideInfo = function(type, id, option) {
        $('.sectionOption').hide();
        $('.' + $scope.viewReport.sections[id].options[option].title).show();
        $sessionStorage.selectOption = option;
    };

    $scope.question = function(id) {
        console.log("ID " + id);
        $sessionStorage.selectedSection = id;
        $location.path("/settings/editChecklist/questions");
    }

    $scope.addQuestion = function(id) {
        console.log("ID " + id);
        $sessionStorage.selectedQuestion = id;
        $location.path("/settings/editChecklist/addQuestions");
    }

    $scope.questionnaire = function(id) {
        console.log("ID " + id);
        $sessionStorage.selectedQuestion = id;
        $location.path("settings/editChecklist/questionnaire");
    }

    $scope.hide = function(type, id) {
        console.log("Called " + type + " : " + id);
        if (type === 'section') {
            $scope.viewReport.sections[id].hide = true;
            $scope.viewReport.sections[id].amount = 0;
            $.each($scope.viewReport.sections[id].questions, function(questionIndex) {
                $scope.viewReport.sections[id].questions[questionIndex].hide = true;
                if ($scope.viewReport.sections[id].questions[questionIndex].additionalQuestions) {
                    $scope.viewReport.sections[id].questions[questionIndex].amount = 0;
                    $.each($scope.viewReport.sections[id].questions[questionIndex].additionalQuestions, function(addIndex) {
                        $scope.viewReport.sections[id].questions[questionIndex].additionalQuestions[addIndex].hide = true;
                    })
                }
            })
        }
        if (type === 'sectionOption') {
            $scope.viewReport.sections[id].hide = true;
            $scope.viewReport.sections[id].amount = 0;
            $.each($scope.viewReport.sections[id].questions, function(questionIndex) {
                $scope.viewReport.sections[id].questions[questionIndex].hide = true;
                if ($scope.viewReport.sections[id].questions[questionIndex].additionalQuestions) {
                    $scope.viewReport.sections[id].questions[questionIndex].amount = 0;
                    $.each($scope.viewReport.sections[id].questions[questionIndex].additionalQuestions, function(addIndex) {
                        $scope.viewReport.sections[id].questions[questionIndex].additionalQuestions[addIndex].hide = true;
                    })
                }
            })
        }
        if (type === 'question') {
            $scope.viewReport.sections[$scope.selectedSection].questions[id].hide = true;
            $scope.viewReport.sections[$scope.selectedSection].amount -= 1;
            if ($scope.viewReport.sections[$scope.selectedSection].amount == 0) {
                $scope.viewReport.sections[$scope.selectedSection].hide = true;
            }
        }
        if (type === 'additionalQuestion') {
            $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[id].hide = true;
            $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount -= 1;
            if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount == 0) {
                $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].hide = true;
                $scope.viewReport.sections[$scope.selectedSection].amount -= 1;
                if ($scope.viewReport.sections[$scope.selectedSection].amount == 0) {
                    $scope.viewReport.sections[$scope.selectedSection].hide = true;
                }
            }
        }
        if (type === 'multiQuestion') {
            $scope.viewReport.sections[$scope.selectedSection].questions[id].amount = 0;
            $.each($scope.viewReport.sections[$scope.selectedSection].questions[id].additionalQuestions, function(addQuestionIndex) {
                $scope.viewReport.sections[$scope.selectedSection].questions[id].additionalQuestions[addQuestionIndex].hide = true;
            })
            $scope.viewReport.sections[$scope.selectedSection].questions[id].hide = true;
            $scope.viewReport.sections[$scope.selectedSection].amount -= 1;
            if ($scope.viewReport.sections[$scope.selectedSection].amount == 0) {
                $scope.viewReport.sections[$scope.selectedSection].hide = true;
            }
        }
        if (type === 'questionnaire') {
            $scope.viewReport.sections[$scope.selectedSection].questions[id].amount = 0;
            $.each($scope.viewReport.sections[$scope.selectedSection].questions[id].questions, function(questionnaireIndex) {
                $scope.viewReport.sections[$scope.selectedSection].questions[id].questions[questionnaireIndex].hide = true;
            })
            $scope.viewReport.sections[$scope.selectedSection].questions[id].hide = true;
            $scope.viewReport.sections[$scope.selectedSection].amount -= 1;
            if ($scope.viewReport.sections[$scope.selectedSection].amount == 0) {
                $scope.viewReport.sections[$scope.selectedSection].hide = true;
            }
        }
        if (type === 'questionnaireItem') {
            $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].questions[id].hide = true;
            $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount -= 1;
            if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount == 0) {
                $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].hide = true;
                $scope.viewReport.sections[$scope.selectedSection].amount -= 1;
                if ($scope.viewReport.sections[$scope.selectedSection].amount == 0) {
                    $scope.viewReport.sections[$scope.selectedSection].hide = true;
                }
            }
        }
        $scope.$apply();
    }

    $scope.show = function(type, id) {
        console.log("Called " + type + " : " + id);
        if (type === 'section') {
            $.each($scope.viewReport.sections[id].questions, function(questionIndex) {
                $scope.viewReport.sections[id].questions[questionIndex].hide = false;
                $scope.viewReport.sections[id].amount = questionIndex + 1;
                if ($scope.viewReport.sections[id].questions[questionIndex].additionalQuestions) {
                    $.each($scope.viewReport.sections[id].questions[questionIndex].additionalQuestions, function(addIndex) {
                        $scope.viewReport.sections[id].questions[questionIndex].additionalQuestions[addIndex].hide = false;
                        $scope.viewReport.sections[id].questions[questionIndex].amount = addIndex + 1;
                    })
                }
            })
            $scope.viewReport.sections[id].hide = false;
        }
        if (type === 'sectionOption') {
            $.each($scope.viewReport.sections[id].questions, function(questionIndex) {
                $scope.viewReport.sections[id].questions[questionIndex].hide = false;
                $scope.viewReport.sections[id].amount = questionIndex + 1;
                if ($scope.viewReport.sections[id].questions[questionIndex].additionalQuestions) {
                    $.each($scope.viewReport.sections[id].questions[questionIndex].additionalQuestions, function(addIndex) {
                        $scope.viewReport.sections[id].questions[questionIndex].additionalQuestions[addIndex].hide = false;
                        $scope.viewReport.sections[id].questions[questionIndex].amount = addIndex + 1;
                    })
                }
            })
            $scope.viewReport.sections[id].hide = false;
        }
        if (type === 'question') {
            $scope.viewReport.sections[$scope.selectedSection].questions[id].hide = false;
            $scope.viewReport.sections[$scope.selectedSection].amount += 1;
            if ($scope.viewReport.sections[$scope.selectedSection].amount > 0) {
                $scope.viewReport.sections[$scope.selectedSection].hide = false;
            }
        }
        if (type === 'additionalQuestion') {
            $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].additionalQuestions[id].hide = false;
            $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount += 1;
            if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount > 0) {
                $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].hide = false;
                $scope.viewReport.sections[$scope.selectedSection].amount += 1;
                if ($scope.viewReport.sections[$scope.selectedSection].amount > 0) {
                    $scope.viewReport.sections[$scope.selectedSection].hide = false;
                }
            }
        }
        if (type === 'multiQuestion') {
            $.each($scope.viewReport.sections[$scope.selectedSection].questions[id].additionalQuestions, function(addQuestionIndex) {
                $scope.viewReport.sections[$scope.selectedSection].questions[id].additionalQuestions[addQuestionIndex].hide = false;
                $scope.viewReport.sections[$scope.selectedSection].questions[id].amount = addQuestionIndex + 1;
            })
            $scope.viewReport.sections[$scope.selectedSection].questions[id].hide = false;
            $scope.viewReport.sections[$scope.selectedSection].amount += 1;
            if ($scope.viewReport.sections[$scope.selectedSection].amount > 0) {
                $scope.viewReport.sections[$scope.selectedSection].hide = false;
            }
        }
        if (type === 'questionnaire') {
            $.each($scope.viewReport.sections[$scope.selectedSection].questions[id].questions, function(questionnaireIndex) {
                $scope.viewReport.sections[$scope.selectedSection].questions[id].questions[questionnaireIndex].hide = false;
                $scope.viewReport.sections[$scope.selectedSection].questions[id].amount = questionnaireIndex + 1;
            })
            $scope.viewReport.sections[$scope.selectedSection].questions[id].hide = false;
            $scope.viewReport.sections[$scope.selectedSection].amount += 1;
            if ($scope.viewReport.sections[$scope.selectedSection].amount > 0) {
                $scope.viewReport.sections[$scope.selectedSection].hide = false;
            }
        }
        if (type === 'questionnaireItem') {
            $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].questions[id].hide = false;
            $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount += 1;
            if ($scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].amount > 0) {
                $scope.viewReport.sections[$scope.selectedSection].questions[$scope.selectedQuestion].hide = false;
                $scope.viewReport.sections[$scope.selectedSection].amount += 1;
                if ($scope.viewReport.sections[$scope.selectedSection].amount > 0) {
                    $scope.viewReport.sections[$scope.selectedSection].hide = false;
                }
            }
        }
        $scope.$apply();
    }

    $scope.save = function() {
        //This is where the file is written...
        var promptCallback = function(buttonIndex) {
            if (buttonIndex == 1) {
                var promise = FileSystemService.writeJsonFile($scope.viewReport);
                promise.then(function() {
                    //Promise dosnt appear to be working for writeJsonFile method in FileSystemService.
                    //I will need to figure it out, for now the toast notification will be outside of the promise
                })
                window.plugins.toast.showWithOptions({
                    message: "Saved checklist",
                    duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                    position: "bottom",
                    addPixelsY: 0 // added a negative value to move it up a bit (default 0)
                })
            }
        }
        navigator.notification.confirm("Save changes?", promptCallback, "Save", ["Yes", "No"]);
    }

    $scope.reset = function() {
        var promptCallback = function(buttonIndex) {
            if (buttonIndex == 1) {
                var cleanItemPromise = JsonTemplateService.resetListItem($scope.viewReport.id);
                cleanItemPromise.then(function(data) {
                    $scope.viewReport = data;
                    window.plugins.toast.showWithOptions({
                            message: "Checklist reset",
                            duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                            position: "bottom",
                            addPixelsY: 0 // added a negative value to move it up a bit (default 0)
                        })
                        //This will not save the checklist, incase the user dosnt want it to save.
                        // var savePromise = FileSystemService.writeJsonFile($scope.viewReport);
                        // savePromise.then(function() {
                        // })
                })
            }
        }
        navigator.notification.confirm("Are you sure you want to reset this checklist to its original state?", promptCallback, "Reset", ["Yes", "No"]);
    }

});
