
import * as _ from 'lodash';

import { GameBoard, GameState, Piece, History, Turn } from '../../types/mule';

export interface MuleFnLibrary {
  getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): Q.Promise<any>;
  getPiecesOnSpace(gameState: GameState, spaceId: string): Piece[];
  getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): Piece[];
  getPiecesFromId(gameState: GameState, pieceId: number): Piece[];
  getClassesFromPieces(gameState: GameState, className: string): Piece[];

  markAllTurnsRead(history: History): void;
  getLastUnreadTurn(history: History): Turn | undefined;
  getLastRoundMeta(history: History): Turn | undefined;
  getWhosTurnIsIt(history: History): string;
}

//combines gameboard.board and gameboard.spaces (really just adds attributes)
export function getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): Q.Promise<any> {
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
}

export function getPiecesOnSpace(gameState: GameState, spaceId: string): Piece[] {
  const pieces: Piece[] = [];

  _.each(gameState.pieces, function (value) {
    if (value.locationId === spaceId) {
      pieces.push(value);
    }
  });

  return pieces;
}

export function getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): Piece[] {
  return _.filter(gameState.pieces, function (piece: Piece) {
    return piece.locationId === spaceId && piece.ownerId === ownerId;
  });
}

export function getPiecesFromId(gameState: GameState, pieceId: number): Piece[] {
  return _.filter(gameState.pieces, function (piece: Piece) {
    return pieceId === piece.id;
  });
}

export function getClassesFromPieces(gameState: GameState, className: string): Piece[] {
  const found: Piece[] = [];

  _.each(gameState.pieces, function (value: Piece) {
    if (value.class === className) {
      found.push(value);
    }
  });

  return found;
}


/////////// START SHIT hacky way for turns read by client
// TODO please get rid of or rewrite with new History/Turn relationship

var turnsRead: any;

export function markAllTurnsRead(history: History): void {
  if (!history.turns[0].length) throw 'only use markAllTurnsRead() with Full-ish History';

  turnsRead = {};
  _.each(history.turns, function (playerTurns: any, player) {
    turnsRead[player] = [];
    _.each(playerTurns, function (/*turn*/) {
      turnsRead[player].push(true);
    });
  });
  console.log(turnsRead);
}

export function getLastUnreadTurn(history: History): Turn | undefined {
  let _turn: Turn | undefined = undefined;

  _.each(history.turnOrder, function (value: string, playerIndex: number) {
    if (_turn || value === 'meta') return;

    var lastTurnNumber = turnsRead[value].length;
    console.log('las ' + lastTurnNumber)
    if (history.turns[playerIndex][lastTurnNumber]) {
      _turn = history.turns[playerIndex][lastTurnNumber];
      turnsRead[value].push(true);
      console.log('read ' + value + '\'s turn: ' + lastTurnNumber)
    }

  });

  return _turn;
}

export function getLastRoundMeta(history: History): Turn | undefined {
  if (!history.turns.meta) return undefined;

  return history.turns.meta[history.currentRound - 2];
}

// END SHIT

// for roundRobin
export function getWhosTurnIsIt(history: History): string {
  return history.turnOrder[history.currentPlayerIndexTurn];
}
