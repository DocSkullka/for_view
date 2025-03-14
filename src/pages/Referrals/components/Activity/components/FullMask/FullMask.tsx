import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './full-mask.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  highlighted?: boolean;
};

export function FullMask({ children, className, highlighted }: Props) {
  return (
    <div className={`${styles.mask} ${highlighted ? styles.highlighted : ''}`}>
      <div className={cx(styles.content, className)}>{children}</div>
      <svg width="100%" height="18vh" viewBox="0 0 345 104" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <mask id="path-1-inside-1_73_4063" fill="white">
          <path d="M0 16C0 7.16344 7.16344 0 16 0H329C337.837 0 345 7.16344 345 16V88C345 96.8366 337.837 104 329 104H16C7.16345 104 0 96.8366 0 88V16Z"/>
        </mask>
        <path d="M0 16C0 6.05887 8.05887 -2 18 -2H327C336.941 -2 345 6.05887 345 16C345 8.26801 337.837 2 329 2H16C7.16344 2 0 8.26801 0 16ZM345 88C345 97.9411 336.941 106 327 106H18C8.05887 106 0 97.9411 0 88C0 95.732 7.16344 102 16 102H329C337.837 102 345 95.732 345 88ZM0 104V0V104ZM345 0V104V0Z" fill="white" mask="url(#path-1-inside-1_73_4063)"/>
      </svg>
    </div>
  );
}
