import { detectCollision } from "./collisionDetection.js"

export default class Brick {
	static width = 80
	static height = 24

	constructor(game, pos) {
		this.game = game
		this.pos = pos
		this.width = Brick.width
		this.height = Brick.height
		this.img = document.querySelector('.brick')
		this.broken = false
	}

	draw(ctx) {
		ctx.drawImage(this.img, this.pos.x, this.pos.y, Brick.width, Brick.height)
	}

	update(dt) {
		if (detectCollision(this.game.ball, this)) {
			this.game.ball.speed.y *= -1
			this.broken = true
		}
	}
}