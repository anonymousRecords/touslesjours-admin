export function makeTable<T>(col: number, row: number, { initialValue }: { initialValue: T }) {
  return Array.from({ length: col }, () => Array.from({ length: row }, () => initialValue));
}
