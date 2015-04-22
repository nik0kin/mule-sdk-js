// qwest wrapped, because it wont auto detect json...

define(['../lib/qwest', '../lib/q'], function (qwest, Q) {
  var that = {};

  that.get = function (url, data, opts) {
    return Q.promise(function (resolve, reject) {
      qwest.get(url, data, opts || {dataType: 'json', withCredentials: true})
        .then(function (response) {
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
        .catch(function (error) {
          reject(undefined);
        });
    });
  };

  that.post = function (url, data, opts) {
    return qwest.post(url, data, opts || {dataType: 'json', responseType:'json', withCredentials: true});
  };

  return that;
});
