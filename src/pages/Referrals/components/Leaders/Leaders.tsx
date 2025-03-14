import { Fragment, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useUserContext } from '@/services/contexts/user/context.ts';
import type { User } from '@/services/types.ts';
import { Leader } from './components/Leader/Leader.tsx';
import styles from './leaders.module.scss';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

const POSITION = {
  Up: 'Up',
  Down: 'Down',
};

export function Leaders() {
  const [showOwn, setShowOwn] = useState(false);
  const [position, setPosition] = useState(POSITION.Down);
  const [leaders, setLeaders] = useState<User[]>([]);
  const { user, auth } = useUserContext();



  const fetchLeaderboard = useCallback(async () => {
    const { initDataRaw } = retrieveLaunchParams();

    await auth();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/ipoon/leaderboard`, {
      headers: {
        Authorization: initDataRaw || window.location.hash,
      },
      method: 'GET',
    });

    const data = (await res.json()) as { results: User[] };

    setLeaders(data.results);
  }, [auth]);

  useEffect(() => {
    if (leaders.length === 0) void fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    if (user) {
      const leaders = document.querySelectorAll('#leader');

      if (leaders.length) {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const targetSpot = entry.target.getAttribute('data-spot');

              if (!targetSpot) return;

              if (+targetSpot === +user.spot) {
                if (entry.isIntersecting) {
                  setShowOwn(false);
                } else {
                  if (entry.boundingClientRect.y > 200) setPosition(POSITION.Down);
                  else setPosition(POSITION.Up);

                  setShowOwn(true);
                }
              }
            }
          },
          {
            root: document.querySelector('#leaders-list'),
            threshold: 0.5,
          }
        );

        leaders.forEach((userCard) => observer.observe(userCard));

        return () => {
          leaders.forEach((userCard) => observer.unobserve(userCard));
        };
      }
    }
  }, [leaders, user]);

  if (!user) return null;

  return (
    <main className={styles.leaders}>
      <div className={styles.main}>
        <div className={styles.leadersList} id='leaders-list'>
          {leaders.map((leader) => (
            <Fragment key={leader.spot}>
              <Leader spot={leader.spot} user={leader} />
            </Fragment>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showOwn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.9, opacity: 0, transitionEnd: { display: 'none' } }}
            transition={{
              type: 'spring',
              duration: 0.4,
            }}
            className={`${cx(styles.own, styles[`own${position}`])}`}
          >
            <Leader user={user} spot={user.spot} own />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
