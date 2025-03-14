import { useEffect, useMemo } from 'react';
import { useAnimate } from 'framer-motion';
import { useUserContext } from '@/services/contexts/user/context.ts';
import { ReferralsMask } from '../ReferralsMask/ReferralsMask.tsx';
import Point from '@/assets/point.svg?react';
import Speed from '@/assets/speed.svg?react';
import Dots from '@/assets/dots.svg?react'
import styles from './referrals.module.scss';

type Props = {
  className?: string;
  bgClassName?: string;
  showSpeed?: boolean; // Новый пропс для управления видимостью блока .speed
};

export function Referrals({ className, bgClassName, showSpeed = true }: Props) {
  const { activity: friendsActivity } = useUserContext();
  const [scope, animate] = useAnimate();

  const speedPointAngle = useMemo(() => {
    const startDegree = -70;
    const endDegree = 70;
    const tempEnd = endDegree - startDegree;

    return friendsActivity.percantage === 0
      ? -72
      : (tempEnd * friendsActivity.percantage) / 100 - 70;
  }, [friendsActivity]);

  useEffect(() => {
    if (scope.current) {
      animate(scope.current, { rotate: [-100, speedPointAngle] });
    }
  }, [animate, speedPointAngle, scope]);

  return (
    <ReferralsMask className={className} bgClassName={bgClassName}>
      <div className={styles.referrals}>
        <div className={styles.top}>
          <p>{friendsActivity.count > 0 && friendsActivity.percantage !== undefined
          ? ((friendsActivity.percantage / friendsActivity.count) * 100).toFixed(1) + '%'
          : '0%'}</p>
          <p>
            <span>Referrals</span>
            <span>active</span>
          </p>
        </div>
        <div className={styles.bottom}>
          <p>
            <span>
              {friendsActivity.percantage || '0'}/{friendsActivity.count  || '0'}
            </span>
            <span>referrals</span>
          </p>
          <p>farm today</p>
        </div>
        {showSpeed && (
          <div className={styles.speed}>
            <div ref={scope} className={styles.pointContainer}>
              <Point className={styles.point} />
            </div>
            <Dots className={styles.dots} />
            <Speed className={styles.glow} />
            {Array(11)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={styles[`speedPoint${i}`]} />
              ))}
          </div>
        )}
      </div>
    </ReferralsMask>
  );
}
