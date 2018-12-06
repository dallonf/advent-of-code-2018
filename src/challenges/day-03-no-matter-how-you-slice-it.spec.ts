import { getOverlapArea } from './day-03-no-matter-how-you-slice-it';

describe('Part One', () => {
  const DUMMY_CLAIMS = [
    { id: 1, x: 1, y: 3, width: 4, height: 4 },
    { id: 2, x: 3, y: 1, width: 4, height: 4 },
    { id: 3, x: 5, y: 5, width: 2, height: 2 },
  ];

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
});
