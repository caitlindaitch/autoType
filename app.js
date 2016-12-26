var app = angular.module("Typewriter", []);

app.directive("autoType", ["$timeout", function($timeout){
	return {
		restrict: "A",
		scope: false,
		link: function(scope, elem, attr){
			var text = attr.typeContent;
			var blink = attr.blinkSpeed !== undefined ? attr.blinkSpeed : 300;
			var timer = null;

			console.log(blink);

			function updateText(elem, i, text){
				if (i <= text.length) {
					elem.html(text.substring(0, i));
					i++;
					timer = $timeout(function() {
						updateText(elem, i, text);
					}, blink);
					return;
				}
			}

			if (text) {
				timer = $timeout(function() {
					updateText(elem, 0, text);
				}, 500);
			}

			scope.$on("$destroy", function() {
				if(timer) {
					$timeout.cancel(timer);
				}
			});
		}
	}
}])
