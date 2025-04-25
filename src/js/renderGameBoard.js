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
							<h3 class="heading-text" data-set="player-name"></h3>
							<p class="normal-text">Playing as <img src=""  alt=""
									width="16" height="16" data-set="player-mark"></p>
						</div>
					</div>
					<div class="player-score">
						<h3 class="heading-text" data-set="score"></h3>
						<p class="normal-text">Score</p>
					</div>
				</div>
				<div class="player-stats__player player-two">
					<div class="player-info">
						<img src="${playerIcon}" alt="Player icon">
						<div>
							<h3 class="heading-text" data-set="player-name"></h3>
							<p class="normal-text">Playing as <img src="" alt=""
									width="16" height="16" data-set="player-mark"></p>
						</div>
					</div>
					<div class="player-score">
						<h3 class="heading-text" data-set="score"></h3>
						<p class="normal-text">Score</p>
					</div>
				</div>
			</div>
			<div class="game-status">
				<div class="round-display heading-text">Round <span data-set="round-number"></span></div>
				<div class="turn-display normal-text"><span data-set="player-turn">Player 1</span>'s Turn</div>
			</div>
			<div class="game-grid" data-set="game-grid">
				<div class="grid-cell" data-row="1" data-column="1" data-type="grid-cell"></div>
				<div class="grid-cell" data-row="1" data-column="2" data-type="grid-cell"></div>
				<div class="grid-cell" data-row="1" data-column="3" data-type="grid-cell"></div>
				<div class="grid-cell" data-row="2" data-column="1" data-type="grid-cell"></div>
				<div class="grid-cell" data-row="2" data-column="2" data-type="grid-cell"></div>
				<div class="grid-cell" data-row="2" data-column="3" data-type="grid-cell"></div>
				<div class="grid-cell" data-row="3" data-column="1" data-type="grid-cell"></div>
				<div class="grid-cell" data-row="3" data-column="2" data-type="grid-cell"></div>
				<div class="grid-cell" data-row="3" data-column="3" data-type="grid-cell"></div>
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
						<p class="match-stats-values" data-set="total-round"></p>
					</div>
					<div class="draws">
						<p>Draws</p>
						<p class="match-stats-values" data-set="draw"></p>
					</div>
				</div>
			</div>
		`;

		gameBoardContainer.innerHTML = gameBoardContent;
		mainContainer.innerHTML = "";
		mainContainer.appendChild(gameBoardContainer);
	}

	function attachGameBoardListeners() {
		const gameGrid = document.querySelector('div[data-set="game-grid"]');
		gameGrid.addEventListener("click", function (event) {
			const targetCell = event.target.closest(".grid-cell");
			if (!targetCell) return;
			let targetRow = targetCell.dataset.row;
			let targetColumn = targetCell.dataset.column;
			let { mark: currentMark } = gameController.getCurrentPlayer();

			let {
				markStatus: isRoundPlayed,
				isDraw,
				isWin,
			} = gameController.playRound(targetRow, targetColumn);
			if (isRoundPlayed) displaymark(currentMark, targetCell);

			if (isWin) {
				alert("Someone won the game");
				resetGridDisplay();
				// displayGameStats();
			}
			if (isDraw) {
				alert("Its a draw");
				resetGridDisplay();
				displayGameStats();
			}
		});

		function resetGridDisplay() {
			const gridCells = document.querySelectorAll('div[data-type="grid-cell"]');
			gridCells.forEach((cell) => {
				cell.innerHTML = "";
			});
		}

		function displaymark(currentMark, targetCell) {
			let markContainer = document.createElement("img");
			markContainer.src = currentMark === "o" ? oMarkIcon : xMarkIcon;
			targetCell.textContent = "";
			targetCell.appendChild(markContainer);
		}
	}

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

	function displayPlayerTurnName() {
		const turnHolder = document.querySelector('span[data-set="player-turn"]');
		const currentPayer = gameController.getCurrentPlayer();
		const { name } = currentPayer;
		turnHolder.textContent = name;
	}

	function displayScore(players) {
		const scoreHolders = document.querySelectorAll('h3[data-set="score"]');
		let count = 0;
		for (let scoreHolder of scoreHolders) {
			const score = players[count].getScore();
			scoreHolder.textContent = score;
			count++;
		}
	}

	function displayRoundNumber({ numberOfRoundsPlayed }) {
		const roundNumberHolder = document.querySelector(
			'span[data-set="round-number"]'
		);
		const currentRoundNumber = numberOfRoundsPlayed + 1;
		roundNumberHolder.textContent = currentRoundNumber;
	}

	function displayPlayerCardMark([{ mark: m1 }, { mark: m2 }]) {
		const markHolders = document.querySelectorAll(
			'img[data-set="player-mark"]'
		);
		markHolders[0].src = m1 === "x" ? xMarkIcon : oMarkIcon;
		markHolders[1].src = m2 === "x" ? xMarkIcon : oMarkIcon;
	}

	function displayPlayerCardName([{ name: n1 }, { name: n2 }]) {
		const nameHolders = document.querySelectorAll('h3[data-set="player-name"]');
		nameHolders[0].textContent = n1;
		nameHolders[1].textContent = n2;
	}

	function displayPlayerCardDetails(players) {
		displayPlayerCardMark(players);
		displayPlayerCardName(players);
	}

	function displayMatchStatistics({ numberOfRoundsPlayed, numberOfDraws }) {
		const totalRoundHolder = document.querySelector('[data-set="total-round"]');
		const drawHolder = document.querySelector('[data-set="draw"]');

		totalRoundHolder.textContent = numberOfRoundsPlayed;
		drawHolder.textContent = numberOfDraws;
	}

	function displayInitialPlayerConfig(players) {
		displayPlayerCardDetails(players);
		displayGameStats(players);
	}

	function displayGameStats(players) {
		displayPlayerTurnName();
		displayScore(players);
		displayRoundNumber(gameController);
		displayMatchStatistics(gameController);
	}

	return { renderGameBoard, displayInitialPlayerConfig };
})();
