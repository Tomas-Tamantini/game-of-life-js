import GameOfLife from "../models/gameOfLife.js";

const testCases = [
  {
    testDescription: "Game starts empty by default",
    testFun: () => {
      const game = new GameOfLife();
      return game.liveCells.length === 0;
    },
  },

  {
    testDescription: "Game can be started with live cells",
    testFun: () => {
      const game = new GameOfLife([
        [1, 2],
        [3, 4],
      ]);
      return game.liveCells.length === 2;
    },
  },

  {
    testDescription:
      "Cell status can be toggled from live to dead and vice-versa",
    testFun: () => {
      const game = new GameOfLife();
      if (game.cellIsAlive(0, 0)) return false;
      game.toggleCell(0, 0);
      if (!game.cellIsAlive(0, 0)) return false;
      game.toggleCell(0, 0);
      if (game.cellIsAlive(0, 0)) return false;
      return true;
    },
  },
];

export default testCases;
