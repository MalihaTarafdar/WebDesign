import Brick from './brick.js'

const lvl1 = [
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
]

const lvl2 = [
	[0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

const lvl3 = [
	[0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 0, 1, 0, 0, 1, 0, 1, 1]
]

export const levels = [lvl1, lvl2, lvl3]

export function getLevelBricks(game, level) {
	let bricks = []
	for (let row = 0; row < level.length; row++) {
		for (let col = 0; col < level[0].length; col++) {
			if (level[row][col]) {
				bricks.push(new Brick(game, {
					x: col * Brick.width,
					y: row * Brick.height + 50 //50 is dist from top
				}))
			}
		}
	}
	return bricks
}