export function sum1(...values: number[]): number {
  return values.reduce((acc, n) => acc + n, 0);
}

export function multiply(...values: number[]): number {
  return values.reduce((acc, n) => acc * n, 1);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
