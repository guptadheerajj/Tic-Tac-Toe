export const render = function () {
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
};
