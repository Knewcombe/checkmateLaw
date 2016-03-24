angular.module('app')
.directive('question', function() {
    return {
        restrict: "AE",
        templateUrl: "questionTemplate.html",
        controller: 'ReportQuestionController'
    };
});