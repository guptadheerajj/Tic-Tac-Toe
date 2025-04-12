import { gameController, players } from "./gameController.js";
import { gameBoard } from "./gameBoard.js";

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
