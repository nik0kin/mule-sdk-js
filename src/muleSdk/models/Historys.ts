import * as Q from 'q';

import { History } from '../../types/mule';
import { HistorysApi } from '../../types/sdk';

import { http } from '../utils/http';

export function initHistorysApi(contextPath: string): HistorysApi {
  const that: any = {};

  that.indexQ = function (): Q.Promise<History[]> {
    return http.get(contextPath + 'historys');
  };

  that.readQ = function (historyId: string): Q.Promise<History> {
    return http.get(contextPath + 'historys/' + historyId);
  };

  that.readGamesHistoryQ = function (gameId: string): Q.Promise<History> {
    return http.get(contextPath + 'games/' + gameId + '/history'/*, null, {responseType: 'json'}*/);
  };

  that.readGamesFullHistoryQ = function (gameId: string): Q.Promise<History> {
    return http.get(contextPath + 'games/' + gameId + '/history/all');
  };

  return that as HistorysApi;
}
