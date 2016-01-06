angular.module('app')
.directive('radio', function() {
    return {
        restrict: "AE",
        templateUrl: "questionRadioTemplate.html"
        //controller: 'ReportNewController'
    };
});