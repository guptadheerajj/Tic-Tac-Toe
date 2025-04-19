export const gameBoardUI = (function () {
	function renderUI() {
		const mainContainer = document.querySelector("#main-container");

		const gameBoard = document.createElement("div");
		gameBoard.textContent = "This is Game Board HAHAHAHA!! Coming soon.....";
		mainContainer.innerHTML = "";
		mainContainer.appendChild(gameBoard);
	}

	return { renderUI };
})();
