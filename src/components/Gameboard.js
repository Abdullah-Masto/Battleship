import Ship from "./Ship";

class GameBoard {
  #board;
  #ships;
  #shipsLeft;
  constructor() {
    this.#board = this.#createBoard();
    this.#ships = [];
    this.#shipsLeft = 0;
  }
  #createBoard() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      let innerArray = [];
      for (let j = 0; j < 10; j++) {
        innerArray[j] = null;
      }
      arr = arr.concat([innerArray]);
    }

    return arr;
  }
  setShip(shipLength, isHorizontal, x, y) {
    if (
      Number.parseInt(shipLength) !== shipLength ||
      typeof isHorizontal !== "boolean" ||
      Number.parseInt(x) !== x ||
      Number.parseInt(y) !== y
    )
      throw "unValid Argument";

    if (x < 0 || y < 0 || x > 9 || y > 9) return false;
    if (isHorizontal && x + shipLength - 1 > 9) return false;
    if (!isHorizontal && y + shipLength - 1 > 9) return false;

    for (let i = 0; i < shipLength; i++) {
      if (isHorizontal) {
        if (this.#board[y][x + i] !== null) return false;
      } else {
        if (this.#board[y + i][x] !== null) return false;
      }
    }

    let ship = new Ship(shipLength);
    this.#shipsLeft++;
    this.#ships = this.#ships.concat(ship);
    for (let i = 0; i < shipLength; i++) {
      if (isHorizontal) this.#board[y][x + i] = ship;
      else this.#board[y + i][x] = ship;
    }
    return true;
  }

  receiveAttack(x, y) {
    if (x !== Number.parseInt(x) || y !== Number.parseInt(y))
      throw "unValid argument";

    if (x < 0 || x > 9 || y < 0 || y > 9) throw "out of bound coordinate";

    if (this.#board[y][x] === 1 || this.#board[y][x] === -1) return false;

    if (this.#board[y][x] === null) {
      this.#board[y][x] = -1;
      return false;
    } else if (this.#board[y][x] instanceof Ship) {
      let ship = this.#board[y][x];
      ship.hit();
      if (ship.isSunk()) {
        this.#ships.splice(this.#ships.indexOf(ship), 1);
        this.#shipsLeft--;
      }
      this.#board[y][x] = 1;
      return true;
    }
  }

  isLost() {
    return this.#shipsLeft === 0;
  }
}

export default GameBoard;
