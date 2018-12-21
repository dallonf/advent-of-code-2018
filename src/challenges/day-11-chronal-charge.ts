import * as lodash from 'lodash';

const getPowerLevelKey = (x: number, y: number, serialNumber: number) =>
  `${x},${y}:${serialNumber}`;
const powerLevelCache = new Map<string, number>();
export const getPowerLevel = (
  x: number,
  y: number,
  serialNumber: number
): number => {
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

const makeGrid = (selectionSize: number) =>
  lodash.flatMap(lodash.range(1, 301 - selectionSize), x =>
    lodash.range(1, 301 - selectionSize).map(y => ({ x, y }))
  );
export const getBestSquare = (
  serialNumber: number,
  { selectionSize = 3 } = {}
): { x: number; y: number; totalPower: number } => {
  const result = lodash.maxBy(
    makeGrid(selectionSize).map(cell => {
      let totalPower = 0;
      for (let xDelta = 0; xDelta < selectionSize; xDelta++) {
        for (let yDelta = 0; yDelta < selectionSize; yDelta++) {
          totalPower += getPowerLevel(
            cell.x + xDelta,
            cell.y + yDelta,
            serialNumber
          );
        }
      }
      return { ...cell, totalPower };
    }),
    a => a.totalPower
  );
  return result!;
};

export const getBestSquareAndSize = (
  serialNumber: number
): { x: number; y: number; size: number; totalPower: number } => {
  const result = lodash.maxBy(
    lodash.range(1, 301).map(selectionSize => {
      console.log('checking selectionSize', selectionSize);
      const bestSquare = getBestSquare(serialNumber, { selectionSize });
      return { ...bestSquare, size: selectionSize };
    }),
    a => a.totalPower
  );
  return result!;
};
