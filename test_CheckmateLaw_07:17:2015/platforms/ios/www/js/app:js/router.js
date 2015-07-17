angular.module("app").config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/report/new', {
        templateUrl: 'report_new.html',
        controller: 'ReportNewController'
    });

    $routeProvider.when('/report/new_details', {
        templateUrl: 'report_new_details.html',
        controller: 'ReportNewController'
    });

    $routeProvider.when('/report/saved', {
        templateUrl: 'report_saved.html',
        controller: 'ReportSavedController'
    });

    $routeProvider.when('/report/saved/edit', {
        templateUrl: 'report_saved_edit.html',
        controller: 'ReportSavedController'
    });

    $routeProvider.when('/report/saved/details', {
        templateUrl: 'report_saved_details.html',
        controller: 'ReportSavedController'
    });

    $routeProvider.when('/report/image', {
        templateUrl: 'report_image.html',
        controller: 'ReportSavedController'
    });

    $routeProvider.when('/about', {
        templateUrl: 'about.html',
        controller: 'AboutController'
    });
    
    $routeProvider.when('/test', {
       templateUrl: 'test.html',
       controller: 'testController'
    });


    // 404
    $routeProvider.when('/error/notfound', {
        templateUrl: 'error_notfound.html',
        controller: 'ErrorController'
    });

    $routeProvider.otherwise({ redirectTo: '/error/notfound' });
});
