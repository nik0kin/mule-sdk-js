
import { Promise, resolve } from 'q';

import { DataModelTypes, History } from '../../../types/mule';
import { HistorysApi } from '../../../types/sdk';

import { database, genericGetData } from '../../mockBackend/data';

export class MockHistorysApi implements HistorysApi {
  public indexQ = (): Promise<History[]> => {
    return resolve(database.Historys);
  }
  public readQ: (gameStateId: string) => Promise<History> = genericGetData<History>(DataModelTypes.Historys);
  public readGamesHistoryQ = (gameId: string): Promise<History> => {
    throw new Error('nyi ' + gameId);
  }
  public readGamesFullHistoryQ = (gameId: string): Promise<History> => {
    throw new Error('nyi ' + gameId);
  }
}

export const historysApi: HistorysApi = new MockHistorysApi();
