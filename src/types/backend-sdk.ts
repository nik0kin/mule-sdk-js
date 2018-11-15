import {
  BoardSpace,
  PieceState,
  SpaceState,
  Turn,
  VariableMap,
} from './mule';

export type BundleHooks
  = 'customBoardSettingsValidator' | 'boardGenerator' | 'gameStart' | 'progressTurn' | 'progressRound' | 'winCondition';

export interface BundleCode {
  customBoardSettingsValidator?: CustomBoardSettingsValidatorHook;
  boardGenerator?: BoardGeneratorHook;
  gameStart?: GameStartHook;

  validateTurn: ValidateTurnHook;
  progressTurn?: ProgressTurnHook;
  progressRound?: ProgressRoundHook;
  winCondition?: WinConditionHook;

  actions: {[actionName: string]: ActionCode};
}

export interface ActionCode {
  validateQ: ActionValidateHook;
  doQ: ActionExecuteHook;
}

export type CustomBoardSettingsValidatorHook // TODO a type for customBoardSettings
  = (customBoardSettings: VariableMap) => VariableMap; // invalid settings are returned

export type BoardGeneratorHook
  = (customBoardSettings: VariableMap, ruleBundleRules: VariableMap) => Promise<BoardSpace[]>;

export type GameStartHook = (M: MuleStateSdk) => Promise<void>;

export type ValidateTurnHook
 = (M: MuleStateSdk, lobbyPlayerId: string, actions: VariableMap[]) => Promise<void>; // throw Errors if Turn is invalid

export type ProgressTurnHook = (M: MuleStateSdk) => Promise<VariableMap>; // metadata is returned
export type ProgressRoundHook = (M: MuleStateSdk) => Promise<VariableMap>;

export type WinConditionHook = (M: MuleStateSdk) => Promise<string | null>; // winner's lobbyPlayerId, 'tie', or null

export type ActionValidateHook
  = (M: MuleStateSdk, lobbyPlayerId: string, actionParams: VariableMap) => Promise<void>; // throw Errors if Action is invalid
export type ActionExecuteHook
  = (M: MuleStateSdk, lobbyPlayerId: string, actionParams: VariableMap) => Promise<any>; // returns actionMetaData: any

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
  getPlayerVariable: (lobbyPlayerId: string, key: string) => any;
  getPlayerVariables: (lobbyPlayerId: string) => any; // map
  setPlayerVariable: (lobbyPlayerId: string, key: string, value: any) => void;
  addToPlayerVariable: (lobbyPlayerId: string, key: string, additionValue: number) => void;

  getSpace: (locationId: string) => SpaceState;
  getSpaces: () => {[locationId: string]: SpaceState};
  setSpace: (locationId: string, spaceObject: SpaceState) => void;

  addPiece: (pieceObject: PieceState) => number;
  getPiece: (pieceId: number) => PieceState;
  getPieces: (_searchArgs: GetPiecesSearchArgs) => PieceState[];
  setPiece: (pieceId: number, pieceObject: PieceState) => void;
  deletePiece: (pieceId: number) => void;
  deletePieces: (pieceIds: number[]) => void;

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
  attrs?: any; // map
}