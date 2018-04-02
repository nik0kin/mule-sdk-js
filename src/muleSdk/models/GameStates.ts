
import * as Q from 'q';

import { GameState } from '../../types/mule';
import { GameStatesApi } from '../../types/sdk';

import { http } from '../utils/http';

export function initGameStatesApi(contextPath: string): GameStatesApi {
  const that: any = {};

  that.indexQ = function (): Q.Promise<GameState[]> {
    return http.get(contextPath + 'historys');
  };

  that.readQ = function (gameStateId: string): Q.Promise<GameState> {
    return http.get(contextPath + 'gameStates/' + gameStateId);
  };

  that.readGamesStateQ = function (gameId: string): Q.Promise<GameState> {
    return http.get(contextPath + 'games/' + gameId + '/state');
  };

  return that as GameStatesApi;
}
