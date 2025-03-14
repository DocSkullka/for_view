import Solana from '../assets/tokens/solana.svg?react';
import Bnb from '../assets/tokens/bnb.svg?react';
import Usdt from '../assets/tokens/usdt.svg?react';
import Eth from '../assets/tokens/ethereum.svg?react';
import Tron from '../assets/tokens/tron.svg?react';
import Ton from '../assets/tokens/ton.svg?react';

export const TON_NETWORK = 'ton';
export const TRON_NETWORK = 'tron';
export const SOLANA_NETWORK = 'solana';
export const ETH_NETWORK = 'ethereum';
export const BSC_NETWORK = 'bsc';

export const TON = {
  label: 'TON',
  currencyName: 'TON',
  subLabel: '0,522 TON',
  balance: '$ 312,32',
  difference: '0,12%',
  isPositive: true,
  network: 'TON',
  noViewNetwork: true,

  coinId: TON_NETWORK,
  Icon: Ton,
};

export const SOLANA = {
  label: 'Solana',
  currencyName: 'SOL',
  subLabel: '0,431 SOL',
  balance: '$ 42,21',
  difference: '0,52%',
  isPositive: false,
  coinId: 'solana',
  noViewNetwork: true,

  network: SOLANA_NETWORK,
  Icon: Solana,
};

export const BNB = {
  label: 'BNB SMART CHAIN (BEP 20)',
  currencyName: 'BNB',
  subLabel: '943,68 BNB',
  balance: '$ 542,44',
  difference: '0,01%',
  isPositive: false,
  coinId: 'bnb',
  network: BSC_NETWORK,
  noViewNetwork: true,

  Icon: Bnb,
};

export const USDT = {
  label: 'USDT',
  currencyName: 'USDT',
  subLabel: '943,68 USDT',
  balance: '$ 542,44',
  difference: '0,01%',
  isPositive: false,
  coinId: 'USDTTon',
  network: TON_NETWORK,
  Icon: Usdt,
};
export const USDTSolana = {
  label: 'USDT',
  currencyName: 'USDT',
  subLabel: '3,68 USDT',
  balance: '$ 542,44',
  difference: '0,01%',
  isPositive: false,
  coinId: 'USDTSolana',
  network: SOLANA_NETWORK,
  Icon: Usdt,
};

export const ETH = {
  label: 'ETHEREUM (ERC20)',
  currencyName: 'ETH',
  subLabel: '943,68 ETH',
  balance: '$ 542,44',
  difference: '0,01%',
  isPositive: false,
  coinId: 'eth',
  noViewNetwork: true,
  network: ETH_NETWORK,
  Icon: Eth,
};

export const TRON = {
  label: 'TRON (TRC20)',
  currencyName: 'Tron',
  subLabel: '943,68 Tron',
  balance: '$ 542,44',
  difference: '0,01%',
  isPositive: false,
  coinId: 'tron',
  noViewNetwork: true,
  network: TRON_NETWORK,
  Icon: Tron,
};

export const COINS = [SOLANA, TRON, TON, ETH, BNB, USDTSolana, USDT] as const;
