export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Claim extends Rect {
  id: number;
}

const right = (rect: Rect) => rect.x + rect.width;
const bottom = (rect: Rect) => rect.y + rect.height;

const REGEX = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/;
export const parseClaim = (input: string): Claim => {
  const matches = input.match(REGEX);
  if (!matches) {
    throw new Error(`Can't parse claim string: "${input}"`);
  }
  return {
    id: parseInt(matches[1], 10),
    x: parseInt(matches[2], 10),
    y: parseInt(matches[3], 10),
    width: parseInt(matches[4], 10),
    height: parseInt(matches[5], 10),
  };
};

export const getOverlapArea = (a: Claim, b: Claim): Rect | null => {
  if (a.x >= right(b) || right(a) <= b.x) {
    // no overlap on the X axis
    return null;
  } else if (a.y >= bottom(b) || bottom(a) <= b.y) {
    // no overlap on the Y axis
    return null;
  }

  const x = Math.max(a.x, b.x);
  const overlayRight = Math.min(right(a), right(b));
  const y = Math.max(a.y, b.y);
  const overlayBottom = Math.min(bottom(a), bottom(b));

  return {
    x,
    y,
    width: overlayRight - x,
    height: overlayBottom - y,
  };
};

const hashCoordinate = (x: number, y: number) => `${x},${y}`;
export const calculateTotalOverlap = (claims: Claim[]) => {
  const overlapSet = new Set<string>();
  const otherClaims = [];
  for (const claim of claims) {
    for (const otherClaim of otherClaims) {
      const overlapArea = getOverlapArea(claim, otherClaim);
      if (overlapArea) {
        // calculate every point in the overlapped rectangle
        // and add it to the overlapSet
        for (let x = overlapArea.x; x < right(overlapArea); x++) {
          for (let y = overlapArea.y; y < bottom(overlapArea); y++) {
            overlapSet.add(hashCoordinate(x, y));
          }
        }
      }
    }
    otherClaims.push(claim);
  }
  return overlapSet.size;
};
