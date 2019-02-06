function addClass (element, classToAdd) {
	var classList = element.className.split(' ');
	var index = classList.indexOf(classToAdd);
	if (index === -1) {
		classList.push(classToAdd)
	}
	element.className = classList.join(' ');
}

function removeClass (element, classToRemove) {
	var classList = element.className.split(' ');
	var index = classList.indexOf(classToRemove);
	if (index > -1) {
		classList.splice(index, 1);
	}
	element.className = classList.join(' ');
}

function showElements () {
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		removeClass(element, 'hidden');
	}
}

function hideElements () {
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		addClass(element, 'hidden');
	}
}

function redirect (href) {
	window.location.href = href;
}

window.utils = {
	setTimeout: window.setTimeout.bind(window),
	redirect: redirect,

	addClass: addClass,
	removeClass: removeClass,
	showElements: showElements,
	hideElements: hideElements,
};
