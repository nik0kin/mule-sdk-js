/**
 * js-sdk/models/Historys.js
 *
 */

define(['../qwest'], function (qwest) {
  return function (contextPath) {
    var that = {};

    that.readQ = function (turnId) {
      return qwest.get(contextPath+"turns/" + turnId);
    };

    that.readGamesTurnQ = function (gameId, turnNumber) {
      return qwest.get(contextPath+"games/" + gameId + '/history/' + turnNumber);
    };

    return that;
  };
});
