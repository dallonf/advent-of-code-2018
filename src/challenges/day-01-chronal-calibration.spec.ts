import {
  getResultingFrequency,
  getFirstRepeatedFrequency
} from "./day-01-chronal-calibration";
import { parseLines, readLines } from "../utils/readLines";

describe("part 1", () => {
  it("canon example", () => {
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

  it("more examples", () => {
    expect(getResultingFrequency(["+1", "+1", "+1"])).toBe(3);
    expect(getResultingFrequency(["+1", "+1", "-2"])).toBe(0);
    expect(getResultingFrequency(["-1", "-2", "-3"])).toBe(-6);
  });

  it("answer", () => {
    const input = readLines("./day-01-data.txt", __dirname);
    expect(getResultingFrequency(input)).toMatchInlineSnapshot(`536`);
  });
});

describe("part 2", () => {
  it("canon example", () => {
    const data = parseLines(
      `
+1
-2
+3
+1
`
    );
    expect(getFirstRepeatedFrequency(data)).toBe(2);
  });
  it("more examples", () => {
    expect(getFirstRepeatedFrequency(["+1", "-1"])).toBe(0);
    expect(getFirstRepeatedFrequency(["+3", "+3", "+4", "-2", "-4"])).toBe(10);
    expect(getFirstRepeatedFrequency(["-6", "+3", "+8", "+5", "-6"])).toBe(5);
    expect(getFirstRepeatedFrequency(["+7", "+7", "-2", "-7", "-4"])).toBe(14);
  });
  it("answer", () => {
    const input = readLines("./day-01-data.txt", __dirname);
    expect(getFirstRepeatedFrequency(input)).toMatchInlineSnapshot(`75108`);
  });
});
