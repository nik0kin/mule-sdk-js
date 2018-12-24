import { FullHistory, LiteHistory } from '../../types/mule';
import { HistorysApi } from '../../types/sdk';

import { http } from '../utils/http';

export function initHistorysApi(contextPath: string): HistorysApi {
  const that: any = {};

  that.indexQ = function (): Promise<LiteHistory[]> {
    return http.get(contextPath + 'historys');
  };

  that.readQ = function (historyId: string): Promise<LiteHistory> {
    return http.get(contextPath + 'historys/' + historyId);
  };

  that.readGamesHistoryQ = function (gameId: string): Promise<LiteHistory> {
    return http.get(contextPath + 'games/' + gameId + '/history'/*, null, {responseType: 'json'}*/);
  };

  that.readGamesFullHistoryQ = function (gameId: string): Promise<FullHistory> {
    return http.get(contextPath + 'games/' + gameId + '/history/all');
  };

  return that as HistorysApi;
}
