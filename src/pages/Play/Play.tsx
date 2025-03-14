import { useCallback, useEffect, useState } from 'react';
import { shareURL, retrieveLaunchParams, init } from '@telegram-apps/sdk';
import { useUserContext } from '@/services/contexts/user/context.ts';
import { Minigame } from '@/pages/Play/components/Minigame/Minigame.tsx';
import { Referrals } from '@/pages/Play/components/Referrals/Referrals.tsx';
import { formatNumberWithCommas } from '@/utils/format.ts';
import { on } from '@telegram-apps/sdk';
import styles from './play.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { ButtonMask } from '@/components/ButtonMask/ButtonMask';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export function Play() {
  const { user } = useUserContext();
  const [time, setTime] = useState<string>('0:00:00');
  const [isFullscreen, setIsFullscreen] = useState(false); // Состояние для управления padding-top


  // Обработчик изменения полноэкранного режима
  on('fullscreen_changed', (payload) => {
    if (payload.is_fullscreen) {
      setIsFullscreen(true); // В полноэкранном режиме добавляем padding-top
    } else {
      setIsFullscreen(false); // В обычном режиме убираем padding-top
    }
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    document.body.style.background = `none`;

    if (user) {
      init()
      const currentTime = dayjs();
      const diffTime =
        dayjs(user?.farming.availableAfter || new Date()).unix() - currentTime.unix();

      let duration = dayjs.duration(diffTime * 1000, 'milliseconds');
      const interval = 1000;
      const twoDP = (n: number) => (n > 9 ? n : '0' + n);

      duration = dayjs.duration(duration.asMilliseconds() - interval, 'milliseconds');

      const updatedTime = `${duration.hours()}:${twoDP(duration.minutes())}:${twoDP(duration.seconds())}`;

      if (+duration.seconds() <= 0 && +duration.minutes() <= 0 && +duration.hours() <= 0) {
        setTime('0:00:00');
      } else {
        setTime(updatedTime);
      }

      intervalId = setInterval(function () {
        duration = dayjs.duration(duration.asMilliseconds() - interval, 'milliseconds');

        const timestamp = `${duration.hours()}:${twoDP(duration.minutes())}:${twoDP(duration.seconds())}`;

        if (+duration.seconds() <= 0 && +duration.minutes() <= 0 && +duration.hours() <= 0) {
          setTime('0:00:00');
        } else {
          setTime(timestamp);
        }
      }, interval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [user]);

  const handleInviteFriendsClick = useCallback(async () => {
    if (user) {
      const {
        invites: { max, amount },
      } = user;

      if (amount === max) return;

      const { initDataRaw } = retrieveLaunchParams();

      const res = await fetch(`${import.meta.env.VITE_API_URL}/ipoon/referrals/invite`, {
        headers: {
          Authorization: initDataRaw || window.location.hash,
        },
        method: 'GET',
      });

      const data = (await res.json()) as { invite: string };

      shareURL(
        `https://t.me/ipoon_game_bot/?startapp=${data.invite}`,
        'Look! Join IPOON via invite link!'
      );
    }
  }, [user]);

  if (!user) return null;

  const {
    invites: { max, amount },
    earnings: { total },
  } = user;

  return (
    <main className={styles.play}>
      <div
        className={styles.info}
        style={{ paddingTop: isFullscreen ? '60px' : '30px' }} // Динамический padding-top
      >
        <div className={styles.count}>
          <p className={styles.timer}>{time}</p>
          <p className={styles.reward}>$ {formatNumberWithCommas(total || 0)}</p>
        </div>
        <Referrals showSpeed={false} />
        <Minigame />
      </div>
      <ButtonMask friendsCount={`${amount}/${max}`} onClick={handleInviteFriendsClick} />
      <div className={styles.bottomBlackBox}></div>
    </main>
  );
}