import { parseLines, readLines } from '../utils/readLines';
import { parseInput } from './day-10-the-stars-align';

describe('parseInput', () => {
  it('parses input', () => {
    const result = parseLines(`
position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
`).map(parseInput);

    expect(result).toEqual([
      { position: { x: 9, y: 1 }, velocity: { x: 0, y: 2 } },
      { position: { x: 7, y: 0 }, velocity: { x: -1, y: 0 } },
      { position: { x: 3, y: -2 }, velocity: { x: -1, y: 1 } },
    ]);
  });
});
