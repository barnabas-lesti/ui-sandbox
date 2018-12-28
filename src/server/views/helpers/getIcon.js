function getIcon (type) {
	let iconClasses = '';
	switch (type) {
	case 'burger':
		iconClasses = 'fas fa-bars';
		break;
	case 'close':
		iconClasses = 'fas fa-times';
		break;
	}
	return `<i class="icon ${ iconClasses }"></i>`;
}

module.exports = getIcon;