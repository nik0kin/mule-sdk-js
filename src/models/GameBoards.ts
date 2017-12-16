
import * as Q from 'q';
import * as _ from 'lodash';

import { GameBoard, GameState, Piece } from '../../types/mule';
import { GameBoardsApi } from '../../types/sdk';

import { qwest } from '../utils/qwest';


export function initGameBoardsApi(contextPath: string): GameBoardsApi {

  const that: any = {};

  that.indexQ = function (): Q.Promise<GameBoard[]> {
    return qwest.get(contextPath + 'gameBoards');
  };

  that.readQ = function (gameBoardId: string): Q.Promise<GameBoard> {
    return qwest.get(contextPath + 'gameBoards/' + gameBoardId)
      .then(function (result) {
        that.fakeCacheWrite(result);
        return result;
      });
  };

  that.readGamesBoardQ = function (gameId: string): Q.Promise<GameBoard> {
    return qwest.get(contextPath + 'games/' + gameId + '/board');
  };

  ////// CACHING //////
  that.gameBoardsCache = {};

  that.fakeCacheWrite = function (result: GameBoard): void {
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

  //combines gameboard.board and gameboard.spaces (really just adds attributes)
  that.getFullSpaceInfo = function (gameBoard: GameBoard, gameState: GameState, spaceId: string): Q.Promise<any> {
    var foundSpace: any;

    _.each(gameBoard.board, function (value) {
      if (value.id === spaceId) {
        foundSpace = _.clone(value);
      }
    });

    if (!foundSpace) {
      throw 'bad id ' + spaceId;
    }

    _.each(gameState.spaces, function (value) {
      if (value.boardSpaceId === spaceId) {
        foundSpace.attributes = value.attributes;
      }
    });

    return foundSpace;
  };

  that.getPiecesOnSpace = function (gameState: GameState, spaceId: string): Piece[] {
    const pieces: Piece[] = [];

    _.each(gameState.pieces, function (value) {
      if (value.locationId === spaceId) {
        pieces.push(value);
      }
    });

    return pieces;
  };

  that.getPiecesByOwnerIdOnSpaceId = function (gameState: GameState, spaceId: string, ownerId: string): Piece[] {
    return _.filter(gameState.pieces, function (piece: Piece) {
      return piece.locationId === spaceId && piece.ownerId === ownerId;
    });
  };

  that.getPiecesFromId = function (gameState: GameState, pieceId: number): Piece[] {
    return _.filter(gameState.pieces, function (piece: Piece) {
      return pieceId === piece.id;
    });
  };

  that.getClassesFromPieces = function (gameState: GameState, className: string): Piece[] {
    const found: Piece[] = [];

    _.each(gameState.pieces, function (value: Piece) {
      if (value.class === className) {
        found.push(value);
      }
    });

    return found;
  };

  return that as GameBoardsApi;
}

