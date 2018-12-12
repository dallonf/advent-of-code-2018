import moment from 'moment';

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

const REGEX_GENERIC = /\[([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2})\] (.*)/;
export const parseRecord = (input: string): GuardRecord => {
  const match = input.match(REGEX_GENERIC);
  if (!match) {
    throw new Error(`Can't parse record: ${input}`);
  }
  const time = moment(match[1]);

  if (match[2] === 'falls asleep') {
    return {
      type: 'fallsAsleep',
      time,
    };
  } else if (match[2] === 'wakes up') {
    return {
      type: 'wakesUp',
      time,
    };
  } else {
    throw new Error(`Unrecognized record body: ${match[2]}`);
  }
};
