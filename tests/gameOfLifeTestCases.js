import GameOfLife from "../models/gameOfLife.js";

const testCases = [
  {
    testDescription: "Game starts empty by default",
    testFun: () => {
      const game = new GameOfLife();
      return game.liveCells.length === 0;
    },
  },
];

export default testCases;
