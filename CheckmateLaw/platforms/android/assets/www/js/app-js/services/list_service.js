angular.module("app").service("ListService", function($q, $http, $localStorage) {

          var deferred = $q.defer();
       $http.get('js/jason/questionnaire.json?callback=JSON_CALLBACK').then(function (data){
          var savedTemplates =data.data;
          var tempTemplates = [];
            var count = Object.keys(savedTemplates).length;
            for (var i = 0; i < count; i++) {
                tempTemplates.push(savedTemplates[i]);
            }
            deferred.resolve(savedTemplates);
       });
       this.getList = function(){
           return deferred.promise;
       };
});
