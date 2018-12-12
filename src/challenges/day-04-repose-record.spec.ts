import moment from 'moment';
import { parseRecord } from './day-04-repose-record';

describe('parseRecord', () => {
  it('parses a fallsAsleep record', () => {
    expect(parseRecord('[1518-11-01 00:05] falls asleep')).toEqual({
      type: 'fallsAsleep',
      time: moment('1518-11-01 00:05'),
    });
  });
  it('parses a wakesUp record', () => {
    expect(parseRecord('[1518-11-01 00:05] wakes up')).toEqual({
      type: 'wakesUp',
      time: moment('1518-11-01 00:05'),
    });
  });
  it('parses a begins shift record', () => {
    expect(parseRecord('[1518-11-01 23:58] Guard #99 begins shift')).toEqual({
      type: 'beginsShift',
      guardId: 99,
      time: moment('1518-11-01 23:58'),
    });
  });
});
