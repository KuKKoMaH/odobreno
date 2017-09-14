import fetch from './fetch';

export const createOrder = (data) => {
  return fetch('POST', 'order', data);
};

export const updateOrder = (orderId, data) => {
  return fetch('POST', `order/${orderId}`, { action: 'UPDATE', data });
};
