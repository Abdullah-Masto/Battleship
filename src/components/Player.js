import GameBoard from "./Gameboard.js";

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
    let validPos = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (!player.hitCoordinates.includes(JSON.stringify([j, i]))) {
          validPos = validPos.concat([[j, i]]);
        }
      }
    }
    let index = Number.parseInt(Math.random() * validPos.length - 1);
    this.Attack(validPos[index][0], validPos[index][1], player);
  }

  setShipsRandomly() {
    this.placeShipRandomly(5);
    this.placeShipRandomly(4);
    this.placeShipRandomly(3);
    this.placeShipRandomly(3);
    this.placeShipRandomly(2);
    this.placeShipRandomly(1);
  }

  placeShipRandomly(length) {
    let flag = Math.random() > 0.55;
    let emptyPos = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.gameBoard.board[i][j] === null) {
          let isValid = true;
          if (flag) {
            for (let k = 1; k < length; k++) {
              if (k + j > 9 || this.gameBoard.board[i][k + j] !== null) {
                isValid = false;
                break;
              }
            }
          } else {
            for (let k = 1; k < length; k++) {
              if (k + i > 9 || this.gameBoard.board[k + i][j] !== null) {
                isValid = false;
                break;
              }
            }
          }
          if (isValid) emptyPos = emptyPos.concat([[i, j]]);
        }
      }
    }

    if (emptyPos.length !== 0) {
      let rand = Number.parseInt(Math.random() * (emptyPos.length - 1));
      let pos = emptyPos[rand];

      this.gameBoard.setShip(length, flag, pos[1], pos[0]);
      return true;
    } else return false;
  }
}

export default Player;
