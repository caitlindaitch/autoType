var app = angular.module("Typewriter", []);

app.directive("autoType", ["$timeout", function($timeout){
	return {
		restrict: "A",
		scope: false,
		link: function(scope, elem, attr){
			var text = attr.typeContent;
			var blink = attr.blinkSpeed !== undefined ? attr.blinkSpeed : 300;
			var timer = null;

			function updateText(elem, i, text){
				if (i < text.length){
					elem.html(text.substring(0, i) + " <span class='cursor'>|</span>");
					i++;
					timer = $timeout(function(){
						updateText(elem, i, text);
					}, blink);
					return;
				} else if (i === text.length){
					elem.html(text.substring(0, i) + " <span class='cursor blink'>|</span>");
					i++;
					return;
				}
			}

			if (text){
				updateText(elem, 0, text);
			}
		}
	}
}]);
