// qwest wrapped, because it wont auto detect json...

define(['../lib/qwest'], function (qwest) {
  var that = {};

  that.get = function (url, data, opts) {
    return qwest.get(url, data, opts || {dataType: 'json', withCredentials: true})
      .then(function (response) {
        if (typeof response === 'object') {
          return response;
        } else {
          try {
            var parsed = JSON.parse(response);
            return parsed;
          } catch (e) {
            return undefined;
          }
        }
      });
  };

  that.post = function (url, data, opts) {
    return qwest.post(url, data, opts || {dataType: 'json', responseType:'json', withCredentials: true});
  };

  return that;
});
