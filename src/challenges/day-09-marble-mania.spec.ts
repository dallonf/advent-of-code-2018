import { getHighScore, circularIndex } from './day-09-marble-mania';

const PUZZLE_INPUT_PLAYERS = 493;
const PUZZLE_INPUT_LAST_MARBLE = 71863;

describe('circularIndex', () => {
  it('loops backwards', () => {
    const example = [1, 2, 3, 4, 5];
    const startIndex = 2; // that's the 3
    const nextIndex = circularIndex(startIndex - 4, example.length);
    expect(example[nextIndex]).toBe(4);
  });
});

describe('Part One', () => {
  it('example', () => {
    expect(getHighScore({ players: 9, lastMarble: 25 })).toBe(32);
  });

  it('more examples', () => {
    expect(getHighScore({ players: 10, lastMarble: 1618 })).toBe(8317);
    expect(getHighScore({ players: 13, lastMarble: 7999 })).toBe(146373);
    expect(getHighScore({ players: 17, lastMarble: 1104 })).toBe(2764);
    expect(getHighScore({ players: 21, lastMarble: 6111 })).toBe(54718);
    expect(getHighScore({ players: 30, lastMarble: 5807 })).toBe(37305);
  });

  it.only('answer', () => {
    expect(
      getHighScore({
        players: PUZZLE_INPUT_PLAYERS,
        lastMarble: PUZZLE_INPUT_LAST_MARBLE,
      })
    ).toMatchInlineSnapshot(`367802`);
  });
});

describe('Part Two', () => {
  it('answer', () => {
    expect(
      getHighScore({
        players: PUZZLE_INPUT_PLAYERS,
        lastMarble: PUZZLE_INPUT_LAST_MARBLE * 100,
      })
    ).toMatchInlineSnapshot(`7186300`);
  });
});
