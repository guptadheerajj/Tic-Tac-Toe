import arrowLeftIcon from "../assets/images/icons/arrow-left.svg";
import volumeIcon from "../assets/images/icons/volume-icon.svg";
import restartIcon from "../assets/images/icons/restart-icon.svg";
import playerIcon from "../assets/images/icons/player-icon.svg";
import oMarkIcon from "../assets/images/icons/o-mark.svg";
import xMarkIcon from "../assets/images/icons/x-mark.svg";
import trophyIcon from "../assets/images/icons/trophy-icon.svg";
import { gameController } from "./gameController";

export const gameBoardPage = (function () {
	let isEventListenersAttached = false;
	let isGameBoardRendered = false;
	function createGameBoardUI() {
		const mainContainer = document.querySelector("#main-container");
		const gameBoardContainer = document.createElement("div");
		gameBoardContainer.classList.add("game-board-container");

		const gameBoardContent = `
			<nav class="game-controls">
				<div class="controls-left">
					<button class="control-button">
						<img src="${arrowLeftIcon}" alt="Back arrow">
						<p>Quit Game</p>
					</button>
				</div>
				<div class="controls-right">
					<button class="control-button volume"><img src="${volumeIcon}"
							alt="mute-button-icon"></button>
					<button class="control-button">
						<img src="${restartIcon}" alt="Restart icon">
						<p>Restart Game</p>
					</button>
				</div>
			</nav>
			<div class="player-stats">
				<div class="player-stats__player player-one">
					<div class="player-info">
						<img src="${playerIcon}" alt="Player icon">
						<div>
							<h3 class="heading-text"></h3>
							<p class="normal-text"><span>Playing as </span> <img src=""
									alt="" width="16" height="16"></p>
						</div>
					</div>
					<div class="player-score">
						<h3 class="heading-text">2</h3>
						<p class="normal-text">Score</p>
					</div>
				</div>
				<div class="player-stats__player player-two">
					<div class="player-info">
						<img src="${playerIcon}" alt="Player icon">
						<div>
							<h3 class="heading-text"></h3>
							<p class="normal-text">Playing as <img src="" alt=""
									width="16" height="16"></p>
						</div>
					</div>
					<div class="player-score">
						<h3 class="heading-text">3</h3>
						<p class="normal-text">Score</p>
					</div>
				</div>
			</div>
			<div class="game-status">
				<div class="round-display heading-text">Round <span>1</span></div>
				<div class="turn-display normal-text"><span>Player 1</span>'s Turn</div>
			</div>
			<div class="game-grid">
				<div class="grid-cell"><img src="" alt=""></div>
				<div class="grid-cell"><img src="" alt=""></div>
				<div class="grid-cell"><img src="" alt=""></div>
				<div class="grid-cell"><img src="" alt=""></div>
				<div class="grid-cell"><img src="" alt=""></div>
				<div class="grid-cell"><img src="" alt=""></div>
				<div class="grid-cell"><img src="" alt=""></div>
				<div class="grid-cell"><img src="" alt=""></div>
				<div class="grid-cell"><img src="" alt=""></div>
			</div>
			<button class="control-button score-reset-button">
				<img src="${restartIcon}" alt="Restart icon">
				<p>Reset Score</p>
			</button>
			<div class="match-stats">
				<header class="heading-text">
					<img src="${trophyIcon}" alt="trophy-icon">
					<span>Match Statistics</span>
				</header>
				<div>
					<div class="total-rounds">
						<p>Total Rounds</p>
						<p class="match-stats-values">5</p>
					</div>
					<div class="draws">
						<p>Draws</p>
						<p class="match-stats-values">1</p>
					</div>
				</div>
			</div>
		`;

		gameBoardContainer.innerHTML = gameBoardContent;
		mainContainer.innerHTML = "";
		mainContainer.appendChild(gameBoardContainer);
	}

	function attachGameBoardListeners() {}

	function renderGameBoard() {
		if (!isGameBoardRendered) {
			createGameBoardUI();
			isGameBoardRendered = true;
		}
		if (!isEventListenersAttached) {
			attachGameBoardListeners();
			isEventListenersAttached = true;
		}
	}

	function displayPlayerTurnName(players) {
		const turnDisplay = document.querySelector(".turn-display > span");
		for (let player of players) {
			if (player.getTurn()) {
				turnDisplay.textContent = player.name;
				return;
			}
		}
	}

	function displayInitialPlayerConfig(players) {
		const playerNameContainers = document.querySelectorAll(".player-info h3");
		const playerMarkContairs = document.querySelectorAll(
			".player-info div img"
		);
		const playerScoreContairs = document.querySelectorAll(".player-score h3");
		const matchStatsValues = document.querySelectorAll(".match-stats-values");

		for (let i = 0; i < players.length; i++) {
			playerNameContainers[i].textContent = players[i].name;
			playerMarkContairs[i].src =
				players[i].mark === "x" ? xMarkIcon : oMarkIcon;
			playerScoreContairs[i].textContent = "0";
			matchStatsValues[i].textContent = "0";
		}
		displayPlayerTurnName(players);
	}

	// function updateScore

	return { renderGameBoard, displayInitialPlayerConfig };
})();
