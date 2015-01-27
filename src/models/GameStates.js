/**
 * js-sdk/models/Historys.js
 *
 */

define(['../qwest'], function (qwest) {
  return function (contextPath) {
    var that = {};

    that.indexQ = function () {
      return qwest.get(contextPath+"historys");
    };

    that.readQ = function (gameStateId) {
      return qwest.get(contextPath+"gameStates/" + gameStateId);
    };

    that.readGamesStateQ = function (gameId) {
      return qwest.get(contextPath+"games/" + gameId + '/state');
    };

    return that;
  };
});
