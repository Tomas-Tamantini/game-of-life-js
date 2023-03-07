export const coordToStr = (x, y) => `${x},${y}`;
export const strToCoord = (coordStr) => coordStr.split(",").map(Number);
export class CanvasGridConverter {
  #xOffset = 0;
  #yOffset = 0;
  #cellSize = 6;
  #zoomFactor = 1.05;

  gridCoordinates(canvasX, canvasY) {
    const xGrid = Math.floor((canvasX - this.#xOffset) / this.#cellSize);
    const yGrid = Math.floor((canvasY - this.#yOffset) / this.#cellSize);
    return [xGrid, yGrid];
  }

  rectangleSpecs(gridX, gridY) {
    const padding = 1 / 6;
    return [
      this.#cellSize * gridX + this.#xOffset,
      this.#cellSize * gridY + this.#yOffset,
      this.#cellSize * (1 - padding),
      this.#cellSize * (1 - padding),
    ];
  }

  zoomIn(canvasX, canvasY) {
    this._zoom(canvasX, canvasY, this.#zoomFactor);
  }

  zoomOut(canvasX, canvasY) {
    this._zoom(canvasX, canvasY, 1 / this.#zoomFactor);
  }

  _zoom(canvasX, canvasY, zoomFactor) {
    this.#xOffset = (this.#xOffset - canvasX) * zoomFactor + canvasX;
    this.#yOffset = (this.#yOffset - canvasY) * zoomFactor + canvasY;
    this.#cellSize *= zoomFactor;
  }
}
