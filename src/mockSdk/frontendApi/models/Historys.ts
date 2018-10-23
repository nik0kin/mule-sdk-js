
import { Promise, resolve } from 'q';

// @ts-ignore  (History is needed for better typing?)
import { DataModelTypes, History, Turn, FullHistory, LiteHistory } from '../../../types/mule';
import { HistorysApi } from '../../../types/sdk';

import { database, genericGetData } from '../../mockBackend/data';

export class MockHistorysApi implements HistorysApi {
  public indexQ = (): Promise<LiteHistory[]> => {
    return resolve(database.Historys);
  }
  public readQ: (gameStateId: string) => Promise<LiteHistory> = genericGetData<LiteHistory>(DataModelTypes.Historys);
  public readGamesHistoryQ = (gameId: string): Promise<LiteHistory> => {
    throw new Error('nyi ' + gameId);
  }
  public readGamesFullHistoryQ = (gameId: string): Promise<FullHistory> => {
    throw new Error('nyi ' + gameId);
  }
}

export const historysApi: HistorysApi = new MockHistorysApi();
