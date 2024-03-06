import Player from "../components/Player.js";
import { createTable, renderBoard, isGameOver, checkPlayer } from "./Render.js";

let player1, computer;

function createGame() {
  const p1Container = document.getElementById("p1");
  const p2Container = document.getElementById("p2");

  player1 = new Player("p1");
  computer = new Player("p2");

  player1.setShipsRandomly();
  computer.setShipsRandomly();

  createTable(player1, p1Container);
  createTable(computer, p2Container);

  renderBoard(player1, p1Container);
  renderBoard(computer, p2Container);
}

export default createGame;
export { player1, computer };
