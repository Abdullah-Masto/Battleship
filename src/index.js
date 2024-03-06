import createGame from "./Dom/GameLoop.js";

const message = document.getElementById("message");
const playAgain = document.getElementById("playAgain");

playAgain.addEventListener("click", () => {
  createGame();
  message.textContent = "";
  playAgain.classList.remove("visible");
});

createGame();
