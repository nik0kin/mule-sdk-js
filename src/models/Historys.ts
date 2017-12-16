import * as Q from 'q';
import * as _ from 'lodash';

import { History, Turn } from '../../types/mule';
import { HistorysApi } from '../../types/sdk';

import { qwest } from '../utils/qwest';

export function initHistorysApi(contextPath: string): HistorysApi {
  const that: any = {};

  that.indexQ = function (): Q.Promise<History[]> {
    return qwest.get(contextPath + 'historys');
  };

  that.readQ = function (historyId: string): Q.Promise<History> {
    return qwest.get(contextPath + 'historys/' + historyId);
  };

  that.readGamesHistoryQ = function (gameId: string): Q.Promise<History> {
    return qwest.get(contextPath + 'games/' + gameId + '/history'/*, null, {responseType: 'json'}*/);
  };

  that.readGamesFullHistoryQ = function (gameId: string): Q.Promise<History[]> {
    return qwest.get(contextPath + 'games/' + gameId + '/history/all');
  };

  /////////// START SHIT hacky way for turns read by client
  // TODO please get rid of or rewrite with new History/Turn relationship

  var turnsRead: any;

  that.markAllTurnsRead = function (history: History): void {
    if (!history.turns[0].length) throw 'only use markAllTurnsRead() with Full-ish History';

    turnsRead = {};
    _.each(history.turns, function (playerTurns: any, player) {
      turnsRead[player] = [];
      _.each(playerTurns, function (/*turn*/) {
        turnsRead[player].push(true);
      });
    });
    console.log(turnsRead);
  };

  that.getLastUnreadTurn = function (history: History): Turn | undefined {
    let _turn: Turn | undefined = undefined;

    _.each(history.turnOrder, function (value: string, playerIndex: number) {
      if (_turn || value === 'meta') return;

      var lastTurnNumber = turnsRead[value].length;
      console.log('las ' + lastTurnNumber)
      if (history.turns[playerIndex][lastTurnNumber]) {
        _turn = history.turns[playerIndex][lastTurnNumber];
        turnsRead[value].push(true);
        console.log('read ' + value + '\'s turn: ' + lastTurnNumber)
      }

    });

    return _turn;
  };

  that.getLastRoundMeta = function (history: History): Turn | undefined {
    if (!history.turns.meta) return undefined;

    return history.turns.meta[history.currentRound - 2];
  };

  // END SHIT

  // for roundRobin
  that.getWhosTurnIsIt = function (history: History): string {
    return history.turnOrder[history.currentPlayerIndexTurn];
  };

  return that as HistorysApi;
}
