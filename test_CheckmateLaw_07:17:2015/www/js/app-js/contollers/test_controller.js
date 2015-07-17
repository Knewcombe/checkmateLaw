angular.module("app").controller('testController', function ($scope, checklistItems, $location) {

    var promise = checklistItems.getList();
    //Using currentPath for Header to show the title of the report, this will change
    //Reprot name will be removed from the header.
    $scope.currentPath = $location.path();
    //Used for header title.
    $scope.headerTitle = {
        text: 'Report Name',
        word: /^\s*\w*\s*$/

    };
    //Function to create JSON file is a better formate to get info.
    promise.then(function (data) {
        $scope.pass = data.data;
    });
    //ShowHideInfo function will be called when the user taps on the text of any 
    //of the output, it will look at the type and see where the user is.
    //If the user selects Sections, function will hide the section and show questions
    //If the user selects Questions, function will hide the questions and show additional questions
    //If there is no additonal questions and user will be shown the additional output and input
    //If no additional output, only input will show.
    $scope.showHideInfo = function (type, id) {

        $scope.titleTop;
        if (type === 'start') {
            $('.reportTitle').show();
            $('.section').hide();
            $('.question').hide();
            $('.additionalOutput').hide();
            $('.additionalQuestion').hide();
        }

        if (type === 'reportTitle') {
            $('.section').show();
            $('.reportTitle').hide();
            $('.backButton').show();
            $('.titleTop').show();
            $('.topDiv').show();
            $('.titleInput').hide();
            $('.headerTitle').show();
            $scope.titleTop = $scope.pass['BE'].name;
            console.log($scope.headerTitle.text);
        } else {
            if (type === 'section') {
                $scope.sectionSelected = id;
                $('.section').hide();
                $('.question' + id).show();
                $scope.titleTop = $scope.pass['BE'].sections[id].title;
            } else {
                if (type === 'question') {
                    $scope.questionselected = id;
                    if ($scope.pass['BE'].sections[$scope.sectionSelected].questions[id].additionalQuestions) {
                        console.log('test');
                        $('.additionalQuestion' + id + $scope.sectionSelected).show();
                        $scope.titleTop = $scope.pass['BE'].sections[$scope.sectionSelected].questions[id].output;
                        console.log($scope.titleTop);
                        $('.question').hide();
                        $('.additionalOutput').hide();
                    } else {
                        if ($('.additionalOutput').is(':visible')) {
                            if ($('.additionalOutput' + id + $scope.sectionSelected).is(':visible')) {
                                $('.additionalOutput' + id + $scope.sectionSelected).hide();
                            } else {
                                $('.additionalOutput').hide();
                                $('.additionalOutput' + id + $scope.sectionSelected).show();
                            }
                        } else {
                            $('.additionalOutput' + id + $scope.sectionSelected).show();
                        }
                    }
                } else {
                    if (type === 'additionalQuestion') {
                        if ($('.additionalOutput').is(':visible')) {
                            if ($('.additionalOutput' + id + $scope.questionselected + $scope.sectionSelected).is(':visible')) {
                                $('.additionalOutput' + id + $scope.questionselected + $scope.sectionSelected).hide();
                            } else {
                                $('.additionalOutput').hide();
                                $('.additionalOutput' + id + $scope.questionselected + $scope.sectionSelected).show();
                            }
                        } else {
                            $('.additionalOutput' + id + $scope.questionselected + $scope.sectionSelected).show();
                        }
                    }
                }
            }
        }
    };
    
    //backButton function uses simular logic to showHideInfo function
    
    // Instead of passing values to the function, it will simply look for what is visable
    //if question is visable, hide all things that are with the questions type, and show 
    //section only.
    $scope.backButton = function () {

        if ($('.section').is(':visible')) {
            $('.section').hide();
            $('.reportTitle').show();
            $('.titleInput').show();
            $('.backButton').hide();
            $('.titleTop').hide();
            $('.topDiv').hide();
            $('.headerTitle').hide();
        } else {
            if ($('.question').is(':visible')) {
                $('.question').hide();
                $('.additionalOutput').hide();
                $('.section').show();
                $('.titleTop').show();
                $('.headerTitle').show();
                $scope.titleTop = $scope.pass['BE'].name;
            } else {
                if ($('.additionalQuestion').is(':visible')) {
                    $('.additionalQuestion').hide();
                    $('.question' + $scope.sectionSelected).show();
                    $('.additionalOutput').hide();
                    $('.titleTop').show();
                    $('.headerTitle').show();
                    $scope.titleTop = $scope.pass['BE'].sections[$scope.sectionSelected].title;
                }
            }
        }
    };
    
    //This is a temp solution to getting all of the elements hidden after the page is
    //loaded. One this is ready to push to the report page, the loading spinner will hide this
    $scope.init = function () {

        setTimeout(function () {
            $('.section').hide();
            $('.question').hide();
            $('.additionalOutput').hide();
            $('.additionalQuestion').hide();
            $('.backButton').hide();
            $('.titleTop').hide();
            $('loadDropdown, .spinner').hide();
            $('.topDiv').hide();
            $('.titleInput').show();
            $('.headerTitle').hide();
        }, 100);

        console.log('test');
    };

});



