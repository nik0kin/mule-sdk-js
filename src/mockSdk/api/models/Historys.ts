
import * as Q from 'q';

import { History } from '../../../types/mule';
import { HistorysApi } from '../../../types/sdk';

export class MockHistorysApi implements HistorysApi {
  public indexQ = (): Q.Promise<History[]> => {
    return Q.resolve([]);
  }
  public readQ = (historyId: string): Q.Promise<History> => {
    throw 'nyi ' + historyId;
  }
  public readGamesHistoryQ = (gameId: string): Q.Promise<History> => {
    throw 'nyi ' + gameId;
  }
  public readGamesFullHistoryQ = (gameId: string): Q.Promise<History[]> => {
    throw 'nyi ' + gameId;
  }
}
