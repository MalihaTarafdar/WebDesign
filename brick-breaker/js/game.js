import Paddle from './paddle.js'
import InputHandler from './input.js'
import Ball from './ball.js'

import { getLevelBricks, levels } from './levels.js'

export const STATES = Object.freeze({
	MENU: 'menu',
	RUNNING: 'running',
	PAUSED: 'pause',
	GAMEOVER: 'gameover'
})

export default class Game {

	constructor(width, height) {
		this.width = width
		this.height = height

		this.paddle = new Paddle(this)
		this.ball = new Ball(this)
		this.bricks = []
		this.gameObjects = []

		this.state = STATES.MENU
		this.lives = 3
		this.level = -1

		new InputHandler(this, this.paddle)
	}

	static get STATES() {
		return STATES
	}

	loseLife() {
		this.lives--
		this.ball.reset()
	}

	startNextLevel() {
		this.level++
		this.init()
		this.ball.reset()
	}

	//when game is started
	init() {
		this.bricks = getLevelBricks(this, levels[this.level])
		this.gameObjects = [this.ball, this.paddle]
		this.state = STATES.RUNNING
	}

	draw(ctx) {
		//spread gameobjects and bricks into 1 array
		let updateObjects = [...this.gameObjects, ...this.bricks]
		for (let i = 0; i < updateObjects.length; i++) {
			updateObjects[i].draw(ctx)
		}
		if (this.state === STATES.PAUSED) {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
			ctx.fillRect(0, 0, this.width, this.height)

			ctx.font = '30px Arial'
			ctx.fillStyle = 'white'
			ctx.textAlign = 'center'
			ctx.fillText('Paused', this.width / 2, this.height / 2)
		} else if (this.state === STATES.MENU) {
			ctx.fillStyle = 'rgba(0, 0, 0, 1)'
			ctx.fillRect(0, 0, this.width, this.height)

			ctx.font = '30px Arial'
			ctx.fillStyle = 'white'
			ctx.textAlign = 'center'
			ctx.fillText('Press SPACE to start', this.width / 2, this.height / 2)
		} else if (this.state === STATES.GAMEOVER) {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'
			ctx.fillRect(0, 0, this.width, this.height)

			ctx.font = '30px Arial'
			ctx.fillStyle = 'white'
			ctx.textAlign = 'center'
			ctx.fillText('GAME OVER', this.width / 2, this.height / 2)
		}
	}

	update(dt) {
		if (this.lives <= 0) this.state = STATES.GAMEOVER
		if (this.state != STATES.RUNNING) return

		//spread gameobjects and bricks into 1 array
		let updateObjects = [...this.gameObjects, ...this.bricks]
		for (let i = 0; i < updateObjects.length; i++) {
			updateObjects[i].update(dt)
		}

		this.bricks = this.bricks.filter(brick => !brick.broken)

		//check for level change
		if (this.bricks.length === 0) {
			this.startNextLevel()
			return
		}
	}

	togglePause() {
		if (this.state === STATES.RUNNING) this.state = STATES.PAUSED
		else this.state = STATES.RUNNING
	}
}