class Ship {
  #length;
  #hits;
  #sunk;
  constructor(length) {
    this.#length = length;
    this.#hits = 0;
    this.#sunk = false;
  }
  hit() {
    if (!this.isSunk()) return ++this.#hits;
    else throw "the ship is already sunk!";
  }
  isSunk() {
    if (this.#hits === this.#length && !this.#sunk) this.#sunk = true;
    return this.#sunk;
  }
}

export default Ship;
