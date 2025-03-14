import cx from 'classnames';
import type { ReactNode } from 'react';
import styles from './minigame-mask.module.scss';
import { useNavigate } from 'react-router-dom';
import miniGameImg from '@/assets/miniGameImg.png';

type Props = {
  children: ReactNode;
  className?: string;
  bgClassName?: string;

};

export function MinigameMask({ children, className, bgClassName }: Props) {
  const navigate = useNavigate();

  const openGameClick = () => {
    navigate('/game');
  };

  return (
    <div className={cx(styles.mask, className)} onClick={openGameClick}>
      <div className={cx(styles.content, bgClassName)}>
        <img src={miniGameImg} alt="carImg" />
        {children}
      </div>
      <svg className={styles['mask-svg']} width="100%" height="100%" viewBox="0 0 346 286" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <mask id="path-1-inside-1_3_8304" fill="white">
          <path d="M0 20.0004C0 8.95471 8.9543 0.000396729 20 0.000396729H326C337.046 0.000396729 346 8.9547 346 20.0004V211.679C346 222.724 337.046 231.679 326 231.679H20C8.9543 231.679 0 222.724 0 211.679V20.0004Z"/>
        </mask>
        <path d="M0 20.0004C0 7.85013 9.84974 -1.9996 22 -1.9996H324C336.15 -1.9996 346 7.85013 346 20.0004C346 10.0593 337.046 2.0004 326 2.0004H20C8.9543 2.0004 0 10.0593 0 20.0004Z" fill="white" mask="url(#path-1-inside-1_3_8304)"/>
        <g transform="translate(0, 248)">
          <svg className={styles['maskButton']} width="100%" height="15.8%" viewBox="0 0 345 69" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 16.9995C0 8.16296 7.16344 0.999512 16 0.999512H329C337.837 0.999512 345 8.16296 345 16.9995V41.9995C345 50.8361 337.837 57.9995 329 57.9995H16C7.16345 57.9995 0 50.8361 0 41.9995V16.9995Z" fill="#101010"/>
            <path d="M0 16.9995C0 7.61067 7.61116 -0.000488281 17 -0.000488281H328C337.389 -0.000488281 345 7.61067 345 16.9995C345 8.71524 337.837 1.99951 329 1.99951H16C7.16344 1.99951 0 8.71524 0 16.9995ZM345 41.9995C345 51.3884 337.389 58.9995 328 58.9995H17C7.61116 58.9995 0 51.3884 0 41.9995C0 50.2838 7.16344 56.9995 16 56.9995H329C337.837 56.9995 345 50.2838 345 41.9995ZM0 57.9995V0.999512V57.9995ZM345 0.999512V57.9995V0.999512Z" fill="white"/>
            <path d="M147.481 37.9995V21.2475H154.417C155.889 21.2475 157.001 21.7035 157.753 22.6155C158.521 23.5275 158.905 24.7835 158.905 26.3835C158.905 27.9835 158.521 29.2395 157.753 30.1515C157.001 31.0635 155.889 31.5195 154.417 31.5195H150.481V37.9995H147.481ZM150.481 28.9035H154.105C154.617 28.9035 155.017 28.7675 155.305 28.4955C155.609 28.2075 155.761 27.7515 155.761 27.1275V25.6395C155.761 25.0155 155.609 24.5675 155.305 24.2955C155.017 24.0075 154.617 23.8635 154.105 23.8635H150.481V28.9035ZM161.953 37.9995V21.2475H164.953V35.3835H170.833V37.9995H161.953ZM183.348 37.9995L182.172 33.6315H176.772L175.596 37.9995H172.716L177.612 21.2475H181.404L186.3 37.9995H183.348ZM180.156 26.6235L179.628 23.9595H179.292L178.764 26.6235L177.492 31.2075H181.452L180.156 26.6235ZM190.981 37.9995V31.5915L185.845 21.2475H189.133L192.373 28.4475H192.709L195.877 21.2475H199.093L193.981 31.5915V37.9995H190.981Z" fill="white"/>
          </svg>
        </g>
      </svg>
    </div>
  );
}
