import { UnknownType } from './sdk';

export interface User {
  _id: string;
  username: string;
}

export interface UserCache {
  [userId: string]: User;
}

export enum DataModelTypes {
  Games = 'Games',
  GameBoards = 'GameBoards',
  Historys = 'Historys',
  RuleBundles = 'RuleBundles',
  GameStates = 'GameStates',
  PieceStates = 'PieceStates',
  SpaceStates = 'SpaceStates',
  Turns = 'Turns',
  Users = 'Users',
}

// TODO better name
export interface Persistable {
  _id: string;
}

export interface Game extends Persistable {
  gameBoard: string; // id
  gameStatus: string;
  maxPlayers: number;
  players: PlayersMap;
  name: string;
  nextTurnTime: Date;
  ruleBundle: {
    id: string;
    name: string;
  };
  ruleBundleGameSettings: {
    customBoardSettings: VariableMap; // TODO I believe this is a simplification that is wrong
  };
  turnProgressStyle: TurnProgressStyle;
  turnTimeLimit: number;
}

export interface PlayersMap {
  [playerRel: string]: PlayersMapPlayer; // playerRel = 'p1'
}
export interface PlayersMapPlayer {
  playerId: string;
  playerStatus: string;
  name?: string; // added by getPlayersMapQ()
}

export enum TurnProgressStyle {
  WaitProgress = 'waitprogress', // waits for all players to submit turns
  AutoProgress = 'autoprogress', // progresses after a timer
  AutoBoot = 'autoboot', // never implemented
}

export interface RuleBundle extends Persistable {
  name: string;
  turnSubmitStyle: TurnSubmitStyle;
  canAutoProgress: boolean;
  staticBoardSettings: {
    boardStyle: string;
  };
  gameSettings: {
    playerLimit:
      number | // maximum amount of players (1-x)
      number[] | // a set of allowed player amounts eg [2, 4, 6]
      {min: number, max: number}; // range of players amount
    customBoardSettings: VariableMap;
  };
  rules: {
    dynamicBoard: boolean; // if true, pass rules to generateGameBoard hook
    // TODO other stuff, see v general.json
  };
}

export enum TurnSubmitStyle {
  RoundRobin = 'roundRobin', // p1 plays -> progressTurn(p1) -> p2 plays -> progressTurn(p2) -> progressRound -> repeat til winCondition is true
  PlayByMail = 'playByMail', // wait til (p1 plays & p2 plays) -> progressRound -> repeat til winCondition is true
}

export interface GameBoardCache {
  [gameBoardId: string]: GameBoard;
}

export interface GameBoard extends Persistable {
  board: BoardSpace[];
  boardType: string;
  gameState: string; // id
  history: string; // id
  ruleBundle: {
    id: string;
    name: string;
  };
}

export interface BoardSpace {
  id: string;
  class: string;
  attributes?: VariableMap;
  edges: {id: string, moveableBy: string}[];
}

export interface GameState extends Persistable {
  globalVariables: VariableMap;
  pieces: PieceState[];
  playerVariables: {
    [playerRel: string]: VariableMap;
  };
  spaces: SpaceState[];
}

export interface PieceState extends Persistable {
  id: number; // TODO delete
  // ^ why delete?
  class: string;
  locationId: string;
  ownerId: string; // lobbyPlayerId
  attributes: VariableMap;
}

export interface SpaceState extends Persistable {
  _id: string;
  boardSpaceId: string;
  attributes: VariableMap;
}

export interface History<T> extends Persistable {
  currentPlayerIndexTurn: number;
  currentRound: number;
  currentTurn: number;
  currentTurnStatus: {
    [playerRel: string]: boolean;
  };
  gameId: string; // TODO deprecate (why is it needed?)
  turnOrder: string[]; // string = lobbyPlayerId
  turnSubmitStyle: TurnSubmitStyle;
  turns: HistoryTurns<T>;
  winner: string | undefined; // lobbyPlayerId or 'tie'
}

export type LiteHistory = History<TurnId>;
export type FullHistory = History<Turn>;

export interface HistoryTurns<T> {
  meta?: Turn[];
  [turnNumber: number]: T[];
}

export type TurnId = string; // mongo id

export interface Turn extends Persistable {
  gameId: string;
  turnNumber: number;
  metaTurn?: UnknownType[]; // TODO unsure if optional
  playerTurns: {
    [playerRel: string]: {
      actions: Action[];
      dateSubmitted: Date;
    }
  };
}

export interface Action {
  type: string;
  metadata?: VariableMap; // TODO unsure if optional
  params: VariableMap;
}

// this could use a better name
export interface VariableMap {
  [variableName: string]: string | number | boolean | object | Array<any> | undefined;
}
