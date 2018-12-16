import * as lodash from 'lodash';

interface Constraint {
  step: string;
  dependency: string;
}

const REGEX = /^Step ([A-Z]) must be finished before step ([A-Z]) can begin\.$/;
export const parseInput = (input: string): Constraint => {
  const match = input.match(REGEX);
  if (!match) throw new Error(`Can't parse input: ${input}`);
  return {
    step: match[2],
    dependency: match[1],
  };
};
export const solveInstructionsSequence = (input: Constraint[]): string => {
  let sequence = [];
  const stepsDone = new Set<string>();
  // discover all steps
  let remainingSteps = [
    ...input
      .reduce((map, next) => {
        // discover steps when they are mentioned as dependencies
        if (!map.has(next.dependency)) {
          map.set(next.dependency, { dependencies: [] });
        }

        if (!map.has(next.step)) {
          map.set(next.step, { dependencies: [] });
        }
        map.get(next.step)!.dependencies.push(next.dependency);
        return map;
      }, new Map<string, { dependencies: string[] }>())
      .entries(),
  ].map(x => ({ step: x[0], ...x[1] }));
  remainingSteps.sort((a, b) => a.step.localeCompare(b.step));

  while (remainingSteps.length) {
    // get all steps that are possible to complete
    // given the current dependencies
    const possibleSteps = remainingSteps.filter(x =>
      x.dependencies.every(y => stepsDone.has(y))
    );
    const step = possibleSteps[0];
    // mark the step as completed
    remainingSteps = remainingSteps.filter(x => x.step !== step.step);
    stepsDone.add(step.step);
    sequence.push(step.step);
  }

  return sequence.join('');
};
