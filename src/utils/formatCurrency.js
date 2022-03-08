export function formatCurrency(number, fraction) {
  let formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction,
  }).format(number);
  return formattedNumber;
}
