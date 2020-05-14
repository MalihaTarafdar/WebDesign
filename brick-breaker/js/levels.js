import Brick from './brick.js'

export function getLevelBricks(game, level) {
	let bricks = []
	for (let row = 0; row < level.length; row++) {
		for (let col = 0; col < level[0].length; col++) {
			if (level[row][col] === 1) {
				bricks.push(new Brick(game, {
					x: col * Brick.width,
					y: row * Brick.height + 50 //50 is dist from top
				}))
			}
		}
	}
	return bricks
}

export const level1 = [
	[0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]