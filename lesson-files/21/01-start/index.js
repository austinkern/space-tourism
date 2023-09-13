// navigation

const nav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');

const handleMobileNavToggle = () => {
	const isVisible = nav.getAttribute('data-visible') === 'true';

	if (!isVisible) {
		nav.setAttribute('data-visible', 'true');
		navToggle.setAttribute('aria-expanded', 'true');
	} else {
		nav.setAttribute('data-visible', 'false');
		navToggle.setAttribute('aria-expanded', 'false');
	}
};

navToggle.addEventListener('click', () => handleMobileNavToggle());

//tabs

const tabs = document.querySelector('.tab-list');

// console.log(tabs);
