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
