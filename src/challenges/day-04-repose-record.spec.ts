import moment from 'moment';
import { parseLines } from '../utils/readLines';
import { parseRecord, getAsleepGuard } from './day-04-repose-record';

const SAMPLE_DATA = parseLines(`
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up
`).map(parseRecord);

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

describe('Part 1', () => {
  it('totals guard sleep time', () => {
    const output = getAsleepGuard(SAMPLE_DATA);
    expect(output.guardTotalSleepTime).toEqual({
      '10': 50,
      '99': 30,
    });
  });
  it('finds a guard likely to be asleep', () => {
    const output = getAsleepGuard(SAMPLE_DATA);
    expect(output.sleepPrediction).toEqual({
      guardId: 10,
      minute: 24,
    });
  });
});
