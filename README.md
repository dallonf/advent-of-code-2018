# Advent of Code 2018

https://adventofcode.com/2018

## Instructions to run

```
npm install
npm run test:all
```

This year's code is structured as a Jest test suite.

## Retrospective

I didn't have a lot of time this year, so I only got as far as Day 11. I wasn't even planning on participating, but I knew a couple of people that were and I couldn't resist! But then those people fell off after Day 5 or so.

Notable days:

- I expected my solution to [Day 6: Chronal Coordinates](https://adventofcode.com/2018/day/6) to be much more inefficient. At first I thought I would have to pull in D3 to use some of its Voronoi math, but the Manhattan distance requirement meant I had to write it myself. Apparently, Voronoi diagrams are a lot less complicated than I thought! (It also was fun to recognize the problem as a Voronoi diagram even though that name was never mentioned in the problem as written).
- [Day 7: The Sum of Its Parts](https://adventofcode.com/2018/day/7) deals with a problem space (tasks and dependencies) that's very interesting to me, as somebody who's always looking to improve organizational process.
- [Day 9: Marble Mania](https://adventofcode.com/2018/day/9) forced me to use a true linked list for possibly the first time in my career, heh.
- [Day 10: The Stars Align](https://adventofcode.com/2018/day/10) was very interesting to convert into my TDD-style approach, since it wasn't obvious when I should _stop_ running the program and I had to think about how to detect the state where a message was visible.
- I actually needed a hint on [Day 11: Chronal Charge](https://adventofcode.com/2018/day/11) to get it running in a reasonable amount of time. Looking at Reddit led me to the concept of a [Summed-area table](https://en.wikipedia.org/wiki/Summed-area_table), which I didn't even know about! Although even that information was hard to find; most people seemed to be content with a brute force solution that took minutes to execute.
