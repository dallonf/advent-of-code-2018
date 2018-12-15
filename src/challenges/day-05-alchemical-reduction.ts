const isUppercase = (input: string) => input === input.toUpperCase();
const isLowercase = (input: string) => input === input.toLowerCase();
const getCase = (input: string) => {
  if (isUppercase(input)) {
    return 'uppercase';
  } else if (isLowercase) {
    return 'lowercase';
  } else {
    throw new Error(
      `Somehow "${input}" was not recognized as either uppercase or lowercase`
    );
  }
};

export const reactionSingleStep = (input: string) => {
  let reactionIndex = -1;
  for (let i = 0; i < input.length - 1; i++) {
    const letter = input.charAt(i);
    const nextLetter = input.charAt(i + 1);
    if (
      letter.toUpperCase() == nextLetter.toUpperCase() &&
      getCase(letter) !== getCase(nextLetter)
    ) {
      reactionIndex = i;
      break;
    }
  }

  if (reactionIndex === -1) {
    return input;
  } else {
    const newString = [...input];
    newString.splice(reactionIndex, 2);
    return newString.join('');
  }
};

export const reaction = (input: string): string => {
  let prev = input;
  let next = input;
  while (true) {
    next = reactionSingleStep(prev);
    if (prev === next) {
      return next;
    }
    prev = next;
  }
};