angular.module('app')
.directive('navFooter', function() {
    return {
        restrict: "AE",
        replace: "true",
        templateUrl: "footer.html"
    };
});


