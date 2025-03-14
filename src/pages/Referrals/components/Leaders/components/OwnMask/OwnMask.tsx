import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './own-mask.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  spot?: number;
};

export function OwnMask({ children, className, id }: Props) {
  return (
    <div className={styles.mask} id={id}>
      <div className={cx(styles.content, className)}>{children}</div>
      <svg width="273" height="64" viewBox="0 0 273 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_14_3600" fill="white">
        <path d="M0 12C0 5.37258 5.37258 0 12 0H261C267.627 0 273 5.37258 273 12V52C273 58.6274 267.627 64 261 64H12C5.37258 64 0 58.6274 0 52V12Z"/>
        </mask>
        <path d="M0 12C0 5.37258 5.37258 0 12 0H261C267.627 0 273 5.37258 273 12V52C273 58.6274 267.627 64 261 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="white"/>
        <path d="M0 12C0 4.8203 5.8203 -1 13 -1H260C267.18 -1 273 4.8203 273 12C273 5.92487 267.627 1 261 1H12C5.37258 1 0 5.92487 0 12ZM273 52C273 59.1797 267.18 65 260 65H13C5.8203 65 0 59.1797 0 52C0 58.0751 5.37258 63 12 63H261C267.627 63 273 58.0751 273 52ZM0 64V0V64ZM273 0V64V0Z" fill="white" mask="url(#path-1-inside-1_14_3600)"/>
      </svg>
    </div>
  );
}
