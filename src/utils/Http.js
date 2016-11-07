import 'whatwg-fetch';

import Auth from '../auth/Auth';

export default {
  fetch: (url, params = {}, cbSuccess = (() => {}),  cbError = (() => {}), ...other) => {
    params = Object.assign({
      headers: Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Auth.getAccessToken()
      }, params.headers),
    }, params, {
        body: typeof params.body === 'object' ? JSON.stringify(params.body) : params.body,
    });

    return fetch(url, params, ...other) .then(response => {
      if (response.ok) {
        response.json().then((data) => cbSuccess(data, response))
      } else {
        if (response.status === 401) {
          location.reload();
        }

        if (500 <= response.status && response.status < 600) {
          alert('Server error.');
        }

        cbError(response);
        console.log('Network response was not ok.')
      }
    }) .catch(error => {
      cbError(error);
      console.log('There has been a problem with your fetch operation: ' + error.message)
    });
  }
}
