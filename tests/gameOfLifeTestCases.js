import GameOfLife from "../models/gameOfLife.js";

function assert(assertion) {
  if (assertion === false) throw Error("Test failed");
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
];

export default testCases;
