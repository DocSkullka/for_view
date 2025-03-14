import cx from 'classnames';
import styles from '../Reward/reward.module.scss'; // Убедитесь, что у вас есть соответствующий файл стилей

type Props = {
  buttonText: string;
  claimed?: boolean;
};

export function RewardButtonMask({ buttonText, claimed }: Props) {
  return (
    <div className={cx(styles.action, { [styles.actionClaimed]: claimed })}>
      <svg width="139" height="33" viewBox="0 0 139 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_73_3087" fill="white">
          <path d="M0 10C0 4.47715 4.47715 0 10 0H129C134.523 0 139 4.47715 139 10V23C139 28.5228 134.523 33 129 33H10C4.47715 33 0 28.5228 0 23V10Z"/>
        </mask>
        <path d="M0 10C0 3.92487 4.92487 -1 11 -1H128C134.075 -1 139 3.92487 139 10C139 5.02944 134.523 1 129 1H10C4.47715 1 0 5.02944 0 10ZM139 33H0H139ZM0 33V0V33ZM139 0V33V0Z" fill="white" mask="url(#path-1-inside-1_73_3087)"/>
        <foreignObject x="0" y="0" width="139" height="33" mask="url(#path-1-inside-1_73_3087)">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <span>{buttonText}</span>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
