export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function plural(n: number, arr: string[]): string {
  if (n % 10 === 1 && n % 100 !== 11) {
    return arr[0];
  }
  if (
    n === (n | 0) &&
    n % 10 >= 2 &&
    n % 10 <= 4 &&
    (n % 100 < 12 || n % 100 > 14)
  ) {
    return arr[1];
  }
  return arr[2];
}
