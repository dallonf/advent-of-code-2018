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

const reactionSingleStep_internal = (input: string) => {
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
    return { result: input };
  } else {
    const preSplit = input.slice(0, reactionIndex);
    const postSplit = input.slice(reactionIndex + 2);
    return { result: preSplit + postSplit, preSplit, postSplit };
    // const newString = [...input];
    // newString.splice(reactionIndex, 2);
    // return { result: newString.join(''), reactionIndex };
  }
};

export const reactionSingleStep = (input: string) => {
  return reactionSingleStep_internal(input).result;
};

export const reaction = (input: string): string => {
  let stable = '';
  let unstable = input;

  while (true) {
    const next = reactionSingleStep_internal(unstable);

    if (!next.preSplit && !next.postSplit) {
      return stable + next.result;
    }

    // back up one after the point of the previous reaction;
    // the units adjacent to the split might react
    const fullPreSplit = stable + next.preSplit;
    stable = fullPreSplit.slice(0, fullPreSplit.length - 1);
    unstable = fullPreSplit.slice(fullPreSplit.length - 1) + next.postSplit;
  }
};
