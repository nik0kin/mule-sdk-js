
import { clone, each, filter, find  } from 'lodash';

import {
  BoardSpace, GameBoard, GameState, History, PieceState,
  PlayByMailHistoryTurns, RoundRobinHistory, SpaceState,
} from '../../types/mule';

export interface MuleFnLibrary {
  getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace;
  getPiecesOnSpace(gameState: GameState, spaceId: string): PieceState[];
  getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): PieceState[];
  getPiece(gameState: GameState, pieceId: number): PieceState[];
  getClassesFromPieces(gameState: GameState, className: string): PieceState[];

  getWhosTurnIsIt(history: RoundRobinHistory): string;
  getPreviousTurnsFromPlayByMailHistory<T>(history: History<PlayByMailHistoryTurns<T>>): T[];
}

// combines gameboard.board and gameboard.spaces (really just adds attributes)
export function getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace {

  const foundSpace: BoardSpace | undefined = clone(find(gameBoard.board, (boardSpace: BoardSpace) => {
    return boardSpace.id === spaceId;
  }));

  if (!foundSpace) {
    throw new Error('bad id ' + spaceId);
  }

  gameState.spaces.forEach((spaceState: SpaceState) => {
    if (spaceState.boardSpaceId === spaceId) {
      foundSpace.attributes = spaceState.attributes; // TODO should we combine here (what if the Board.board (BoardSpace[]) attributes contain something that the SpaceState doesnt)
    }
  });

  return foundSpace;
}

export function getPiecesOnSpace(gameState: GameState, spaceId: string): PieceState[] {
  const pieces: PieceState[] = [];

  each(gameState.pieces, function (pieceState: PieceState) {
    if (pieceState.locationId === spaceId) {
      pieces.push(pieceState);
    }
  });

  return pieces;
}

export function getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): PieceState[] {
  return filter(gameState.pieces, function (piece: PieceState) {
    return piece.locationId === spaceId && piece.ownerId === ownerId;
  });
}

export function getPiece(gameState: GameState, pieceId: number): PieceState[] {
  return filter(gameState.pieces, function (piece: PieceState) {
    return pieceId === piece.id;
  });
}

// TODO rename
export function getClassesFromPieces(gameState: GameState, className: string): PieceState[] {
  const found: PieceState[] = [];

  each(gameState.pieces, function (value: PieceState) {
    if (value.class === className) {
      found.push(value);
    }
  });

  return found;
}

export function getWhosTurnIsIt(history: RoundRobinHistory): string {
  return history.turnOrder[history.currentPlayerIndexTurn];
}

export function getPreviousTurnsFromPlayByMailHistory<T>(history: History<PlayByMailHistoryTurns<T>>): T[] {
  return history.turns as T[];
}
