import { getResultingFrequency } from './day-01-chronal-calibration';
import { parseLines } from '../utils/readLines';

it('canon example', () => {
  const data = parseLines(
    `
+1
-2
+3
+1
`,
    { filterNulls: true }
  );
  expect(getResultingFrequency(data)).toBe(3);
});

it('more examples', () => {
  expect(getResultingFrequency(['+1', '+1', '+1'])).toBe(3);
  expect(getResultingFrequency(['+1', '+1', '-2'])).toBe(0);
  expect(getResultingFrequency(['-1', '-2', '-3'])).toBe(-6);
});
