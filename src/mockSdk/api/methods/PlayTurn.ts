import * as Q from 'q';

import { PlayTurnApi } from '../../../types/sdk';

export class MockPlayTurnApi implements PlayTurnApi {
  public sendQ = (params: any): Q.Promise<any> => {
    throw 'nyi' + params;
  }
  public sendGameTurnQ = (gameId: string, params: any): Q.Promise<any> => {
    throw 'nyi ' + gameId + ' ' + params;
  }
}