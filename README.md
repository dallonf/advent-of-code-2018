# Advent of Code 2018

https://adventofcode.com/2018

## JavaScript / TypeScript

### Instructions to run

```
npm install
npm run test:all
```

This year's code is structured as a Jest test suite.

### Retrospective

I didn't have a lot of time this year, so I only got as far as Day 11. I wasn't even planning on participating, but I knew a couple of people that were and I couldn't resist! But then those people fell off after Day 5 or so.

Notable days:

- I expected my solution to [Day 6: Chronal Coordinates](https://adventofcode.com/2018/day/6) to be much more inefficient. At first I thought I would have to pull in D3 to use some of its Voronoi math, but the Manhattan distance requirement meant I had to write it myself. Apparently, Voronoi diagrams are a lot less complicated than I thought! (It also was fun to recognize the problem as a Voronoi diagram even though that name was never mentioned in the problem as written).
- [Day 7: The Sum of Its Parts](https://adventofcode.com/2018/day/7) deals with a problem space (tasks and dependencies) that's very interesting to me, as somebody who's always looking to improve organizational process.
- [Day 9: Marble Mania](https://adventofcode.com/2018/day/9) forced me to use a true linked list for possibly the first time in my career, heh.
- [Day 10: The Stars Align](https://adventofcode.com/2018/day/10) was very interesting to convert into my TDD-style approach, since it wasn't obvious when I should _stop_ running the program and I had to think about how to detect the state where a message was visible.
- I actually needed a hint on [Day 11: Chronal Charge](https://adventofcode.com/2018/day/11) to get it running in a reasonable amount of time. Looking at Reddit led me to the concept of a [Summed-area table](https://en.wikipedia.org/wiki/Summed-area_table), which I didn't even know about! Although even that information was hard to find; most people seemed to be content with a brute force solution that took minutes to execute.

## Python

I picked up this challenge again as part of a personal goal to become more familiar with Python. I only did a couple more days' worth of challenges, but it gave me a good headstart to being able to read and think in Python more naturally.

### Instructions to run
(using [Pipenv](https://docs.pipenv.org))

```
pipenv install
npm run py:test
```

I used a package.json script to kick off the tests because I wasn't sure of good Python test runners.

### Retrospective

First, I ported my TypeScript solution to [Day 11: Chronal Charge](https://adventofcode.com/2018/day/11) into its Python equivalent. Curiously, this is _much_ slower (almost 6x) than its JavaScript counterpart. I tried to debug and profile it a bit, but didn't come up with any conclusive hypotheses as to exactly what was performing worse. Might have to dig into it more with someone more experienced.

I actually needed to look up a solution to [Day 13: Mine Cart Madness](https://adventofcode.com/2018/day/11) Part Two; my solution succeeded on all sample inputs, but the challenge site rejected its answer for Part Two. I looked up someone else's solution (also in Python!) and found my mistake - I was still simulating the movements of carts even after they had collided and been removed in a tick.