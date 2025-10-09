/**
 * Parses an array or string into a string format
 * @param value - The value to parse (string or array of strings)
 * @param separator - The separator to use when joining arrays (default: ', ')
 * @returns A string representation of the value
 */
export function parseArrayToString(
  value: string | string[] | undefined | null,
  separator: string = ', '
): string {
  if (!value) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.join(separator);
  }

  return value;
}
