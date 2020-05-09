const grid = document.querySelector('.grid')
const restartButton = document.querySelector('.restart')
const score = document.querySelector('.score')

const ROWS = getComputedStyle(document.body).getPropertyValue('--rows')
const COLS = getComputedStyle(document.body).getPropertyValue('--cols')

let snakePos, applePos;
let speed, dir

//create grid
for (let i = 0; i < ROWS * COLS; i++) {
	let cell = document.createElement('div')
	cell.classList.add('cell')
	cell.id = i
	grid.appendChild(cell)
}

function init() {
	snakePos = [{row: 4, col: 3}, {row: 4, col: 2}, {row: 4, col: 1}]
	applePos = {row: 4, col: 8}

	//set snake initial position
	for (let i = 0; i < snakePos.length; i++) {
		let initSnakePos = snakePos[i].row * COLS + snakePos[i].col + 1
		let snakeCell = document.querySelector(`div.grid div:nth-child(${initSnakePos})`)
		snakeCell.classList.add('snake')
	}

	//set apple initial position
	let initApplePos = applePos.row * COLS + applePos.col + 1
	let appleCell = document.querySelector(`div.grid div:nth-child(${initApplePos})`)
	appleCell.classList.add('apple')
}



document.addEventListener('DOMContentLoaded', () => {
	init()


})