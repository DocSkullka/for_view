export const POPOVER_TYPES = {
  CLAIM: 'claim',
  REWARD: 'reward',
} as const;

export const ACTION_TYPES = {
  SET_TYPE: 'SET_TYPE',
  SET_REWARD: 'SET_REWARD',
} as const;

export const initialState = {
  type: undefined,
  reward: undefined,
};
