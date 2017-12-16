import * as Q from 'q';

import { qwest } from '../utils/qwest';

export interface PlayTurnApi {
  sendQ(params: any): Q.Promise<any>;
  sendGameTurnQ(gameId: string, params: any): Q.Promise<any>;
}

export function initPlayTurnApi(contextPath: string): PlayTurnApi {
  const that: any = {};

  that.sendQ = function (params: any): Q.Promise<any> {
    return qwest.post(contextPath + 'playTurn', params);
  };

  that.sendGameTurnQ = function (gameId: string, params: any): Q.Promise<any> {
    return qwest.post(contextPath + 'games/' + gameId + '/playTurn', params);
  };

  return that;
}
