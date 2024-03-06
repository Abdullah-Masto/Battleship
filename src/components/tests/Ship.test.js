import Ship from "../Ship.js";

let ship = new Ship(4);

test("check the first hit to the ship", () => expect(ship.hit()).toBe(1));

test("check the second hit to the ship", () => expect(ship.hit()).toBe(2));

test("check the third hit to the ship", () => expect(ship.hit()).toBe(3));

test("check that the ship isn't sunk", () => expect(ship.isSunk()).toBe(false));

test("check the forth hit to the ship", () => expect(ship.hit()).toBe(4));

test("check that the ship is sunk", () => expect(ship.isSunk()).toBe(true));

test("check that the ship will throw error if it get hit after it been sunk", () =>
  expect(() => ship.hit()).toThrow());
