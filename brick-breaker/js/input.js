export default class InputHandler {
	constructor(game, paddle) {
		this.leftIsDown = false
		this.rightIsDown = false
		document.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'ArrowLeft':
					paddle.moveLeft()
					this.leftIsDown = true
					break
				case 'ArrowRight':
					paddle.moveRight()
					this.rightIsDown = true
					break
				case 'Escape':
					game.togglePause()
					break
				case ' ':
					if (game.state === MENU) game.init()
					break
			}
		})
		document.addEventListener('keyup', (e) => {
			//if keyup isn't left or right, return
			if (e.key != 'ArrowLeft' && e.key != 'ArrowRight') return

			if (e.key === 'ArrowLeft') this.leftIsDown = false
			else if (e.key === 'ArrowRight') this.rightIsDown = false

			//continue moving in the direction that is still being held
			if (this.leftIsDown) paddle.moveLeft()
			else if (this.rightIsDown) paddle.moveRight()
			else paddle.stop()
		})
	}
}