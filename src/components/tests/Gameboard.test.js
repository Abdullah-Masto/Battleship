import GameBoard from "../Gameboard";

let gameBoard = new GameBoard();

test("set a ship with length 3 with valid coordinates", () =>
  expect(gameBoard.setShip(3, false, 2, 0)).toBe(true));

test("set a ship with length 4 with valid coordinates", () =>
  expect(gameBoard.setShip(4, true, 6, 9)).toBe(true));

test("set a ship with length 5 with valid coordinates", () =>
  expect(gameBoard.setShip(5, false, 9, 4)).toBe(true));

test("set a ship with length 3 with unValid coordinates", () =>
  expect(gameBoard.setShip(5, false, 9, 8)).toBe(false));

test("set a ship with length 5 with unValid coordinates", () =>
  expect(gameBoard.setShip(5, true, -1, 4)).toBe(false));

test("set a ship with no arguments to the setShip function will throw error", () =>
  expect(() => gameBoard.setShip()).toThrow());

test("set a ship with missed arguments to the setShip function will throw error", () =>
  expect(() => gameBoard.setShip(5, false, 9)).toThrow());

test("set a ship with unValid arguments to the setShip function will throw error", () =>
  expect(() => gameBoard.setShip(5, 1, 9, 3)).toThrow());

test("set a ship with first argument is not integer to the setShip function will throw error", () =>
  expect(() => gameBoard.setShip(5.6, false, 3, 3)).toThrow());

test("set a ship above another one will return false", () => {
  gameBoard.setShip(4, true, 3, 3);
  expect(gameBoard.setShip(3, false, 4, 2)).toBe(false);
});

test("hit a ship", () => expect(gameBoard.receiveAttack(2, 1)).toBe(true));

test("hit another ship", () =>
  expect(gameBoard.receiveAttack(9, 4)).toBe(true));

test("hit the first ship another hit", () =>
  expect(gameBoard.receiveAttack(2, 0)).toBe(true));

test("hit the first ship another hit", () =>
  expect(gameBoard.receiveAttack(2, 2)).toBe(true));

test("miss a hit", () => expect(gameBoard.receiveAttack(0, 0)).toBe(false));

test("hit the place that took a hit before", () =>
  expect(gameBoard.receiveAttack(2, 0)).toBe(false));

test("unValid arguments for receiveAttack", () =>
  expect(() => gameBoard.receiveAttack(2, {})).toThrow());

test("out of bound arguments", () =>
  expect(() => gameBoard.receiveAttack(-1, 3)).toThrow());

test("the first gameBoard is not lost", () =>
  expect(gameBoard.isLost()).toBe(false));

let secondGameBoard = new GameBoard();
test("the second gameBoard is lost", () =>
  expect(secondGameBoard.isLost()).toBe(true));
