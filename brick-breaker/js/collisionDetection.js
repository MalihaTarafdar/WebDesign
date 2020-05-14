export function detectCollision(ball, gameObject) {
	let ballBounds = {
		top: ball.pos.y,
		bottom: ball.pos.y + ball.size,
		left: ball.pos.x,
		right: ball.pos.x + ball.size
	}

	let objBounds = {
		top: gameObject.pos.y,
		bottom: gameObject.pos.y + gameObject.height,
		left: gameObject.pos.x,
		right: gameObject.pos.x + gameObject.width
	}

	return (
		ballBounds.bottom >= objBounds.top &&
		ballBounds.top <= objBounds.bottom &&
		ballBounds.left >= objBounds.left &&
		ballBounds.right <= objBounds.right
	)
}