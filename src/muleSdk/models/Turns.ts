import { Turn } from '../../types/mule';
import { TurnsApi } from '../../types/sdk';

import { http } from '../utils/http';

export function initTurnsApi(contextPath: string): TurnsApi {
  const that: any = {};

  that.readQ = function (turnId: string): Promise<Turn> {
    return http.get(contextPath + 'turns/' + turnId);
  };

  that.readGamesTurnQ = function (gameId: string, turnNumber: number): Promise<Turn> {
    return http.get(contextPath + 'games/' + gameId + '/history/' + turnNumber);
  };

  return that as TurnsApi;
}
