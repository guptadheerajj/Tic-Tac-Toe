/*
 ** gameController module represents the flow of the game,
 ** manage the turns of players
 ** check for win condition
 */

import { gameBoard } from "./gameBoard.js";

export const gameController = (function () {
	const players = [];
	let numberOfRoundsPlayed = 0;
	let numberOfDraws = 0;
	// player factory function with score and turn as private variables
	// function player(name, mark, turn) {
	// 	let score = 0;
	// 	let turnsPlayed = 0;

	// 	return {
	// 		name,
	// 		mark,
	// 		turnsPlayed,
	// 		getScore: () => score,
	// 		getTurn: () => turn,
	// 		incrementScore: () => {
	// 			score++;
	// 		},
	// 		resetScore: () => {
	// 			score = 0;
	// 		},
	// 		toggleTurn: () => {
	// 			turn = !turn;
	// 		},
	// 	};
	// }

	// converting player factory function to class
	class Player {
		#score = 0;
		#turn;
		turnsPlayed = 0;
		constructor(name, mark, turn) {
			this.#turn = turn;
			this.name = name;
			this.mark = mark;
		}
		get score() {
			return this.#score;
		}
		get turn() {
			return this.#turn;
		}
		incrementScore() {
			this.#score++;
		}
		resetScore() {
			this.#score = 0;
		}
		toggleTurn() {
			this.#turn = !this.#turn;
		}
	}

	function getCurrentPlayer() {
		const currentPlayerIndex = players.findIndex((player) => player.turn);
		return players[currentPlayerIndex];
	}

	function addPlayer(name, mark, turn) {
		const playerObj = new Player(name, mark, turn);
		players.push(playerObj);
	}

	function initializeGame({ p1Name, p2Name, p1Mark, p2Mark, firstPlayer }) {
		let p1Turn, p2Turn;
		if (firstPlayer === "player1") {
			p1Turn = true;
			p2Turn = !p1Turn;
		} else {
			p2Turn = true;
			p1Turn = !p2Turn;
		}
		if (p1Turn) {
			addPlayer(p1Name, p1Mark, p1Turn);
			addPlayer(p2Name, p2Mark, p2Turn);
		} else {
			addPlayer(p2Name, p2Mark, p2Turn);
			addPlayer(p1Name, p1Mark, p1Turn);
		}
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

	function resetTurnsPlayed() {
		players.map((player) => {
			player.turnsPlayed = 0;
		});
	}

	function handleWin(currentPlayer) {
		resetTurnsPlayed();
		numberOfRoundsPlayed++;
		currentPlayer.incrementScore();
		gameBoard.resetBoard();
	}

	function handleDraw() {
		resetTurnsPlayed();
		numberOfRoundsPlayed++;
		numberOfDraws++;
		gameBoard.resetBoard();
		console.log("It's a Draw!");
		return true;
	}

	function reverseTurn() {
		players.map((player) => {
			player.toggleTurn();
		});
	}

	function resetMatchStats() {
		numberOfDraws = 0;
		numberOfRoundsPlayed = 0;
	}

	function playRound(row, column) {
		let isWin = null;
		let isDraw = false;
		const currentPlayer = getCurrentPlayer();
		const markStatus = gameBoard.markCell(row, column, currentPlayer.mark);

		if (markStatus) {
			gameBoard.printBoard();
			currentPlayer.turnsPlayed++;
			isWin = checkWinCondition(currentPlayer.mark);
			if (isWin) {
				handleWin(currentPlayer);
			} else if (currentPlayer.turnsPlayed === 5) {
				isDraw = handleDraw();
			}

			if (!isWin) {
				reverseTurn();
			}
		}
		return { markStatus, isDraw, isWin };
	}

	return {
		players,
		initializeGame,
		playRound,
		getCurrentPlayer,
		resetMatchStats,
		getNumberOfDraws: () => numberOfDraws,
		getNumberOfRoundsPlayed: () => numberOfRoundsPlayed,
	};
})();
