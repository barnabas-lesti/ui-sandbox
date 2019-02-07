var axios = window.axios;

var form = document.getElementsByClassName('login-form')[0];
var loadingOverlay = form.getElementsByClassName('loading-overlay')[0];

var emailRequiredErrorMessage = form.getElementsByClassName('email-required')[0];
var passwordRequiredErrorMessage = form.getElementsByClassName('password-required')[0];
var valuesIncorrectErrorMessage = form.getElementsByClassName('values-incorrect')[0];
var generalServiceErrorMessage = form.getElementsByClassName('service-error')[0];
var loginSuccessErrorMessage = form.getElementsByClassName('login-successful')[0];

form.addEventListener('submit', function (event) {
	event.preventDefault();

	var formIsValid = true;

	if (!form.email.value) {
		emailRequiredErrorMessage.classList.remove('hidden');
		formIsValid = false;
	} else {
		emailRequiredErrorMessage.classList.add('hidden');
	}

	if (!form.password.value) {
		passwordRequiredErrorMessage.classList.remove('hidden');
		formIsValid = false;
	} else {
		passwordRequiredErrorMessage.classList.add('hidden');
	}

	if (formIsValid) {
		loadingOverlay.classList.remove('hidden');
		axios.post('/api/login', {
			email: form.email.value,
			password: form.password.value,
		})
		.then(function () {
			form.email.value = '';
			form.password.value = '';
			loginSuccessErrorMessage.classList.remove('hidden');
			window.setTimeout(function () {
				window.location.href = '/exercises/exercise3/src/client/profile.html';
			}, 1000);
		})
		.catch(function (error) {
			var errorType = error.response.data.type;
			if (errorType === 'AUTHENTICATION_FAILED') {
				valuesIncorrectErrorMessage.classList.remove('hidden');
			} else {
				generalServiceErrorMessage.classList.remove('hidden');
			}
		})
		.finally(function () {
			loadingOverlay.classList.add('hidden');
		});
	}
});
