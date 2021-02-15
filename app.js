const WINNING_COMBINATION = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[0, 4, 8],
]
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cell = document.querySelectorAll('[data-cell]')
const winningMessageBox = document.querySelector('.winning-message')
const winningMessageText = document.querySelector('.winning-message__text')
const restartBtn = document.querySelector('.winning-message__btn')
const board = document.querySelector('#board')
let switchFlag 



// base setting and start game 
function startGame() {
	cell.forEach(el => el.addEventListener('click', handleClick, {once: true}))
}

startGame()

// event when user clicking 
function handleClick() {
	const currentClass = switchFlag ? CIRCLE_CLASS : X_CLASS
	const isHas = switchFlag ? "circle user win" : "x user win" 

	// switch 
	switchFlag ? checkSwitchedFlag(CIRCLE_CLASS, X_CLASS, this) 
		: checkSwitchedFlag(X_CLASS, CIRCLE_CLASS, this)

	// show win message 
	markWin(currentClass) ? winStatusMessage(isHas, 'winning-message--visible') : null 
	isDraw() ? winStatusMessage('draw', 'winning-message--visible') : null 

	// switch flag 
 	switchFlag = !switchFlag
}


// check winning 
function markWin(currentClass) {
	return WINNING_COMBINATION.some(el => {
		return el.every(index => {
			return cell[index].classList.contains(currentClass)
		})
	})
}

// check when switch flag 
function checkSwitchedFlag(circleClass, xClass, context) {
	board.classList.remove(X_CLASS)
	board.classList.remove(CIRCLE_CLASS)

	context.classList.add(circleClass)
	board.classList.add(xClass)
}

// check when nobody won 
function isDraw() {
	return [...cell].every(el => {
		return el.classList.contains(X_CLASS) || el.classList.contains(CIRCLE_CLASS)
	})
}

// show winning status message 
function winStatusMessage(winningText, visibleMessageBoxClass) {
	winningMessageText.textContent = winningText
	winningMessageBox.classList.add(visibleMessageBoxClass)
}

// reload page 
restartBtn.addEventListener('click', e => window.location.reload())