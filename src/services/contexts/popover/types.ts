import type { ACTION_TYPES, POPOVER_TYPES } from './constants.ts';
import { Reward } from '@/services/types.ts';

export type PopoverType = (typeof POPOVER_TYPES)[keyof typeof POPOVER_TYPES];

export type OpenPopoverParams = {
  type?: PopoverType;
  reward?: Reward;
};

export type TPopoverContext = {
  openPopover: ({ type, reward }: OpenPopoverParams) => void;
  closePopover: () => void;
  type: PopoverType | undefined;
};

export type Action<T, P> = {
  readonly type: T;
  readonly payload: P;
};

export type SetTypeAction = Action<typeof ACTION_TYPES.SET_TYPE, PopoverType | undefined>;
export type SetRewardAction = Action<typeof ACTION_TYPES.SET_REWARD, Reward | undefined>;

export type PopoverAction = SetTypeAction | SetRewardAction;

export type PopoverState = {
  type: PopoverType | undefined;
  reward: Reward | undefined;
};
