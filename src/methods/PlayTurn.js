define(['../utils/qwest'], function (qwest) {
  return function (contextPath) {
    var that = {};

    that.sendQ = function (params) {
      return qwest.post(contextPath+"playTurn", params);
    };

    that.sendGameTurnQ = function (gameId, params) {
      return qwest.post(contextPath + 'games/' + gameId + '/playTurn', params);
    };

    return that;
  };
});
