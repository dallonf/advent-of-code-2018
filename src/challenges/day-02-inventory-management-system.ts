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
