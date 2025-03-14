import cx from 'classnames';
import { ClaimItemMask } from '../ClaimItemMask/ClaimItemMask.tsx';
import type { Reward } from '@/services/types.ts';
import styles from './claim-item.module.scss';
import { formatNumberWithCommas } from '@/utils/format.ts';

type Props = {
  reward: Reward;
  disabled: boolean;
};

export function ClaimItem({ reward: { day, amount }, disabled }: Props) {
  return (
    <ClaimItemMask className={styles.item} rootClassName={cx({ [styles.itemDisabled]: disabled })}>
      <p className={styles.day}>Day {day}</p>
      <p className={styles.amount}>+${formatNumberWithCommas(amount || 0)}</p>
    </ClaimItemMask>
  );
}
