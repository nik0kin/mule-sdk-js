
import { Promise, resolve } from 'q';

import { DataModelTypes, GameState } from '../../../types/mule';
import { GameStatesApi } from '../../../types/sdk';

import { database, genericGetData } from '../../mockBackend/data';

export class MockGameStatesApi implements GameStatesApi {
  public indexQ = (): Promise<GameState[]> => {
    return resolve(database.GameStates);
  }
  public createQ = (params: any): Promise<any> => {
    throw 'nyi ' + params;
  }
  public readQ: (gameStateId: string) => Promise<GameState> = genericGetData<GameState>(DataModelTypes.GameStates);
}

export const gameStatesApi: GameStatesApi = new MockGameStatesApi();
