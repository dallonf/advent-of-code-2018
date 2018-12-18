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
  let currentMarbleIndex = 0;
  let currentPlayer = 0;
  const playerScores = Array.from(new Array(players)).map(() => 0);
  const circle = [0];
  for (let nextMarble = 1; nextMarble <= lastMarble; nextMarble++) {
    if (nextMarble % 23 === 0) {
      playerScores[currentPlayer] += nextMarble;
      const removeIndex = circularIndex(currentMarbleIndex - 7, circle.length);
      playerScores[currentPlayer] += circle[removeIndex];
      circle.splice(removeIndex, 1);
      currentMarbleIndex = removeIndex;
    } else {
      const insertIndex = circularIndex(currentMarbleIndex + 2, circle.length);
      circle.splice(insertIndex, 0, nextMarble);
      currentMarbleIndex = insertIndex;
    }
    currentPlayer = circularIndex(currentPlayer + 1, playerScores.length);
  }

  return Math.max(...playerScores);
};
