import {
  BoardSpace,
  Piece,
  Space,
  Turn,
} from './mule';

export interface BundleCode {
  boardGenerator?: Function;
  gameStart?: Function;

  progressTurn?: Function;
  progressRound?: Function;
  winCondition?: Function;
}

export interface MuleStateSdk { // aka M
  // Game
  getPlayerRels: () => string[];

  // GameBoard
  getBoardDefinition: () => BoardSpace[];
  getCustomBoardSettings: () => any;

  // History
  getCurrentTurnNumber: () => number;
  getCurrentRoundNumber: () => number;
  getCurrentTurn: () => Turn;

  // GameState
  getGlobalVariable: (key: string) => any;
  getGlobalVariables: () => any; // map?
  setGlobalVariable: (key: string, value: any) => void;
  addToGlobalVariable: (key: string, additionValue: number) => void;
  getPlayerVariable: (playerRel: string, key: string) => any;
  getPlayerVariables: (playerRel: string) => any; // map
  setPlayerVariable: (playerRel: string, key: string, value: any) => void;
  addToPlayerVariable: (playerRel: string, key: string, additionValue: number) => void;

  getSpace: (locationId: string) => Space;
  getSpaces: () => {[locationId: string]: Space};
  setSpace: (spaceId: string, spaceObject: Space) => void;

  addPiece: (pieceObject: Piece) => void;
  getPiece: (pieceId: string) => Piece;
  getPieces: (_searchArgs: GetPiecesSearchArgs) => Piece[];
  setPiece: (pieceId: string, pieceObject: Piece) => void;
  deletePiece: (pieceId: string) => void;
  deletePieces: (pieceIds: string[]) => void;

  // M
  persistQ: () => Promise<void>;
  log: (message: string) => void;
}

export interface GetPiecesSearchArgs {
  ownerId?: string;
  spaceId?: string;
  locationId?: string;
  className?: string;
  class?: string;
  attrs: any; // map
} 