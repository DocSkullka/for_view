import { useUserContext } from '@/services/contexts/user/context.ts';
import { formatNumberWithCommas } from '@/utils/format.ts';
import { Referrals } from '@/pages/Play/components/Referrals/Referrals.tsx';
import { HalfMask } from './components/HalfMask/HalfMask.tsx';
import { FullMask } from './components/FullMask/FullMask.tsx';
import styles from './activity.module.scss';

interface ActivityProps {
  highlightedElement: string | null;
}

export function Activity({ highlightedElement }: ActivityProps) {
  const { user } = useUserContext();

  if (!user) return null;

  const {
    earnings: { total, referrals },
  } = user;

  return (
    <div className={styles.activity}>
      <Referrals className={`${styles.refs} ${highlightedElement === 'refs' ? styles.highlighted : ''}`} bgClassName={styles.refsBg} showSpeed={true} />
      <div className={styles.levels}>
        <HalfMask className={`${styles.levelsItem} ${highlightedElement === 'refsCome' ? styles.highlighted : ''}`}
          highlighted={highlightedElement === 'refsCome'}
        >
          <p className={styles.levelsItemCount}>{formatNumberWithCommas(referrals || 0)}</p>
          <div>
            <p>tap per minute</p>
          </div>
        </HalfMask>
        <HalfMask className={`${styles.levelsItem} ${highlightedElement === 'perHour' ? styles.highlighted : ''}`}
          highlighted={highlightedElement === 'perHour'}
        >
          <p className={styles.levelsItemCount}>46,800</p>
          <div>
            <p>earning for hour</p>
          </div>
        </HalfMask>
      </div>
      <FullMask className={`${styles.total} ${highlightedElement === 'total' ? styles.highlighted : ''}`}
      highlighted={highlightedElement === 'total'}
      >
        <p>+{formatNumberWithCommas(total || 0)}</p>
        <p>total earnings</p>
      </FullMask>
    </div>
  );
}
