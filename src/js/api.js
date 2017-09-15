import fetch from './fetch';

export const createOrder = (data) => {
  return fetch({ method: 'POST', url: 'order', data });
};

export const updateOrder = (orderId, data) => {
  return fetch({ method: 'POST', url: `order/${orderId}`, data: { action: 'UPDATE', data } });
};
