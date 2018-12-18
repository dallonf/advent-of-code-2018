import { performance } from 'perf_hooks';

export const circularIndex = (i: number, length: number) => {
  if (i < 0) {
    return length + i;
  } else {
    return i % length;
  }
};

export const getHighScore = ({
  players,
  lastMarble,
}: {
  players: number;
  lastMarble: number;
}) => {
  performance.mark('start');
  let currentMarbleIndex = 0;
  let currentPlayer = 0;
  const playerScores = Array.from(new Array(players)).map(() => 0);
  const circle = [0];
  performance.mark('setup');
  for (let nextMarble = 1; nextMarble <= lastMarble; nextMarble++) {
    performance.mark('handle_marble_start');
    if (nextMarble % 23 === 0) {
      performance.mark('twentythird_marble_start');
      playerScores[currentPlayer] += nextMarble;
      const removeIndex = circularIndex(currentMarbleIndex - 7, circle.length);
      playerScores[currentPlayer] += circle[removeIndex];
      circle.splice(removeIndex, 1);
      currentMarbleIndex = removeIndex;
      performance.mark('twentythird_marble_end');
      performance.measure(
        'twentythird_marble',
        'twentythird_marble_start',
        'twentythird_marble_end'
      );
    } else {
      performance.mark('normal_marble_start');
      const insertIndex = circularIndex(currentMarbleIndex + 2, circle.length);
      circle.splice(insertIndex, 0, nextMarble);
      currentMarbleIndex = insertIndex;
      performance.mark('normal_marble_end');
      performance.measure(
        'normal_marble',
        'normal_marble_start',
        'normal_marble_end'
      );
    }
    currentPlayer = circularIndex(currentPlayer + 1, playerScores.length);
    performance.mark('handle_marble_end');
    performance.measure(
      'handle_marble',
      'handle_marble_start',
      'handle_marble_end'
    );
  }
  performance.mark('end');

  performance.measure('overall', 'start', 'end');

  return Math.max(...playerScores);
};
