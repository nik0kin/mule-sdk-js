
// https://github.com/github/fetch

import 'whatwg-fetch';
import * as Q from 'q';

function get(url: string/*, data: any, opts: any*/): Q.Promise<any> {
  return Q()
    .then(() => fetch(url))
    .then((response) => response.json());
}

function post(url: string, data: any/*, opts: any*/): Q.Promise<any> {
  return Q()
    .then(() => fetch(url, {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json']
      ],
      body: JSON.stringify(data),
    }))
    .then((response: any) => response.json());
}

export const http = {
  get: function (url: any/*, data: any, opts: any*/): Q.Promise<any> {
    return Q.Promise(function (resolve, reject) {
      get(url/*, data, opts || {dataType: 'json', withCredentials: true}*/)
        .then(function (response: any) {
          if (typeof response === 'object') {
            resolve(response);
          } else {
            try {
              var parsed = JSON.parse(response);
              resolve(parsed);
            } catch (e) {
              resolve(undefined);
            }
          }
        })
        .catch(function (/*error: any*/) {
          reject(undefined);
        });
    });
  },

  post: function (url: any, data?: any/*, opts: any*/): Q.Promise<any> {
    return post(url, data/*, opts || {dataType: 'json', responseType:'json', withCredentials: true}*/);
  },
};
