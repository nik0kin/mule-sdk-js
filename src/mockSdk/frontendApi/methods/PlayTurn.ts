import * as Q from 'q';

import { PlayTurnApi, UnknownType } from '../../../types/sdk';

export class MockPlayTurnApi implements PlayTurnApi {
  public sendQ = (params: UnknownType): Q.Promise<UnknownType> => {
    throw 'nyi' + params;
  }
  public sendGameTurnQ = (gameId: string, params: UnknownType): Q.Promise<UnknownType> => {
    throw 'nyi ' + gameId + ' ' + params;
  }
}