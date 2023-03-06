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
}
