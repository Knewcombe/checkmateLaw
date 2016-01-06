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

    $routeProvider.when('/report/image', {
        templateUrl: 'reportImage.html',
        controller: 'ReportQuestionController'
    });

    $routeProvider.when('/about', {
        templateUrl: 'about.html',
        controller: 'AboutController'
    });
    
    $routeProvider.when('/sections', {
       templateUrl: 'sections.html',
       controller: 'ReportQuestionController'
    });
    
    $routeProvider.when('/newReport',{
        templateUrl: 'newReport.html',
        controller: 'ReportNewController'
    });
    
    $routeProvider.when('/questions',{
        templateUrl: 'questions.html',
        controller: 'ReportQuestionController'
    });
    
    $routeProvider.when('/addQuestions',{
        templateUrl: 'additionalQuestions.html',
        controller: 'ReportQuestionController'
    });
    $routeProvider.when('/guidelines', {
        templateUrl: 'guidelines.html',
        controller: 'guidelinesController'
    });
    
    $routeProvider.when('/questionnaire', {
        templateUrl: 'questionnaire.html',
        controller: 'questionnaireController'
    });
    
    $routeProvider.when('/referanceList',{
        templateUrl: 'referanceList.html',
        controller: 'referanceListController'
    });
    
    $routeProvider.when('/referanceListItems',{
        templateUrl: 'referanceListItems.html',
        controller: 'referanceListControllerItems'
    });
    
    $routeProvider.when('/referanceListAddItems',{
        templateUrl: 'referanceListAddItems.html',
        controller: 'referanceListControllerAddItems'
    });
    $routeProvider.when('/report/email',{
        templateUrl: 'email.html',
        controller: 'emailController'
    });
    $routeProvider.when('/test',{
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
