const Player = (name, pNum) => {
	let nameDisplay = document.createElement('p');
	nameDisplay.classList.add('nameDisplay');
	if (pNum === 1) {
		nameDisplay.textContent = 'Player One: ' + name;
	}
	else if (pNum === 2) {
		nameDisplay.textContent = 'Player Two: ' + name;
	}
	const gb = document.querySelector('#gameboard');
	gb.appendChild(nameDisplay);
};

const startGame = (() => {
	const gb = document.querySelector('#gameboard');
	const preGame = document.querySelector('#pre-game');
	const playerOne = document.querySelector('#playerOne');
	const playerTwo = document.querySelector('#playerTwo');
	if (gb.style.display === 'none'){
		gb.style.display = 'block';
	}
	else {
		gb.style.display = 'none'
	}
	startBtn = document.querySelector('#start');
	startBtn.addEventListener('click', () => {
		if (gb.style.display === 'block') {
			gb.style.display = 'none';
		}
		else {
			gb.style.display = 'block';
		}
		if (preGame.style.display === 'none') {
			preGame.style.display = 'block';
		}
		else {
			preGame.style.display = 'none';
		}
	});
	startBtn.addEventListener('click', () => {
		if (playerOne.value === '' && playerTwo.value === '') {
			playerOne.value = 'Some Guy #1';
			playerTwo.value = 'Some Guy #2';
		}
		else if (playerOne.value === '') {
			playerOne.value = 'Some Guy #1';
		}
		else if (playerTwo.value === '') {
			playerTwo.value = 'Some Guy #2';
		}
		Player1 = Player(playerOne.value, 1);
		Player2 = Player(playerTwo.value, 2);
	});
})();

const gameBoard = (() => {
	const gb = document.querySelector('#gameboard');
	const buttonsDiv = document.createElement('div');
	buttonsDiv.id = 'buttonsDiv';
	gb.appendChild(buttonsDiv);
	let board = [];
	let resultBoard = ['', '', '', '', '', '', '', '', ''];
	const marking = (won) => {
		let mark = gameLogic.current();
		board.push(mark);
		return board;
	};
	const result = (value, pID) => {
		const split = pID.slice(1, 2);
		const index = parseInt(split) - 1;
		resultBoard[index] = value;
		const endResult = gameLogic.winner(resultBoard);
		if (endResult === 1) {
			resetBtn = document.createElement('button');
			resetBtn.id = 'resetBtn';
			resetBtn.textContent = 'Play Again';
			buttonsDiv.appendChild(resetBtn);
			resultBoard = ['', '', '', '', '', '', '', '', ''];
			resetBtn.addEventListener('click', () => {
				resultBoard = ['', '', '', '', '', '', '', '', ''];
				gameLogic.resetAll(endResult);
				buttonsDiv.removeChild(resetBtn);
				});
		}
		
	};
	return {board, marking, result};
})();


function addListeners(item) {
	item.addEventListener('click', cool = () => {
		if (item.textContent !== 'X' && item.textContent !== 'O') {
			mark = gameLogic.current();
			boardMark = gameBoard.marking(mark);
			value = displayController.display(boardMark);
			item.textContent = value;
			pID = event.target.id;
			gameBoard.result(item.textContent, pID);
		}
	});
}

const gameLogic = (() => {
	const p1 = document.querySelector('#p1');
	const p2 = document.querySelector('#p2');
	const p3 = document.querySelector('#p3');
	const p4 = document.querySelector('#p4');
	const p5 = document.querySelector('#p5');
	const p6 = document.querySelector('#p6');
	const p7 = document.querySelector('#p7');
	const p8 = document.querySelector('#p8');
	const p9 = document.querySelector('#p9');
	const allPs = [p1, p2, p3, p4, p5, p6, p7, p8, p9];
	const gb = document.querySelector('#gameboard');;
	const winnerText = document.createElement('p');
	winnerText.id = 'winnerText';
    allPs.forEach(addListeners);
	let currPlayer = '';
	const current = (won) => {
		let gameboard = gameBoard.board;
		if (won === 1) {
			gameboard.length = 0;
		}
		else if (gameboard.length === 0) {
			 currPlayer = 'X';
		}
		else if (gameboard.length !== 0) {
			items = gameboard.length - 1;
			if (gameboard[items] === 'X') {
				currPlayer = 'O';
			}
			else if (gameboard[items] === 'O') {
				currPlayer = 'X';
			}
		}
		return currPlayer;
	}
	const winner = (end) => {
		const playerOne = document.querySelector('#playerOne');
		const playerTwo = document.querySelector('#playerTwo');
		const board = end;
		let won = 0;
		let c = 0;
		const winningComb = [
		[0, 1, 2],    //|0, 1, 2| gameboard placement values
		[0, 3, 6],    //|3, 4, 5|
		[0, 4, 8],    //|6, 7, 8|
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
		[3, 4, 5],
		[6, 7, 8],
		];
		for (i = 0; i < winningComb.length; i++){
			const single = winningComb[i];
			if (board[single[0]] === 'X' && board[single[1]] === 'X' && board[single[2]] === 'X') {
				winnerText.textContent = playerOne.value + ' Wins!';
				gb.appendChild(winnerText);
				won = 1;
				for (k = 0; k < allPs.length; k++) {
					pValue = allPs[k].id;
					splitP = pValue.slice(1, 2) - 1;
					if(single[0] == splitP) {
						window[pValue].style.textDecoration = 'line-through';
					}
					else if (single[1] == splitP) {
						window[pValue].style.textDecoration = 'line-through';
					}
					else if (single[2] == splitP) {
						window[pValue].style.textDecoration = 'line-through';
					}
				}
			}
			else if (board[single[0]] === 'O' && board[single[1]] === 'O' && board[single[2]] === 'O') {
				winnerText.textContent = playerTwo.value + ' Wins!';
				gb.appendChild(winnerText);
				won = 1;
				for (k = 0; k < allPs.length; k++) {
					pValue = allPs[k].id;
					splitP = pValue.slice(1, 2) - 1;
					if(single[0] == splitP) {
						window[pValue].style.textDecoration = 'line-through';
					}
					else if (single[1] == splitP) {
						window[pValue].style.textDecoration = 'line-through';
					}
					else if (single[2] == splitP) {
						window[pValue].style.textDecoration = 'line-through';
					}
				}
			}
		}
		for (l = 0; l < board.length; l++) {
			if (board[l] !== '') {
				c++;
			}
		}
		if (c === 9 && won === 0) {
			winnerText.textContent = 'It\'s a tie!';
			gb.appendChild(winnerText);
			won = 1;
			c = 0;
		}
		if (won === 1) {
			for(b = 0; b < allPs.length; b++) {
				if (allPs[b].textContent === '') {
					allPs[b].style.color = 'red';
				}
			}
		}
		return won;
	};
	const resetAll = (wonValue) => {
		if (wonValue === 1) {
			for (a = 0; a < allPs.length; a++) {
				id = allPs[a];
				id.textContent = '';
				id.style.textDecoration = 'none';
				if (id.style.color === 'red') {
					id.style.color = 'white';
				}
			}
			won = 1;
			gameBoard.marking(won);
			current(won);
			won = 0;
			winnerText.textContent = '';
		}
	}
	return {current, winner, resetAll};
})();

const displayController = (() => {
	allPids = [];
	display = () => {
		const items = boardMark.length - 1;
		const text1 = boardMark[items];
		return text1;
	};
	return {display};
})();

