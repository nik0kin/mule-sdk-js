import * as Q from 'q';

import { Turn } from '../../types/mule';
import { TurnsApi } from '../../types/sdk';

import { qwest } from '../utils/qwest';

export function initTurnsApi(contextPath: string): TurnsApi {
  const that: any = {};

  that.readQ = function (turnId: string): Q.Promise<Turn> {
    return qwest.get(contextPath + 'turns/' + turnId);
  };

  that.readGamesTurnQ = function (gameId: string, turnNumber: number): Q.Promise<Turn> {
    return qwest.get(contextPath + 'games/' + gameId + '/history/' + turnNumber);
  };

  return that as TurnsApi;
}
