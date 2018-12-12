import moment from 'moment';
import fromPairs from 'lodash/fromPairs';

type GuardRecord =
  | {
      type: 'beginsShift';
      time: moment.Moment;
      guardId: number;
    }
  | {
      type: 'fallsAsleep';
      time: moment.Moment;
    }
  | {
      type: 'wakesUp';
      time: moment.Moment;
    };

const REGEX_GENERIC = /^\[([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2})\] (.*)$/;
const REGEX_BEGINS_SHIFT = /^Guard #([0-9]+) begins shift$/;
export const parseRecord = (input: string): GuardRecord => {
  const match = input.match(REGEX_GENERIC);
  if (!match) {
    throw new Error(`Can't parse record: ${input}`);
  }
  const time = moment(match[1]);
  const body = match[2];

  if (body === 'falls asleep') {
    return {
      type: 'fallsAsleep',
      time,
    };
  } else if (body === 'wakes up') {
    return {
      type: 'wakesUp',
      time,
    };
  } else {
    const beginsShiftMatch = body.match(REGEX_BEGINS_SHIFT);
    if (beginsShiftMatch) {
      return {
        type: 'beginsShift',
        guardId: parseInt(beginsShiftMatch[1], 10),
        time,
      };
    } else {
      throw new Error(`Unrecognized record body: ${body}`);
    }
  }
};

type GuardSleepTime = {
  guardId: number;
  start: moment.Moment;
  end: moment.Moment;
};
export const getAsleepGuard = (input: GuardRecord[]) => {
  const guardSleepTimes = new Map<number, GuardSleepTime[]>();
  let recordInProgress: Partial<GuardSleepTime> = {};
  for (const record of input) {
    const saveRecord = () => {
      const { guardId, start } = recordInProgress;
      if (!guardId || !start) {
        // no guard is asleep
        return;
      }
      let array: GuardSleepTime[];
      if (guardSleepTimes.has(guardId)) {
        array = guardSleepTimes.get(guardId)!;
      } else {
        array = [];
        guardSleepTimes.set(guardId, array);
      }
      array.push({
        guardId,
        start,
        end: record.time,
      });
      recordInProgress = {};
    };

    if (record.type === 'beginsShift') {
      saveRecord();
      recordInProgress = { guardId: record.guardId };
    } else if (record.type === 'fallsAsleep') {
      recordInProgress.start = record.time;
    } else if (record.type === 'wakesUp') {
      saveRecord();
    }
  }

  const guardsWithTotalSleepTime = [...guardSleepTimes.entries()].map(x => ({
    guardId: x[0],
    sleepTime: x[1].reduce(
      (prev, next) => prev + (next.end.minutes() - next.start.minutes()),
      0
    ),
  }));

  return {
    guardTotalSleepTime: fromPairs(
      guardsWithTotalSleepTime.map(x => [x.guardId, x.sleepTime])
    ),
  };
};
