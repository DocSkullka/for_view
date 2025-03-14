import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './claimed-reward-mask.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  rootClassName?: string;
};

export function ClaimedRewardMask({ children, className, rootClassName }: Props) {
  return (
    <div className={cx(styles.mask, rootClassName)}>
      <div className={cx(styles.content, className)}>{children}</div>
      <svg viewBox='0 0 168 128' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <title>ClaimedRewardMask</title>
        <g filter='url(#filter0_b_217_3122)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8 0C3.58172 0 0 3.58172 0 8V118C0 123.523 4.47715 128 10 128H158C163.523 128 168 123.523 168 118V8C168 3.58172 164.418 0 160 0H8ZM8 2C4.68629 2 2 4.68629 2 8V116C2 119.314 4.6863 122 8 122H160C163.314 122 166 119.314 166 116V8C166 4.68629 163.314 2 160 2H8Z'
            fill='url(#paint0_linear_217_3122)'
          />
        </g>
        <defs>
          <filter
            id='filter0_b_217_3122'
            x='-4'
            y='-4'
            width='176'
            height='136'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feGaussianBlur in='BackgroundImageFix' stdDeviation='2' />
            <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_217_3122' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_backgroundBlur_217_3122'
              result='shape'
            />
          </filter>
          <linearGradient
            id='paint0_linear_217_3122'
            x1='0'
            y1='64'
            x2='137.132'
            y2='52.2711'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FA9247' />
            <stop offset='1' stopColor='#FA9777' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
