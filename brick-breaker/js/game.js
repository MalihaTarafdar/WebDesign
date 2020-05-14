import Paddle from './paddle.js'
import InputHandler from './input.js'
import Ball from './ball.js'

import { getLevelBricks, level1 } from './levels.js'

const STATES = Object.freeze({
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
		this.gameObjects = []

		this.state = STATES.MENU
		this.lives = 1

		new InputHandler(this, this.paddle)
	}

	static get STATES() {
		return STATES
	}

	//when game is started
	init() {
		this.bricks = getLevelBricks(this, level1)
		this.gameObjects = [this.ball, this.paddle, ...this.bricks]
		this.state = STATES.RUNNING
	}

	draw(ctx) {
		for (let i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].draw(ctx)
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
			ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
			ctx.fillRect(0, 0, this.width, this.height)

			ctx.font = '30px Arial'
			ctx.fillStyle = 'white'
			ctx.textAlign = 'center'
			ctx.fillText('GAME OVER', this.width / 2, this.height / 2)
		}
	}

	update(dt) {
		if (this.lives <= 0) this.state === STATES.GAMEOVER
		if (this.state != STATES.RUNNING) return
		for (let i = 0; i < this.gameObjects.length; i++) {
			this.gameObjects[i].update(dt)
		}
		this.gameObjects = this.gameObjects.filter(obj => !obj.broken)
	}

	togglePause() {
		if (this.state === STATES.RUNNING) this.state = STATES.PAUSED
		else this.state = STATES.RUNNING
	}
}