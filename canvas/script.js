const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const c = {
	x: 200,
	y: 200,
	r: 20,
	dx: 5,
	dy: 4
}

function drawc() {
	ctx.beginPath()
	ctx.arc(c.x, c.y, c.r, 0, 360)
	ctx.fillStyle = 'purple'
	ctx.fill()
}

function animate() {
	//clear entire canvas between frames
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	//redraw c
	drawc()

	//change cirlce position
	c.x += c.dx
	c.y += c.dy

	//bounce on wall collision
	if (c.x - c.r <= 0 || c.x + c.r >= canvas.width) c.dx *= -1
	if (c.y - c.r <= 0 || c.y + c.r >= canvas.height) c.dy *= -1

	requestAnimationFrame(animate)
}

animate()