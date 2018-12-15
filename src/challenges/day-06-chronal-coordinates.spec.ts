import { parseLines, readLines } from '../utils/readLines';
import {
  parseInput,
  getLargestArea,
  getClusterRegion,
} from './day-06-chronal-coordinates';

const EXAMPLE_INPUT = parseLines(`
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`).map(parseInput);

describe('Part One', () => {
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

describe.only('Part Two', () => {
  it('gets a clustered region', () => {
    expect(getClusterRegion(EXAMPLE_INPUT, 32)).toBe(16);
  });

  it('answer', () => {
    const input = readLines('./day-06-data.txt', __dirname).map(parseInput);
    const result = getClusterRegion(input, 10000);
    expect(result).toMatchInlineSnapshot(`42513`);
  });
});
