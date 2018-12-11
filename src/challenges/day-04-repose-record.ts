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

const REGEX_GENERIC = /\[[0-9]{4}-{0-9}{2}\] (.*)/;
export const parseRecord = (input: string): GuardRecord => {};
