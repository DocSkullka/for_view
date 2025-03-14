import { ACTION_TYPES } from './constants';
import type {
  Action,
  SetActivityAction,
  SetErrorAction,
  SetLoadingAction,
  SetUserAction,
} from './types';
import type { User } from '@/services/types.ts';

const createAction = <T extends string, P>(type: T, payload: P): Action<T, P> => ({
  type,
  payload,
});

export const createSetLoadingAction = (loading: boolean): SetLoadingAction =>
  createAction(ACTION_TYPES.SET_LOADING, loading);

export const createSetErrorAction = (error: string): SetErrorAction =>
  createAction(ACTION_TYPES.SET_ERROR, error);

export const createSetUserAction = (user: User): SetUserAction =>
  createAction(ACTION_TYPES.SET_USER, user);

export const createSetActivityAction = (activity: {
  percantage: number;
  count: number;
}): SetActivityAction => createAction(ACTION_TYPES.SET_ACTIVITY, activity);
