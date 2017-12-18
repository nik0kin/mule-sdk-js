import * as Q from 'q';

import { PlayTurnApi } from '../../types/sdk';

import { http } from '../utils/http';

export function initPlayTurnApi(contextPath: string): PlayTurnApi {
  const that: any = {};

  that.sendQ = function (params: any): Q.Promise<any> {
    return http.post(contextPath + 'playTurn', params);
  };

  that.sendGameTurnQ = function (gameId: string, params: any): Q.Promise<any> {
    return http.post(contextPath + 'games/' + gameId + '/playTurn', params);
  };

  return that;
}
