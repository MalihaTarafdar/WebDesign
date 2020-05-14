import Game from './game.js'

let canvas = document.querySelector('#gameScreen')
let ctx = canvas.getContext('2d')

const GAME_WIDTH = canvas.width
const GAME_HEIGHT = canvas.height

// can't do this bc faster cpu will run this loop faster than slower
// we want our game loop to run at a constant framerate
// while (true) {
	// 	paddle.draw(ctx)
// }

let game = new Game(GAME_WIDTH, GAME_HEIGHT)

let lastTime = 0
function gameLoop(timestamp) {
	let dt = timestamp - lastTime
	lastTime = timestamp

	// makes it so moving objects don't leave a trail
	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT) // clears a portion of the screen after any updates

	game.update(dt)
	game.draw(ctx)

	requestAnimationFrame(gameLoop) // calls gameLoop again after animation done
}

// call this instead of gameLoop()
requestAnimationFrame(gameLoop) //gives a valid timestamp