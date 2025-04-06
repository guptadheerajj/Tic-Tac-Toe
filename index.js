const players = [];

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
	function createCell() {
		let mark = "0";

		return {
			addMark: (playerMark) => (mark = playerMark),
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
	let numberOfRoundsPlayed = 0;
	// player factory function with score and turn as private variables
	function player(name, mark, turn) {
		let score = 0;
		let turnPlayed = 0;

		return {
			name,
			mark,
			turnPlayed,
			getScore: () => score,
			getTurn: () => turn,
			incrementScore: () => {
				score++;
			},
			toggleTurn: () => {
				turn = !turn;
			},
		};
	}

	function addPlayer(name, mark, turn) {
		const ply = player(name, mark, turn);
		players.push(ply);
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
		if (checkWinForRows(playerMark)) return true;
		if (checkWinForColumns(playerMark)) return true;
		if (checkWinForDiagonals(playerMark)) return true;

		return false;
	}

	function setFirstMove() {
		if (numberOfRoundsPlayed % 2 === 0) {
			if (!players[0].getTurn()) {
				players[0].toggleTurn();
			}
		}
		if (!players[1].getTurn()) {
			players[1].toggleTurn();
		}
	}

	function playRound(row, column) {
		const playerTurn = players[0].getTurn() ? players[0] : players[1];
		const markStatus = gameBoard.markCell(row, column, playerTurn.mark);

		if (markStatus) {
			playerTurn.turnPlayed++;
			const isWin = checkWinCondition(playerTurn.mark);
			if (isWin) {
				numberOfRoundsPlayed++;
				setFirstMove();
				playerTurn.incrementScore();
				gameBoard.resetBoard();
				console.log(
					`Player with name ${playerTurn.name} and mark ${playerTurn.mark} WON the game.`
				);
				return "win";
			}
			if (playerTurn.turnPlayed === 5) {
				numberOfRoundsPlayed++;
				setFirstMove();
				gameBoard.resetBoard();
				console.log("It's a Draw!");
				return "draw";
			}
			players.map((eachPlayer) => {
				eachPlayer.toggleTurn();
			});
		}
		return "play";
	}

	return { addPlayer, playRound };
})();

const screenController = (function () {
	function renderInputs() {
		const container = document.querySelector("#main-container");
		const content = document.createElement("div");
		content.classList.add("input-container");
		content.innerHTML = `
			<h1>Tic Tac Toe</h1>
			<form action="">
					<div class="form-row">
						<label for="p1Name">Enter player1 name(X) : </label>
						<input type="text" name="p1Name" id="p1Name" required>
					</div>
					<div class="form-row">
						<label for="p2Name">Enter player2 name(O) : </label>
						<input type="text" name="p2Name" id="p2Name" required>
					</div>
					<div class="form-row">
						<button id="playerForm" type="submit">Start Game</button>
					</div>
			</form>
		`;
		container.appendChild(content);
	}

	function addEventToSubmit() {
		const playerForm = document.querySelector(".input-container > form");
		const playerFormSubmitBtn = document.querySelector("#playerForm");
		playerFormSubmitBtn.addEventListener("click", (event) => {
			event.preventDefault();
			while (players.length !== 0) {
				players.pop();
			}
			const p1Name = document.querySelector("#p1Name").value;
			const p2Name = document.querySelector("#p2Name").value;

			gameController.addPlayer(p1Name, "X", true);
			gameController.addPlayer(p2Name, "O", false);
			playerForm.reset();
		});
	}

	function renderLanding() {
		renderInputs();
		addEventToSubmit();
	}

	return {
		renderLanding,
	};
})();

document.addEventListener("DOMContentLoaded", () => {
	screenController.renderLanding();
});

////////////////
//            //
//            //
//            //
////////////////
// document.addEventListener("DOMContentLoaded", () => {
// 	console.log("ContentLoaded");
// 	(function screenController() {
// 		let name = prompt("Enter player1(X) name: \n player1 starts with X");
// 		players.push(gameController.player(name, "X", true));
// 		players.push;
// 		name = prompt("Enter player2(O) name: ");
// 		players.push(gameController.player(name, "O", false));
// 		console.log(players);

// 		while (true) {
// 			let row = prompt("Enter row: ");
// 			let column = prompt("Enter column: ");
// 			let roundStatus = gameController.playRound(row, column);
// 			gameBoard.printBoard();
// 			if (roundStatus === "win" || roundStatus === "draw") {
// 				console.log(`${players[0].name} score: ${players[0].getScore()}`);
// 				console.log(`${players[1].name} score: ${players[1].getScore()}`);
// 				break;
// 			}
// 		}
// 	})();
// });

// console.log("_____________Game Started_____________");
// gameBoard.printBoard();
// console.log("_____________X played_____________");
// gameController.playRound(1, 1);
// gameBoard.printBoard();
// console.log("_____________A played_____________");
// gameController.playRound(1, 2);
// gameBoard.printBoard();
// console.log("_____________X played_____________");
// gameController.playRound(2, 1);
// gameBoard.printBoard();
// console.log("_____________A played_____________");
// gameController.playRound(2, 2);
// gameBoard.printBoard();
// console.log("_____________X played_____________");
// gameController.playRound(3, 3);
// gameBoard.printBoard();
// console.log("_____________A played_____________");
// gameController.playRound(3, 2);
// gameBoard.printBoard();
// console.log("Resetting board");
// gameBoard.resetBoard();
// gameBoard.printBoard();

// controls the display of board in user interface/webpage and user interaction through DOM
// (function screenController() {})();
