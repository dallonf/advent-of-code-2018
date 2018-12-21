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
