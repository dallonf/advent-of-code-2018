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

export const getOverlapArea = (a: Claim, b: Claim): Rect | null => {
  let overlapWidth = 0,
    overlapHeight = 0;

  if (a.x > right(b) || right(a) < b.x) {
    // no overlap on the X dimension
    return null;
  } else if (a.y > bottom(b) || bottom(a) < b.y) {
    // no overlap on the Y dimension
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

/*

a---b---a-----b
b---a---b-----b

*/
