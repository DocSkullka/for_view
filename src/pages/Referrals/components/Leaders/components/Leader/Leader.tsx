import { useMemo } from 'react';
import cx from 'classnames';
import type { User } from '@/services/types.ts';
import { LeaderMask } from '../LeaderMask/LeaderMask.tsx';
import { OwnMask } from '../OwnMask/OwnMask.tsx';
import { formatNumberWithCommas } from '@/utils/format.ts';
import styles from './leader.module.scss';
import { useUserContext } from '@/services/contexts/user/context.ts';
import { UserMask } from '../UserMask/UserMask.tsx';
import {OwnMaskUser} from '../OwnMaskUser/OwnMaskUser.tsx'

type Props = {
  spot: number;
  own?: boolean;
  user: User;
};

export function Leader({ spot, own, user }: Props) {
  const { user: me } = useUserContext();

  const {
    username,
    earnings: { total },
    isKol,
    imageURL,
    telegramId,
  } = user;

  const Mask = useMemo(() => (own ? OwnMask : LeaderMask), [own]);
  const LeftMask = useMemo(() => (own ? OwnMaskUser : UserMask), [own]);

  const isMe = useMemo(() => me && me.telegramId === telegramId, [telegramId, me]);

  return (
    <div className={styles.leaderContainer}>
      <LeftMask imageURL={imageURL} username={username} />
      <Mask className={styles.leader} id='leader' spot={spot}>
        <div className={styles.leftInfo}>
          <div
            className={cx(styles.name, {
              [styles.nameOwn]: own,
            })}
          >
            {username || '-'}
            {isKol && !own && <div className={styles.kol}>KOL</div>}
            {isMe && !own && <div className={styles.kol}>ME</div>}
          </div>
          <p
            className={cx(styles.amount, {
              [styles.amountOwn]: own,
            })}
          >
            {formatNumberWithCommas(total || 0)}
          </p>
        </div>
        <p
          className={cx(styles.spot, {
            [styles.spotOwn]: own,
          })}
        >
          #{spot}
        </p>
      </Mask>
    </div>
  );
}
