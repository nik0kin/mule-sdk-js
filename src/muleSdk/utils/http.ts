
// https://github.com/github/fetch

import 'whatwg-fetch';
import { isObjectLike } from 'lodash';
import Promise from 'promise-polyfill';

function handleResponse(response: Response): any {
  if (response.status >= 400) {
    return response.json()
      .then((errorResponse: any) => {
        throw errorResponse;
      });
  } else {
    return response.json();
  }
}

function get(url: string/*, data: any, opts: any*/): Promise<any> {
  return Promise.resolve()
    .then(() => fetch(url, {
      credentials: 'include'
    }))
    .then(handleResponse);
}

function post(url: string, data: any/*, opts: any*/): Promise<any> {
  return Promise.resolve()
    .then(() => fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: [
        ['Content-Type', 'application/json']
      ],
      body: JSON.stringify(data),
    }))
    .then(handleResponse);
}

export const http = {
  get: (url: any/*, data: any, opts: any*/): Promise<any> => {
    return get(url/*, data, opts || {dataType: 'json', withCredentials: true}*/)
      .then( (response: any) => {
        if (isObjectLike(response)) {
          return response;
        } else {
          var parsed = JSON.parse(response);
          return parsed;
        }
      });
  },

  post: (url: any, data?: any/*, opts: any*/): Promise<any> => {
    return post(url, data/*, opts || {dataType: 'json', responseType:'json', withCredentials: true}*/);
  },
};
