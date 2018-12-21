export const getPowerLevel = (
  x: number,
  y: number,
  serialNumber: number
): number => {
  const rackId = x + 10;
  let result = rackId * y;
  result += serialNumber;
  result *= rackId;
  const hundredsPlace =
    Math.floor(result / 100) - Math.floor(result / 1000) * 10;
  return hundredsPlace - 5;
};
