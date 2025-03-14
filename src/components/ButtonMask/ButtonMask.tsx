import cx from 'classnames';
import styles from './button-mask.module.scss';

type Props = {
  friendsCount: string;
  onClick?: () => void;
};

export function ButtonMask({friendsCount, onClick }: Props) {
  return (
    <div className={cx(styles.mask)} onClick={onClick}>
      <div className={cx(styles.content)}>
        <div className={styles.text}>Invite Friends</div>
        <div className={styles.friends}>{friendsCount}</div>
      </div>
      <svg className={styles['mask_svg']} width="100%" height="55" viewBox="0 0 346 55" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M17 0C7.61116 0 0 7.61067 0 16.9995V41.9995C0 51.3884 7.61116 58.9995 17 58.9995H328C337.389 58.9995 345 51.3884 345 41.9995V16.9995C345 7.61067 337.389 0 328 0H17Z" fill="#101010" /> 
        <path d="M0 16C0 7.16344 7.16344 0 16 0H330C338.837 0 346 7.16344 346 16C346 8.26801 339.284 2 331 2H15C6.71573 2 0 8.26801 0 16ZM346 39C346 47.8366 338.837 55 330 55H16C7.16344 55 0 47.8366 0 39C0 46.732 6.71573 53 15 53H331C339.284 53 346 46.732 346 39ZM0 54V1V54ZM346 1V54V1Z" fill="white"/>
      </svg>
    </div>
  );
}
