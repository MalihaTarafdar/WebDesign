const grid = document.querySelector('.grid')
const restartButton = document.querySelector('.restart')
const score = document.querySelector('.score')
const scoreContainer = document.querySelector('.score-container')

const ROWS = getComputedStyle(document.body).getPropertyValue('--rows')
const COLS = getComputedStyle(document.body).getPropertyValue('--cols')

let snakePos, applePos
let speed, dir, lastDir
let intervalId

//create grid
for (let i = 0; i < ROWS * COLS; i++) {
	let cell = document.createElement('div')
	cell.classList.add('cell')
	cell.id = `cell${i}`
	grid.appendChild(cell)
}

function getCellIndex(pos) {
	return pos.row * COLS + pos.col
}

function init() {
	//set variables
	snakePos = [{row: 4, col: 3}, {row: 4, col: 2}, {row: 4, col: 1}]
	applePos = {row: 4, col: 8}
	speed = 200
	dir = 'right'
	lastDir = null

	//set snake initial position
	for (let i = 0; i < snakePos.length; i++) {
		let snakeCell = document.querySelector(`#cell${getCellIndex(snakePos[i])}`)
		snakeCell.classList.add('snake')
	}

	//set apple initial position
	let appleCell = document.querySelector(`#cell${getCellIndex(applePos)}`)
	appleCell.classList.add('apple')
}

function clear(restart) {
	clearInterval(intervalId) //clear interval

	if (restart) {
		//remove any snake and apple cells
		let cells = document.querySelectorAll('.cell')
		for (let i = 0; i < cells.length; i++) {
			if (cells[i].classList.contains('snake')) cells[i].classList.remove('snake')
			if (cells[i].classList.contains('apple')) cells[i].classList.remove('apple')
		}
	}

	document.removeEventListener('keydown', changeDir)
}

function changeDir(e) {
	document.removeEventListener('keydown', changeDir) //stop double input
	lastDir = dir
	dir = e.key.substring(5).toLowerCase() //remove 'Arrow'
}

function move() {
	//direction validation
	if ((dir === 'left' && lastDir === 'right') || (dir === 'right' && lastDir === 'left') || (dir === 'up' && lastDir === 'down') || (dir === 'down' && lastDir === 'up') || (dir == lastDir)) dir = lastDir

	let endPos = {row: snakePos[snakePos.length - 1].row, col: snakePos[snakePos.length - 1].col}
	let end = document.querySelector(`#cell${getCellIndex(endPos)}`)

	//change end pos
	switch (dir) {
		case "left":
			endPos.col = snakePos[0].col - 1
			endPos.row = snakePos[0].row
			break
		case "right":
			endPos.col = snakePos[0].col + 1
			endPos.row = snakePos[0].row
			break
		case "up":
			endPos.row = snakePos[0].row - 1
			endPos.col = snakePos[0].col
			break
		case "down":
			endPos.row = snakePos[0].row + 1
			endPos.col = snakePos[0].col
			break
	}

	//wrap snake around grid
	if (endPos.row < 0) endPos.row = ROWS - 1
	if (endPos.row == ROWS) endPos.row = 0
	if (endPos.col < 0) endPos.col = COLS - 1
	if (endPos.col == COLS) endPos.col = 0

	//add end to start
	snakePos.unshift(endPos)
	let newStart = document.querySelector(`#cell${getCellIndex(endPos)}`)
	//check collision with self
	if (newStart.classList.contains('snake')) {
		clear(false)
		scoreContainer.textContent = 'GAME OVER | Score:'
		return
	} else newStart.classList.add('snake')

	//check collision with apple
	let start = document.querySelector(`#cell${getCellIndex(snakePos[0])}`)
	if (start.classList.contains('apple')) {
		start.classList.remove('apple')
		score.textContent = parseInt(score.textContent) + 1
		placeRandomApple()
	} else {
		end.classList.remove('snake')
		snakePos.pop()
	}

	document.addEventListener('keydown', changeDir) //stop double input
}

function placeRandomApple() {
	let apple
	do {
		applePos.row = Math.floor(Math.random() * ROWS)
		applePos.col = Math.floor(Math.random() * COLS)
		apple = document.querySelector(`#cell${getCellIndex(applePos)}`)
	} while (apple.classList.contains('snake'))
	apple.classList.add('apple')
}

document.addEventListener('DOMContentLoaded', () => {
	restartButton.onclick = () => {
		if (restartButton.textContent != 'Start') clear(true)
		else restartButton.textContent = 'Restart'
		init()
		document.addEventListener('keydown', changeDir)
		intervalId = setInterval(move, speed)
		scoreContainer.textContent = 'Score: '
	}
})