/*
 ** gameBoard module represents the state of the board, like
 ** which cell has which player's Mark
 ** which is cell is empty, available to use
 */
const gameBoard = (() => {
	const rows = 3;
	const columns = 3;
	const board = [];
	// represents each cell in the game board
	function cell() {
		let mark = "0";
		addMark = (playerMark) => (mark = playerMark);
		getMark = () => mark;

		return {
			addMark,
			getMark,
		};
	}

	for (let row = 0; row < rows; row++) {
		board[row] = [];
		for (let column = 0; column < columns; column++) {
			board[row].push(cell());
		}
	}

	const getBoard = () => board;

	// adds mark of they player to the selected cell
	const markCell = (row, column, playerMark) => {
		const targetCell = board[row - 1][column - 1];
		const isCellAvailable = targetCell.getMark() === "0" ? true : false;
		if (isCellAvailable) {
			targetCell.addMark(playerMark);
			return isCellAvailable;
		}
		return isCellAvailable;
	};

	const resetBoard = () => {
		board.map((eachRow) => {
			eachRow.map((eachCell) => {
				eachCell.addMark("0");
			});
		});
	};

	const printBoard = () => {
		for (let row = 0; row < rows; row++) {
			let rowValues = board[row].map((rowCell) => rowCell.getMark());
			console.log(rowValues);
		}
	};

	return {
		getBoard,
		markCell,
		resetBoard,
		printBoard,
	};
})();

/*
 ** gameController module represents the flow of the game,
 ** manage the turns of players
 ** check for win condition
 */
const gameController = (function () {
	// player factory function with score and turn as private variables
	function player(name, mark, turn) {
		let score = 0;
		const getScore = () => score;
		const incrementScore = () => {
			score++;
		};
		const toggleTurn = () => {
			turn = !turn;
		};
		const getTurn = () => turn;
		return { name, mark, getScore, incrementScore, toggleTurn, getTurn };
	}

	// if markCount is 3 then the player wins the game
	function checkWinForRows(playerMark) {
		const board = gameBoard.getBoard();
		for (let row = 0; row < 3; row++) {
			let markCount = 0;
			for (let column = 0; column < 3; column++) {
				if (board[row][column].getMark() === playerMark) markCount++;
			}
			if (markCount === 3) return true;
		}
	}

	function checkWinForColumns(playerMark) {
		const board = gameBoard.getBoard();
		for (let row = 0; row < 3; row++) {
			let markCount = 0;
			for (let column = 0; column < 3; column++) {
				if (board[column][row].getMark() === playerMark) markCount++;
			}
			if (markCount === 3) return true;
		}
	}

	function checkIndividualDiagonal(diagonal, playerMark) {
		const markCount = diagonal.reduce((count, mark) => {
			if (mark === playerMark) count++;
			return count;
		}, 0);
		if (markCount === 3) return true;
		return false;
	}

	function checkWinForDiagonals(playerMark) {
		const board = gameBoard.getBoard();

		// check for left diagonal
		const leftDiagonal = [
			board[0][0].getMark(),
			board[1][1].getMark(),
			board[2][2].getMark(),
		];
		if (checkIndividualDiagonal(leftDiagonal, playerMark)) return true;

		// check for right diagonal
		const rightDiagonal = [
			board[0][2].getMark(),
			board[1][1].getMark(),
			board[2][0].getMark(),
		];
		if (checkIndividualDiagonal(rightDiagonal, playerMark)) return true;

		return false;
	}

	function checkWinCondition(playerMark) {
		// check for rows
		if (checkWinForRows(playerMark)) return true;

		// check for columns
		if (checkWinForColumns(playerMark)) return true;

		// // check for diagonals
		if (checkWinForDiagonals(playerMark)) return true;

		return false;
	}

	function playRound(row, column) {
		const playerTurn = players[0].getTurn() ? players[0] : players[1];
		const markStatus = gameBoard.markCell(row, column, playerTurn.mark);

		if (markStatus) {
			const isWin = checkWinCondition(playerTurn.mark);
			if (isWin) {
				console.log(
					`Player with name ${playerTurn.name} and mark ${playerTurn.mark} WON the game.`
				);
				return;
			}
			players.map((eachPlayer) => {
				eachPlayer.toggleTurn();
			});
		}
	}

	return { player, playRound };
})();

const players = [
	gameController.player("Dheeraj", "X", true),
	gameController.player("Bot", "A", false),
];

console.log("_____________Game Started_____________");
gameBoard.printBoard();
console.log("_____________X played_____________");
gameController.playRound(1, 1);
gameBoard.printBoard();
console.log("_____________A played_____________");
gameController.playRound(1, 2);
gameBoard.printBoard();
console.log("_____________X played_____________");
gameController.playRound(2, 1);
gameBoard.printBoard();
console.log("_____________A played_____________");
gameController.playRound(2, 2);
gameBoard.printBoard();
console.log("_____________X played_____________");
gameController.playRound(3, 3);
gameBoard.printBoard();
console.log("_____________A played_____________");
gameController.playRound(3, 2);
gameBoard.printBoard();
console.log("Resetting board");
gameBoard.resetBoard();
gameBoard.printBoard();

// controls the display of board in user interface/webpage and user interaction through DOM
// (function screenController() {})();
