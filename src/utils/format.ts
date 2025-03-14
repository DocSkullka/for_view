export function formatNumberWithCommas(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatNumber(value: number): string {
  if (value === 0) return '0';

  const K = 1000;
  const M = 1000000;
  const B = 1000000000;

  let formattedValue: string;

  if (value >= B) {
    const billions = value / B;
    formattedValue = billions.toFixed(3).replace('.', ',') + ' B';
  } else if (value >= M) {
    const millions = value / M;
    formattedValue = millions.toFixed(3).replace('.', ',') + ' M';
  } else if (value >= K) {
    const thousands = value / K;
    formattedValue = thousands.toFixed(3).replace('.', ',') + ' K';
  } else {
    formattedValue = value.toFixed(3).replace('.', ',');
  }

  return formattedValue;
}

export const shortWallet = (
  wallet: string,
  startLength: number,
  endLength: number,
  customEmptyText?: string
) => {
  if (!wallet) {
    return customEmptyText || '--';
  }
  return `${String(wallet || '')?.slice(0, startLength || 6)}...${String(wallet || '')?.slice(
    endLength || -4
  )}`;
};
