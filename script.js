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
		let value = 0;
		addMark = (playerMark) => (value = playerMark);
		getValue = () => value;

		return {
			addMark,
			getValue,
		};
	}

	for (let row = 0; row < rows; row++) {
		board[row] = [];
		for (let column = 0; column < columns; column++) {
			board[row].push(cell());
		}
	}

	const getBoard = () => board;

	const markCell = (row, column, playerMark) => {
		const targetCell = board[row - 1][column - 1];
		const isCellAvailable = targetCell.getValue() === 0 ? true : false;
		if (isCellAvailable) {
			targetCell.addMark(playerMark);
			return isCellAvailable;
		}
		return isCellAvailable;
	};

	const printBoard = () => {
		for (let row = 0; row < rows; row++) {
			let rowValues = board[row].map((rowCell) => rowCell.getValue());
			console.log(rowValues);
		}
	};

	return {
		getBoard,
		markCell,
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

	function playRound(row, column) {
		const playerTurn = players[0].getTurn() ? players[0] : players[1];
		const markStatus = gameBoard.markCell(row, column, playerTurn.mark);

		if (markStatus) {
			players.map((eachPlayer) => {
				eachPlayer.toggleTurn();
			});
		}
	}

	return { player, playRound };
})();

const players = [
	gameController.player("Dheeraj", "X", false),
	gameController.player("Bot", "O", true),
];

gameBoard.printBoard();
gameController.playRound(1, 1);
gameBoard.printBoard();
gameController.playRound(1, 2);
gameBoard.printBoard();
gameController.playRound(3, 1);
gameBoard.printBoard();
gameController.playRound(2, 2);
gameBoard.printBoard();
gameController.playRound(2, 1);
gameBoard.printBoard();
gameController.playRound(3, 2);
gameBoard.printBoard();

// gameBoard.markCell(1, 3, { mark: "X" });
// gameBoard.printBoard();
// gameBoard.markCell(1, 2, { mark: "O" });
// gameBoard.printBoard();
// gameBoard.markCell(3, 1, { mark: "X" });
// gameBoard.printBoard();
// gameBoard.markCell(2, 2, { mark: "O" });
// gameBoard.printBoard();
// gameBoard.markCell(2, 1, { mark: "X" });
// gameBoard.printBoard();

// // controls the display of board in user interface
// (function screenController() {})();
