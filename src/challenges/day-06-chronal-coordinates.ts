import * as lodash from 'lodash';

export interface Point {
  x: number;
  y: number;
}

const REGEX = /^([0-9]+), ([0-9]+)$/;
export const parseInput = (input: string) => {
  const match = input.match(REGEX);
  if (!match) throw new Error(`Can't parse input string "${input}"`);
  return {
    x: parseInt(match[1], 10),
    y: parseInt(match[2], 10),
  };
};

export const getLargestArea = (input: Point[]): number => {
  const minX = lodash.min(input.map(i => i.x))!;
  const minY = lodash.min(input.map(i => i.y))!;
  const maxX = lodash.max(input.map(i => i.x))!;
  const maxY = lodash.max(input.map(i => i.y))!;

  const pointsWithIds = input.map((point, id) => ({ point, id }));
  const areas = new Map<number, number>();
  const infiniteAreasByPointId = new Set<number>();

  // loop through every cell in the interior grid
  lodash.range(minY - 1, maxY + 2).map(y =>
    lodash.range(minX - 1, maxX + 2).map(x => {
      const pointDistances = pointsWithIds.map(a => ({
        ...a,
        distance: Math.abs(x - a.point.x) + Math.abs(y - a.point.y),
      }));

      const closestPoint = lodash.minBy(pointDistances, a => a.distance)!;

      // ensure that there isn't a tie for the closest point
      if (
        pointDistances.some(
          a => a.id !== closestPoint.id && a.distance === closestPoint.distance
        )
      ) {
        return;
      }

      areas.set(closestPoint.id, (areas.get(closestPoint.id) || 0) + 1);

      // if a cell is on the edge, its area is infinite
      if (x === minX || x === maxX || y === minY || y === maxY) {
        infiniteAreasByPointId.add(closestPoint.id);
      }
    })
  );

  // find largest area that isn't infinite
  return lodash.max(
    pointsWithIds
      .filter(x => !infiniteAreasByPointId.has(x.id))
      .map(x => areas.get(x.id))
  )!;
};

export const getClusterRegion = (input: Point[]) => {};
