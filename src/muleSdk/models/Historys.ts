import * as Q from 'q';

import { FullHistory, LiteHistory } from '../../types/mule';
import { HistorysApi } from '../../types/sdk';

import { http } from '../utils/http';

export function initHistorysApi(contextPath: string): HistorysApi {
  const that: any = {};

  that.indexQ = function (): Q.Promise<LiteHistory[]> {
    return http.get(contextPath + 'historys');
  };

  that.readQ = function (historyId: string): Q.Promise<LiteHistory> {
    return http.get(contextPath + 'historys/' + historyId);
  };

  that.readGamesHistoryQ = function (gameId: string): Q.Promise<LiteHistory> {
    return http.get(contextPath + 'games/' + gameId + '/history'/*, null, {responseType: 'json'}*/);
  };

  that.readGamesFullHistoryQ = function (gameId: string): Q.Promise<FullHistory> {
    return http.get(contextPath + 'games/' + gameId + '/history/all');
  };

  return that as HistorysApi;
}
