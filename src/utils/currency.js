import big from 'big.js';

export const MICRO = 1000000;

export function microfy(amount) {
  return big(amount).mul(MICRO);
}

export function demicrofy(amount, decimals = 6) {
  return big(amount).div(Math.pow(10, decimals));
}
