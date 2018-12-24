import Promise from 'promise-polyfill';

import { DataModelTypes, GameState } from '../../../types/mule';
import { GameStatesApi, UnknownType } from '../../../types/sdk';

import { database, genericGetData } from '../../mockBackend/data';

export class MockGameStatesApi implements GameStatesApi {
  public indexQ = (): Promise<GameState[]> => {
    return Promise.resolve(database.GameStates);
  }
  public createQ = (params: UnknownType): Promise<UnknownType> => {
    throw new Error('nyi ' + params);
  }
  public readQ: (gameStateId: string) => Promise<GameState> = genericGetData<GameState>(DataModelTypes.GameStates);
}

export const gameStatesApi: GameStatesApi = new MockGameStatesApi();
