import { Play } from '@/pages/Play/Play.tsx';
// import { Garage } from '@/pages/Garage/Garage';
import { Referrals } from '@/pages/Referrals/Referrals.tsx';
import { Earn } from '@/pages/Earn/Earn.tsx';
import { App } from '@/pages/Play/components/Minigame/Game/App.tsx';
import { Wallet } from '@/pages/Wallet/Wallet.tsx';

import PlayIcon from './assets/play.svg?react';
// import GarageIcon from './assets/garage.svg?react';
import ReferralsIcon from './assets/referrals.svg?react';
import EarnIcon from './assets/earn.svg?react';
import WalletIcon from './assets/wallet.svg?react';
import { WalletCoin } from '@/pages/Wallet/WalletCoin';
import { WalletDeposit } from '@/pages/Wallet/WalletDeposit';
import { WalletWithdraw } from '@/pages/Wallet/WalletWithdraw';

const WALLET_COIN_PATH_WITH_PARAM = 'wallet/:coin_id';
const WALLET_WITHDRAW_PATH_WITH_PARAM = 'wallet/withdraw/:network_id/:coin_id';
const WALLET_DEPOSIT_PATH_WITH_PARAM = 'wallet/deposit/:network_id';
export const WALLET_DEPOSIT_PATH = (networkId) => `wallet/deposit/${networkId}`;
export const WALLET_WITHDRAW_PATH = (networkId, coindId) =>
  `wallet/withdraw/${networkId}/${coindId}`;
export const WALLET_COIN_PATH = (coinId) => `wallet/${coinId}`;

export const navigation_routes = [
  { path: 'play', Component: Play, Icon: PlayIcon },
  // { path: 'garage', Component: Garage, Icon: GarageIcon },
  { path: 'stats', Component: Referrals, Icon: ReferralsIcon },
  { path: 'wallet', Component: Wallet, Icon: WalletIcon },
  { path: 'earn', Component: Earn, Icon: EarnIcon },
] as const;

export const routes = [
  { path: 'game', Component: App },
  { path: WALLET_COIN_PATH_WITH_PARAM, Component: WalletCoin },
  { path: WALLET_DEPOSIT_PATH_WITH_PARAM, Component: WalletDeposit },
  { path: WALLET_WITHDRAW_PATH_WITH_PARAM, Component: WalletWithdraw },
] as const;
