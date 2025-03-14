import { ACTION_TYPES } from './constants';
import type { Action, SetTypeAction, PopoverType, SetRewardAction } from './types';
import { Reward } from '@/services/types.ts';

const createAction = <T extends string, P>(type: T, payload: P): Action<T, P> => ({
  type,
  payload,
});

export const createSetTypeAction = (type: PopoverType | undefined): SetTypeAction =>
  createAction(ACTION_TYPES.SET_TYPE, type);

export const createSetRewardAction = (reward: Reward | undefined): SetRewardAction =>
  createAction(ACTION_TYPES.SET_REWARD, reward);
