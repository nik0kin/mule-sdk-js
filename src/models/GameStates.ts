
import * as Q from 'q';

import { GameState } from '../../types/mule';
import { GameStatesApi } from '../../types/sdk';

import { qwest } from '../utils/qwest';

export function initGameStatesApi(contextPath: string): GameStatesApi {
  const that: any = {};

  that.indexQ = function (): Q.Promise<GameState[]> {
    return qwest.get(contextPath + 'historys');
  };

  that.readQ = function (gameStateId: string): Q.Promise<GameState> {
    return qwest.get(contextPath + 'gameStates/' + gameStateId);
  };

  that.readGamesStateQ = function (gameId: string): Q.Promise<GameState> {
    return qwest.get(contextPath + 'games/' + gameId + '/state');
  };

  return that as GameStatesApi;
};
