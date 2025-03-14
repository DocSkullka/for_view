import { useCallback, useEffect, useMemo, useState } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { HttpStatusCode } from 'axios';
import { ClaimReward } from '@/pages/Earn/components/Reward/Reward.tsx';
import { useUserContext } from '@/services/contexts/user/context.ts';
import { Task as TaskComponent } from './components/Task/Task.tsx';
import type { Task } from '@/services/types.ts';
import styles from './earn.module.scss';
import { POPOVER_TYPES } from '@/services/contexts/popover/constants.ts';
import { usePopoverContext } from '@/services/contexts/popover/context.ts';
import { User } from '@/services/types.ts';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
// import { Wallet } from './components/ConnectWalletModal/Wallet.tsx';

dayjs.extend(relativeTime);
dayjs.extend(duration);

type Meta = {
  startingAfterID: string | undefined;
  count: number;
};

export function Earn() {
  const { user, auth, setUser } = useUserContext();

  const { openPopover } = usePopoverContext();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [meta, _] = useState<Meta>({ startingAfterID: undefined, count: 50 });


  const fetchTasks = useCallback(async ({ startingAfterID, count }: Meta) => {
    const { initDataRaw } = retrieveLaunchParams();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/ipoon/tasks`, {
      headers: {
        Authorization: initDataRaw || window.location.hash,
      },
      method: 'POST',
      body: JSON.stringify({
        startingAfterID,
        count,
      }),
    });

    const data = (await res.json()) as { results: Task[] };


    setTasks(data.results);
  }, []);

  if (user) {
    const { initDataRaw } = retrieveLaunchParams();

    const { rewards } = user;

    const reward = rewards && user.rewards.find(({ claimed, day }) => !claimed && day === user.streak);

    if (reward) {
      fetch(`${import.meta.env.VITE_API_URL}/ipoon/rewards/submit`, {
        headers: {
          Authorization: initDataRaw || window.location.hash,
        },
        method: 'POST',
        body: JSON.stringify({
          rewardName: reward.name,
        }),
      })
        .then((res) => {
          const updatedRewards = user.rewards.map((item) => {
            if (item.name === reward.name) {
              return { ...reward, claimed: true };
            }
  
            return item;
          });
  
          if (res.status === HttpStatusCode.Ok) {
            setUser({
              earnings: { total: user.earnings.total + (reward.amount ?? 0) },
              rewards: updatedRewards,
            } as User);
  
            openPopover({ type: POPOVER_TYPES.REWARD, reward });
          }
        })
        .catch((error) => {
          console.error('Ошибка:', error);
        });
    }
  }


  useEffect(() => {
    if (tasks.length === 0) {
      void fetchTasks(meta);
    }
  }, [fetchTasks, tasks.length, meta]);

  const submitTask = useCallback(
    async (id: string) => {
      const { initDataRaw } = retrieveLaunchParams();

      const res = await fetch(`${import.meta.env.VITE_API_URL}/ipoon/rewards/task`, {
        headers: {
          Authorization: initDataRaw || window.location.hash,
        },
        method: 'POST',
        body: JSON.stringify({ id }),
      });

      if (res.status === HttpStatusCode.Ok) {
        await fetchTasks(meta);
        await auth();
      }
    },
    [auth, fetchTasks, meta]
  );

  const [time, setTime] = useState<string>('0:00:00');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (user) {
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

  const doneTasks = useMemo(() => {
    return tasks.filter((task) => task.done).length;
  }, [tasks]);

  const sortedRewards = useMemo(() => {
    if (user) {
      const userRewards = user.rewards || null;
      if(userRewards){
        return [...userRewards].sort((a, b) => (a.day > b.day ? 1 : -1));
      }
    }

    return [];
  }, [user]);


  if (!user) return null;

  interface TelegramGetChatMemberRequest {
    chat_id: string;
    user_id: string;
  }
  
  interface TelegramGetChatMemberResponse {
    ok: boolean;
    result: {
      status: string;
    };
  }
  
  async function checkSubscriptions(
    token: string,
    chatIds: string[],
    userId: string
  ): Promise<void> {
    for (const chatId of chatIds) {
      const url = `https://api.telegram.org/bot${token}/getChatMember`;
      const body: TelegramGetChatMemberRequest = {
        chat_id: chatId,
        user_id: userId,
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
  
        if (!response.ok) {
          const error = await response.json();
          console.error('Ошибка:', error);
          throw error;
        }
  
        const data: TelegramGetChatMemberResponse = await response.json();
        if (data.ok && data.result.status === 'member') {
          console.log(`Пользователь подписан на канал ${chatId}`);
          if (chatId === '-1002210934690') {
            submitTask('0');
          } else if (chatId === '6941660831') {
            submitTask('1');
          }
        } else {
          console.log(`Пользователь не подписан на канал ${chatId}`);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  }
  
  const token = '7486733125:AAHD8AXJb8lAgXMOyR_UzM7BmqVWp8eOM9M';
  const chatIds = ['-1002210934690', '6941660831'];
  const userId = user.telegramId;
  
  checkSubscriptions(token, chatIds, userId);

    const desiredDays = [3, 7, 10, 14, 17, 21, 30];
    const filteredRewards = sortedRewards.filter(reward => desiredDays.includes(reward.day));

    const rewardsToDisplay = desiredDays.map(day => {
      const reward = filteredRewards.find(reward => reward.day === day);
      if (reward) {
        return reward;
      } else {
        return { day, claimed: false };
      }
    });
  
  return (
    <main className={styles.earn}>
      <div className={styles.content}>
        <div className={styles.title}>
          <p>{time}</p>
          <p>Time to complete</p>
        </div>
        <div className={styles.rewards}>
          {rewardsToDisplay.map((reward) => {
            return (
              <ClaimReward
                reward={reward}
                key={reward.day}
                claimed={reward.claimed}
                disabled={true}
              />
            );
          })}
        </div>
        {/* <div className={`${styles.walletContainer} ${highlightedElement === 'wallet' ? styles.highlighted : ''}`}>
          <div className={styles.tasks}>
            <p>connet your wallet</p>
            <p>
              0/1
            </p>
          </div>
          <Wallet />
        </div> */}
      </div>
      <div className={styles.main}>
        <div className={styles.tasksList}>
        <div className={styles.tasks} style={{padding: '0'}}>
          <p>daily tasks</p>
          <p>
            {doneTasks}/{tasks.length}
          </p>
        </div>
          {tasks.map((task) => (
            <TaskComponent key={task.id} task={task} submitTask={submitTask} />
          ))}
        </div>
      </div>
    </main>
  );
}
