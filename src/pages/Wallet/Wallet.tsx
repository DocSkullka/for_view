import WalletBalance from '../Wallet/components/WalletBalance/WalletBalance.tsx';
import styles from './wallet.module.scss';
import { OperationButtons } from '@/components/OperationButtons/OperationButtons';
import { CurrencyList } from '../Wallet/components/CurrencyList/CurrencyList.tsx';
import Plus from '../../assets/plus.svg?react';
import LowPrice from '../../assets/lowPrice.svg?react';
import DollarCircle from '../../assets/dollarCircle.svg?react';
import Send from '../../assets/send.svg?react';
import { Tab } from '@/components/tab/Tab';
import { ContentWrapperScrollable } from '@/components/ContentWrapperScrollable/ContentWrapperScrollable';
import { useMemo, useState } from 'react';
import { Box } from '@ui';
import { Activity } from './components/Activity/Activity';
import { ComingSoon } from '@/components/comingSoon/ComingSoon';
import { WALLET_DEPOSIT_PATH, WALLET_WITHDRAW_PATH } from '@/navigation/navigation_routes';
import { COINS, TON, TON_NETWORK } from '@/constants/coins';
import { useNavigate } from 'react-router-dom';

const ASSETS_KEY = 'assets';
const NFTS_KEY = 'nfts';
const ACTIVITY_KEY = 'activity';

const NavItems = [
  { id: ASSETS_KEY, title: 'ASSETS' },
  { id: NFTS_KEY, title: 'NFTS' },
  { id: ACTIVITY_KEY, title: 'ACTIVITY' },
];

export function Wallet() {
  const [activeTab, setActiveTab] = useState(() => ASSETS_KEY);
  const navigate = useNavigate();

  const TabComponent:any = useMemo(
    () =>
      ({
        [ASSETS_KEY]: CurrencyList,
        [NFTS_KEY]: ComingSoon,
        [ACTIVITY_KEY]: Activity,
      }?.[activeTab]),
    [activeTab]
  );

  const OPERATION_BUTTONS = useMemo(
    () => [
      {
        label: 'Receive',
        Icon: Plus,
        onClick: () => {
          navigate(WALLET_DEPOSIT_PATH(TON_NETWORK));
        },
      },
      {
        label: 'Send',
        Icon: Send,
        onClick: () => {
          navigate(WALLET_WITHDRAW_PATH(TON_NETWORK, TON.coinId));
        },
      },
      {
        label: 'Buy',
        disable: true,
        Icon: DollarCircle,
        onClick: () => {},
      },
      {
        label: 'Sell',
        disable: true,
        Icon: LowPrice,
        onClick: () => {},
      },
    ],
    []
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.balance}>
        <WalletBalance />
      </div>
      <Box m='32px 0 0 0'>
        <OperationButtons buttons={OPERATION_BUTTONS} />
      </Box>
      <Box m='20px 0 16px 0'>
        <Tab items={NavItems} onChange={setActiveTab} activeTab={activeTab} />
      </Box>
      <ContentWrapperScrollable>
        <TabComponent coins={COINS} />
      </ContentWrapperScrollable>
    </div>
  );
}
