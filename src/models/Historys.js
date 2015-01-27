/**
 * js-sdk/models/Historys.js
 *
 */

define(['../lib/lodash', '../utils/qwest'], function (_, qwest) {
  return function (contextPath) {
    var that = {};

    that.indexQ = function () {
      return qwest.get(contextPath+"historys");
    };

    that.readQ = function (historyId) {
      return qwest.get(contextPath+"historys/" + historyId);
    };

    that.readGamesHistoryQ = function (gameId) {
      return qwest.get(contextPath+"games/" + gameId + '/history', null, {responseType:'json'});
    };

    that.readGamesFullHistoryQ = function (gameId) {
      return qwest.get(contextPath+"games/" + gameId + '/history/all');
    };

    /////////// START SHIT hacky way for turns read by client
    // TODO please get rid of or rewrite with new History/Turn relationship

    var turnsRead;

    that.markAllTurnsRead = function (history) {
      turnsRead = {};
      _.each(history.turns, function (playerTurns, player) {
        turnsRead[player] = [];
        _.each(playerTurns, function (turn) {
          turnsRead[player].push(true);
        });
      });
      console.log(turnsRead);
    };

    that.getLastUnreadTurn = function (history) {
      var _turn = false;

      _.each(history.turnOrder, function (value) {
        if (_turn || value === 'meta') return;

        var lastTurnNumber = turnsRead[value].length;
        console.log('las ' + lastTurnNumber)
        if (history.turns[value][lastTurnNumber]) {
          _turn = history.turns[value][lastTurnNumber];
          turnsRead[value].push(true);
          console.log('read ' + value + '\'s turn: ' + lastTurnNumber)
        }

      });

      return _turn;
    };

    that.getLastRoundMeta = function (history) {
      return history.turns['meta'][history.currentRound - 2];
    };

    // END SHIT

    // for roundRobin
    that.getWhosTurnIsIt = function (history) {
      return history.turnOrder[history.currentPlayerIndexTurn];
    };

    return that;
  };
});
