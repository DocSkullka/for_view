import TronNetworkIcon from '@/assets/tron.svg?react';
import TonNetworkIcon from '@/assets/ton.svg?react';
import TronTokenIcon from '@/assets/tokens/tron.svg?react';
import BnbTokenIcon from '@/assets/tokens/bnb.svg?react';
import EthTokenIcon from '@/assets/tokens/ethereum.svg?react';
import BitcoinTokenIcon from '@/assets/tokens/bitcoin.svg?react';
import UsdtTokenIcon from '@/assets/tokens/usdt.svg?react';
import SolanaTokenIcon from '@/assets/tokens/solana.svg?react';
import TonTokenIcon from '@/assets/tokens/ton.svg?react';

export const getNetworkIcon = (name) => {
  const obj = {
    SOLANA: SolanaTokenIcon,
    TRON: TronNetworkIcon,
    TON: TonNetworkIcon,
    BSC: BnbTokenIcon,
    ETH: EthTokenIcon,
  };

  return obj?.[name?.toUpperCase()];
};

export const getTokenIcon = (name) => {
  const obj = {
    SOLANA: SolanaTokenIcon,
    TRON: TronTokenIcon,
    BNB: BnbTokenIcon,
    USDT: UsdtTokenIcon,
    ETH: EthTokenIcon,
    TON: TonTokenIcon,
    BITCOIN: BitcoinTokenIcon,
  };

  return obj?.[name];
};
