import { ACTION_TYPES } from './constants';
import type { PopoverAction, PopoverState } from './types';

export const reducer = (draft: PopoverState, { type, payload }: PopoverAction): void => {
  switch (type) {
    case ACTION_TYPES.SET_TYPE: {
      draft.type = payload;

      break;
    }
    case ACTION_TYPES.SET_REWARD: {
      draft.reward = payload;

      break;
    }

    default: {
      break;
    }
  }
};
