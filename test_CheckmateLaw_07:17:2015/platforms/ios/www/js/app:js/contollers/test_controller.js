angular.module("app").controller('testController', function ($scope, checklistItems, $location) {

    var promise = checklistItems.getList();

    $scope.currentPath = $location.path();
    console.log($scope.currentPath);
    $scope.headerTitle = {
        text: 'Report Name',
        word: /^\s*\w*\s*$/

    };

    promise.then(function (data) {
        $scope.pass = data.data;

//           $scope.title = $scope.items;
//           $scope.sections = $scope.items["BE"].sections;


        console.log($scope.sections);
        console.log($scope.title);

    });

    $scope.testNewButton = function () {
    };

    //Need to work at this for better logic.
    $scope.testButton = function (id, type) {
        //Per load the options withing in the function and call it when needed.
        //Look for the type of the entrie to make it easier to find the right selection.
        console.log('This is working!');

        var testid = [];
        //This is to keep trake where the user is at, when selecting the back button
        //The array will get the last item in the array and take the user to where they 
        //need to be.
        testid.push(id);

        console.log(testid);
        console.log(type);
        //This is to initilize the var... thinking how to do this better.


        // This is only for viewing the items in the JSON file there is no 
        // function or edits happening.
//        if(type !== 'question' || type !== 'section'){
//            console.log('Something went wrong');
//             $scope.reportType = $scope.items;
//             $scope.pass = $scope.reportType;
//        if(type === 'section'){
//            $scope.additional = $scope.section[id].questions;
//            $scope.pass = $scope.additional;
//        }else{
//            if(type === 'report'){
//                $scope.section = $scope.reportType["BE"].sections;
//                $scope.pass = $scope.section;
//            }else{
//                if(type === 'questions'){
//                    if($scope.pass.additional){
//                        
//                    }
//                }
//            }
//        }
//        }
//Using Show and hide with this function.
// Selecting BE will show class sections, selecting a section will show all questions
//With the class name of the section. If the questions has more questions, it will hide the questions
//the additional questions with class name of the question, or the id number, not sure if the id number will work 
//Maybe for the sub questions



        $scope.test1 = '.' + type;
        $scope.test2 = '.' + id;


        $('.' + type).hide();
        $('.questions' + id).show();

        //on load, hide all except sections.
        //If type is = to section on click, hide sections and show questions with class of the section id
        //If type is = to question on click hide sections and questions and show additional questions
        //Back button will have a value depending on what is hidden or show, will change in function
        //if value is adittionalQuestion, hide adittionalQuestions show questions
        //If value is questions show sections hide questions. ect...
        console.log('questions' + id);
        console.log($scope.test1);
        console.log($scope.test2);


// This will also allow the user to show and hide the additional info and note pad to edit
//Will do this later.



        console.log($scope.pass);
        console.log($scope.reportType);
        console.log($scope.section);
        console.log($scope.additional);

    };
    //Add a function that will edit the JSON file when tapping the radio button
    //
    //Does it need to be a radio button? can I not make the checkmarks a button
    //
    //Create a function that will show and hide the additional info and notes when tapped
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
    //K now the back button...
    $scope.backButton = function () {
        //Here I will pass values to determin where the user is located.
        //That will only be needed for questions and additional questions
        //So I will have a scope variables that will hold the that info

        //Will start with going back from section.

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



