export const hasCountOfMatchingLetters = (boxId: string, count: number) => {
  const letterCounts = new Map<string, number>();
  const letters = [...boxId];
  for (const letter of letters) {
    const currentCount = letterCounts.get(letter) || 0;
    letterCounts.set(letter, currentCount + 1);
  }
  for (const letterCount of letterCounts.entries()) {
    if (letterCount[1] === count) {
      return true;
    }
  }
  return false;
};

export const calculateChecksum = (boxIds: string[]): number => {
  return (
    boxIds.filter(x => hasCountOfMatchingLetters(x, 2)).length *
    boxIds.filter(x => hasCountOfMatchingLetters(x, 3)).length
  );
};

export const findMatchingBoxes = (boxIds: string[]) => {
  const alreadyCheckedBoxes = [];
  for (const boxId of boxIds) {
    for (const compareBoxId of alreadyCheckedBoxes) {
      const lettersInCommon = [];
      let differences = 0;
      if (boxId.length !== compareBoxId.length) {
        throw new Error(
          `Box IDs must be the same length. ${boxId}:${
            boxId.length
          }; ${compareBoxId}:${compareBoxId.length}`
        );
      }
      for (let i = 0; i < boxId.length; i++) {
        const box1Letter = boxId.charAt(i);
        const box2Letter = compareBoxId.charAt(i);
        if (box1Letter === box2Letter) {
          lettersInCommon.push(box1Letter);
        } else {
          differences += 1;
          if (differences > 1) {
            // too many differences, don't waste time comparing anymore
            continue;
          }
        }
      }
      if (differences === 1) {
        return {
          boxes: [boxId, compareBoxId],
          lettersInCommon: lettersInCommon.join(''),
        };
      }
    }
    alreadyCheckedBoxes.push(boxId);
  }
};
