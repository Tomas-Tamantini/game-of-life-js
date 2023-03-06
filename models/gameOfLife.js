import { coordToStr, strToCoord } from "./coordinateConversion.js";

export default class GameOfLife {
  #liveCells = new Set();
  constructor(liveCells) {
    if (liveCells) {
      for (let cell of liveCells) {
        const [x, y] = cell;
        this.#liveCells.add(coordToStr(x, y));
      }
    }
  }

  get liveCells() {
    return Array.from(this.#liveCells, strToCoord);
  }

  toggleCell(x, y) {
    let coords = coordToStr(x, y);
    if (this.#liveCells.has(coords)) this.#liveCells.delete(coords);
    else this.#liveCells.add(coords);
  }

  cellIsAlive(x, y) {
    return this.#liveCells.has(coordToStr(x, y));
  }
}
