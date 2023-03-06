import GameOfLife from "./models/gameOfLife.js";

const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
const cellSize = 6;
let frameCount = 0;
let framesPerSecond = 10;

const game = new GameOfLife([
  [40, 40],
  [40, 41],
  [40, 42],
  [41, 42],
  [42, 41],
]);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let cell of game.liveCells) {
    const [x, y] = cell;
    ctx.fillRect(cellSize * x, cellSize * y, cellSize - 1, cellSize - 1);
  }
}

function animate() {
  requestAnimationFrame(animate);
  draw();
  frameCount++;
  if (frameCount % Math.floor(60 / framesPerSecond) === 0) game.step();
}

animate();
