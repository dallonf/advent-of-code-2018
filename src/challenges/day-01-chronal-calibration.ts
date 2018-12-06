const REGEX = /^([+-])([0-9]+)/;

export const getResultingFrequency = (input: string[]): number => {
  let frequency = 0;
  input.forEach(adjustment => {
    const matches = adjustment.match(REGEX);
    if (!matches) throw new Error(`Bad adjustment format: ${adjustment}`);
    const sign = matches[1] === '-' ? -1 : 1;
    const adjustmentAmount = parseInt(matches[2], 10);
    frequency += adjustmentAmount * sign;
  });
  return frequency;
};
