import GameBoard from "./Gameboard";

class Player {
  gameBoard;
  name;
  hitCoordinates;
  constructor(name = "") {
    this.gameBoard = new GameBoard();
    this.name = name;
    this.hitCoordinates = [];
  }

  Attack(x, y, player) {
    if (
      Number.parseInt(x) !== x ||
      Number.parseInt(y) !== y ||
      !player instanceof Player
    )
      throw "unValid argument";

    if (x < 0 || x > 9 || y < 0 || y > 9) throw "out of bound coordinates";

    if (player.hitCoordinates.includes(JSON.stringify([x, y]))) return false;

    let gameBoard = player.gameBoard;
    gameBoard.receiveAttack(x, y);
    player.hitCoordinates = player.hitCoordinates.concat(`[${x},${y}]`);
    return true;
  }

  isLost() {
    return this.gameBoard.isLost();
  }

  randomAttack(player) {
    if (player.isLost()) return;
    let coord;
    let x = Number.parseInt(Math.random() * 9);
    let y = Number.parseInt(Math.random() * 9);
    coord = [x, y];
    while (player.hitCoordinates.includes(JSON.stringify(coord))) {
      x = Number.parseInt(Math.random() * 9);
      y = Number.parseInt(Math.random() * 9);
      coord = [x, y];
    }
    this.Attack(x, y, player);
  }
}

export default Player;
