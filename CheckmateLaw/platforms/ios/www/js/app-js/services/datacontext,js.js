angular.module("app").factory('dataContext', function(TemplateService, ListService, JsonTemplateService) {
  return {
    templates: TemplateService,
    jsonTemplates: JsonTemplateService,
    lists: ListService
  };
});
