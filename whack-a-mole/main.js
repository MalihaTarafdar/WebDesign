const cells = document.querySelectorAll('.cell')
const score = document.querySelector("#score")
const time = document.querySelector('#time')
let timeIntervalId, moleIntervalId;

function placeMole() {
	cells[Math.floor((Math.random() * cells.length))].classList.add('mole')
}

function checkMoleClicked() {
	if (this.className.indexOf('mole') != -1) {
		score.textContent = parseInt(score.textContent) + 1
		this.classList.remove('mole')
	}
}

function countdown() {
	time.textContent = parseInt(time.textContent) - 1
	if (time.textContent === '-1') endGame()
}

function changeMole() {
	const moleCell = document.querySelector('.mole')
	if (moleCell != null) moleCell.classList.remove('mole')
	placeMole()
}

function endGame() {
	clearInterval(moleIntervalId)
	clearInterval(timeIntervalId)
	time.textContent = 'DONE'
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('mouseup', checkMoleClicked)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	placeMole()
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener('mouseup', checkMoleClicked)
	}
	timeIntervalId = setInterval(countdown, 1000)
	moleIntervalId = setInterval(changeMole, 500)
})