import { performance } from 'perf_hooks';

export const circularIndex = (i: number, length: number) => {
  if (i < 0) {
    return length + i;
  } else {
    return i % length;
  }
};

interface MarbleInCircle {
  number: number;
  nextMarble: MarbleInCircle;
  prevMarble: MarbleInCircle;
}

export const getHighScore = ({
  players,
  lastMarble,
}: {
  players: number;
  lastMarble: number;
}) => {
  // performance.mark('start');
  // let currentMarbleIndex = 0;
  let currentPlayer = 0;
  const playerScores = Array.from(new Array(players)).map(() => 0);
  const initialMarble: any = {
    number: 0,
  };
  initialMarble.nextMarble = initialMarble;
  initialMarble.prevMarble = initialMarble;

  let currentMarble: MarbleInCircle = initialMarble;

  // const circle = [0];
  // performance.mark('setup');
  for (
    let nextMarbleNumber = 1;
    nextMarbleNumber <= lastMarble;
    nextMarbleNumber++
  ) {
    // performance.mark('handle_marble_start');
    if (nextMarbleNumber % 23 === 0) {
      // performance.mark('twentythird_marble_start');
      playerScores[currentPlayer] += nextMarbleNumber;

      let removeMarble = currentMarble;
      for (let i = 0; i < 7; i++) {
        removeMarble = removeMarble.prevMarble;
      }
      
      playerScores[currentPlayer] += removeMarble.number;

      removeMarble.prevMarble.nextMarble = removeMarble.nextMarble;
      removeMarble.nextMarble.prevMarble = removeMarble.prevMarble;
      currentMarble = removeMarble.nextMarble;

      // performance.mark('twentythird_marble_end');
      // performance.measure(
      //   'twentythird_marble',
      //   'twentythird_marble_start',
      //   'twentythird_marble_end'
      // );
    } else {
      // performance.mark('normal_marble_start');

      const insertAfterMarble = currentMarble.nextMarble;
      const insertBeforeMarble = insertAfterMarble.nextMarble;

      const newMarble = {
        number: nextMarbleNumber,
        prevMarble: insertAfterMarble,
        nextMarble: insertBeforeMarble,
      };
      insertAfterMarble.nextMarble = newMarble;
      insertBeforeMarble.prevMarble = newMarble;

      currentMarble = newMarble;
      // performance.mark('normal_marble_end');
      // performance.measure(
      //   'normal_marble',
      //   'normal_marble_start',
      //   'normal_marble_end'
      // );
    }
    currentPlayer = circularIndex(currentPlayer + 1, playerScores.length);
    // performance.mark('handle_marble_end');
    // performance.measure(
    //   'handle_marble',
    //   'handle_marble_start',
    //   'handle_marble_end'
    // );
  }
  // performance.mark('end');

  // performance.measure('overall', 'start', 'end');

  return Math.max(...playerScores);
};
