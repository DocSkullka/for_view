import { NavbarBgMask } from '@/components/navbar/components/NavbarBgMask/NavbarBgMask.tsx';
import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './navbar-mask.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  solid?: boolean;
};

export function NavbarMask({ children, className, solid }: Props) {
  return (
    <div className={cx(styles.mask, className)}>
      <div className={styles.content}>
        <NavbarBgMask solid={solid}>{children}</NavbarBgMask>
      </div>
      <svg width="100%" height="100" viewBox="0 0 346 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <mask id="path-1-outside-1_73_4162" maskUnits="userSpaceOnUse" x="0" y="0" width="345" height="100" fill="black">
        <rect fill="white" width="345" height="100"/>
        <path d="M0 51.5C0 24.7142 21.7142 3 48.5 3H296.5C323.286 3 345 24.7142 345 51.5C345 78.2858 323.286 100 296.5 100H48.5C21.7142 100 0 78.2858 0 51.5Z"/>
        </mask>
        <path d="M0 51.5C0 24.7142 21.7142 3 48.5 3H296.5C323.286 3 345 24.7142 345 51.5C345 78.2858 323.286 100 296.5 100H48.5C21.7142 100 0 78.2858 0 51.5Z" fill="#101010"/>
        <path d="M0 51.5C0 23.0573 23.0573 0 51.5 0H293.5C321.943 0 345 23.0573 345 51.5C345 26.371 323.286 6 296.5 6H48.5C21.7142 6 0 26.371 0 51.5ZM345 100H0H345ZM0 100V3V100ZM345 3V100V3Z" fill="white" mask="url(#path-1-outside-1_73_4162)"/>
      </svg>
    </div>
  );
}
