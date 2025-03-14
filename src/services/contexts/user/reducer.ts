import { ACTION_TYPES } from './constants';
import type { UserAction, UserState } from './types';

export const reducer = (draft: UserState, { type, payload }: UserAction): void => {
  switch (type) {
    case ACTION_TYPES.SET_LOADING: {
      draft.loading = payload;

      break;
    }

    case ACTION_TYPES.SET_USER: {
      draft.user = payload;

      break;
    }

    case ACTION_TYPES.SET_ACTIVITY: {
      draft.activity = payload;

      break;
    }

    case ACTION_TYPES.SET_ERROR: {
      draft.error = payload;

      break;
    }

    default: {
      break;
    }
  }
};
