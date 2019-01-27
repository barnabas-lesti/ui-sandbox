import $ from 'jquery';

const $header = $('.header');

if ($header.length) {
	const $burgerIcon = $header.find('.header_icon-burger');
	const $closeIcon = $header.find('.header_icon-close');
	const $mobileMenu = $header.find('.header_links');

	$burgerIcon.on('click', () => {
		$burgerIcon.addClass('hiddenSm');
		$closeIcon.removeClass('hiddenSm');
		$mobileMenu.removeClass('hiddenSm');
	});

	$closeIcon.on('click', () => {
		$burgerIcon.removeClass('hiddenSm');
		$closeIcon.addClass('hiddenSm');
		$mobileMenu.addClass('hiddenSm');
	});
}
