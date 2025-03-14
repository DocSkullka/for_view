import type { ReactNode } from 'react';
import styles from './navbar-bg-mask.module.scss';

type Props = {
  children: ReactNode;
  solid?: boolean;
};

export function NavbarBgMask({ children }: Props) {
  return (
    <div className={styles.mask}>
      <div className={styles.content}>{children}</div>
      <svg viewBox='0 0 383 117' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <title>NavbarBgMask</title>
        <g filter='url(#filter0_b_217_2879)'>
          <rect
            x='0'
            y='0'
            width='383'
            height='117'
            rx='50'
            ry='50'

          />
        </g>
        <defs>
          <filter
            id='filter0_b_217_2879'
            x='-10'
            y='-10'
            width='403'
            height='137'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feGaussianBlur in='BackgroundImageFix' stdDeviation='5' />
            <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_217_2879' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_backgroundBlur_217_2879'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
