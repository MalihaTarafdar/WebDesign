const navLinks = document.querySelectorAll('#nav > #links > button')
let activeLink = document.querySelector('#nav > #links > button.active')

for (let i = 0; i < navLinks.length; i++) {
	navLinks[i].onclick = () => {
		activeLink.classList.remove('active')
		navLinks[i].classList.add('active')
		activeLink = navLinks[i]
	}
}