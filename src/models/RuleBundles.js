/**
 * js-sdk/models/RuleBundles.js
 *
 */

define(['../utils/qwest'], function (qwest) {
  return function (contextPath) {
    var that = {};

    that.indexQ = function () {
      return qwest.get(contextPath+"ruleBundles");
    };

    that.createQ = function (params) {
      return qwest.post(contextPath+"ruleBundles", params);
    };

    that.readQ = function (ruleBundleId) {
      return qwest.get(contextPath+"ruleBundles/" + ruleBundleId);
    };

    return that;
  };
});
