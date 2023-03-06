export const coordToStr = (x, y) => `${x},${y}`;
export const strToCoord = (coordStr) => coordStr.split(",").map(Number);
