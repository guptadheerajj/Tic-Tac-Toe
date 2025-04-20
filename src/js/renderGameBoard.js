import arrowLeftIcon from "../assets/images/icons/arrow-left.svg";
import volumeIcon from "../assets/images/icons/volume-icon.svg";
import restartIcon from "../assets/images/icons/restart-icon.svg";
import playerIcon from "../assets/images/icons/player-icon.svg";
import oMarkIcon from "../assets/images/icons/o-mark.svg";
import xMarkIcon from "../assets/images/icons/x-mark.svg";
import trophyIcon from "../assets/images/icons/trophy-icon.svg";

export const gameBoardPage = (function () {
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
							<h3 class="heading-text">Player 1</h3>
							<p class="normal-text"><span>Playing as </span> <img src="${xMarkIcon}"
									alt="X mark" width="16" height="16"></p>
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
							<h3 class="heading-text">Player 2</h3>
							<p class="normal-text">Playing as <img src="${oMarkIcon}" alt="O mark"
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
				<div class="grid-cell"><img src="${xMarkIcon}" alt="X mark"></div>
				<div class="grid-cell"><img src="${oMarkIcon}" alt="O mark"></div>
				<div class="grid-cell"><img src="${xMarkIcon}" alt="X mark"></div>
				<div class="grid-cell"><img src="${oMarkIcon}" alt="O mark"></div>
				<div class="grid-cell"><img src="${xMarkIcon}" alt="X mark"></div>
				<div class="grid-cell"><img src="${oMarkIcon}" alt="O mark"></div>
				<div class="grid-cell"><img src="${xMarkIcon}" alt="X mark"></div>
				<div class="grid-cell"><img src="${xMarkIcon}" alt="X mark"></div>
				<div class="grid-cell"><img src="${xMarkIcon}" alt="X mark"></div>
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

	return { createGameBoardUI };
})();
