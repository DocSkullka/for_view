import { useCallback, useEffect, useState } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { Friend } from './components/Friend/Friend.tsx';
import type { User } from '@/services/types.ts';
import { useUserContext } from '@/services/contexts/user/context.ts';
import styles from './friendslist.module.scss';

type Meta = {
  startingAfterID: string;
  count: number;
};

export function Friendslist() {
  const [friends, setFriends] = useState<User[]>([]);
  const [meta, setMeta] = useState<Meta>({ startingAfterID: '', count: 10 });
  const { user } = useUserContext();

  const fetchFriends = useCallback(async ({ startingAfterID, count }: Meta) => {
    const { initDataRaw } = retrieveLaunchParams();

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/ipoon/users/friends?count=${count || 10}${startingAfterID ? `&startingAfterID=${startingAfterID}` : ''}`,
      {
        headers: {
          Authorization: initDataRaw || window.location.hash,
        },
        method: 'GET',
      }
    );

    const data = (await res.json()) as { results: User[] };

    setFriends(data.results);
    setMeta({ startingAfterID, count });
  }, []);

  useEffect(() => {
    if (friends.length === 0) {
      void fetchFriends({ startingAfterID: '', count: 10 });
    }
  }, [fetchFriends, friends.length]);

  useEffect(() => {
    if (user) {
      const friendsList = document.querySelectorAll('#friend');

      if (friendsList.length) {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const lastFriendId = entry.target.getAttribute('data-uid');

              if (!lastFriendId) return;

              if (
                friends.length > 0 &&
                lastFriendId &&
                meta.startingAfterID &&
                +lastFriendId === +friends[friends.length - 1].id &&
                +lastFriendId !== +meta.startingAfterID
              ) {
                if (entry.isIntersecting) {
                  const updatedMeta = { startingAfterID: lastFriendId, count: 100 };

                  setMeta(updatedMeta);

                  void fetchFriends(updatedMeta);
                }
              }
            }
          },
          {
            root: document.querySelector('#friends-list'),
            threshold: 0.5,
          }
        );

        friendsList.forEach((friendCard) => observer.observe(friendCard));

        return () => {
          friendsList.forEach((friendCard) => observer.unobserve(friendCard));
        };
      }
    }
  }, [fetchFriends, friends, meta, user]);

  if (!user) return null;

  return (
    <div className={styles.friendslist} id='friends-list'>
      {friends.map((friend, index) => {
        const isLastItem = friends.length - 1 === index;

        return <Friend key={friend.telegramId} friend={friend} isLastItem={isLastItem} />;
      })}
    </div>
  );
}
