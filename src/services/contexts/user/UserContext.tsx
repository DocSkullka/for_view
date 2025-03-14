import { useCallback, useMemo, type ReactNode, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

import type { User } from '@/services/types.ts';
import type { UserState, UserAction } from './types';
import {
  createSetActivityAction,
  createSetErrorAction,
  createSetLoadingAction,
  createSetUserAction,
} from './actions.ts';
import { reducer } from './reducer.ts';
import { initialState } from './constants.ts';
import { UserContext } from './context.ts';

type Props = {
  children: ReactNode;
};

export function UserContextProvider({ children }: Props) {
  const [state, dispatch] = useImmerReducer<UserState, UserAction>(reducer, initialState);

  const auth = useCallback(async () => {
    try {
      dispatch(createSetLoadingAction(true));

      const { initDataRaw, startParam } = retrieveLaunchParams();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/ipoon/me${startParam ? `?hash=${startParam}` : ''}`,
        {
          headers: {
            Authorization: initDataRaw || window.location.hash,
          },
          method: 'GET',
        }
      );

      const data = (await res.json()) as User;

      if (data.telegramId === undefined) return;

      const activityRes = await fetch(
        `${import.meta.env.VITE_API_URL}/ipoon/users/friends/activity`,
        {
          headers: {
            Authorization: initDataRaw || window.location.hash,
          },
          method: 'GET',
        }
      );

      dispatch(createSetUserAction(data));

      try {
        const activityData = (await activityRes.json()) as { percantage: number; count: number };
        dispatch(createSetActivityAction(activityData));
      } catch (e) {
        dispatch(createSetErrorAction(JSON.stringify(e)));
      }
    } catch (e) {
      dispatch(createSetErrorAction(JSON.stringify(e)));
    } finally {
      dispatch(createSetLoadingAction(false));
    }
  }, [dispatch]);

  const setUser = useCallback(
    (user: User) => {
      dispatch(createSetUserAction({ ...state.user, ...user }));
    },
    [dispatch, state.user]
  );

  useEffect(() => {
    void auth();
  }, [auth]);

  const { loading, user, activity } = state;

  const userContextProviderValue = useMemo(
    () => ({ loading, user, auth, activity, setUser }),
    [loading, user, auth, activity, setUser]
  );

  return <UserContext.Provider value={userContextProviderValue}>{children}</UserContext.Provider>;
}
