import { useMemo } from 'react';
import cx from 'classnames';
import { RewardMask } from '../RewardMask/RewardMask.tsx';
import type { Reward } from '@/services/types.ts';
import { formatNumberWithCommas } from '@/utils/format.ts';
import styles from './reward.module.scss';
import { RewardButtonMask } from '../RewardButtonMask/RewardButtonMask.tsx';

type Props = {
  disabled?: boolean;
  claimed?: boolean;
  reward: Reward;
};

const rewardAmounts = {
  3: 50000,
  7: 1250000,
  10: 2500000,
  14: 4000000,
  17: 5750000,
  21: 7500000,
  30: 10000000,
};

export function ClaimReward({ disabled, claimed, reward }: Props) {

  const buttonText = useMemo(() => {
    if (claimed) return 'claimed';

    return 'claim';
  }, [claimed]);

  const { day } = reward;
  const amount = rewardAmounts[day as keyof typeof rewardAmounts] || 0;

  return (
    <RewardMask
      className={styles.reward}
      rootClassName={cx({
        [styles.rewardDisabled]: disabled,
        [styles.rewardClaimed]: claimed,
      })}
    >
      <p
        className={cx(styles.day, {
          [styles.dayClaimed]: claimed,
        })}
      >
        DAY {day}
      </p>
      <p>+${formatNumberWithCommas(amount)}</p>
      <RewardButtonMask buttonText={buttonText} claimed={claimed} />
    </RewardMask>
  );
}
