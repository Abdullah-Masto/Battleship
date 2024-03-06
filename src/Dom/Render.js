import Ship from "../components/Ship.js";
import { player1, computer } from "./GameLoop.js";

const message = document.getElementById("message");
const playAgain = document.getElementById("playAgain");
const p1Container = document.getElementById("p1");

let isGameOver = false;

function computerAttack() {
  if (isGameOver) return;
  computer.randomAttack(player1);
  renderBoard(player1, p1Container);
  checkPlayer(player1);
}

let event = (button, player, element) => {
  if (isGameOver || button.disable) return;
  player.gameBoard.receiveAttack(button.x, button.y);
  renderBoard(player, element);
  checkPlayer(player);
  computerAttack();
  button.disable = true;
  button.removeEventListener("click", event);
};

function createTable(player, element) {
  element.innerHTML = "";
  isGameOver = false;
  let buttons = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let button = document.createElement("button");
      button.x = j;
      button.y = i;
      buttons = buttons.concat(button);

      if (element.id === "p2") {
        button.addEventListener(
          "click",
          event.bind(null, button, player, element)
        );
      }
    }
  }

  buttons.map((item) => element.appendChild(item));
}

function renderBoard(player, container) {
  const buttons = container.childNodes;
  let board = player.gameBoard.board;
  buttons.forEach((element) => {
    let b = board[element.y][element.x];
    if (b === 1) {
      element.classList.remove("ship");
      element.classList.add("hit");
    } else if (b === -1) {
      element.classList.add("safe");
    } else if (b instanceof Ship && player.name !== "p2") {
      element.classList.add("ship");
    }
  });
}

function checkPlayer(player) {
  if (player.isLost()) {
    if (player.name === "p2") {
      message.textContent = "You won";
    } else {
      message.textContent = "Computer won!";
    }

    isGameOver = true;
    playAgain.classList.add("visible");
  }
}

export { createTable, renderBoard, isGameOver, checkPlayer };
