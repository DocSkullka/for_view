import type { User } from '@/services/types.ts';
import { formatNumberWithCommas } from '@/utils/format.ts';
import { FriendMask } from '../FriendMask/FriendMask.tsx';
import styles from './friend.module.scss';
import { UserMask } from '../../../Leaders/components/UserMask/UserMask.tsx';

type Props = {
  friend: User;
  isLastItem: boolean;
};

export function Friend({ friend, isLastItem }: Props) {
  const {
    totalFriends,
    username,
    earnings: { total },
    imageURL,
    id,
    streak,
  } = friend;

  return (
    <div className={styles.leaderContainer}>
      <UserMask imageURL={imageURL} username={username} />
      <FriendMask className={styles.friend} id='friend' isLastItem={isLastItem} friendId={id}>
        <div className={styles.left}>
          {imageURL ? (
            <img src={imageURL} alt='Person' />
          ) : (
            <div className={styles.person}>{`${username[0] || ''}${username[1] || ''}`}</div>
          )}
          <div className={styles.leftInfo}>
            <p>{username}</p>
            <p>{formatNumberWithCommas(total || 0)}</p>
          </div>
        </div>
        <div className={styles.right}>
          <p>{totalFriends} friends</p>
          <p>{streak} daystreak</p>
        </div>
      </FriendMask>
    </div>
  );
}
