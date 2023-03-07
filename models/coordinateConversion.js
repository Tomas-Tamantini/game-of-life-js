export const coordToStr = (x, y) => `${x},${y}`;
export const strToCoord = (coordStr) => coordStr.split(",").map(Number);
export class CanvasGridConverter {
  #xOffset = 0;
  #yOffset = 0;
  #cellSize = 6;

  gridCoordinates(canvasX, canvasY) {
    const xGrid = Math.floor((canvasX - this.#xOffset) / this.#cellSize);
    const yGrid = Math.floor((canvasY - this.#yOffset) / this.#cellSize);
    return [xGrid, yGrid];
  }

  rectangleSpecs(gridX, gridY) {
    const padding = 1 / 6;
    return [
      this.#cellSize * gridX,
      this.#cellSize * gridY,
      this.#cellSize * (1 - padding),
      this.#cellSize * (1 - padding),
    ];
  }
}
