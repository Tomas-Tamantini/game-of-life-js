import GameOfLife from "../models/gameOfLife.js";
import { coordToStr } from "../models/coordinateConversion.js";

function assert(assertion) {
  if (assertion === false) throw Error("Test failed");
}

function generateNeighbors(cellCoords, numNeighbors) {
  const [x, y] = cellCoords;
  let neighbors = [];
  let count = 0;
  for (let i = -1; i <= +1; i++) {
    for (let j = -1; j <= +1; j++) {
      if (i === 0 && j === 0) continue;
      if (count === numNeighbors) return neighbors;
      neighbors.push([x + i, y + j]);
      count++;
    }
  }
  return neighbors;
}

function cellsAreTheSame(coordsA, coordsB) {
  if (coordsA.length !== coordsB.length) return false;
  let setA = new Set(Array.from(coordsA, (c) => coordToStr(...c)));
  let setB = new Set(Array.from(coordsB, (c) => coordToStr(...c)));
  const setsAreEqual = (a, b) =>
    a.size === b.size && [...a].every((x) => b.has(x));

  return setsAreEqual(setA, setB);
}

const testCases = [
  {
    testDescription: "Game starts empty by default",
    testFun: () => {
      const game = new GameOfLife();
      assert(game.liveCells.length === 0);
    },
  },

  {
    testDescription: "Game can be started with live cells",
    testFun: () => {
      const game = new GameOfLife([
        [1, 2],
        [3, 4],
      ]);
      assert(game.liveCells.length === 2);
    },
  },

  {
    testDescription:
      "Cell status can be toggled from live to dead and vice-versa",
    testFun: () => {
      const game = new GameOfLife();
      assert(!game.cellIsAlive(0, 0));
      game.toggleCell(0, 0);
      assert(game.cellIsAlive(0, 0));
      game.toggleCell(0, 0);
      assert(!game.cellIsAlive(0, 0));
    },
  },

  {
    testDescription: "Dead world stays dead",
    testFun: () => {
      const deadWorld = new GameOfLife();
      deadWorld.step();
      assert(deadWorld.liveCells.length === 0);
    },
  },

  {
    testDescription:
      "Live cell with fewer than two or more than three neighbors dies",
    testExecutionsArgs: [0, 1, 4, 5, 6, 7, 8],
    testFun: (numNeighbors) => {
      const cellPos = [0, 0];
      let neighborPositions = generateNeighbors(cellPos, numNeighbors);
      let game = new GameOfLife([cellPos].concat(neighborPositions));
      game.step();
      assert(!game.cellIsAlive(...cellPos));
    },
  },

  {
    testDescription: "Live cell with two or three neighbors survives",
    testExecutionsArgs: [2, 3],
    testFun: (numNeighbors) => {
      const cellPos = [0, 0];
      let neighborPositions = generateNeighbors(cellPos, numNeighbors);
      let game = new GameOfLife([cellPos].concat(neighborPositions));
      game.step();
      assert(game.cellIsAlive(...cellPos));
    },
  },

  {
    testDescription: "Dead cell without three neighbors stays dead",
    testExecutionsArgs: [0, 1, 2, 4, 5, 6, 7, 8],
    testFun: (numNeighbors) => {
      const cellPos = [0, 0];
      let neighborPositions = generateNeighbors(cellPos, numNeighbors);
      let game = new GameOfLife(neighborPositions);
      game.step();
      assert(!game.cellIsAlive(...cellPos));
    },
  },

  {
    testDescription: "Dead cell with three neighbors becomes alive",
    testFun: () => {
      const cellPos = [0, 0];
      const neighborPositions = generateNeighbors(cellPos, 3);
      const game = new GameOfLife(neighborPositions);
      game.step();
      assert(game.cellIsAlive(...cellPos));
    },
  },

  {
    testDescription: "Glider moves through grid with period 4",
    testFun: () => {
      let initialGliderCells = [
        [0, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ];
      const translateCell = (c) => [c[0] + 1, c[1] + 1];
      let gliderCellsAFterFourSteps = initialGliderCells.map(translateCell);
      let gameWithGlider = new GameOfLife(initialGliderCells);
      for (let i = 0; i < 4; i++) gameWithGlider.step();
      assert(
        cellsAreTheSame(gameWithGlider.liveCells, gliderCellsAFterFourSteps)
      );
    },
  },
];

export default testCases;
