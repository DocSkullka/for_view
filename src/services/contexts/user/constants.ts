export const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  SET_ACTIVITY: 'SET_ACTIVITY',
} as const;

export const initialState = {
  loading: true,
  error: '',
  user: undefined,
  activity: { percantage: 0, count: 0 },
};
