
import * as Q from 'q';

import { GameBoard } from '../../types/mule';
import { GameBoardsApi } from '../../types/sdk';

import { http } from '../utils/http';


export function initGameBoardsApi(contextPath: string): GameBoardsApi {

  const that: any = {};

  that.indexQ = function (): Q.Promise<GameBoard[]> {
    return http.get(contextPath + 'gameBoards');
  };

  that.readQ = function (gameBoardId: string): Q.Promise<GameBoard> {
    return http.get(contextPath + 'gameBoards/' + gameBoardId)
      .then(function (result) {
        that.cacheGameBoard(result);
        return result;
      });
  };

  that.readGamesBoardQ = function (gameId: string): Q.Promise<GameBoard> {
    return http.get(contextPath + 'games/' + gameId + '/board');
  };

  ////// CACHING //////
  that.gameBoardsCache = {};

  that.cacheGameBoard = function (result: GameBoard): void {
    that.gameBoardsCache[result._id] = result;
  };

  that.readCacheQ = function (gameBoardId: string): Q.Promise<GameBoard> {
    return Q.Promise(function (resolve, reject) {
      if (that.gameBoardsCache[gameBoardId]) {
        resolve(that.gameBoardsCache[gameBoardId]);
      } else {
        that.readQ(gameBoardId)
          .then(function (result: GameBoard) {
            that.gameBoardsCache[result._id] = result;
            resolve(result);
          })
          .catch(function (err: any) {
            console.log('WTF')
            reject(err)
          });
      }
    });
  };

  return that as GameBoardsApi;
}

