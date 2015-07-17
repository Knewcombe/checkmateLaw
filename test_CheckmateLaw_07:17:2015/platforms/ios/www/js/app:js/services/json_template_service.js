angular.module("app").service('JsonTemplateService', function($http, $q) {
    this.get = function(){
        var deferred = $q.defer();
        $http.jsonp('jason/checklist.json').success(function(templateData) {
            var savedTemplates = angular.fromJson(templateData);
            //This just sets the JSON object to the same format as the template service one. This may go eventually, see Issue #14,
            // if I restructure everything in a way that will work with JSON too we can just use the JSON object without fussing
            var tempTemplates = [];
            var count = Object.keys(savedTemplates).length;
            for (var i = 0; i < count; i++) {
                tempTemplates.push(savedTemplates[i]);
            }

            deferred.resolve(tempTemplates);
        }).error(function(templateData) {
            deferred.reject(templateData);
        });

        return deferred.promise;
    };
});