import stringify from 'qs/lib/stringify';
// import globalConfig from 'config.json';

const cache = {};

export default function fetch (method = 'GET', url, body, config = {}) {
  const upperMethod = method.toString().toUpperCase();
  let fullUrl = API_URL + url;

  const params = {
    method: upperMethod,
  };

  if (upperMethod === 'GET' || upperMethod === 'DELETE') {
    const strBody = stringify(body);
    if (strBody.length) {
      fullUrl += `?${stringify(body)}`;
    }
  } else if (typeof body === 'object' && body !== null) {
    params.body = JSON.stringify(body);
  } else {
    params.body = body;
  }

  params.headers = {
    'Content-Type': 'application/json',
  };

  // if (config.token || state.token) params.headers['access-token'] = config.token || state.token;
  // if (config.guid) params.headers.guid = config.guid;
  // if (config.cookies) params.credentials = 'include';

  return window.fetch(fullUrl, params).then((result) => {
    const contentType = result.headers.get('Content-Type');
    const res = (contentType && contentType.toLowerCase().indexOf('application/json') !== -1)
      ? result.json()
      : result.text();

    const status = result.status;
    return (status >= 200 && status < 300)
      ? res
      : res.then(error => Promise.reject({ url, result, status, error }));
  });
}