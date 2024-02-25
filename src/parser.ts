export function parseNumber(data: string | null): number | null {
  if (!data || data === "") {
    return null;
  }
  const result = Number(data);
  return isNaN(result) ? null : result;
}
