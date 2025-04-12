/*
 ** gameController module represents the flow of the game,
 ** manage the turns of players
 ** check for win condition
 */

import { gameBoard } from "./gameBoard.js";

export const players = [];

export const gameController = (function () {
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
