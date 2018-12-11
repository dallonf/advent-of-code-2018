import moment from 'moment';
import { parseRecord } from './day-04-repose-record';

describe('parseRecord', () => {
  it('parses a fallsAlseep record', () => {
    expect(parseRecord('[1518-11-01 00:05] falls asleep')).toEqual({
      type: 'fallsAsleep',
      time: moment('1518-11-01 00:05'),
    });
  });
});
