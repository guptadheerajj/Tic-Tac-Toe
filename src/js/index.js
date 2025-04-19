import { gameSetupPage } from "./renderGameSetup";

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		gameSetupPage.renderGameSetup();
	});
} else {
	gameSetupPage.renderGameSetup();
}

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
