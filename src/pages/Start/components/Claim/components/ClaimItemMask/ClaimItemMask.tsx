import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './claim-item-mask.module.scss';

type Props = {
  children: ReactNode;
  className: string;
  rootClassName: string;
};

export function ClaimItemMask({ children, className, rootClassName }: Props) {
  return (
    <div className={cx(styles.mask, rootClassName)}>
      <div className={cx(styles.content, className)}>{children}</div>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_10_1918" fill="white">
        <path d="M0 12C0 5.37258 5.37258 0 12 0H68C74.6274 0 80 5.37258 80 12V68C80 74.6274 74.6274 80 68 80H12C5.37258 80 0 74.6274 0 68V12Z"/>
        </mask>
        <path d="M0 12C0 4.8203 5.8203 -1 13 -1H67C74.1797 -1 80 4.8203 80 12C80 5.92487 74.6274 1 68 1H12C5.37258 1 0 5.92487 0 12ZM80 68C80 75.1797 74.1797 81 67 81H13C5.8203 81 0 75.1797 0 68C0 74.0751 5.37258 79 12 79H68C74.6274 79 80 74.0751 80 68ZM0 80V0V80ZM80 0V80V0Z" fill="white" mask="url(#path-1-inside-1_10_1918)"/>
      </svg>
    </div>
  );
}
