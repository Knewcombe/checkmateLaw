angular.module('app')
.directive('booleanValue', function() {
    return function(scope, elm, attr) {
        attr.$set('value', attr.booleanValue === 'true');
    };
});