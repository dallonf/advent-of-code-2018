import * as lodash from 'lodash';

export interface Vector2 {
  x: number;
  y: number;
}

export interface Point {
  position: Vector2;
  velocity: Vector2;
}

const REGEX = /^position=<\s*(-?[0-9]+),\s*(-?[0-9]+)> velocity=<\s*(-?[0-9]+),\s*(-?[0-9]+)>$/;
export const parseInput = (input: string): Point => {
  const match = input.match(REGEX);
  if (!match) throw new Error(`Can't parse input: ${input}`);

  return {
    position: {
      x: parseInt(match[1], 10),
      y: parseInt(match[2], 10),
    },
    velocity: {
      x: parseInt(match[3], 10),
      y: parseInt(match[4], 10),
    },
  };
};

function getBounds(positions: Vector2[]) {
  let minX = Math.min(...positions.map(a => a.x));
  let maxX = Math.max(...positions.map(a => a.x));
  let minY = Math.min(...positions.map(a => a.y));
  let maxY = Math.max(...positions.map(a => a.y));
  return { minY, maxY, minX, maxX };
}

export const visualizePoints = (input: Point[]): string[] => {
  if (!input.length) return [];
  const positions = input.map(x => x.position);
  let { minY, maxY, minX, maxX } = getBounds(positions);
  const positionKey = (point: Vector2) => `${point.x},${point.y}`;
  const pointsOccupied = new Set<string>();
  for (const position of positions) {
    pointsOccupied.add(positionKey(position));
  }

  return lodash.range(minY, maxY + 1).map(y => {
    return lodash
      .range(minX, maxX + 1)
      .map(x => {
        return pointsOccupied.has(positionKey({ x, y })) ? '#' : '.';
      })
      .join('');
  });
};

export const simulateSecond = (input: Point[]): Point[] =>
  input.map(point => ({
    ...point,
    position: {
      x: point.position.x + point.velocity.x,
      y: point.position.y + point.velocity.y,
    },
  }));

export const getMessage = (
  input: Point[]
): { result: Point[]; seconds: number } => {
  // heuristic: the assumption is that the message will be the smallest,
  // most compact state

  const getSize = (input: Point[]) => {
    const { minY, maxY, minX, maxX } = getBounds(input.map(a => a.position));
    return (maxX - minX) * (maxY - minY);
  };

  let currentState = input;
  let seconds = 0;
  let lastSize = getSize(currentState);
  for (let index = 0; index < 100000; index++) {
    const lastState = currentState;
    currentState = simulateSecond(currentState);
    const newSize = getSize(currentState);
    if (newSize > lastSize) {
      // if size ever increases, the previous state was probably the message
      return { result: lastState, seconds };
    } else {
      lastSize = newSize;
      seconds += 1;
    }
  }

  throw new Error(`Timeout; never found a stable state`);
};
