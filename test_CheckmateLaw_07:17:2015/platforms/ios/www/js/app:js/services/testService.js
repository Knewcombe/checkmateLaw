angular.module("app").service("checklistItems", function($http, $q){
       var deferred = $q.defer();
       $http.get('js/jason/newCheckList-BandE.json').then(function (data){
          deferred.resolve(data);
          console.log(data.data);
       });
       this.getList = function(){
           return deferred.promise;
       };
    });