import { CanvasGridConverter } from "./models/coordinateConversion.js";
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
let frameCount = 0;
let framesPerSecond = 10;
let isPaused = false;
const canvasGridConverter = new CanvasGridConverter();

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
  const gridCoords = canvasGridConverter.gridCoordinates(x, y);
  game.toggleCell(...gridCoords);
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault(); // Prevent the default scroll behavior

  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  if (event.deltaY < 0) canvasGridConverter.zoomIn(x, y);
  else canvasGridConverter.zoomOut(x, y);
});

function setToggleBtnStyle() {
  toggleBtn.textContent = isPaused ? "Play" : "Pause";
  toggleBtn.classList.add(isPaused ? "paused" : "playing");
  toggleBtn.classList.remove(isPaused ? "playing" : "paused");
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let cell of game.liveCells) {
    const rectSpecs = canvasGridConverter.rectangleSpecs(...cell);
    ctx.fillRect(...rectSpecs);
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
