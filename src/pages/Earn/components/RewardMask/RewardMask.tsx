import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './reward-mask.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  rootClassName?: string;
};

export function RewardMask({ children, className, rootClassName }: Props) {
  return (
    <div className={cx(styles.mask, rootClassName)}>
      <div className={cx(styles.content, className)}>{children}</div>
      <svg width="139" height="118" viewBox="0 0 139 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_73_3083" fill="white">
        <path d="M0 12C0 5.37259 5.37258 0 12 0H127C133.627 0 139 5.37258 139 12V106C139 112.627 133.627 118 127 118H12C5.37259 118 0 112.627 0 106V12Z"/>
        </mask>
        <path d="M0 12C0 4.8203 5.8203 -1 13 -1H126C133.18 -1 139 4.8203 139 12C139 5.92487 133.627 1 127 1H12C5.37258 1 0 5.92487 0 12ZM139 106C139 113.18 133.18 119 126 119H13C5.8203 119 0 113.18 0 106C0 112.075 5.37258 117 12 117H127C133.627 117 139 112.075 139 106ZM0 118V0V118ZM139 0V118V0Z" fill="white" mask="url(#path-1-inside-1_73_3083)"/>
      </svg>
    </div>
  );
}
