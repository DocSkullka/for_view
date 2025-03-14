import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './referrals-mask.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  bgClassName?: string;
};

export function ReferralsMask({ children, className, bgClassName }: Props) {
  return (
    <div className={cx(styles.mask, className)}>
      <div className={cx(styles.content, bgClassName)}>{children}</div>
      <svg width="100%" height="22vh" viewBox="0 0 345 225" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <mask id="path-1-inside-1_73_4101" fill="white">
          <path d="M0 16C0 7.16344 7.16344 0 16 0H329C337.837 0 345 7.16344 345 16V209C345 217.837 337.837 225 329 225H16C7.16345 225 0 217.837 0 209V16Z"/>
        </mask>
        <path d="M0 16C0 6.05887 8.05887 -2 18 -2H327C336.941 -2 345 6.05887 345 16C345 8.26801 337.837 2 329 2H16C7.16344 2 0 8.26801 0 16ZM345 209C345 218.941 336.941 227 327 227H18C8.05887 227 0 218.941 0 209C0 216.732 7.16344 223 16 223H329C337.837 223 345 216.732 345 209ZM0 225V0V225ZM345 0V225V0Z" fill="white" mask="url(#path-1-inside-1_73_4101)"/>
      </svg>
    </div>
  );
}
