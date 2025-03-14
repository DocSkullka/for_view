import { useCallback, useState } from 'react';
import cx from 'classnames';
import { Activity } from '@/pages/Referrals/components/Activity/Activity.tsx';
import { Friendslist } from '@/pages/Referrals/components/Friendslist/Friendslist.tsx';
import { Leaders } from './components/Leaders/Leaders';
import { useUserContext } from '@/services/contexts/user/context.ts';
import { shareURL, retrieveLaunchParams } from '@telegram-apps/sdk';
import styles from './referrals.module.scss';
import { ButtonMask } from '@/components/ButtonMask/ButtonMask';

const TABS = {
  Activity: 'activity',
  Friends: 'friends',
  Leaders: 'leaders',
};

export function Referrals() {
  const [activeTab, setActiveTab] = useState(TABS.Activity);
  const { user } = useUserContext();
  const [highlightedElement] = useState<string | null>(null);

  const handleInviteFriendsClick = useCallback(async () => {
    if (user) {

      const {
        invites: { max, amount },
      } = user;

      if (amount === max) return;

      const { initDataRaw } = retrieveLaunchParams();

      const res = await fetch(`${import.meta.env.VITE_API_URL}/ipoon/referrals/invite`, {
        headers: {
          Authorization: initDataRaw || window.location.hash,
        },
        method: 'GET',
      });

      const data = (await res.json()) as { invite: string };

      shareURL(
        `https://t.me/studio_test_demo_bot/studio_test/?startapp=${data.invite}`,
        'Look! Join IPOON via invite link!'
      );
    }
  }, [user]);

  if (!user) return null;

  const {
    invites: { max, amount },
  } = user;


  return (
    <main className={styles.referrals}>
      <div className={styles.content}>
        <p className={styles.title}>STATS</p>
        <div className={styles.tabs}>
          <button
            type='button'
            className={cx(styles.tab, { [styles.tabActive]: activeTab === TABS.Activity })}
            onClick={() => setActiveTab(TABS.Activity)}
          >
            Activity
          </button>
          <button
            type='button'
            className={cx(styles.tab, { [styles.tabActive]: activeTab === TABS.Friends })}
            onClick={() => setActiveTab(TABS.Friends)}
          >
            Friendslist
          </button>
          <button
            type='button'
            className={cx(styles.tab, { [styles.tabActive]: activeTab === TABS.Leaders })}
            onClick={() => setActiveTab(TABS.Leaders)}
          >
            Leaders
          </button>
        </div>
      </div>
      <div className={styles.main}>
        {activeTab === TABS.Activity && <Activity highlightedElement={highlightedElement} />}
        {activeTab === TABS.Friends && <Friendslist />}
        {activeTab === TABS.Leaders && <Leaders />}
      </div>
      <ButtonMask friendsCount={`${amount}/${max}`} onClick={handleInviteFriendsClick} />
    </main>
  );
}
