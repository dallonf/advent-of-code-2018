const REGEX = /^([+-])([0-9]+)/;

const applyAdjustment = (adjustment: string, frequency: number): number => {
  const matches = adjustment.match(REGEX);
  if (!matches) throw new Error(`Bad adjustment format: ${adjustment}`);
  const sign = matches[1] === '-' ? -1 : 1;
  const adjustmentAmount = parseInt(matches[2], 10);
  return frequency + adjustmentAmount * sign;
};

export const getResultingFrequency = (input: string[]): number => {
  let frequency = 0;
  input.forEach(adjustment => {
    frequency = applyAdjustment(adjustment, frequency);
  });
  return frequency;
};

export const getFirstRepeatedFrequency = (input: string[]): number => {
  let currentFrequency = 0;
  let index = 0;
  const seenFrequencies = new Set<number>([0]);
  while (true) {
    const adjustment = input[index];
    currentFrequency = applyAdjustment(adjustment, currentFrequency);
    if (seenFrequencies.has(currentFrequency)) {
      return currentFrequency;
    }
    seenFrequencies.add(currentFrequency);
    index = (index + 1) % input.length;
  }
};
