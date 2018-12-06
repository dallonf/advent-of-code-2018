import { getResultingFrequency } from './day-01-chronal-calibration';
import { parseLines, readLines } from '../utils/readLines';

describe('part 1', () => {
  it('canon example', () => {
    const data = parseLines(
      `
+1
-2
+3
+1
`
    );
    expect(getResultingFrequency(data)).toBe(3);
  });

  it('more examples', () => {
    expect(getResultingFrequency(['+1', '+1', '+1'])).toBe(3);
    expect(getResultingFrequency(['+1', '+1', '-2'])).toBe(0);
    expect(getResultingFrequency(['-1', '-2', '-3'])).toBe(-6);
  });

  it('answer', () => {
    const input = readLines('./day-01-data.txt', __dirname);
    expect(getResultingFrequency(input)).toMatchInlineSnapshot(`536`);
  });
});
