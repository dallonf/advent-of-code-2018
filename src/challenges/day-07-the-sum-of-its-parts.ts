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

const getSteps = (input: Constraint[]) => {
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
  return remainingSteps;
};

export const solveInstructionsSequence = (input: Constraint[]): string => {
  let sequence = [];
  const stepsDone = new Set<string>();
  // discover all steps
  let remainingSteps = getSteps(input);

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

const BASE_LETTER = 'A'.charCodeAt(0) - 1;
export const timeForLetter = (letter: string) => {
  return letter.charCodeAt(0) - BASE_LETTER;
};

type WorkerState_Idle = { type: 'IDLE' };
type WorkerState_Working = {
  type: 'WORKING';
  step: string;
  timeRemaining: number;
};
type WorkerState = WorkerState_Idle | WorkerState_Working;

export const estimateTimeToComplete = (
  input: Constraint[],
  { numWorkers, minStepTime }: { numWorkers: number; minStepTime: number }
) => {
  const completedSteps = new Set<string>();
  let remainingSteps = getSteps(input);
  let seconds = -1;
  let workers = lodash.range(numWorkers).map(
    () =>
      ({
        type: 'IDLE',
      } as WorkerState)
  );

  while (remainingSteps.length) {
    // simulate workers
    const justCompletedSteps = workers
      .filter(
        (x): x is WorkerState_Working =>
          x.type === 'WORKING' && x.timeRemaining - 1 <= 0
      )
      .map(x => x.step);
    workers = workers.map(worker => {
      if (worker.type === 'WORKING') {
        if (justCompletedSteps.some(x => x === worker.step)) {
          return { type: 'IDLE' } as WorkerState;
        } else {
          return { ...worker, timeRemaining: worker.timeRemaining - 1 };
        }
      } else {
        return worker;
      }
    });

    // mark steps as finished
    justCompletedSteps.forEach(step => {
      remainingSteps = remainingSteps.filter(x => x.step !== step);
      completedSteps.add(step);
    });

    // assign workers
    for (let i = 0; i < workers.length; i++) {
      const workerState = workers[i];
      if (workerState.type === 'IDLE') {
        const stepToWorkOn = remainingSteps.find(
          x =>
            x.dependencies.every(y => completedSteps.has(y)) &&
            // can't work on a step another worker is busy with
            !workers.some(y => y.type === 'WORKING' && y.step === x.step)
        );
        if (stepToWorkOn) {
          workers[i] = {
            type: 'WORKING',
            step: stepToWorkOn.step,
            timeRemaining: minStepTime + timeForLetter(stepToWorkOn.step),
          } as WorkerState_Working;
        }
      }
    }

    seconds += 1;
  }
  return seconds;
};
