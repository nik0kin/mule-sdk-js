
// https://github.com/github/fetch

import 'whatwg-fetch';
import { isObjectLike } from 'lodash';
import { Promise, resolve, reject } from 'q';

function get(url: string/*, data: any, opts: any*/): Promise<any> {
  return resolve()
    .then(() => fetch(url, {
      credentials: 'include'
    }))
    .then((response) => response.json());
}

function post(url: string, data: any/*, opts: any*/): Promise<any> {
  return resolve()
    .then(() => fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: [
        ['Content-Type', 'application/json']
      ],
      body: JSON.stringify(data),
    }))
    .then((response: any) => response.json());
}

export const http = {
  get: function (url: any/*, data: any, opts: any*/): Promise<any> {
    return get(url/*, data, opts || {dataType: 'json', withCredentials: true}*/)
      .then(function (response: any) {
        if (isObjectLike(response)) {
          return response;
        } else {
          var parsed = JSON.parse(response);
          return parsed;
        }
      })
      .catch(reject);
  },

  post: function (url: any, data?: any/*, opts: any*/): Promise<any> {
    return post(url, data/*, opts || {dataType: 'json', responseType:'json', withCredentials: true}*/);
  },
};
