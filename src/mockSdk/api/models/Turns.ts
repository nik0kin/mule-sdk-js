
import * as Q from 'q';

import { Turn } from '../../../types/mule';
import { TurnsApi } from '../../../types/sdk';

export class MockTurnsApi implements TurnsApi {
  public readQ = (historyId: string): Q.Promise<Turn> => {
    throw 'nyi ' + historyId;
  }
  public readGamesTurnQ = (gameId: string, turnNumber: number): Q.Promise<Turn> => {
    throw 'nyi ' + gameId + turnNumber;
  }
}
