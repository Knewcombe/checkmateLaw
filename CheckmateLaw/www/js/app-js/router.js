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

    $routeProvider.when('/settings', {
        templateUrl: 'settings.html',
        controller: 'SettingsController'
    });

    $routeProvider.when('/report/new', {
        templateUrl: 'report_new.html',
        controller: 'ReportNewController'
    });

    $routeProvider.when('/settings/changeCode', {
        templateUrl: 'changeCode.html',
        controller: 'ChangeCodeController'
    });

    $routeProvider.when('/settings/selectEditChecklist', {
        templateUrl: 'selectEditChecklist.html',
        controller: 'SelectEditChecklistController'
    });

    $routeProvider.when('/settings/editChecklist/sections', {
        templateUrl: 'editChecklist.html',
        controller: 'EditChecklistController'
    });
    $routeProvider.when('/settings/editChecklist/questions', {
        templateUrl: 'editChecklist.html',
        controller: 'EditChecklistController'
    });
    $routeProvider.when('/settings/editChecklist/addQuestions', {
        templateUrl: 'editChecklist.html',
        controller: 'EditChecklistController'
    });

		$routeProvider.when('/settings/editChecklist/questionnaire',{
			templateUrl: 'editChecklist.html',
			controller: 'EditChecklistController'
		});

    $routeProvider.when('/settings/emailList', {
        templateUrl: 'emailList.html',
        controller: 'EmailListController'
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
        controller: 'FullImageController'
    });

    $routeProvider.when('/settings/about', {
        templateUrl: 'about.html',
        controller: 'AboutController'
    });

    $routeProvider.when('/sections', {
        templateUrl: 'sections.html',
        controller: 'ReportSectionController'
    });

    $routeProvider.when('/newReport', {
        templateUrl: 'newReport.html',
        controller: 'ReportNewController'
    });

    $routeProvider.when('/questions', {
        templateUrl: 'questions.html',
        controller: 'ReportQuestionController'
    });

    $routeProvider.when('/addQuestions', {
        templateUrl: 'questions.html',
        controller: 'ReportQuestionController'
    });
    $routeProvider.when('/guidelines', {
        templateUrl: 'guidelines.html',
        controller: 'GuidelinesController'
    });

    $routeProvider.when('/questionnaire', {
        templateUrl: 'questionnaire.html',
        controller: 'QuestionnaireController'
    });

    $routeProvider.when('/questionnaireItem', {
        templateUrl: 'questions.html',
        controller: 'ReportQuestionController'
    });

    $routeProvider.when('/referanceList', {
        templateUrl: 'referanceList.html',
        controller: 'ReferanceListController'
    });

    $routeProvider.when('/referanceListItems', {
        templateUrl: 'referanceListItems.html',
        controller: 'ReferenceListControllerItems'
    });

    $routeProvider.when('/referanceListAddItems', {
        templateUrl: 'referanceListAddItems.html',
        controller: 'ReferenceListControllerAddItems'
    });
    $routeProvider.when('/report/note', {
        templateUrl: 'note.html',
        controller: 'NoteController'
    });
    $routeProvider.when('/enterCode', {
        templateUrl: 'enterCode.html',
        controller: 'EnterCodeController'
    });
    $routeProvider.when('/securityCode', {
        templateUrl: 'securityCode.html',
        controller: 'CodeController'
    });
    $routeProvider.when('/report/imageList', {
        templateUrl: 'images.html',
        controller: 'ImageController'
    });
    $routeProvider.when('/report/audioList', {
        templateUrl: 'audio.html',
        controller: 'AudioController'
    });
    $routeProvider.when('/report/videoList', {
        templateUrl: 'videos.html',
        controller: 'VideoController'
    });
    $routeProvider.when('/temp', {
        templateUrl: 'temp.html',
        controller: 'TempMediaController'
    });
    $routeProvider.when('/temp/audio', {
        templateUrl: 'audio.html',
        controller: 'AudioController'
    });
    $routeProvider.when('/temp/audio/select', {
        templateUrl: 'audio.html',
        controller: 'AudioController'
    });
    $routeProvider.when('/temp/video', {
        templateUrl: 'videos.html',
        controller: 'VideoController'
    });
    $routeProvider.when('/temp/video/select', {
        templateUrl: 'videos.html',
        controller: 'VideoController'
    });
    $routeProvider.when('/temp/image', {
        templateUrl: 'images.html',
        controller: 'ImageController'
    });
    $routeProvider.when('/temp/image/select', {
        templateUrl: 'images.html',
        controller: 'ImageController'
    });


    // 404
    $routeProvider.when('/error/notfound', {
        templateUrl: 'error_notfound.html',
        controller: 'ErrorController'
    });

    $routeProvider.otherwise({
        redirectTo: '/error/notfound'
    });
});
