import fetch from './fetch';

export const createOrder = (config) => {
  return fetch('POST', 'order', config);
};
