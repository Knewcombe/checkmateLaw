/**
 * @Checkmatelaw Version 0.0.1
 * (c) 2015-2016 Checkmate Solutions.
 *
 * @Author: Kyle Newcombe
 * @description:

 * This service will get the JSON file and list all the items when the user is creating a new checklist.
 *
 */
angular.module("app").service('JsonTemplateService', function($http, $q) {
    this.getList = function() {
        var deferred = $q.defer();

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
            //The folder is created if doesn't exis
            var fileSystem = fileSys.root.toURL();
            fileSys.root.getDirectory('CheckListDir', {
                    create: true,
                    exclusive: false
                },
                function(directory) {
                    console.log(directory.fullPath);
                    // var path = fileSystem.root.toURL();
                    fileSys.root.getFile(directory.fullPath + 'Checkmatelist.json', {
                        create: false
                    }, function(entry) {
                        console.log("File has been found, reading from file now");
                        entry.file(function(file) {
                            var reader = new FileReader();

                            reader.onloadend = function(e) {
                                console.log("Reading file and converting to JSON format");
                                var savedTemplates = angular.fromJson(this.result);
                                var tempTemplates = [];
                                var count = Object.keys(savedTemplates).length;
                                for (var i = 0; i < count; i++) {
                                    tempTemplates.push(savedTemplates[i]);
                                }
                                console.log(tempTemplates);
                                deferred.resolve(tempTemplates);
                            }
                            reader.readAsText(file);
                        });

                    }, function(error) {
                        console.log("File was not found, creating file now");
                        $http.get('js/jason/newCheckList-BandE.json?callback=JSON_CALLBACK').success(function(templateData) {
                            console.log("Success");
                            var savedTemplates = angular.fromJson(templateData);
                            //This just sets the JSON object to the same format as the template service one. This may go eventually, see Issue #14,
                            // if I restructure everything in a way that will work with JSON too we can just use the JSON object without fussing
                            var tempTemplates = [];
                            var count = Object.keys(savedTemplates).length;
                            for (var i = 0; i < count; i++) {
                                tempTemplates.push(savedTemplates[i]);
                            }
                            console.log(tempTemplates);
                            fileSys.root.getFile(directory.fullPath + 'Checkmatelist.json', {
                                create: true
                            }, function(entry) {
                                console.log(entry);

                                entry.createWriter(function(writer) {
                                    writer.onwrite = function(evt) {
                                        console.log("Write successfull");

                                    }
                                    var jsonse = JSON.stringify(tempTemplates);
                                    var blob = new Blob([jsonse], {
                                        type: 'application/json'
                                    });
                                    writer.write(blob);
                                }, function(error) {
                                    console.log("Unable to write to file ");
                                    console.log(error);
                                    deferred.reject();
                                });
                            }, function(error) {
                                console.log("Unable to find or create file ");
                                console.log(error);
                                deferred.reject();
                            });
                            deferred.resolve(tempTemplates);
                        }).error(function(templateData) {
                            console.log("Error");
                            console.log(templateData);
                            deferred.reject(templateData);
                        });
                    });
                },
                function(error) {
                    console.log("Unable to find fileSystem " + error);
                    deferred.reject();
                },
                function(error) {
                    console.log("Unable to find folder " + error);
                    deferred.reject();
                });
        })
        return deferred.promise;
    };

    this.resetListItem = function(id) {
			var deferred = $q.defer();
        $http.get('js/jason/newCheckList-BandE.json?callback=JSON_CALLBACK').success(function(templateData) {
            console.log("Success");
						console.log(id);
            var savedTemplate = angular.fromJson(templateData);
            //This just sets the JSON object to the same format as the template service one. This may go eventually, see Issue #14,
            // if I restructure everything in a way that will work with JSON too we can just use the JSON object without fussing
            var tempTemplate = [];
            var count = Object.keys(savedTemplate).length;
            for (var i = 0; i < count; i++) {
                if (savedTemplate[i].id == id) {
									console.log("Match");
                    tempTemplate = savedTemplate[i];
                }
            }
            deferred.resolve(tempTemplate);
        }).error(function(templateData) {
            console.log("Error");
            console.log(templateData);
            deferred.reject(templateData);
        });
				return deferred.promise;
    };
});
