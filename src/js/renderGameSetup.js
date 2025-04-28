import { gameController } from "./gameController.js";
import { gameBoardPage } from "./renderGameBoard.js";
import oMarkIcon from "../assets/images/icons/o-mark.svg";
import xMarkIcon from "../assets/images/icons/x-mark.svg";
import gameControllerIcon from "../assets/images/icons/controller-icon.svg";
import playerIcon from "../assets/images/icons/player-icon.svg";

export const gameSetupPage = (() => {
	function createGameSetupUI() {
		const mainContainer = document.querySelector("#main-container");
		const gameSetupContainer = document.createElement("div");
		gameSetupContainer.classList.add("gameSetupContainer");
		const gameSetupContent = `
			<header class="gameSetupContainer__heading">
				<h2>Welcome to Tic-Tac-Toe</h2>
				<p>Set up your game to start playing</p>
			</header>
			<form action="" id="setUpForm">
				<div class="playerNames">
					<div class="player1">
						<label for="p1Name">
							<div class="playerIconOval">
								<img src="${playerIcon}" alt="player-icon" width="20" height="20">
							</div>
							<p>Player1</p>
						</label>
						<input type="text" id="p1Name" name="p1Name" placeholder="Enter player1 name" required>
					</div>
					<div class="player2">
						<label for="p2Name">
							<div class="playerIconOval">
								<img src="${playerIcon}" alt="player-icon" width="20" height="20">
							</div>
							<p>Player2</p>
						</label>
						<input type="text" id="p2Name" name="p2Name" placeholder="Enter player2 name" required>
					</div>
				</div>
				<fieldset class="radio-fieldset">
					<legend>Who goes first?</legend>
					<div class="radio-container">
						<div>
							<input type="radio" id="player1" value="player1" class="radio" required checked name="firstPlayer">
							<label for="player1">Player1</label>
						</div>
						<div>
							<input type="radio" id="player2" value="player2" class="radio" name="firstPlayer">
							<label for="player2">Player2</label>
						</div>
					</div>
				</fieldset>
				<fieldset class="mark-radio-fieldset">
					<legend>Choose First Player's Mark</legend>
					<div class="mark-radio-container">
						<div>
							<input type="radio" id="xMark" name="firstPlayerMark" value="x" class="mark-radio" required>
							<label for="xMark">
								<img src="${xMarkIcon}" alt="x-mark-icon">
							</label>
						</div>
						<div>
							<input type="radio" id="oMark" name="firstPlayerMark" value="o" class="mark-radio" checked>
							<label for="oMark">
								<img src="${oMarkIcon}" alt="o-mark-icon">
							</label>
						</div>
					</div>
				</fieldset>

				<button type="submit" class="btn">
					<img src="${gameControllerIcon}" alt="" width="24" height="24">
					Start Game
				</button>
			</form>
		`;

		gameSetupContainer.innerHTML = gameSetupContent;
		mainContainer.innerHTML = "";
		mainContainer.appendChild(gameSetupContainer);
	}

	function assignMark({ firstPlayerMark, firstPlayer }) {
		let p1Mark;
		let p2Mark;
		if (firstPlayer === "player1") {
			p1Mark = firstPlayerMark;
			p2Mark = p1Mark === "x" ? "o" : "x";
		} else {
			p2Mark = firstPlayerMark;
			p1Mark = p2Mark === "x" ? "o" : "x";
		}

		return {
			p1Mark,
			p2Mark,
		};
	}

	function collectGameSettings() {
		// get player names
		const p1Name =
			document.querySelector('input[name="p1Name"]').value || "Player1";
		const p2Name =
			document.querySelector('input[name="p2Name"]').value || "Player2";

		//get first player
		const firstPlayer = document.querySelector(
			'input[name="firstPlayer"]:checked'
		).value;

		//get first player mark
		const firstPlayerMark = document.querySelector(
			'input[name="firstPlayerMark"]:checked'
		).value;

		return {
			firstPlayer,
			firstPlayerMark,
			p1Name,
			p2Name,
		};
	}

	function createGameConfig() {
		const formData = collectGameSettings();
		const playerMarks = assignMark(formData);
		const { p1Name, p2Name, firstPlayer } = formData;
		return { firstPlayer, p1Name, p2Name, ...playerMarks };
	}

	function scrollToTop() {
		let headerHeight = document.querySelector("body > header").offsetHeight;
		window.scrollTo({
			top: headerHeight,
			left: 0,
			behavior: "smooth",
		});
	}

	function attachGameStartListener() {
		document.addEventListener("click", handleNewGameEvent);
	}

	function handleNewGameEvent(event) {
		const startGameButton = event.target.closest(
			"form > button[type='submit']"
		);
		if (!startGameButton) return;
		event.preventDefault();
		const gameConfig = createGameConfig();
		gameController.initializeGame(gameConfig);
		document.removeEventListener("click", handleNewGameEvent);
		gameBoardPage.renderGameBoard();
		gameBoardPage.displayInitialPlayerConfig(gameController.players);
		scrollToTop();
	}

	function renderGameSetup() {
		createGameSetupUI();
		attachGameStartListener();
	}

	return {
		renderGameSetup,
	};
})();
