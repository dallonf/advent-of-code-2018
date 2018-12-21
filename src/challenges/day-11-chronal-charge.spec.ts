import { getPowerLevel, getBestSquare } from './day-11-chronal-charge';

describe('Part One', () => {
  it('gets power level', () => {
    expect(getPowerLevel(3, 5, 8)).toBe(4);
  });
  it('gets power level (more examples)', () => {
    expect(getPowerLevel(122, 79, 57)).toBe(-5);
    expect(getPowerLevel(217, 196, 39)).toBe(0);
    expect(getPowerLevel(101, 153, 71)).toBe(4);
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
    const result = getBestSquare(5719);
    expect(result).toMatchInlineSnapshot(`
Object {
  "totalPower": 29,
  "x": 21,
  "y": 34,
}
`);
  });
});
