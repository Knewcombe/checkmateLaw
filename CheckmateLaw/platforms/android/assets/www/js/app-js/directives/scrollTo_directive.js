angular.module('app').directive ("scrollTo", function () {
    return {
        restrict: "A",
        link: function(scope, $elm) {
            $elm.on('click', function() {
            	//scope.loadAll();
                var elementId = $elm[0].id.replace(/\D/g,'');
				$('.collapse').toggle();
    			$("body").animate({scrollTop: $('#' + elementId).offset().top - 100}, "slow");
            });
        }
    };
});