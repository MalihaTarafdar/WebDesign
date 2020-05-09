const grid = document.querySelector('.grid')
const restartButton = document.querySelector('.restart')
const score = document.querySelector('.score')

const ROWS = getComputedStyle(document.body).getPropertyValue('--rows')
const COLS = getComputedStyle(document.body).getPropertyValue('--cols')

let cells = document.querySelectorAll('.cell')

let snakePos, applePos
let speed, dir
let intervalId

//create grid
for (let i = 0; i < ROWS * COLS; i++) {
	let cell = document.createElement('div')
	cell.classList.add('cell')
	cell.id = i
	grid.appendChild(cell)
}

function getIndex(pos) {
	return pos.row * COLS + pos.col
}

function init() {
	clear()

	//set variables
	snakePos = [{row: 4, col: 3}, {row: 4, col: 2}, {row: 4, col: 1}]
	applePos = {row: 4, col: 8}
	speed = 800
	dir = 'right'

	//set snake initial position
	for (let i = 0; i < snakePos.length; i++) {
		let snakeCell = cells[getIndex[snakePos[i]]]
		snakeCell.classList.add('snake')
	}

	//set apple initial position
	let appleCell = getIndex(applePos)
	appleCell.classList.add('apple')
}

function clear() {
	clearInterval(intervalId) //clear interval
}

function changeDir(e) {
	dir = e.key.substring(5).toLowerCase() //remove 'Arrow'
}

function move() {
	let endPos = {row: snakePos[snakePos.length - 1].row, col: snakePos[snakePos.length - 1].col}
	let end = getIndex(endPos)

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
	let newStart = getIndex(endPos)
	newStart.classList.add('snake')

	//check collision with apple
	let start = getIndex(snakePos[0])
	if (start.classList.contains('apple')) {
		start.classList.remove('apple')
		score.textContent = parseInt(score.textContent) + 1
	} else {
		end.classList.remove('snake')
		snakePos.pop()
	}
}

document.addEventListener('DOMContentLoaded', () => {
	restartButton.onclick = () => {
		init()
		document.addEventListener('keydown', changeDir)
		intervalId = setInterval(move, speed)
		restartButton.textContent = 'Restart'
	}
})