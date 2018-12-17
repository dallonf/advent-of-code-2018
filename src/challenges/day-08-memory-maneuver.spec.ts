import * as fs from 'fs';
import * as path from 'path';
import {
  interpretTree,
  Node,
  sumMetadata,
  valueOfNode,
} from './day-08-memory-maneuver';

const EXAMPLE_INPUT = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
const PUZZLE_INPUT = fs
  .readFileSync(path.join(__dirname, './day-08-data.txt'), 'utf-8')
  .trim()
  .split(' ')
  .map(x => parseInt(x, 10));
describe('Part One', () => {
  it('interprets tree', () => {
    expect(interpretTree(EXAMPLE_INPUT)).toEqual({
      childNodes: [
        {
          childNodes: [],
          metadata: [10, 11, 12],
        },
        {
          childNodes: [
            {
              childNodes: [],
              metadata: [99],
            },
          ],
          metadata: [2],
        },
      ],
      metadata: [1, 1, 2],
    } as Node);
  });
  it('sums metadata', () => {
    expect(sumMetadata(interpretTree(EXAMPLE_INPUT))).toBe(138);
  });
  it('answer', () => {
    expect(sumMetadata(interpretTree(PUZZLE_INPUT))).toMatchInlineSnapshot(
      `45865`
    );
  });
});

describe('Part Two', () => {
  it('example', () => {
    expect(valueOfNode(interpretTree(EXAMPLE_INPUT))).toBe(66);
  });
  it('answer', () => {
    expect(valueOfNode(interpretTree(PUZZLE_INPUT))).toMatchInlineSnapshot(
      `22608`
    );
  });
});
