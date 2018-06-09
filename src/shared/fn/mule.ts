
import { clone, each, filter, find  } from 'lodash';

import { GameBoard, GameState, PieceState, History, Turn, BoardSpace, SpaceState } from '../../types/mule';

export interface MuleFnLibrary {
  getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace;
  getPiecesOnSpace(gameState: GameState, spaceId: string): PieceState[];
  getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): PieceState[];
  getPiecesFromId(gameState: GameState, pieceId: number): PieceState[];
  getClassesFromPieces(gameState: GameState, className: string): PieceState[];

  markAllTurnsRead(history: History): void;
  getLastUnreadTurn(history: History): Turn | undefined;
  getLastRoundMeta(history: History): Turn | undefined;
  getWhosTurnIsIt(history: History): string;
}

// combines gameboard.board and gameboard.spaces (really just adds attributes)
export function getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace {

  const foundSpace: BoardSpace | undefined = clone(find(gameBoard.board, (boardSpace: BoardSpace) => {
    return boardSpace.id === spaceId;
  }));

  if (!foundSpace) {
    throw 'bad id ' + spaceId;
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

export function getPiecesFromId(gameState: GameState, pieceId: number): PieceState[] {
  return filter(gameState.pieces, function (piece: PieceState) {
    return pieceId === piece.id;
  });
}

export function getClassesFromPieces(gameState: GameState, className: string): PieceState[] {
  const found: PieceState[] = [];

  each(gameState.pieces, function (value: PieceState) {
    if (value.class === className) {
      found.push(value);
    }
  });

  return found;
}


/////////// START SHIT hacky way for turns read by client
// TODO please get rid of or rewrite with new History/Turn relationship

var turnsRead: {[playerRel: string]: boolean[]};

export function markAllTurnsRead(history: History): void {
  if (!history.turns[0].length) throw 'only use markAllTurnsRead() with Full-ish History';

  turnsRead = {};
  each(history.turns, function (playerTurns: Turn[], player: string) {
    turnsRead[player] = [];
    each(playerTurns, function (/*turn*/) {
      turnsRead[player].push(true);
    });
  });
}

export function getLastUnreadTurn(fullHistory: History): Turn | undefined {
  let _turn: Turn | undefined = undefined;

  each(fullHistory.turnOrder, function (value: string, playerIndex: number) {
    if (_turn || value === 'meta') return;

    const lastTurnNumber = turnsRead[value].length;
    if (fullHistory.turns[playerIndex][lastTurnNumber]) {
      const turnOrId: string | Turn = fullHistory.turns[playerIndex][lastTurnNumber]; 
      _turn = (turnOrId as Turn)._id ? (turnOrId as Turn) : undefined;
      turnsRead[value].push(true);
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
