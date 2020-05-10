const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

const ROWS = getComputedStyle(document.body).getPropertyValue('--rows')
const COLS = getComputedStyle(document.body).getPropertyValue('--cols')

for (let i = 0; i < ROWS * COLS; i++) {
	const cell = document.createElement('div')
	grid.appendChild(cell)
}

const cells = document.querySelector('.grid div')