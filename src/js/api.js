import fetch from './fetch';
import Auth from './Auth';

export const login = (phone) => {
  return fetch({ method: 'POST', url: 'customer/findOrCreate', data: { phone } });
};

export const confirm = (id, code) => {
  return fetch({ method: 'GET', url: 'customer/checkcode', data: { id, code } });
};

export const getOrder = (orderId) => {
  return fetch({ method: 'GET', url: `order/${orderId}`, options: { token: Auth.token } });
};

export const getOrderList = () => {
  return fetch({ method: 'GET', url: `order/list`, options: { token: Auth.token } });
};

export const createOrder = (data) => {
  return fetch({ method: 'POST', url: 'order/create', data: { ...data }, options: { token: Auth.token } });
};

export const updateOrder = (data) => {
  return fetch({ method: 'POST', url: `order/${data.id}/appendDetails`, data, options: { token: Auth.token } });
};

export const getCertificates = (query, limit, page) => {
  const resp = $.Deferred();
  resp.resolve({
    data:  [
      {
        id:             'ВА - 237М',
        address:        'Москва, ул.Фридриха Энгельса 75 стр.11 кв.200',
        expirationDate: '19 июля 2017',
      },
      {
        id:             'ВА - 237М',
        address:        'Москва, ул.Фридриха Энгельса 75 стр.11 кв.200',
        expirationDate: '19 июля 2017',
      },
      {
        id:             'ВА - 237М',
        address:        'Москва, ул.Фридриха Энгельса 75 стр.11 кв.200',
        expirationDate: '19 июля 2017',
      },
      {
        id:             'ВА - 237М',
        address:        'Москва, ул.Фридриха Энгельса 75 стр.11 кв.200',
        expirationDate: '19 июля 2017',
      },
      {
        id:             'ВА - 237М',
        address:        'Москва, ул.Фридриха Энгельса 75 стр.11 кв.200',
        expirationDate: '19 июля 2017',
      },
    ],
    pager: { total: 100 }
  });
  return resp;
  return fetch({ method: 'GET', url: 'certificate', data: {} });
};
