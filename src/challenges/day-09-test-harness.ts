import { performance, PerformanceObserver, PerformanceEntry } from 'perf_hooks';
import { getHighScore } from './day-09-marble-mania';

const observer = new PerformanceObserver((list, observer) => {
  const normalMarbles = list.getEntriesByName('normal_marble', 'measure');
  const twentyThirdMarbles = list.getEntriesByName(
    'twentythird_marble',
    'measure'
  );
  const allMarbles = list.getEntriesByName('handle_marble', 'measure');
  const avgTime = (entries: PerformanceEntry[]) =>
    entries.reduce((a, b) => a + b.duration, 0) / entries.length;

  console.log(`average time for normal marble: ${avgTime(normalMarbles)}ms`);
  console.log(
    `average time for twenty-third marble: ${avgTime(twentyThirdMarbles)}ms`
  );
  console.log(`average time for any marble: ${avgTime(allMarbles)}ms`);
  console.log(`total time: ${list.getEntriesByName('overall')[0].duration}`);
  observer.disconnect();
});
observer.observe({
  entryTypes: ['mark', 'measure'],
  buffered: true,
});

const result = getHighScore({
  players: 493,
  lastMarble: 71863*10,
});
console.log(result);
