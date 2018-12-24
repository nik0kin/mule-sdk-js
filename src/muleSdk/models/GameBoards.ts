import Promise from 'promise-polyfill';

import { GameBoard } from '../../types/mule';
import { GameBoardsApi, UnknownErrorType } from '../../types/sdk';

import { http } from '../utils/http';


export function initGameBoardsApi(contextPath: string): GameBoardsApi {

  const that: any = {};

  that.indexQ = function (): Promise<GameBoard[]> {
    return http.get(contextPath + 'gameBoards');
  };

  that.readQ = function (gameBoardId: string): Promise<GameBoard> {
    return http.get(contextPath + 'gameBoards/' + gameBoardId)
      .then(function (result: GameBoard) {
        that.cacheGameBoard(result);
        return result;
      });
  };

  that.readGamesBoardQ = function (gameId: string): Promise<GameBoard> {
    return http.get(contextPath + 'games/' + gameId + '/board');
  };

  ////// CACHING //////
  that.gameBoardsCache = {};

  that.cacheGameBoard = function (result: GameBoard): void {
    that.gameBoardsCache[result._id] = result;
  };

  that.readCacheQ = function (gameBoardId: string): Promise<GameBoard> {
    if (that.gameBoardsCache[gameBoardId]) {
      return Promise.resolve(that.gameBoardsCache[gameBoardId]);
    } else {
      return that.readQ(gameBoardId)
        .then(function (result: GameBoard) {
          that.gameBoardsCache[result._id] = result;
          return result;
        })
        .catch(function (err: UnknownErrorType) {
          console.log('WTF');
          throw err;
        });
    }
  };

  return that as GameBoardsApi;
}

