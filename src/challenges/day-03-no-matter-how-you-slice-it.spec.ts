import { parseLines } from '../utils/readLines';
import {
  getOverlapArea,
  parseClaim,
  calculateTotalOverlap,
} from './day-03-no-matter-how-you-slice-it';

describe('Part One', () => {
  const DUMMY_CLAIMS = parseLines(`
#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
`).map(parseClaim);

  it('parses a claim string', () => {
    expect(parseClaim('#123 @ 3,2: 5x4')).toEqual({
      id: 123,
      x: 3,
      y: 2,
      width: 5,
      height: 4,
    });
  });

  it('gets the overlap between two claims', () => {
    expect(getOverlapArea(DUMMY_CLAIMS[0], DUMMY_CLAIMS[1])).toEqual({
      x: 3,
      width: 2,
      y: 3,
      height: 2,
    });
  });

  it('detects when areas do not overlap', () => {
    expect(getOverlapArea(DUMMY_CLAIMS[0], DUMMY_CLAIMS[2])).toEqual(null);
    expect(getOverlapArea(DUMMY_CLAIMS[1], DUMMY_CLAIMS[2])).toEqual(null);
  });

  it('calculates total overlap', () => {
    expect(calculateTotalOverlap(DUMMY_CLAIMS)).toBe(4);
  });
});
