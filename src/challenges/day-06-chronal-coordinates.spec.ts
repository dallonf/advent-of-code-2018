import { parseLines, readLines } from '../utils/readLines';
import { parseInput, getLargestArea } from './day-06-chronal-coordinates';

describe('Part One', () => {
  const EXAMPLE_INPUT = parseLines(`
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`).map(parseInput);

  it('gets size of largest area', () => {
    expect(getLargestArea(EXAMPLE_INPUT)).toBe(17);
  });

  it('answer', () => {
    const input = readLines('./day-06-data.txt', __dirname).map(parseInput);
    const result = getLargestArea(input);
    expect(result).toBeLessThan(5382);
    expect(result).toMatchInlineSnapshot(`5365`);
  });
});

describe('Part Two', () => {

});
