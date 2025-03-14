import { getNetworkIcon } from '@/components/Icons/Icons';
import {
  BSC_NETWORK,
  ETH_NETWORK,
  SOLANA_NETWORK,
  TON_NETWORK,
  TRON_NETWORK,
} from '@/constants/coins';

export const networks = [
  { id: 0, networkId: SOLANA_NETWORK, title: 'SOLANA', Icon: getNetworkIcon('SOLANA') },
  { id: 1, networkId: TON_NETWORK, title: 'TON', Icon: getNetworkIcon('TON') },
  { id: 2, networkId: TRON_NETWORK, title: 'TRON (TRC20)', Icon: getNetworkIcon('TRON') },
  { id: 3, networkId: BSC_NETWORK, title: 'BNB SMART CHAIN (BEP 20)', Icon: getNetworkIcon('BSC') },
  { id: 4, networkId: ETH_NETWORK, title: 'ETHEREUM (ERC20)', Icon: getNetworkIcon('ETH') },
];
