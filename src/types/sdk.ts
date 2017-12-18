import {
  User, UserCache, PlayersMap,
  MuleUserCreateResponse, MuleUserSessionResponse, MuleUserLoginResponse,
  Game, RuleBundle,
  GameBoard, GameState,
  GameBoardCache,
  History, Turn,
} from './mule';

import { FnLibrary } from '../shared/fn';

export interface SDK {
  fn: FnLibrary; // functional function library

  Users: UsersApi;
  Games: GamesApi;
  RuleBundles: RuleBundlesApi;
  GameBoards: GameBoardsApi;
  GameStates: GameStatesApi;
  Historys: HistorysApi;
  Turns: TurnsApi;

  PlayTurn: PlayTurnApi;

  // Spinal: Spinal
}

export interface GameBoardsApi {
  indexQ(): Q.Promise<GameBoard[]>;
  readQ(gameBoardId: string): Q.Promise<GameBoard>;
  readGamesBoardQ(gameId: string): Q.Promise<GameBoard>;
  gameBoardsCache: GameBoardCache;
  fakeCacheWrite(result: GameBoard): void;
  readCacheQ(gameBoardId: string): Q.Promise<GameBoard>;
}

export interface GamesApi {
  indexQ(): Q.Promise<Game[]>;
  createQ(params: any): Q.Promise<any>;
  readQ(gameId: string): Q.Promise<string>;
  readUsersGamesQ(userId: string): Q.Promise<Game[]>;
  readMyGamesQ(): Q.Promise<Game[]>;
  joinGameQ(gameId: string): Q.Promise<any>;
  getPlayersMapQ(game: Game): Q.Promise<PlayersMap>;
}

export interface GameStatesApi {
  indexQ(): Q.Promise<GameState[]>;
  createQ(params: any): Q.Promise<any>;
  readQ(gameStateId: string): Q.Promise<GameState>;
}

export interface HistorysApi {
  indexQ(): Q.Promise<History[]>;
  readQ(historyId: string): Q.Promise<History>;
  readGamesHistoryQ(gameId: string): Q.Promise<History>;
  readGamesFullHistoryQ(gameId: string): Q.Promise<History[]>;
}

export interface RuleBundlesApi {
  indexQ(): Q.Promise<RuleBundle[]>;
  createQ(params: any): Q.Promise<any>;
  readQ(ruleBundleId: string): Q.Promise<RuleBundle>;
}

export interface TurnsApi {
  readQ(historyId: string): Q.Promise<Turn>;
  readGamesTurnQ(gameId: string, turnNumber: number): Q.Promise<Turn>;
}

export interface UsersApi {
  getLoggedInUserId(): number | undefined;
  indexQ(): Q.Promise<User[]>;
  createQ(params: any): Q.Promise<MuleUserCreateResponse>;
  readQ(userId: string): Q.Promise<User>;
  sessionQ(): Q.Promise<MuleUserSessionResponse>;
  loginQ(params: any): Q.Promise<MuleUserLoginResponse>;
  usersCache: UserCache;
  fakeCacheWrite(result: User): void;
  readCacheQ(userId: string): Q.Promise<User | undefined>;
  indexCacheQ(force: boolean): Q.Promise<UserCache>;
}

export interface PlayTurnApi {
  sendQ(params: any): Q.Promise<any>;
  sendGameTurnQ(gameId: string, params: any): Q.Promise<any>;
}
