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

  step() {
    let nextGen = new Set();
    let numLiveNeighbors = this._numLiveNeighbors();
    for (let cell in numLiveNeighbors) {
      if (
        numLiveNeighbors[cell] === 3 ||
        (numLiveNeighbors[cell] === 2 && this.#liveCells.has(cell))
      )
        nextGen.add(cell);
    }

    this.#liveCells = nextGen;
  }

  cellIsAlive(x, y) {
    return this.#liveCells.has(coordToStr(x, y));
  }

  *_neighborCoordinates(cellCoordinates) {
    const [x, y] = strToCoord(cellCoordinates);
    for (let i = -1; i <= +1; i++) {
      for (let j = -1; j <= +1; j++) {
        if (i === 0 && j === 0) continue;
        yield coordToStr(x + i, y + j);
      }
    }
  }

  _numLiveNeighbors() {
    let numLiveNeighbors = {};
    for (let liveCell of this.#liveCells) {
      for (let neighboringCell of this._neighborCoordinates(liveCell)) {
        if (!(neighboringCell in numLiveNeighbors)) {
          numLiveNeighbors[neighboringCell] = 1;
        } else {
          numLiveNeighbors[neighboringCell] += 1;
        }
      }
    }
    return numLiveNeighbors;
  }
}
