import { usePopoverContext } from '@/services/contexts/popover/context.ts';
import { useUserContext } from '@/services/contexts/user/context.ts';
import styles from './reward.module.scss';
import { Reward } from '@/services/types.ts';
import { formatNumberWithCommas } from '@/utils/format.ts';
import CircleImg from '@/assets/cirlce.png'

type Props = {
  reward?: Reward;
};

export function ClaimedReward({ reward }: Props) {
  const { closePopover } = usePopoverContext();
  const { user } = useUserContext();
  const backgrounds = ['/bg1.png', '/bg2.png'];
  const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  if (!user) return null;

  return (
    <>
      <div className={styles.content}>
        <p className={styles.title}>Congratulations!</p>
        <p className={styles.description}>Your reward is</p>
      </div>

      <div className={styles.reward}>
        <div className={styles.rewardText}>
          <img src={CircleImg} alt="circle" className={styles.rewardImage} />
          ${formatNumberWithCommas(reward?.amount || 0)}
        </div>
      </div>

      <div onClick={() => {
        document.body.style.background = 'none';
        document.body.style.backgroundImage = `url('${randomBackground}')`;
        closePopover();
      }}>
        <svg width="345" height="62" viewBox="0 0 345 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 17C0 8.16344 7.16344 1 16 1H329C337.837 1 345 17V45C345 53.8366 337.837 61 329 61H16C7.16345 61 0 53.8366 0 45V17Z" fill="#101010"/>
          <path d="M0 17C0 7.61116 7.61116 0 17 0H328C337.389 0 345 7.61116 345 17C345 8.71573 337.837 2 329 2H16C7.16344 2 0 8.71573 0 17ZM345 45C345 54.3888 337.389 62 328 62H17C7.61116 62 0 54.3888 0 45C0 53.2843 7.16344 60 16 60H329C337.837 60 345 53.2843 345 45ZM0 61V1V61ZM345 1V61V1Z" fill="white"/>
          <path d="M164.894 39.788C163.886 39.788 162.974 39.628 162.158 39.308C161.358 38.972 160.67 38.46 160.094 37.772C159.534 37.068 159.094 36.172 158.774 35.084C158.47 33.98 158.318 32.66 158.318 31.124C158.318 29.588 158.47 28.276 158.774 27.188C159.094 26.084 159.534 25.188 160.094 24.5C160.67 23.796 161.358 23.284 162.158 22.964C162.974 22.628 163.886 22.46 164.894 22.46C165.902 22.46 166.806 22.628 167.606 22.964C168.422 23.284 169.11 23.796 169.67 24.5C170.246 25.188 170.686 26.084 170.99 27.188C171.31 28.276 171.47 29.588 171.47 31.124C171.47 32.66 171.31 33.98 170.99 35.084C170.686 36.172 170.246 37.068 169.67 37.772C169.11 38.46 168.422 38.972 167.606 39.308C166.806 39.628 165.902 39.788 164.894 39.788ZM164.894 37.148C165.982 37.148 166.822 36.812 167.414 36.14C168.006 35.452 168.302 34.476 168.302 33.212V29.036C168.302 27.772 168.006 26.804 167.414 26.132C166.822 25.444 165.982 25.1 164.894 25.1C163.806 25.1 162.966 25.444 162.374 26.132C161.782 26.804 161.486 27.772 161.486 29.036V33.212C161.486 34.476 161.782 35.452 162.374 36.14C162.966 36.812 163.806 37.148 164.894 37.148ZM179.836 31.82L177.82 34.484V39.5H174.82V22.748H177.82V28.22L177.676 31.124H178.012L179.908 28.22L183.724 22.748H187.108L181.9 29.78L187.516 39.5H184.012L179.836 31.82Z" fill="white"/>
        </svg>
      </div>
    </>
  );
}
