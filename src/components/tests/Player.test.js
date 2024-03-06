import Player from "../Player";

let player1 = new Player("p1");
let computer = new Player("computer");
player1.gameBoard.setShip(3, true, 1, 7);
computer.gameBoard.setShip(3, false, 0, 1);

test("p1 will hit the computer ship", () =>
  expect(player1.Attack(0, 1, computer)).toBe(true));

test("computer is not lost", () => expect(computer.isLost()).toBe(false));

test("p1 will hit the computer ship again", () =>
  expect(player1.Attack(0, 2, computer)).toBe(true));

test("p1 will miss the shot", () =>
  expect(player1.Attack(3, 1, computer)).toBe(true));

test("p1 will hit the computer ship again", () =>
  expect(player1.Attack(0, 3, computer)).toBe(true));

test("p1 will hit a place that have been hit before", () =>
  expect(player1.Attack(0, 1, computer)).toBe(false));

test("computer is lost", () => expect(computer.isLost()).toBe(true));

test("p1 will lost", () => {
  for (let i = 0; i < 100; i++) {
    computer.randomAttack(player1);
  }
  expect(player1.isLost()).toBe(true);
});
