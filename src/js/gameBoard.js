/*
 ** gameBoard module represents the state of the board, like
 ** which cell has which player's Mark
 ** which is cell is empty, available to use
 */

export const gameBoard = (() => {
	const rows = 3;
	const columns = 3;
	const board = [];
	// represents each cell in the game board
	function createCell() {
		let mark = "0";

		return {
			addMark: (playerMark) => {
				mark = playerMark;
			},
			getMark: () => mark,
		};
	}

	for (let row = 0; row < rows; row++) {
		board[row] = [];
		for (let column = 0; column < columns; column++) {
			board[row].push(createCell());
		}
	}

	const getBoard = () => board;

	// adds mark of they player to the selected cell
	const markCell = (row, column, playerMark) => {
		const targetCell = board[row - 1][column - 1];
		const isCellAvailable = targetCell.getMark() === "0";
		if (isCellAvailable) {
			targetCell.addMark(playerMark);
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
