import GameOfLife from "./models/gameOfLife.js";
import {
  bigGliderCells,
  gosperGliderGunCells,
  lightWeightSpaceShipCells,
  pulsarCells,
  simpleGliderCells,
} from "./models/samples.js";

const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
const toggleBtn = document.getElementById("toggle-animation-btn");
const clearBtn = document.getElementById("clear-btn");
const slider = document.getElementById("framerate-slider");
const cellSize = 6;
let frameCount = 0;
let framesPerSecond = 10;
let isPaused = false;

let game = new GameOfLife(
  gosperGliderGunCells
    .concat(pulsarCells)
    .concat(bigGliderCells)
    .concat(lightWeightSpaceShipCells)
);

toggleBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  setToggleBtnStyle();
});

clearBtn.addEventListener("click", () => {
  isPaused = true;
  setToggleBtnStyle();
  game = new GameOfLife();
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

function setToggleBtnStyle() {
  toggleBtn.textContent = isPaused ? "Play" : "Pause";
  toggleBtn.classList.add(isPaused ? "paused" : "playing");
  toggleBtn.classList.remove(isPaused ? "playing" : "paused");
}

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
