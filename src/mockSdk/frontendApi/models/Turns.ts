import { DataModelTypes, Turn } from '../../../types/mule';
import { TurnsApi } from '../../../types/sdk';

import { genericGetData } from '../../mockBackend/data';

export class MockTurnsApi implements TurnsApi {
  public readQ: (turnId: string) => Promise<Turn> = genericGetData<Turn>(DataModelTypes.Turns);
  public readGamesTurnQ = (gameId: string, turnNumber: number): Promise<Turn> => {
    throw new Error('nyi ' + gameId + ' ' + turnNumber);
  }
}

export const turnsApi: TurnsApi = new MockTurnsApi();
