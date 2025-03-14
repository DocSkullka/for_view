import { useCallback, useMemo } from 'react';
import { HttpStatusCode } from 'axios';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { usePopoverContext } from '@/services/contexts/popover/context.ts';
import { POPOVER_TYPES } from '@/services/contexts/popover/constants.ts';
import { useUserContext } from '@/services/contexts/user/context.ts';
import { ClaimItem } from './components/ClaimItem/ClaimItem.tsx';
import styles from './claim.module.scss';
import { User } from '@/services/types.ts';

export function Claim() {
  const { openPopover } = usePopoverContext();
  const { user, setUser } = useUserContext();

  const handleClaimClick = useCallback(async () => {
    document.body.style.background = `none`;
    if (user) {
      const { initDataRaw } = retrieveLaunchParams();

      const { rewards } = user;

      const reward = rewards.find(({ claimed, day }) => !claimed && day === user.streak);

      if (reward) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/ipoon/rewards/submit`, {
          headers: {
            Authorization: initDataRaw || window.location.hash,
          },
          method: 'POST',
          body: JSON.stringify({
            rewardName: reward.name,
          }),
        });

        const updatedRewards = user.rewards.map((item) => {
          if (item.name === reward.name) {
            return { ...reward, claimed: true };
          }

          return item;
        });

        if (res.status === HttpStatusCode.Ok) {
          setUser({
            earnings: { total: user.earnings.total + (reward.amount ?? 0) },
            rewards: updatedRewards,
          } as User);

          openPopover({ type: POPOVER_TYPES.REWARD, reward });
        }
      }
    }
  }, [openPopover, setUser, user]);

  const sortedRewards = useMemo(() => {
    if (user) {
      if (user.rewards) {
        return [...user.rewards].sort((a, b) => (a.day > b.day ? 1 : -1));
      }
    }

    return [];
  }, [user]);

  if (!user) return null;

  return (
    <>
      <div className={styles.content}>
        <p className={styles.title}>Daily progress</p>
        <p className={styles.description}>
          Check in every day and receive a Sega bonus at the end of the period
        </p>
        <div className={styles.claims}>
          {sortedRewards.map((reward, index) => {
            const prevReward = sortedRewards[index - 1];

            return (
              <ClaimItem
                key={reward.name}
                reward={reward}
                disabled={reward.claimed || (prevReward && !prevReward.claimed)}
              />
            );
          })}
        </div>
      </div>

      <button className={styles.action} onClick={handleClaimClick}>
      <svg width="345" height="62" viewBox="0 0 345 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 17C0 8.16344 7.16344 1 16 1H329C337.837 1 345 8.16344 345 17V45C345 53.8366 337.837 61 329 61H16C7.16345 61 0 53.8366 0 45V17Z" fill="#101010"/>
        <path d="M0 17C0 7.61116 7.61116 0 17 0H328C337.389 0 345 7.61116 345 17C345 8.71573 337.837 2 329 2H16C7.16344 2 0 8.71573 0 17ZM345 45C345 54.3888 337.389 62 328 62H17C7.61116 62 0 54.3888 0 45C0 53.2843 7.16344 60 16 60H329C337.837 60 345 53.2843 345 45ZM0 61V1V61ZM345 1V61V1Z" fill="white"/>
        <path d="M145.68 39.788C144.688 39.788 143.792 39.636 142.992 39.332C142.192 39.012 141.504 38.508 140.928 37.82C140.368 37.132 139.928 36.244 139.608 35.156C139.304 34.068 139.152 32.756 139.152 31.22C139.152 29.668 139.304 28.34 139.608 27.236C139.928 26.132 140.368 25.228 140.928 24.524C141.504 23.82 142.192 23.3 142.992 22.964C143.792 22.628 144.688 22.46 145.68 22.46C146.416 22.46 147.072 22.54 147.648 22.7C148.224 22.86 148.736 23.1 149.184 23.42C149.632 23.724 150.024 24.116 150.36 24.596C150.696 25.076 151 25.636 151.272 26.276L148.728 27.62C148.472 26.708 148.112 26.052 147.648 25.652C147.184 25.252 146.528 25.052 145.68 25.052C144.624 25.052 143.8 25.396 143.208 26.084C142.632 26.772 142.344 27.756 142.344 29.036V33.212C142.344 34.492 142.632 35.476 143.208 36.164C143.8 36.852 144.624 37.196 145.68 37.196C146.528 37.196 147.2 36.98 147.696 36.548C148.208 36.116 148.608 35.42 148.896 34.46L151.344 35.9C151.072 36.524 150.76 37.076 150.408 37.556C150.056 38.036 149.648 38.444 149.184 38.78C148.736 39.1 148.224 39.348 147.648 39.524C147.072 39.7 146.416 39.788 145.68 39.788ZM154.202 39.5V22.748H157.202V36.884H163.082V39.5H154.202ZM175.596 39.5L174.42 35.132H169.02L167.844 39.5H164.964L169.86 22.748H173.652L178.548 39.5H175.596ZM172.404 28.124L171.876 25.46H171.54L171.012 28.124L169.74 32.708H173.7L172.404 28.124ZM180.671 39.5V37.124H182.663V25.124H180.671V22.748H187.655V25.124H185.663V37.124H187.655V39.5H180.671ZM202.384 29.948L202.576 27.116H202.24L201.136 29.852L198.112 36.308L195.112 29.852L194.008 27.14H193.672L193.864 29.948V39.5H191.032V22.748H194.32L196.816 28.196L198.04 31.628H198.256L199.48 28.196L201.928 22.748H205.216V39.5H202.384V29.948Z" fill="white"/>
      </svg>
      </button>
    </>
  );
}
