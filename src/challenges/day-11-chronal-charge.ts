import * as lodash from 'lodash';

const getPowerLevelKey = (x: number, y: number, serialNumber: number) =>
  `${x},${y}:${serialNumber}`;
const powerLevelCache = new Map<string, number>();
export const getPowerLevel = (
  x: number,
  y: number,
  serialNumber: number
): number => {
  if (x > 300 || y > 300) {
    throw new Error(`Invalid coordinates: ${x}, ${y}`);
  }
  const key = getPowerLevelKey(x, y, serialNumber);
  if (powerLevelCache.has(key)) return powerLevelCache.get(key)!;
  const rackId = x + 10;
  let result = rackId * y;
  result += serialNumber;
  result *= rackId;
  const hundredsPlace =
    Math.floor(result / 100) - Math.floor(result / 1000) * 10;
  result = hundredsPlace - 5;
  powerLevelCache.set(key, result);
  return result;
};

interface Square {
  x: number;
  y: number;
  size: number;
}
interface SquareWithPower extends Square {
  totalPower: number;
}
const squareCacheKey = (square: Square, serialNumber: number) =>
  `${square.x},${square.y}x${square.size}:${serialNumber}`;
const squareCache = new Map<string, SquareWithPower>();

const makeGrid = (selectionSize: number) =>
  lodash.flatMap(lodash.range(1, 301 - (selectionSize - 1)), x =>
    lodash.range(1, 301 - (selectionSize - 1)).map(y => ({ x, y }))
  );
export const getBestSquare = (
  serialNumber: number,
  { selectionSize = 3 } = {}
): { x: number; y: number; totalPower: number } => {
  const result = lodash.maxBy(
    makeGrid(selectionSize).map(cell => {
      const key = squareCacheKey(
        { ...cell, size: selectionSize },
        serialNumber
      );

      // Check for cached computations before doing the expensive brute force solution
      if (squareCache.has(key)) return squareCache.get(key)!;

      let totalPower = 0;

      const leftSquareKey = squareCacheKey(
        { x: cell.x - 1, y: cell.y, size: selectionSize },
        serialNumber
      );
      const topSquareKey = squareCacheKey(
        { x: cell.x, y: cell.y - 1, size: selectionSize },
        serialNumber
      );
      // check for a square to the left
      if (squareCache.has(leftSquareKey)) {
        totalPower = squareCache.get(leftSquareKey)!.totalPower;
        // remove the left edge
        for (let yDelta = 0; yDelta < selectionSize; yDelta++) {
          totalPower -= getPowerLevel(
            cell.x - 1,
            cell.y + yDelta,
            serialNumber
          );
        }
        // add the right edge
        for (let yDelta = 0; yDelta < selectionSize; yDelta++) {
          totalPower += getPowerLevel(
            cell.x + selectionSize - 1,
            cell.y + yDelta,
            serialNumber
          );
        }
        // check for a square to the top
      } else if (squareCache.has(topSquareKey)) {
        totalPower = squareCache.get(topSquareKey)!.totalPower;
        // remove the top edge
        for (let xDelta = 0; xDelta < selectionSize; xDelta++) {
          totalPower -= getPowerLevel(
            cell.x + xDelta,
            cell.y - 1,
            serialNumber
          );
        }
        // add the bottom edge
        for (let xDelta = 0; xDelta < selectionSize; xDelta++) {
          totalPower += getPowerLevel(
            cell.x + xDelta,
            cell.y + selectionSize - 1,
            serialNumber
          );
        }
      } else {
        // we don't have anything cached we can use as a shortcut, do the full computation
        for (let xDelta = 0; xDelta < selectionSize; xDelta++) {
          for (let yDelta = 0; yDelta < selectionSize; yDelta++) {
            totalPower += getPowerLevel(
              cell.x + xDelta,
              cell.y + yDelta,
              serialNumber
            );
          }
        }
      }

      const square = { ...cell, size: selectionSize, totalPower };
      squareCache.set(key, square);
      return square;
    }),
    a => a.totalPower
  );
  return lodash.omit(result!, 'size');
};

export const getBestSquareAndSize = (serialNumber: number): SquareWithPower => {
  const result = lodash.maxBy(
    makeGrid(1).map(cell => {
      let totalPower = getPowerLevel(cell.x, cell.y, serialNumber);

      let bestSize = 1;
      let bestPower = totalPower;

      const maxSize = 301 - Math.max(cell.x, cell.y);

      for (let newSize = 2; newSize < maxSize; newSize++) {
        const newEdgeDelta = newSize - 1;
        // add right edge
        for (let yDelta = 0; yDelta < newSize; yDelta++) {
          totalPower += getPowerLevel(
            cell.x + newEdgeDelta,
            cell.y + yDelta,
            serialNumber
          );
        }
        // add bottom edge (not counting bottom-right cell, we already got that one)
        for (let xDelta = 0; xDelta < newSize - 1; xDelta++) {
          totalPower += getPowerLevel(
            cell.x + xDelta,
            cell.y + newEdgeDelta,
            serialNumber
          );
        }

        if (totalPower > bestPower) {
          bestPower = totalPower;
          bestSize = newSize;
        }
      }

      const square = { ...cell, size: bestSize, totalPower: bestPower };
      if (cell.x % 5 === 0) {
        console.log(square);
      }
      return square;
    }),
    a => a.totalPower
  );
  return result!;
};
