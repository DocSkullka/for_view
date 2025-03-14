import type { ACTION_TYPES } from './constants.ts';
import type { User } from '@/services/types.ts';

export type TUserContext = {
  loading: boolean;
  user: User | undefined;
  auth: () => Promise<void>;
  setUser: (user: User) => void;
  activity: {
    percantage: number;
    count: number;
  };
};

export type Action<T, P> = {
  readonly type: T;
  readonly payload: P;
};

export type SetLoadingAction = Action<typeof ACTION_TYPES.SET_LOADING, boolean>;
export type SetErrorAction = Action<typeof ACTION_TYPES.SET_ERROR, string>;
export type SetActivityAction = Action<
  typeof ACTION_TYPES.SET_ACTIVITY,
  { percantage: number; count: number }
>;
export type SetUserAction = Action<typeof ACTION_TYPES.SET_USER, User>;

export type UserAction = SetLoadingAction | SetErrorAction | SetUserAction | SetActivityAction;

export type UserState = {
  loading: boolean;
  error: string;
  user: User | undefined;
  activity: { percantage: number; count: number };
};
