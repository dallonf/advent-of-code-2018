import { fromPairs } from "lodash";
import { readLines } from "../utils/readLines";
import {
  hasCountOfMatchingLetters,
  calculateChecksum
} from "./day-02-inventory-management-system";

describe("Part One", () => {
  const expected = {
    abcdef: { two: false, three: false },
    bababc: { two: true, three: true },
    abbcde: { two: true, three: false },
    abcccd: { two: false, three: true },
    aabcdd: { two: true, three: false },
    abcdee: { two: true, three: false },
    ababab: { two: false, three: true }
  };
  it("checks for box IDs matching numbers of letters", () => {
    const result = fromPairs(
      Object.keys(expected).map(boxId => {
        return [
          boxId,
          {
            two: hasCountOfMatchingLetters(boxId, 2),
            three: hasCountOfMatchingLetters(boxId, 3)
          }
        ];
      })
    );
    expect(result).toEqual(expected);
  });
  it("calculates a checksum", () => {
    expect(calculateChecksum(Object.keys(expected))).toBe(12);
  });
  it("answer", () => {
    expect(
      calculateChecksum(readLines("./day-02-data.txt", __dirname))
    ).toMatchInlineSnapshot(`5478`);
  });
});
