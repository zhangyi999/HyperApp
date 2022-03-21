/**
 *
 * @param value
 * @param decimals 保留的小数位
 * @returns
 */
export function numberFromString(value: string, decimals = 0): number {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return 0;
  } else {
    return Math.round(num * 10 ** decimals) / 10 ** decimals;
  }
}

