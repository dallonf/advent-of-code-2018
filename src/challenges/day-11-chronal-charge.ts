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

const SELECTION_SIZE = 3;
const GRID = lodash.flatMap(lodash.range(1, 301 - SELECTION_SIZE), x =>
  lodash.range(1, 301 - SELECTION_SIZE).map(y => ({ x, y }))
);
export const getBestSquare = (
  serialNumber: number
): { x: number; y: number; totalPower: number } => {
  const result = lodash.maxBy(
    GRID.map(cell => {
      let totalPower = 0;
      for (let xDelta = 0; xDelta < SELECTION_SIZE; xDelta++) {
        for (let yDelta = 0; yDelta < SELECTION_SIZE; yDelta++) {
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
