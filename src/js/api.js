import fetch from './fetch';

export const login = (phone) => {
  return fetch({ method: 'POST', url: 'customer/findOrCreate', data: { phone } });
};

export const confirm = (id, code) => {
  return fetch({ method: 'GET', url: 'customer/checkcode', data: { id, code } });
};

export const getProfile = (token) => {
  return fetch({ method: 'GET', url: 'customer/profile', options: { token } });
};

export const getOrder = (orderId, token) => {
  return fetch({ method: 'GET', url: `order/${orderId}`, options: { token } });
};

export const getOrderList = (token) => {
  return fetch({ method: 'GET', url: `order/list`, options: { token } });
};

export const createOrder = (data, token) => {
  return fetch({ method: 'POST', url: 'order/create', data: { ...data }, options: { token } });
};

export const updateOrder = (data, token) => {
  return fetch({ method: 'POST', url: `order/${data.id}/appendDetails`, data, options: { token } });
};

export const payBonusOrder = (id, token) => {
  return fetch({ method: 'POST', url: `order/${id}/payWithBonus`, options: { token } });
};

export const confirmOrder = (id, data, token) => {
  return fetch({ method: 'POST', url: `order/${id}/updateListDetailsAndSendOrderToSRG`, data, options: { token } });
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
