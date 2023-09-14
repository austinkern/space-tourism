// navigation ==================================================

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

navToggle.addEventListener('click', handleMobileNavToggle);

//tabs ==================================================

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
	tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e) {
	const keydownLeft = 37;
	const keydownRight = 39;

	// change tabindex current tab to -1 when keydownLeft or KeydownRight are pressed
	if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
		tabs[tabFocus].setAttribute('tabindex', '-1');
	}

	// if right key pressed, move to tab on right
	if (e.keyCode === keydownRight) {
		if (tabFocus >= tabs.length - 1) {
			tabFocus = 0;
		} else {
			tabFocus++;
		}
	}

	// if left key pressed, move to tab on left
	if (e.keyCode === keydownLeft) {
		if (tabFocus <= 0) {
			tabFocus = tabs.length - 1;
		} else {
			tabFocus--;
		}
	}

	tabs[tabFocus].setAttribute('tabindex', '0');
	tabs[tabFocus].focus();
}

function changeTabPanel(e) {
	const targetTab = e.target;
	const targetPanel = targetTab.getAttribute('aria-controls');
	const targetImage = targetTab.getAttribute('data-image');

	const tabContainer = targetTab.parentNode;
	const mainContainer = tabContainer.parentNode;

	mainContainer.querySelectorAll('[role="tabpanel"]').forEach((panel) => panel.setAttribute('hidden', true));

	mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');

	mainContainer.querySelectorAll('picture').forEach((picture) => picture.setAttribute('hidden', true));

	mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');
}
