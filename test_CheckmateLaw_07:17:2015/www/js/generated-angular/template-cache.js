angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("about.html",
    "<nav-header></nav-header>\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-lg-6 col-lg-offset-3\">\r" +
    "\n" +
    "        <h2>About Checkmate</h2>\r" +
    "\n" +
    "        <p>Version: {{versionNumber}}</p>\r" +
    "\n" +
    "        <p>Copyright © {{currentDate | date: 'yyyy'}} Checkmate</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("error_notfound.html",
    "<nav-header></nav-header>\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-lg-6 col-lg-offset-3\">\r" +
    "\n" +
    "        <p>Page Not Found!</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("header.html",
    "<nav id=\"mainNav\" class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\r" +
    "\n" +
    "    <div class=\"container-fluid\">\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <div class=\"navbar-header\">\r" +
    "\n" +
    "                <div class=\"row\">\r"+
    "\n" +
    "                    <div class=\"col-xs-4\"><a class=\"navbar-brand\"  ng-click=\"home()\"><img class=\"navLogo\" src=\"img/checkmate-trans.png\"/></a></div>\r" +
    "\n" +
    "                    <button ng-show=\"currentPath === '/report/new_details'\" ng-click=\"toggleMenu()\" class=\"navButton pull-right\"></button>\r" +
    "\n" +
    "                    <div class=\"col-xs-8 headerTitle\"><p>{{headerTitle.text}}</p></div>\r"+//This will appear in the test menu for the title of what the user is using.
    "\n" +
    "                    </div>\r"+
    "\n" +
    "                    <div ng-hide=\"loadDropdown\" class=\"spinner\"></div>\r" +
    "\n" +
    "                        <a ng-show=\"loadDropdown\" class=\"glyphicon glyphicon-th pull-right\" data-parent=\"#accordion\" data-target=\"#collapseOne\"></a>\r" +
    "\n" +
    
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</nav>\r" +
    "\n"
  );

  $templateCache.put("home.html",
    "<div>\r" +
    "\n" +
    "   <!--- <ul class=\"list-group\">\r" +
    "\n" +
    "        <li class=\"list-group-item\" ng-click=\"newReport()\">New Report</li>\r" +
    "\n" +
    "        <li class=\"list-group-item\" ng-click=\"savedReports()\">Saved Reports</li>\r" +
    "\n" +
    "        <li class=\"list-group-item\" ng-click=\"test()\">Test</li>\r" +
    "\n" +
    "    </ul>--->\r" +
    "\n" +
    "    <img  src=\"img/checkmate-trans.png\"  class=\"logo\" ng-click=\"$location.path('/home')\"/>\r" +
    "\n" +
    "    <button type=\"button\" class=\"btnNormal btnWhite\" ng-click=\"newReport()\">New Report</button>\r" +
    "\n" +
    "    <button type=\"button\" class=\"btnNormal btnWhite\" ng-click=\"savedReports()\">Saved Reports</button>\r" +
    "\n" +
    "    <button type=\"button\" class=\"btnNormal btnWhite\" ng-click=\"about()\">About</button>\r" +
    "\n" +
    "    <button type=\"button\" class=\"btnNormal btnWhite\" ng-click=\"test()\">test</button>\r" +
    "\n" +
    " </div>\r" +
    "\n"
  );

  $templateCache.put("questionRadioTemplate.html",
    "<h3>{{question.text}}</h3>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-if=\"question.additional\"  class=\"additionalMobile\">\r" +
    "\n" +
    "    <p><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"radioGroup\">\r" +
    "\n" +
    "<fieldset data-role=\"controlgroup\" data-type=\"horizontal\" class=\"radioFieldset\">\r" +
    "\n" +
    "    <label for=\"radio{{question.id}}\" class=\"col-lg-3 col-xs-6\"><div class=\"radioButton\"><input class=\"radioButtonPadding\" id=\"radio{{question.id}}\" type=\"radio\" ng-model=\"question.state\" boolean-value=\"true\"><span style=\"text-align:center;\">Yes</span></div></label>\r" +
    "\n" +
    "    <label for=\"radio{{question.id + 1}}\" class=\"col-lg-3 col-xs-6\"><div class=\"radioButton\"><input class=\"radioButtonPadding\" id=\"radio{{question.id + 1}}\" type=\"radio\" ng-model=\"question.state\" boolean-value=\"false\">No</div></label>\r" +
    "\n" +
    "</fieldset>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-if=\"$parent.question.state\" ng-repeat=\"question in question.trueQuestions\" class=\"questionPadding\">\r" +
    "\n" +
    "    <question></question>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-if=\"!$parent.question.state\" ng-repeat=\"question in question.falseQuestions\" class=\"questionPadding\">\r" +
    "\n" +
    "    <question></question>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("questionTemplate.html",
    "<div class=\"questionDiv\">\r" +
    "\n" +
    "    <div class=\"questionLabel\">\r" +
    "\n" +
    "        <label>\r" +
    "\n" +
    "            <input type=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "            <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"questionImg\" alt=\"question mark\"/>\r" +
    "\n" +
    "            <div class=\"question\">\r" +
    "\n" +
    "                <p class=\"labelContents\">\r" +
    "\n" +
    "                    <span class=\"questionIndexCounter\"></span>\r" +
    "\n" +
    "                    <span class=\"questionText\">{{question.text}}</span>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "    <div ng-if=\"question.additional\" class=\"additionalMobile\">\r" +
    "\n" +
    "        <p><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "    <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "        <div class=\"col-xs-4\" ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "            <img class=\"thumbnail\" ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn deleteBtn\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "        <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "            <p class=\"playback\">Memo {{$index + 1}}</p>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn\" ng-hide=\"currentPosition > 0 && currentMemo == memo\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn\" ng-show=\"currentPosition > 0 && currentMemo == memo\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn deleteBtn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "            <p class=\"playback playbackDetails\" ng-if=\"currentPosition > 0 && currentMemo == memo\">\r" +
    "\n" +
    "                <span ng-if=\"currentPosition >= 1\"> Playing... {{getTime(currentPosition)}} / {{getTime(roundedDuration)}}</span>\r" +
    "\n" +
    "            </p>\r" +
    "\n" +
    "        </div><br />\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"btn-toolbar\">\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span>Picture</button>\r" +
    "\n" +
    "        <button ng-if=\"!timer\" type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span>Record</button>\r" +
    "\n" +
    "        <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop Recording</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("report_image.html",
    "<nav-header></nav-header>\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-lg-6 col-lg-offset-3\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <img  width=\"100%\" src=\"{{$storage.tempQuestion.photos[$storage.tempIndex]}}\" alt=\"{{$storage.tempQuestion.photos[$storage.tempIndex]}}\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("report_new.html",
    "<nav-header></nav-header>\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-lg-6 col-lg-offset-3\">\r" +
    "\n" +
    "        <form name=\"newForm\" ng-submit=\"next(templateCopy)\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label for=\"templateSelect\">What type of call is this?: &nbsp;</label><select class=\"form-control selectInput\" id=\"templateSelect\" ng-model=\"template\" ng-options=\"template as template.name for template in templates\" ng-change=\"selectTemplate(template)\" required></select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label for=\"checklistName\">Report Name: &nbsp;</label><input placeholder=\"Enter Name\"class=\"form-control\" required id=\"checklistName\" type=\"text\" ng-model=\"templateCopy.checklistName\"/>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <input type=\"submit\" value=\"Create Report\" class=\"btnWhite btnInput\"/>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("report_new_details.html",
    "<nav-header></nav-header>\r" +
    "\n" +
    "<div id=\"collapseOne\" class=\"panel-collapse collapse row\" ng-show=\"contentLoaded\">\r" +
    "\n" +
    "    <div ng-repeat=\"question in flatQuestions\" ng-if=\"question.type != 'header'\" >\r" +
    "\n" +
    "        <div ng-if=\"question.type !== 'header'\">\r" +
    "\n" +
    "            <div ng-if=\"question.type === 'radio'\">\r" +
    "\n" +
    "                <div ng-if=\"$parent.question.state\" ng-repeat=\"question in question.trueQuestions\">\r" +
    "\n" +
    "                    <div  id=\"{{'outerSelect' + (question.incrementId + 1)}}\" class=\"col-lg-4 col-sm-12\" >\r" +
    "\n" +
    "                        <div id=\"{{'select' + (question.incrementId + 1)}}\"  class=\"questionTile\" scroll-to><span class=\"jumpToSpan pull-left\">{{question.incrementId + 1}}</span><p class=\"jumpToParagraph\">{{question.text}}</p></div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"!$parent.question.state\" ng-repeat=\"question in question.falseQuestions\">\r" +
    "\n" +
    "                    <div id=\"{{'outerSelect' + (question.incrementId + 1)}}\" class=\"col-lg-4 col-sm-12\" >\r" +
    "\n" +
    "                        <div id=\"{{'select' + (question.incrementId + 1)}}\"  class=\"questionTile\" scroll-to><span class=\"jumpToSpan pull-left\">{{question.incrementId + 1}}</span><p class=\"jumpToParagraph\">{{question.text}}</p></div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div ng-if=\"question.type !== 'radio'\">\r" +
    "\n" +
    "                <div  id=\"{{'outerSelect' + (question.incrementId + 1)}}\" class=\"col-lg-4 col-sm-12\" >\r" +
    "\n" +
    "                    <div id=\"{{'select' + (question.incrementId + 1)}}\"  class=\"questionTile\" scroll-to><span class=\"jumpToSpan pull-left\">{{question.incrementId + 1}}</span><p class=\"jumpToParagraph\">{{question.text}}</p></div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<h2 ng-show=\"contentLoaded\">{{$storage.checklistName}}</h2>\r" +
    "\n" +
    "<form name=\"details_form\" ng-submit=\"saveChecklist()\" ng-init=\"\" class=\"checklistForm\" id=\"reportForm\" ng-show=\"contentLoaded\">\r" +
    "\n" +
    "    <div class=\"checklistDiv\"   ng-repeat=\"question in flatQuestions | limitTo:totalDisplayed\">\r" +
    "\n" +
    "        {{setScope($index)}}\r" +
    "\n" +
    "        <div ng-if=\"question.type !== 'header'\">\r" +
    "\n" +
    "            <div ng-if=\"question.type === 'radio'\" class=\"row\">\r" +
    "\n" +
    "                <radio></radio>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div ng-if=\"question.type !== 'radio'\" class=\"row\">\r" +
    "\n" +
    "                <question></question>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-if=\"question.type == 'header'\">\r" +
    "\n" +
    "            <h3>{{question.text}}</h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-show=\"totalDisplayed >= flatQuestions.length\"><input type=\"submit\" ng-click=\"\" class=\"btnWhite btnInput\"/></div>\r" +
    "\n" +
    "    <div class=\"submitDiv\"></div>\r" +
    "\n" +
    "</form>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div id=\"footer\" class=\"navbar navbar-fixed-bottom footer\" role=\"navigation\" ng-click=\"goToTop()\" ng-show=\"contentLoaded\">\r" +
    "\n" +
    "    <div id=\"loadingDiv\"><div class=\"spinner\"></div></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div id=\"loadingText\"><p class=\"navText\">Return to top</p></div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-hide=\"contentLoaded\" class=\"splash\">\r" +
    "\n" +
    "        <div id=\"loadingDiv\"><div class=\"spinner2\"></div></div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("report_saved.html",
    "<nav-header></nav-header>\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"list-group\">\r" +
    "\n" +
    "        <ul class=\"list-group-item list-no-bullet\" ng-repeat=\"savedChecklist in $storage.savedChecklist\">\r" +
    "\n" +
    "            <li  ng-click=\"edit($index)\">{{savedChecklist.checklistName}} - {{savedChecklist.dateStamp | date: 'dd-MMM-yyyy'}}</li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

  $templateCache.put("report_saved_details.html",
    "<nav id=\"mainNav\" class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\r" +
    "\n" +
    "    <div class=\"container-fluid\">\r" +
    "\n" +
    "        <div class=\"navbar-header\">\r" +
    "\n" +
    "            <a class=\"navbar-brand\" ng-click=\"$location.path('/home')\"><img class=\"navLogo\" src=\"img/checkmate-trans.png\"  ng-click=\"$location.path('/home')\"/></a>\r" +
    "\n" +
    "            <!---<span class=\"glyphicon glyphicon-ok-sign\"></span>--->\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</nav>\r" +
    "\n" +
    "            <h2>{{$storage.checklistName}}</h2>\r" +
    "\n" +
    "            <form name=\"newForm\" ng-submit=\"finalSave()\">\r" +
    "\n" +
    "                <div class=\"checklistDiv\" id=\"checklistDiv\" ng-repeat=\"question in $storage.savedChecklist[$storage.savedIndex].questions\">\r" +
    "\n" +
    "                    <div ng-if=\"question.type === 'header'\">\r" +
    "\n" +
    "                        <h3>{{question.text}}</h3>\r" +
    "\n" +
    "                        <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                            <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"checkbox\" ng-repeat=\"question in question.subQuestions\">\r" +
    "\n" +
    "                            <div ng-if=\"question.type !== 'header'\">\r" +
    "\n" +
    "                                <div ng-if=\"question.type === 'radio'\" class=\"row\">\r" +
    "\n" +
    "                                    <p>{{question.text}}</p>\r" +
    "\n" +
    "                                    <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                        <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <input type=\"radio\" ng-model=\"question.state\"  value=\"{{true}}\">Yes\r" +
    "\n" +
    "                                    <input type=\"radio\" ng-model=\"question.state\"  value=\"{{false}}\">No<br />\r" +
    "\n" +
    "                                    <div ng-if=\"$parent.question.state\" ng-repeat=\"question in question.trueQuestions\" class=\"row\" >\r" +
    "\n" +
    "                                        <div class=\"labelDiv\">\r" +
    "\n" +
    "                                            <label class=\"checkboxLabel\">\r" +
    "\n" +
    "                                                <input type=\"checkbox\" class=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "                                                <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"listCheckmark\" alt=\"WHAT\"/>\r" +
    "\n" +
    "                                                <span><p class=\"labelParagraph\">{{question.text}}</p></span>\r" +
    "\n" +
    "                                            </label>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                            <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "                                        <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "                                            <div ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "                                                <img class=\"thumbnail\" ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "                                                <button type=\"button\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span><br />Delete Image</button>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "                                            <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "                                                <p>Memo {{$index + 1}}</p>\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "                                            </div><br />\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div class=\"btn-toolbar\">\r" +
    "\n" +
    "                                            <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span><br />Picture</button>\r" +
    "\n" +
    "                                            <button type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span><br />Record Memo</button>\r" +
    "\n" +
    "                                            <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span><br />Stop Recording</button>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div ng-if=\"$parent.question.state === false\" ng-repeat=\"question in question.falseQuestions\" class=\"row\" >\r" +
    "\n" +
    "                                        <div class=\"labelDiv\">\r" +
    "\n" +
    "                                            <label class=\"checkboxLabel\">\r" +
    "\n" +
    "                                                <input type=\"checkbox\" class=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "                                                <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"listCheckmark\" alt=\"WHAT\"/>\r" +
    "\n" +
    "                                                <span><p class=\"labelParagraph\">{{question.text}}</p></span>\r" +
    "\n" +
    "                                            </label>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                            <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "                                        <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "                                            <div ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "                                                <img class=\"thumbnail\"  ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "                                                <button type=\"button\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span><br />Delete Image</button>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "                                            <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "                                                <p>Memo {{$index + 1}}</p>\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "                                            </div><br />\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div class=\"btn-toolbar\">\r" +
    "\n" +
    "                                            <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span><br />Picture</button>\r" +
    "\n" +
    "                                            <button type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span><br />Record Memo</button>\r" +
    "\n" +
    "                                            <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span><br />Stop Recording</button>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div ng-if=\"question.type !== 'radio'\" class=\"row\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div class=\"labelDiv\">\r" +
    "\n" +
    "                                        <label class=\"checkboxLabel\">\r" +
    "\n" +
    "                                            <input type=\"checkbox\" class=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "                                            <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"listCheckmark\" alt=\"WHAT\"/>\r" +
    "\n" +
    "                                            <span><p class=\"labelParagraph\">{{question.text}}</p></span>\r" +
    "\n" +
    "                                        </label>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                        <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "                                    <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "                                        <div ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "                                            <img class=\"thumbnail\"  ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "                                            <button type=\"button\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span><br />Delete Image</button>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "                                        <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "                                            <p>Memo {{$index + 1}}</p>\r" +
    "\n" +
    "                                            <button type=\"button\" class=\"btn\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "                                            <button type=\"button\" class=\"btn\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "                                            <button type=\"button\" class=\"btn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "                                        </div><br />\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div class=\"btn-toolbar\">\r" +
    "\n" +
    "                                        <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span><br />Picture</button>\r" +
    "\n" +
    "                                        <button type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span><br />Record Memo</button>\r" +
    "\n" +
    "                                        <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span><br />Stop Recording</button>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                            <div ng-if=\"question.type === 'header'\">\r" +
    "\n" +
    "                                <h3>{{question.text}}</h3>\r" +
    "\n" +
    "                                <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                    <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"checkbox\" ng-repeat=\"question in question.subQuestions\">\r" +
    "\n" +
    "                                    <div ng-if=\"question.type !== 'header'\">\r" +
    "\n" +
    "                                        <div ng-if=\"question.type === 'radio'\" class=\"row\">\r" +
    "\n" +
    "                                            <p>{{question.text}}</p>\r" +
    "\n" +
    "                                            <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                                <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <input type=\"radio\" ng-model=\"question.state\"  value=\"{{true}}\">Yes\r" +
    "\n" +
    "                                            <input type=\"radio\" ng-model=\"question.state\"  value=\"{{false}}\">No<br />\r" +
    "\n" +
    "                                            <div ng-if=\"$parent.question.state\" ng-repeat=\"question in question.trueQuestions\" class=\"row\" >\r" +
    "\n" +
    "                                                <div class=\"labelDiv\">\r" +
    "\n" +
    "                                                    <label class=\"checkboxLabel\">\r" +
    "\n" +
    "                                                        <input type=\"checkbox\" class=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "                                                        <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"listCheckmark\" alt=\"WHAT\"/>\r" +
    "\n" +
    "                                                        <span><p class=\"labelParagraph\">{{question.text}}</p></span>\r" +
    "\n" +
    "                                                    </label>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                                    <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "                                                <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "                                                    <div ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "                                                        <img class=\"thumbnail\"  ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "                                                        <button type=\"button\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span><br />Delete Image</button>\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "                                                    <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "                                                        <p>Memo {{$index + 1}}</p>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "                                                    </div><br />\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div class=\"btn-toolbar\">\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span><br />Picture</button>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span><br />Record Memo</button>\r" +
    "\n" +
    "                                                    <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span><br />Stop Recording</button>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div ng-if=\"$parent.question.state === false\" ng-repeat=\"question in question.falseQuestions\" class=\"row\" >\r" +
    "\n" +
    "                                                <div class=\"labelDiv\">\r" +
    "\n" +
    "                                                    <label class=\"checkboxLabel\">\r" +
    "\n" +
    "                                                        <input type=\"checkbox\" class=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "                                                        <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"listCheckmark\" alt=\"WHAT\"/>\r" +
    "\n" +
    "                                                        <span><p class=\"labelParagraph\">{{question.text}}</p></span>\r" +
    "\n" +
    "                                                    </label>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                                    <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "                                                <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "                                                    <div ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "                                                        <img class=\"thumbnail\"  ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "                                                        <button type=\"button\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span><br />Delete Image</button>\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "                                                    <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "                                                        <p>Memo {{$index + 1}}</p>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "                                                    </div><br />\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div class=\"btn-toolbar\">\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span><br />Picture</button>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span><br />Record Memo</button>\r" +
    "\n" +
    "                                                    <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span><br />Stop Recording</button>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div ng-if=\"question.type !== 'radio'\" class=\"row\">\r" +
    "\n" +
    "                                            <div class=\"labelDiv\">\r" +
    "\n" +
    "                                                <label class=\"checkboxLabel\">\r" +
    "\n" +
    "                                                    <input type=\"checkbox\" class=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "                                                    <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"listCheckmark\" alt=\"WHAT\"/>\r" +
    "\n" +
    "                                                    <span><p class=\"labelParagraph\">{{question.text}}</p></span>\r" +
    "\n" +
    "                                                </label>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                                <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "                                            <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "                                                <div ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "                                                    <img class=\"thumbnail\"  ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "                                                    <button type=\"button\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span><br />Delete Image</button>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "                                                <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "                                                    <p>Memo {{$index + 1}}</p>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "                                                </div><br />\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div class=\"btn-toolbar\">\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span><br />Picture</button>\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span><br />Record Memo</button>\r" +
    "\n" +
    "                                                <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span><br />Stop Recording</button>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                    <div ng-if=\"question.type === 'header'\">\r" +
    "\n" +
    "                                        <div ng-if=\"question.type === 'radio'\" class=\"row\">\r" +
    "\n" +
    "                                            <p>{{question.text}}</p>\r" +
    "\n" +
    "                                            <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                                <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <input type=\"radio\" ng-model=\"question.state\"  value=\"{{true}}\">Yes\r" +
    "\n" +
    "                                            <input type=\"radio\" ng-model=\"question.state\"  value=\"{{false}}\">No<br />\r" +
    "\n" +
    "                                            <div ng-if=\"$parent.question.state\" ng-repeat=\"question in question.trueQuestions\" class=\"row\" >\r" +
    "\n" +
    "                                                <div class=\"labelDiv\">\r" +
    "\n" +
    "                                                    <label class=\"checkboxLabel\">\r" +
    "\n" +
    "                                                        <input type=\"checkbox\" class=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "                                                        <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"listCheckmark\" alt=\"WHAT\"/>\r" +
    "\n" +
    "                                                        <span><p class=\"labelParagraph\">{{question.text}}</p></span>\r" +
    "\n" +
    "                                                    </label>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                                    <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "                                                <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "                                                    <div ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "                                                        <img class=\"thumbnail\"  ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "                                                        <button type=\"button\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span><br />Delete Image</button>\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "                                                    <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "                                                        <p>Memo {{$index + 1}}</p>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "                                                    </div><br />\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div class=\"btn-toolbar\">\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span><br />Picture</button>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span><br />Record Memo</button>\r" +
    "\n" +
    "                                                    <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span><br />Stop Recording</button>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div ng-if=\"$parent.question.state === false\" ng-repeat=\"question in question.falseQuestions\" class=\"row\" >\r" +
    "\n" +
    "                                                <div class=\"labelDiv\">\r" +
    "\n" +
    "                                                    <label class=\"checkboxLabel\">\r" +
    "\n" +
    "                                                        <input type=\"checkbox\" class=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "                                                        <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"listCheckmark\" alt=\"WHAT\"/>\r" +
    "\n" +
    "                                                        <span><p class=\"labelParagraph\">{{question.text}}</p></span>\r" +
    "\n" +
    "                                                    </label>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                                    <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "                                                <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "                                                    <div ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "                                                        <img class=\"thumbnail\"  ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "                                                        <button type=\"button\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span><br />Delete Image</button>\r" +
    "\n" +
    "                                                    </div>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                                <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "                                                    <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "                                                        <p>Memo {{$index + 1}}</p>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "                                                        <button type=\"button\" class=\"btn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "                                                    </div><br />\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <div class=\"btn-toolbar\">\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span><br />Picture</button>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span><br />Record Memo</button>\r" +
    "\n" +
    "                                                    <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span><br />Stop Recording</button>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                                <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                        <div ng-if=\"question.type !== 'radio'\" class=\"row\">\r" +
    "\n" +
    "                                            <div class=\"labelDiv\">\r" +
    "\n" +
    "                                                <label class=\"checkboxLabel\">\r" +
    "\n" +
    "                                                    <input type=\"checkbox\" class=\"checkbox\" ng-model=\"question.state\" name=\"{{question.id}}\" />\r" +
    "\n" +
    "                                                    <img ng-src=\"{{question.state == true && 'img/checked.png' || 'img/unchecked.png'}}\" class=\"listCheckmark\" alt=\"WHAT\"/>\r" +
    "\n" +
    "                                                    <span><p class=\"labelParagraph\">{{question.text}}</p></span>\r" +
    "\n" +
    "                                                </label>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div ng-if=\"question.additional\">\r" +
    "\n" +
    "                                                <p ><small ng-repeat=\"additional in question.additional\">{{additional.text}} <br/></small></p>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <textarea class=\"form-control\" ng-model=\"question.notes\"></textarea><br/>\r" +
    "\n" +
    "                                            <div ng-if=\"question.photos.length >= 1\">\r" +
    "\n" +
    "                                                <div ng-repeat=\"photo in question.photos\">\r" +
    "\n" +
    "                                                    <img class=\"thumbnail\"  ng-click=\"editImage(question, $index)\" src=\"{{photo}}\"/>\r" +
    "\n" +
    "                                                    <button type=\"button\" ng-click=\"deleteImage(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span><br />Delete Image</button>\r" +
    "\n" +
    "                                                </div>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                            <div ng-if=\"question.memos.length >= 1\">\r" +
    "\n" +
    "                                                <div class=\"btn-toolbar\" ng-repeat=\"memo in question.memos\">\r" +
    "\n" +
    "                                                    <p>Memo {{$index + 1}}</p>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"playRecording(memo)\"><span class=\"glyphicon glyphicon-play\"></span>Play</button>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"stopPlayRecording(memo)\"><span class=\"glyphicon glyphicon-stop\"></span>Stop</button>\r" +
    "\n" +
    "                                                    <button type=\"button\" class=\"btn\" ng-click=\"deleteRecording(question, $index)\"><span class=\"glyphicon glyphicon-trash\"></span>Delete</button><br/>\r" +
    "\n" +
    "                                                </div><br />\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <div class=\"btn-toolbar\">\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"takePic(question)\"><span class=\"glyphicon glyphicon-camera\"></span><br />Picture</button>\r" +
    "\n" +
    "                                                <button type=\"button\" class=\"btn\" ng-click=\"startRecording(question)\"><span class=\"glyphicon glyphicon-record\"></span><br />Record Memo</button>\r" +
    "\n" +
    "                                                <button  ng-if=\"timer > 0\" type=\"button\" class=\"btn\" ng-click=\"stopRecording(question)\"><span class=\"glyphicon glyphicon-stop\"></span><br />Stop Recording</button>\r" +
    "\n" +
    "                                            </div>\r" +
    "\n" +
    "                                            <p ng-if=\"timer >= 1 && currentQuestion == question\">Recording... {{timer}} seconds</p>\r" +
    "\n" +
    "                                        </div>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <input type=\"submit\" class=\"btnWhite btnInput\"/>\r" +
    "\n" +
    "            </form>\r" +
    "\n"
  );

  $templateCache.put("report_saved_edit.html",
    "<nav-header></nav-header>\r" +
    "\n" +
    "<div class=\"col-lg-12\">\r" +
    "\n" +
    "    <form name=\"newForm\" ng-submit=\"saveEdit()\">\r" +
    "\n" +
    "        <div class=\"form-group\">\r" +
    "\n" +
    "            <label for=\"templateSelect\">Type: &nbsp;</label><input type=\"text\" class=\"form-control\" id=\"templateSelect\" value=\"{{$storage.savedChecklist[$storage.savedIndex].name}}\" readonly=\"readonly\" disabled />\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"form-group\">\r" +
    "\n" +
    "            <label for=\"checklistName\">Name for Checklist: &nbsp;</label><input class=\"form-control\" id=\"checklistName\" type=\"text\" ng-model=\"$storage.savedChecklist[$storage.savedIndex].checklistName\" required/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <input type=\"submit\" value=\"View/Edit\" class=\"btnWhite btnInput\"/>\r" +
    "\n" +
    "        <button type=\"button\" ng-click=\"deleteList($storage.savedIndex)\" class=\"btnWhite btnInput\">Delete</button>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>"
  );

}]);
