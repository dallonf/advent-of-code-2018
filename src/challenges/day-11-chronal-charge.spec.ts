import {
  getPowerLevel,
  getBestSquare,
  getBestSquareAndSize,
  getSummedAreaTable,
} from './day-11-chronal-charge';

const PUZZLE_INPUT = 5719;

describe('Part One', () => {
  it('gets power level', () => {
    expect(getPowerLevel(3, 5, 8)).toBe(4);
  });
  it('gets power level (more examples)', () => {
    expect(getPowerLevel(122, 79, 57)).toBe(-5);
    expect(getPowerLevel(217, 196, 39)).toBe(0);
    expect(getPowerLevel(101, 153, 71)).toBe(4);
  });

  describe('getSummedAreaTable', () => {
    it('readFromTable, very small numbers', () => {
      const table = getSummedAreaTable(18);
      expect(table.readFromTable(1, 1)).toBe(getPowerLevel(1, 1, 18));
      expect(table.readFromTable(2, 1)).toBe(
        getPowerLevel(1, 1, 18) + getPowerLevel(2, 1, 18)
      );
      expect(table.readFromTable(1, 2)).toBe(
        getPowerLevel(1, 1, 18) + getPowerLevel(1, 2, 18)
      );
      expect(table.readFromTable(2, 2)).toBe(
        getPowerLevel(1, 1, 18) +
          getPowerLevel(1, 2, 18) +
          getPowerLevel(2, 1, 18) +
          getPowerLevel(2, 2, 18)
      );
    });
    it('getSum, very small numbers', () => {
      const table = getSummedAreaTable(18);
      expect(table.getSum(1, 1, 2, 2)).toBe(
        getPowerLevel(1, 1, 18) +
          getPowerLevel(1, 2, 18) +
          getPowerLevel(2, 1, 18) +
          getPowerLevel(2, 2, 18)
      );
    });
    it('gets an exact square', () => {
      const table = getSummedAreaTable(18);
      expect(table.getSum(33, 45, 33, 45)).toBe(4);
    });
    it('get a sum', () => {
      const table = getSummedAreaTable(18);
      expect(table.getSum(33, 45, 35, 47)).toBe(29);
    });
  });

  it('gets best square (1)', () => {
    const result = getBestSquare(18);
    expect(result).toEqual({
      x: 33,
      y: 45,
      totalPower: 29,
    });
  });
  it('gets best square (2)', () => {
    const result = getBestSquare(42);
    expect(result).toEqual({
      x: 21,
      y: 61,
      totalPower: 30,
    });
  });

  it('answer', () => {
    const result = getBestSquare(PUZZLE_INPUT);
    expect(result).toMatchInlineSnapshot(`
Object {
  "totalPower": 29,
  "x": 21,
  "y": 34,
}
`);
  });
});

describe('Part Two', () => {
  it('gets best square and size', () => {
    expect(getBestSquareAndSize(18)).toEqual({
      x: 90,
      y: 269,
      size: 16,
      totalPower: 113,
    });
    expect(getBestSquareAndSize(42)).toEqual({
      x: 232,
      y: 251,
      size: 12,
      totalPower: 119,
    });
  });
  it('answer', () => {
    const result = getBestSquareAndSize(PUZZLE_INPUT);
    expect(result).toMatchInlineSnapshot(`
Object {
  "size": 16,
  "totalPower": 124,
  "x": 90,
  "y": 244,
}
`);
  });
});
