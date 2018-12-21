import { getPowerLevel } from './day-11-chronal-charge';

describe('Part One', () => {
  it('gets power level', () => {
    expect(getPowerLevel(3, 5, 8)).toBe(4);
  });
  it('gets power level (more examples)', () => {
    expect(getPowerLevel(122, 79, 57)).toBe(-5);
    expect(getPowerLevel(217, 196, 39)).toBe(0);
    expect(getPowerLevel(101, 153, 71)).toBe(4);
  });
});
