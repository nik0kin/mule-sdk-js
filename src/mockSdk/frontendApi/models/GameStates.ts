
import * as Q from 'q';

import { GameState } from '../../../types/mule';
import { GameStatesApi } from '../../../types/sdk';

export class MockGameStatesApi implements GameStatesApi {
  indexQ = (): Q.Promise<GameState[]> => {
    return Q.resolve([]);
  }
  createQ = (params: any): Q.Promise<any> => {
    throw 'nyi ' + params;
  }
  readQ = (gameStateId: string): Q.Promise<GameState> => {
    throw 'nyi ' + gameStateId;
  }
}
