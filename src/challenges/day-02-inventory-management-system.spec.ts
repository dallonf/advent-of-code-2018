import { hasCountOfMatchingLetters } from './day-02-inventory-management-system';
import { fromPairs } from 'lodash';

describe('Part One', () => {
  it('checks for box IDs matching numbers of letters', () => {
    const expected = {
      abcdef: { two: false, three: false },
      bababc: { two: true, three: true },
      abbcde: { two: true, three: false },
      abcccd: { two: false, three: true },
      aabcdd: { two: true, three: false },
      abcdee: { two: true, three: false },
      ababab: { two: false, three: true },
    };

    const result = fromPairs(
      Object.keys(expected).map(boxId => {
        return [
          boxId,
          {
            two: hasCountOfMatchingLetters(boxId, 2),
            three: hasCountOfMatchingLetters(boxId, 3),
          },
        ];
      })
    );
    expect(result).toEqual(expected);
  });
});
