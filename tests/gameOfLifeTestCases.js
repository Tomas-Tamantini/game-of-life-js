import GameOfLife from "../models/gameOfLife.js";

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
    testDescription: "Dead cell without three neighbors stays dead",
    testExectionsArgs: [0, 1, 2, 4, 5, 6, 7, 8],
    testFun: (numNeighbors) => {
      const cellPos = [0, 0];
      let neighborPositions = generateNeighbors(cellPos, numNeighbors);
      let game = new GameOfLife(neighborPositions);
      game.step();
      assert(!game.cellIsAlive(...cellPos));
    },
  },
];

export default testCases;
