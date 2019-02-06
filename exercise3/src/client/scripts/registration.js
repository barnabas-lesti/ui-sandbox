var axios = window.axios;
var utils = window.utils;

var form = document.getElementsByClassName('registration-form')[0];
var loadingOverlay = form.getElementsByClassName('loading-overlay')[0];

var statusTexts = {
	emailRequired: form.getElementsByClassName('email-required')[0],
	passwordRequired: form.getElementsByClassName('password-required')[0],
	passwordConfirmRequired: form.getElementsByClassName('password-confirm-required')[0],
	passwordsMustMatch: form.getElementsByClassName('passwords-must-match')[0],
	termsAndConditionsRequired: form.getElementsByClassName('terms-and-conditions-required')[0],
	emailTaken: form.getElementsByClassName('email-taken')[0],
	serviceError: form.getElementsByClassName('service-error')[0],
	registrationSuccessful: form.getElementsByClassName('registration-successful')[0],
};

form.addEventListener('submit', function (event) {
	event.preventDefault();

	hideStatusTexts();

	if (validateForm()) {
		utils.showElements(loadingOverlay);
		axios.post('/api/register', {
			email: form.email.value,
			password: form.password.value,
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			birthDate: form.birthDate.value,
			newsletter: form.newsletter.checked,
		})
		.then(function () {
			form.email.value = '';
			form.password.value  = '';
			form.passwordConfirm.value  = '';
			form.firstName.value  = '';
			form.lastName.value  = '';
			form.birthDate.value  = '';
			form.newsletter.checked  = false;
			form.termsAndConditions.checked  = false;
			utils.showElements(statusTexts.registrationSuccessful);
			utils.setTimeout(function () {
				utils.redirect('/login.html');
			}, 1000);
		})
		.catch(function (error) {
			var errorType = error.response.data.type;
			if (errorType === 'DUPLICATE_KEY') {
				utils.showElements(statusTexts.emailTaken);
			} else {
				utils.showElements(statusTexts.serviceError);
			}
		})
		.finally(function () {
			utils.hideElements(loadingOverlay);
		});
	}
});

function hideStatusTexts () {
	utils.hideElements(
		statusTexts.emailRequired,
		statusTexts.passwordRequired,
		statusTexts.passwordConfirmRequired,
		statusTexts.termsAndConditionsRequired,
		statusTexts.passwordsMustMatch,
		statusTexts.emailTaken,
		statusTexts.serviceError,
		statusTexts.registrationSuccessful,
	);
}

function validateForm () {
	var formIsValid = true;

	if (!form.email.value) {
		utils.showElements(statusTexts.emailRequired);
		formIsValid = false;
	}

	if (!form.password.value) {
		utils.showElements(statusTexts.passwordRequired);
		formIsValid = false;
	}

	if (!form.passwordConfirm.value) {
		utils.showElements(statusTexts.passwordConfirmRequired);
		formIsValid = false;
	}

	if (form.password.value !== form.passwordConfirm.value) {
		utils.showElements(statusTexts.passwordsMustMatch);
		formIsValid = false;
	}

	if (!form.termsAndConditions.checked) {
		utils.showElements(statusTexts.termsAndConditionsRequired);
		formIsValid = false;
	}

	return formIsValid;
}
