var $ = window.$;

$(document).ready(function () {
	var $form = $('.login-form');
	var $loadingOverlay = $form.find('.loading-overlay');

	var statusTexts = {
		$emailRequired: $form.find('.email-required'),
		$passwordRequired:  $form.find('.password-required'),
		$valuesIncorrect:  $form.find('.values-incorrect'),
		$serviceError:  $form.find('.service-error'),
		$loginSuccessful:  $form.find('.login-successful'),
	};

	$form.on('submit', function (event) {
		event.preventDefault();

		var formIsValid = true;

		hideStatusTexts(statusTexts);

		var email = $form.find('input[name="email"]').val();
		var password = $form.find('input[name="password"]').val();

		if (!email) {
			statusTexts.$emailRequired.removeClass('hidden');
			formIsValid = false;
		}

		if (!password) {
			statusTexts.$passwordRequired.removeClass('hidden');
			formIsValid = false;
		}

		if (formIsValid) {
			utils.showElements(loadingOverlay);
			axios.post('/api/register', {
				email: form.email.value,
				password: form.password.value,
			})
			.then(function () {
				form.email.value = '';
				form.password.value  = '';
				statusTexts.$loginSuccessful
				window.setTimeout(function () {
					utils.redirect('/profile.html');
				}, 1000);
			})
			.catch(function (error) {
				var errorType = error.response.data.type;
				if (errorType === 'AUTHENTICATION_FAILED') {
					statusTexts.$valuesIncorrect.removeClass('hidden');
				} else {
					statusTexts.$serviceError.removeClass('hidden');
				}
			})
			.finally(function () {
				$loadingOverlay.addClass('hidden');
			});
		}
	});
});

function hideStatusTexts (statusTexts) {
	for (var key in statusTexts) {
		if (statusTexts.hasOwnProperty(key)) {
			var $statusText = statusTexts[key];
			$statusText.addClass('hidden');
		}
	}
}
