import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './half-mask.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  highlighted?: boolean;
};

export function HalfMask({ children, className, highlighted }: Props) {
  return (
    <div className={`${styles.mask} ${highlighted ? styles.highlighted : ''}`}>
      <div className={cx(styles.content, className)}>{children}</div>
      <svg width="100%" height="15vh" viewBox="0 0 169 104" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <mask id="path-1-inside-1_73_4055" fill="white">
          <path d="M0 16C0 7.16344 7.16344 0 16 0H152.5C161.337 0 168.5 7.16344 168.5 16V88C168.5 96.8366 161.337 104 152.5 104H16C7.16345 104 0 96.8366 0 88V16Z"/>
        </mask>
        <path d="M0 16C0 6.05887 8.05887 -2 18 -2H150.5C160.441 -2 168.5 6.05887 168.5 16C168.5 8.26801 161.337 2 152.5 2H16C7.16344 2 0 8.26801 0 16ZM168.5 88C168.5 97.9411 160.441 106 150.5 106H18C8.05887 106 0 97.9411 0 88C0 95.732 7.16344 102 16 102H152.5C161.337 102 168.5 95.732 168.5 88ZM0 104V0V104ZM168.5 0V104V0Z" fill="white" mask="url(#path-1-inside-1_73_4055)"/>
      </svg>
    </div>
  );
}
