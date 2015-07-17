angular.module("app").factory("ListService", function($q, $http, $localStorage) {

    var currentChecklist = [
        {
            checklistName: '',
            name: '',
            questions:[],
            dateStamp: ''
        }
    ];

    var template = [];
    var questionCount = 0;
    function setChecklistName(checklistName) {currentChecklist.checklistName = checklistName;}
    function setName(name) {currentChecklist.name = name;}
    function setQuestions(questions) {currentChecklist.questions = questions;}
    function setDatestamp(dateStamp) {currentChecklist.dateStamp = dateStamp;}

    function getChecklistName() {return currentChecklist.checklistName;}
    function getName() {return currentChecklist.name;}
    function getQuestions() {return currentChecklist.questions;}
    function getDatestamp() {return currentChecklist.dateStamp;}



    function setTemplate(stuff) {template = stuff;}
    function getTemplate() {return template;}

    function setQuestionCount(stuff) {questionCount = stuff;}
    function getQuestionCount() {return questionCount;}

    //API
    return{
        getChecklistName: getChecklistName,
        getName: getName,
        getQuestions: getQuestions,
        getDatestamp: getDatestamp,

        setChecklistName: setChecklistName,
        setName: setName,
        setQuestions: setQuestions,
        setDatestamp: setDatestamp,

        setTemplate: setTemplate,
        getTemplate: getTemplate,

        setQuestionCount: setQuestionCount,
        getQuestionsCount: getQuestionCount
    };
});
