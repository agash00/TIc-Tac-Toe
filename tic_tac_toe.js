const Player = (pNum) => {
	let mark;
	if (pNum === 1) {
		mark = 'X';
	}
	else if (pNum === 2) {
		mark = 'O';
	}
	return mark;
};

const startGame = (() => {
	const gb = document.querySelector('#gameboard');
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
		if (startBtn.style.display === 'none') {
			startBtn.style.display = 'block';
		}
		else {
			startBtn.style.display = 'none';
		}
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
			resultBoard = ['', '', '', '', '', '', '', '', ''];
			resetBtn = document.createElement('button');
			resetBtn.id = 'resetBtn';
			resetBtn.textContent = 'Play Again';
			buttonsDiv.appendChild(resetBtn);
			resetBtn.addEventListener('click', () => {
				gameLogic.resetAll(endResult);
				buttonsDiv.removeChild(resetBtn);
				});
		}
		
	};
	return {board, marking, result};
})();


function addListeners(item) {
	item.addEventListener('click', () => {
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
    allPs.forEach(addListeners);
	const player1 = Player(1);
	const player2 = Player(2);
	let currPlayer = '';
	const current = (won) => {
		let gameboard = gameBoard.board;
		if (won === 1) {
			gameboard.length = 0;
		}
		else if (gameboard.length === 0) {
			 currPlayer = player1;
		}
		else if (gameboard.length !== 0) {
			items = gameboard.length - 1;
			if (gameboard[items] === 'X') {
				currPlayer = player2;
			}
			else if (gameboard[items] === 'O') {
				currPlayer = player1;
			}
		}
		return currPlayer;
	}
	const winner = (end) => {
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
				alert('Player 1 Wins!');
				won = 1;
			}
			else if (board[single[0]] === 'O' && board[single[1]] === 'O' && board[single[2]] === 'O') {
				alert('Player 2 Wins!');
				won = 1;
			}
		}
		for (l = 0; l < board.length; l++) {
			if (board[l] !== '') {
				c++;
			}
		}
		if (c === 9 && won === 0) {
			alert('It\'s a tie!');
			won = 1;
			c = 0;
		}
		return won;
	};
	const resetAll = (wonValue) => {
		if (wonValue === 1) {
			for (a = 0; a < allPs.length; a++) {
				id = allPs[a];
				id.textContent = '';
			}
			won = 1;
			gameBoard.marking(won);
			current(won);
			won = 0;
			winner(won);
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

