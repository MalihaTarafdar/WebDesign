//====================NAVBAR TABS====================
const tabs = document.querySelectorAll('#nav > #tabs > button')
const tabSelection = document.querySelector('#tab-selection')
let activeTab = document.querySelector('#nav > #tabs > button.active')

for (let i = 0; i < tabs.length; i++) {
	tabs[i].onclick = setActiveTab
}

function setActiveTabBar() {
	tabSelection.style.left = activeTab.getBoundingClientRect().left + 'px'
	tabSelection.style.width = activeTab.getBoundingClientRect().width + 'px'
}

function setActiveTab() {
	activeTab.classList.remove('active')
	this.classList.add('active')
	activeTab = this
	setActiveTabBar()
}

window.onresize = () => {
	setActiveTabBar()
}

document.addEventListener('DOMContentLoaded', () => {
	//set active tab bar
	setTimeout(setActiveTabBar, 500)
})