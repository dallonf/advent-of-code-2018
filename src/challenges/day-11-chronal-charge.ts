import * as lodash from 'lodash';

const GRID_SIZE = 300;

const getPowerLevelKey = (x: number, y: number, serialNumber: number) =>
  `${x},${y}:${serialNumber}`;
const powerLevelCache = new Map<string, number>();
export const getPowerLevel = (
  x: number,
  y: number,
  serialNumber: number
): number => {
  if (x > GRID_SIZE || y > GRID_SIZE) {
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

const makeGrid = (selectionSize: number) =>
  lodash.flatMap(lodash.range(1, GRID_SIZE + 1 - (selectionSize - 1)), x =>
    lodash.range(1, GRID_SIZE + 1 - (selectionSize - 1)).map(y => ({ x, y }))
  );

interface SummedAreaTable {
  readFromTable(x: number, y: number): number;
  getSum(x1: number, y1: number, x2: number, y2: number): number;
}

// https://en.wikipedia.org/wiki/Summed-area_table
const _getSummedAreaTable = (serialNumber: number): SummedAreaTable => {
  const table: number[][] = [];

  table[0] = [getPowerLevel(1, 1, serialNumber)];

  const readFromTable = (x: number, y: number): number => {
    if (x <= 0 || y <= 0) return 0;
    return table[x - 1][y - 1];
  };

  const populateTable = (x: number, y: number): number => {
    if (x <= 0 || y <= 0) return 0;

    const result = table[x - 1] && table[x - 1][y - 1];
    if (result != null) {
      return result;
    } else {
      // compute result lazily
      const computed =
        getPowerLevel(x, y, serialNumber) +
        populateTable(x, y - 1) +
        populateTable(x - 1, y) -
        populateTable(x - 1, y - 1);
      if (!table[x - 1]) {
        table[x - 1] = [];
      }
      table[x - 1][y - 1] = computed;
      return computed;
    }
  };

  const getSum = (x1: number, y1: number, x2: number, y2: number) => {
    return (
      readFromTable(x2, y2) +
      readFromTable(x1 - 1, y1 - 1) -
      readFromTable(x2, y1 - 1) -
      readFromTable(x1 - 1, y2)
    );
  };

  populateTable(GRID_SIZE, GRID_SIZE);

  return { readFromTable, getSum };
};
export const getSummedAreaTable = lodash.memoize(_getSummedAreaTable);

export const getBestSquare = (
  serialNumber: number,
  { selectionSize = 3 } = {}
): { x: number; y: number; totalPower: number } => {
  const { getSum } = getSummedAreaTable(serialNumber);
  const result = lodash.maxBy(
    makeGrid(selectionSize).map(cell => {
      const totalPower = getSum(
        cell.x,
        cell.y,
        cell.x + selectionSize - 1,
        cell.y + selectionSize - 1
      );

      const square = { ...cell, size: selectionSize, totalPower };
      return square;
    }),
    a => a.totalPower
  );
  return lodash.omit(result!, 'size');
};

export const getBestSquareAndSize = (serialNumber: number): SquareWithPower => {
  const result = lodash.maxBy(
    lodash.range(1, GRID_SIZE + 1).map(selectionSize => {
      const bestSquare = getBestSquare(serialNumber, { selectionSize });
      return { ...bestSquare, size: selectionSize };
    }),
    a => a.totalPower
  );
  return result!;
};
