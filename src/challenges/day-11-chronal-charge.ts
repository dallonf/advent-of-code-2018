import * as lodash from 'lodash';

export const getPowerLevel = (
  x: number,
  y: number,
  serialNumber: number
): number => {
  const rackId = x + 10;
  let result = rackId * y;
  result += serialNumber;
  result *= rackId;
  const hundredsPlace =
    Math.floor(result / 100) - Math.floor(result / 1000) * 10;
  return hundredsPlace - 5;
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
