import GameOfLife from "./models/gameOfLife.js";
import { simpleGliderCells, bigGliderCells } from "./models/samples.js";

const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
const toggleBtn = document.getElementById("toggle-animation-btn");
const slider = document.getElementById("framerate-slider");
const cellSize = 6;
let frameCount = 0;
let framesPerSecond = 10;
let isPaused = false;

const game = new GameOfLife(bigGliderCells);

toggleBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  toggleBtn.textContent = isPaused ? "Play" : "Pause";
  toggleBtn.classList.add(isPaused ? "paused" : "playing");
  toggleBtn.classList.remove(isPaused ? "playing" : "paused");
});

slider.addEventListener("input", function () {
  framesPerSecond = this.value;
});

canvas.addEventListener("click", function (event) {
  if (!isPaused) return;
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;
  const xGridCoord = Math.floor(x / cellSize);
  const yGridCoord = Math.floor(y / cellSize);
  game.toggleCell(xGridCoord, yGridCoord);
});

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
  if (isPaused) return;
  frameCount++;
  if (frameCount % Math.floor(60 / framesPerSecond) === 0) game.step();
}

animate();
