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

tabs.forEach((tab) => tab.addEventListener('click', changeTabPanel));

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

	const allPanels = mainContainer.querySelectorAll('[role="tabpanel"]');
	const allPictures = mainContainer.querySelectorAll('picture');

	//deselect the current tab, and activate target tab
	tabContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', 'false');
	targetTab.setAttribute('aria-selected', true);

	// hide all the panels,
	// and hide all images
	allPanels.forEach((panel) => panel.setAttribute('hidden', 'hidden'));
	allPictures.forEach((picture) => picture.setAttribute('hidden', 'hidden'));

	// show selected panel, and show selected image
	mainContainer.querySelector(`#${targetPanel}`).removeAttribute('hidden');
	mainContainer.querySelector(`#${targetImage}`).removeAttribute('hidden');
}
