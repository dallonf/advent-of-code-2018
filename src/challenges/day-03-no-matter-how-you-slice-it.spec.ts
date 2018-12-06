import { getOverlapArea } from './day-03-no-matter-how-you-slice-it';

describe('Part One', () => {
  it('gets the overlap between two claims', () => {
    expect(
      getOverlapArea(
        { id: 1, x: 1, y: 3, width: 4, height: 4 },
        { id: 2, x: 3, y: 1, width: 4, height: 4 }
      )
    ).toEqual({
      x: 3,
      width: 2,
      y: 3,
      height: 2,
    });
  });
});
