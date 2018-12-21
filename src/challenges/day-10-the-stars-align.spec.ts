import { parseLines, readLines } from '../utils/readLines';
import {
  parseInput,
  visualizePoints,
  simulateSecond,
  getMessage,
} from './day-10-the-stars-align';

describe('parseInput', () => {
  it('parses input', () => {
    const result = parseLines(`
position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
`).map(parseInput);

    expect(result).toEqual([
      { position: { x: 9, y: 1 }, velocity: { x: 0, y: 2 } },
      { position: { x: 7, y: 0 }, velocity: { x: -1, y: 0 } },
      { position: { x: 3, y: -2 }, velocity: { x: -1, y: 1 } },
    ]);
  });
});

const EXAMPLE_INPUT = parseLines(`
position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>
`).map(parseInput);

describe('visualizePoints', () => {
  it('visualizes points', () => {
    expect(visualizePoints(EXAMPLE_INPUT)).toEqual([
      '........#.............',
      '................#.....',
      '.........#.#..#.......',
      '......................',
      '#..........#.#.......#',
      '...............#......',
      '....#.................',
      '..#.#....#............',
      '.......#..............',
      '......#...............',
      '...#...#.#...#........',
      '....#..#..#.........#.',
      '.......#..............',
      '...........#..#.......',
      '#...........#.........',
      '...#.......#..........',
    ]);
  });
});

describe('Part One', () => {
  it('simulates a second', () => {
    expect(visualizePoints(simulateSecond(EXAMPLE_INPUT))).toEqual([
      '........#....#....',
      '......#.....#.....',
      '#.........#......#',
      '..................',
      '....#.............',
      '..##.........#....',
      '....#.#...........',
      '...##.##..#.......',
      '......#.#.........',
      '......#...#.....#.',
      '#...........#.....',
      '..#.....#.#.......',
    ]);
  });

  it('gets the likely message from the input', () => {
    const result = getMessage(EXAMPLE_INPUT);
    expect(result.seconds).toBe(3);
    expect(visualizePoints(result.result)).toEqual([
      '#...#..###',
      '#...#...#.',
      '#...#...#.',
      '#####...#.',
      '#...#...#.',
      '#...#...#.',
      '#...#...#.',
      '#...#..###',
    ]);
  });

  it('answer', () => {
    const input = readLines('./day-10-input.txt', __dirname).map(parseInput);
    const result = getMessage(input);
    // this turned out to be the Part Two answer!
    expect(result.seconds).toMatchInlineSnapshot(`10641`);
    expect(visualizePoints(result.result)).toMatchInlineSnapshot(`
Array [
  "#....#.....###..#####......###..#....#..#####.....##....######",
  "#....#......#...#....#......#...#....#..#....#...#..#........#",
  "#....#......#...#....#......#....#..#...#....#..#....#.......#",
  "#....#......#...#....#......#....#..#...#....#..#....#......#.",
  "######......#...#####.......#.....##....#####...#....#.....#..",
  "#....#......#...#....#......#.....##....#..#....######....#...",
  "#....#......#...#....#......#....#..#...#...#...#....#...#....",
  "#....#..#...#...#....#..#...#....#..#...#...#...#....#..#.....",
  "#....#..#...#...#....#..#...#...#....#..#....#..#....#..#.....",
  "#....#...###....#####....###....#....#..#....#..#....#..######",
]
`);
  });
});
