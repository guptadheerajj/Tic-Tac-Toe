import { gameSetupPage } from "./renderGameSetup";
import "../css/common.css";
import "../css/gameSetup.css";
import "../css/gameBoard.css";
import "../css/font.css";

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		gameSetupPage.renderGameSetup();
	});
} else {
	gameSetupPage.renderGameSetup();
}
