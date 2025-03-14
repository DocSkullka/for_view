import { createContext, useContext } from 'react';
import type { TUserContext } from './types.ts';

export const UserContext = createContext<TUserContext>({
  loading: false,
  user: undefined,
  auth: () => Promise.resolve(),
  setUser: () => {},
  activity: {
    percantage: 0,
    count: 0,
  },
});

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext was used outside of its provider');
  }

  return context;
};
