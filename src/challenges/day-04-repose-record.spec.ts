import moment from 'moment';
import lodash from 'lodash';
import { parseLines, readLines } from '../utils/readLines';
import {
  parseRecord,
  getAsleepGuard,
  getAsleepGuardV2,
} from './day-04-repose-record';

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

describe('Part One', () => {
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
  it('handles records out of order', () => {
    const output = getAsleepGuard(lodash.shuffle(SAMPLE_DATA));
    expect(output.sleepPrediction).toEqual({
      guardId: 10,
      minute: 24,
    });
  });
  it('answer', () => {
    const data = readLines('./day-04-data.txt', __dirname).map(parseRecord);
    const result = getAsleepGuard(data);
    expect(result.sleepPrediction).toMatchInlineSnapshot(`
Object {
  "guardId": 3491,
  "minute": 42,
}
`);
    // the actual test output
    expect(
      result.sleepPrediction.guardId * result.sleepPrediction.minute
    ).toMatchInlineSnapshot(`146622`);
  });
});

describe('Part Two', () => {
  it('finds a predictably asleep guard', () => {
    const output = getAsleepGuardV2(SAMPLE_DATA);
    expect(output.sleepPrediction).toEqual({
      guardId: 99,
      minute: 45,
    });
  });
  it('answer', () => {
    const data = readLines('./day-04-data.txt', __dirname).map(parseRecord);
    const result = getAsleepGuardV2(data);
    expect(result.sleepPrediction).toMatchInlineSnapshot(`
Object {
  "guardId": 1327,
  "minute": 24,
}
`);
    // the actual test output
    expect(
      result.sleepPrediction.guardId * result.sleepPrediction.minute
    ).toMatchInlineSnapshot(`31848`);
  });
});
