//====================NAVBAR TABS====================
const tabs = document.querySelectorAll('#nav > #tabs > button')
const tabSelection = document.querySelector('#tab-selection')
let activeTab = document.querySelector('#nav > #tabs > button.active')

tabSelection.style.left = activeTab.getBoundingClientRect().left + 'px'
tabSelection.style.width = activeTab.getBoundingClientRect().width + 'px'

for (let i = 0; i < tabs.length; i++) {
	tabs[i].onclick = setActiveTab
}

function setActiveTab() {
	activeTab.classList.remove('active')
	this.classList.add('active')
	activeTab = this
	tabSelection.style.left = this.getBoundingClientRect().left + 'px'
	tabSelection.style.width = this.getBoundingClientRect().width + 'px'
}

window.onresize = () => {
	tabSelection.style.left = activeTab.getBoundingClientRect().left + 'px'
	tabSelection.style.width = activeTab.getBoundingClientRect().width + 'px'
}