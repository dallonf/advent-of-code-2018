import { parseLines, readLines } from '../utils/readLines';
import {
  parseInput,
  solveInstructionsSequence,
} from './day-07-the-sum-of-its-parts';

const EXAMPLE_INPUT = parseLines(`
Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
`).map(parseInput);

describe('Part One', () => {
  it('determines the correct sequence of steps', () => {
    expect(solveInstructionsSequence(EXAMPLE_INPUT)).toBe('CABDFE');
  });

  it('answer', () => {
    const input = readLines('./day-07-input.txt', __dirname).map(parseInput);
    const result = solveInstructionsSequence(input);
    expect(result).toMatchInlineSnapshot(`"BDHNEGOLQASVWYPXUMZJIKRTFC"`);
  });
});
