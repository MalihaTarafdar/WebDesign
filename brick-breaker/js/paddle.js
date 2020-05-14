export default class Paddle {
	constructor(game) {
		this.game = game

		this.width = 150
		this.height = 30

		this.maxSpeed = 10
		this.speed = 0

		this.pos = {
			x: this.game.width / 2 - this.width / 2,
			y: this.game.height - this.height - 10
		}
	}

	moveLeft() {
		this.speed = -this.maxSpeed
	}
	moveRight() {
		this.speed = this.maxSpeed
	}
	stop() {
		this.speed = 0
	}

	draw(ctx) {
		ctx.fillStyle = 'cyan'
		ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
	}

	update(dt) { // dt = delta time - how much time has passed since we last updated game
		// if (!dt) return //avoid divide by 0 or undefined
		// why isn't it "* dt" instead of "/ dt" ?
		//so that it doesn't look choppy on slow computers?
		// this.pos.x += 5 / dt

		this.pos.x += this.speed

		//wall collision
		if (this.pos.x < 0) this.pos.x = 0
		if (this.pos.x + this.width > this.game.width) {
			this.pos.x = this.game.width - this.width
		}
	}
}