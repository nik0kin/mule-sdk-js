
import * as Q from 'q';

import { qwest } from '../utils/qwest';

export interface GameStatesApi {
  indexQ(): Q.Promise<GameState[]>;
  createQ(params: any): Q.Promise<any>;
  readQ(gameStateId: string): Q.Promise<GameState>;
}

export interface GameState {
  globalVariables: {[variable: string]: string | number | boolean};
  pieces: Piece[];
  playerVariables: {
    [playerNum: string]: {[variable: string]: string | number | boolean};
  };
  spaces: Space[];
}

export interface Piece {
  _id: string;
  id: number;
  class: string;
  locationId: string;
  ownerId: string; // playerNum (eg. p1)
}

export interface Space {
  _id: string;
  boardSpaceId: string;
  attributes: {[attribute: string]: string | number | boolean};
}

export function initGameStatesApi(contextPath: string) {
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
