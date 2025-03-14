import { init } from '@rematch/core';
import { dropdown } from './store/index';

let middleware = [];

const store = init({
  models: { dropdown },
  redux: {
    middlewares: middleware,
  },
});

export default store;
