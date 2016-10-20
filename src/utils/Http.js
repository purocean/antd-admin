import 'whatwg-fetch';

export default {
  fetch: (url, params, ...other) => {
    if (params && !params.headers) {
      params.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      if (typeof params.body !== 'string') {
        params.body = JSON.stringify(params.body);
      }
    }

    return fetch(url, params, ...other);
  }
}
