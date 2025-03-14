import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const bot = (window as Window & typeof globalThis & {Telegram: any})?.Telegram?.WebApp;

const API_URL = import.meta.env.VITE_KAURI_API_RUL;

export const axiosInstance = Axios.create({
  withCredentials: true,
  timeout: 120000,
  baseURL: `${API_URL}/api/v1/`,
});

axiosInstance.defaults.timeout = 120000;

const instance = setupCache(axiosInstance, { debug: console.log });

const parsePath = (path) => {
  if (path.indexOf(API_URL) === 0) {
    return `Stage1 | ${path.slice(path.indexOf(API_URL) + API_URL?.length)}`;
  }
  return path;
};

const AxiosGet = ({ url, params, headers, data, cache }) => {
  const objReq = {
    method: 'get',
    url,
    data,
    params,
    cache: cache !== undefined ? cache : true,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ru',
      Enterprise: 'tHs1DmB',
      'Telegram-Data': bot.initData,
      ...headers,
    },
  };

  return instance(objReq)
    .then((res) => {
      if (import.meta.env.REACT_APP_NODE_ENV !== 'production') {
        console.log(`%c AXIOS GET ${parsePath(url)}`, 'color: green', res.data);
      }

      if (res?.data?.code && res?.data?.code === 74106 && !localStorage.getItem('SE')) {
        localStorage.setItem('SE', 'true');
        window.location.href = '/session-expired';
      } else {
        return res;
      }
    })
    .catch((err) => {
      if (import.meta.env.REACT_APP_NODE_ENV !== 'production') {
        console.log(`%c AXIOS GET ERROR ${parsePath(url)}`, 'color: red', err.response);
      }
    });
};

const AxiosPost = ({ url, data, headers, timeout }) => {
  console.log('tttt', bot);
  const objReq = {
    method: 'post',
    url,
    data,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ru',
      Enterprise: 'tHs1DmB',
      'Telegram-Data': bot.initData,
      ...headers,
    },
  };

  return instance(objReq)
    .then((res) => {
      if (import.meta.env.REACT_APP_NODE_ENV !== 'production') {
        console.log(`%c AXIOS POST ${parsePath(url)}`, 'color: green', res.data);
      }

      return res;
    })
    .catch((err) => {
      if (import.meta.env.REACT_APP_NODE_ENV !== 'production') {
        console.log(`%c AXIOS POST ERROR ${parsePath(url)}`, 'color: red', err.response);
      }
    });
};

export { AxiosGet, AxiosPost };
