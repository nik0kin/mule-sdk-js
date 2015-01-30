// qwest wrapped, because it wont auto detect json...

define(['../lib/qwest'], function (qwest) {
  var that = {};

  that.get = function (url, data, opts) {
    return qwest.get(url, data, opts || {dataType: 'json', responseType:'json', withCredentials: true});
  };

  that.post = function (url, data, opts) {
    return qwest.post(url, data, opts || {dataType: 'json', responseType:'json', withCredentials: true});
  };

  return that;
});
