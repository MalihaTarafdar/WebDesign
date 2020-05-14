import { detectCollision } from './collisionDetection.js'

export default class Ball {
	constructor(game) {
		this.game = game
		this.img = document.querySelector('#ball')
		this.size = 16
		this.reset()
	}

	reset() {
		this.pos = {
			x: this.game.paddle.pos.x,
			y: this.game.paddle.pos.y - 2 * this.size
		}
		this.speed = {
			x: this.game.width / 160,
			y: this.game.height / 160
		}
	}

	draw(ctx) {
		ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size, this.size)
	}

	update(dt) {
		this.pos.x += this.speed.x
		this.pos.y += this.speed.y

		//check collision with walls on left and right
		if (this.pos.x <= 0 || this.pos.x + this.size >= this.game.width) {
			this.speed.x *= -1
		}
		//check collision with wall on top
		if (this.pos.y <= 0) {
			this.speed.y *= -1
		}

		//lose life when hit bottom of screen
		if (this.pos.y + this.size >= this.game.height) {
			this.game.loseLife()
		}

		//check collision
		if (detectCollision(this, this.game.paddle)) {
			this.speed.y *= -1
		}
	}
}