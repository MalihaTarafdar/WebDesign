document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
	const score = document.querySelector('#score')

	const cardArr = [
		{
			name: 'blank',
			img: './img/blank.png'
		},
		{
			name: 'cheeseburger',
			img: './img/cheeseburger.png'
		},
		{
			name: 'fries',
			img: './img/fries.png'
		},
		{
			name: 'hotdog',
			img: './img/hotdog.png'
		},
		{
			name: 'ice-cream',
			img: './img/ice-cream.png'
		},
		{
			name: 'milkshake',
			img: './img/milkshake.png'
		},
		{
			name: 'pizza',
			img: './img/pizza.png'
		},
		{
			name: 'white',
			img: './img/white.png'
		}
	];
	cardArr.sort(() => 0.5 - Math.random())
	let chosenCards = []
	let matchedCards = []
	let disableFlip = false

	function createBoard() {
		for (let i = 0; i < cardArr.length * 2; i++) {
			let cardId = (i < cardArr.length) ? i : i - cardArr.length;
			if (cardArr[cardId].name === 'blank' || cardArr[cardId].name === 'white') continue
			let card = document.createElement('img')
			card.src = './img/blank.png'
			card.setAttribute('data-id', i)
			card.addEventListener('click', flipCard)
			grid.appendChild(card)
		}
	}

	function flipCard() {
		if (disableFlip) return
		let cardId = (this.getAttribute('data-id') < cardArr.length) ? this.getAttribute('data-id') : this.getAttribute('data-id') - cardArr.length;
		console.log(cardId)
		console.log(cardArr[cardId])
		this.src = cardArr[cardId].img
		this.removeEventListener('click', flipCard)
		chosenCards.push(cardArr[cardId])
		if (chosenCards.length === 2) {
			disableFlip = true
			setTimeout(checkMatch, 500) //check after 500ms
		}
	}

	function checkMatch() {
		let firstCard = grid.querySelector('[src="' + chosenCards[0].img + '"]')
		let secondCard = grid.querySelector('[src="' + chosenCards[1].img + '"]')
		if (chosenCards[0] === chosenCards[1]) { //match
			alert("Match!")
			matchedCards.push(chosenCards)
			score.textContent = parseInt(score.textContent) + 1
		} else { //not match
			alert("Not a match.")
			firstCard.src = './img/blank.png'
			firstCard.addEventListener('click', flipCard)
			secondCard.src = './img/blank.png'
			secondCard.addEventListener('click', flipCard)
		}
		chosenCards = []
		if (matchedCards.length === (cardArr.length - 2)) {
			alert("YOU WIN!")
			score.textContent = "You win!"
		}
		disableFlip = false
	}

	createBoard()
})