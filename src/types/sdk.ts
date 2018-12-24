import {
  User, PlayersMap,
  // UserCache,
  Game, RuleBundle,
  GameBoard, GameState,
  // GameBoardCache,
  FullHistory, LiteHistory, Turn,
} from './mule';

import {
  MuleUserCreateResponse, MuleUserSessionResponse,
  MuleUserLoginRequest, MuleUserLoginResponse,
  MuleGamesPlayTurnRequest, MulePlayTurnRequest, MulePlayTurnResponse,
} from './mule-http';

import { FnLibrary } from '../shared/fn';

export interface UnknownType {} // TODO;
export interface UnknownErrorType {} // TODO;

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
  indexQ(): Promise<GameBoard[]>;
  readQ(gameBoardId: string): Promise<GameBoard>;
  readGamesBoardQ(gameId: string): Promise<GameBoard>;
  // gameBoardsCache: GameBoardCache;
  // cacheGameBoard(result: GameBoard): void;
  // readCacheQ(gameBoardId: string): Promise<GameBoard>;
}

export interface GamesApi {
  indexQ(): Promise<Game[]>;
  createQ(params: UnknownType): Promise<UnknownType>;
  readQ(gameId: string): Promise<Game>;
  readUsersGamesQ(userId: string): Promise<Game[]>;
  readMyGamesQ(): Promise<Game[]>;
  joinGameQ(gameId: string): Promise<UnknownType>;
  getPlayersMapQ(game: Game): Promise<PlayersMap>;
}

export interface GameStatesApi {
  indexQ(): Promise<GameState[]>;
  createQ(params: UnknownType): Promise<UnknownType>;
  readQ(gameStateId: string): Promise<GameState>;
}

export interface HistorysApi {
  indexQ(): Promise<LiteHistory[]>;
  readQ(historyId: string): Promise<LiteHistory>;
  readGamesHistoryQ(gameId: string): Promise<LiteHistory>;
  readGamesFullHistoryQ(gameId: string): Promise<FullHistory>;
}

export interface RuleBundlesApi {
  indexQ(): Promise<RuleBundle[]>;
  createQ(params: UnknownType): Promise<UnknownType>;
  readQ(ruleBundleId: string): Promise<RuleBundle>;
}

export interface TurnsApi {
  readQ(historyId: string): Promise<Turn>;
  readGamesTurnQ(gameId: string, turnNumber: number): Promise<Turn>;
}

export interface UsersApi {
  getLoggedInUserId(): string | undefined;
  indexQ(): Promise<User[]>;
  createQ(params: UnknownType): Promise<MuleUserCreateResponse>;
  readQ(userId: string): Promise<User>;
  sessionQ(): Promise<MuleUserSessionResponse>;
  loginQ(params: MuleUserLoginRequest): Promise<MuleUserLoginResponse>;
  // usersCache: UserCache;
  // cacheUser(result: User): void;
  readCacheQ(userId: string): Promise<User | undefined>;
  // indexCacheQ(force: boolean): Promise<UserCache>;
}

export interface PlayTurnApi {
  sendQ(params: MuleGamesPlayTurnRequest): Promise<MulePlayTurnResponse>;
  sendGameTurnQ(gameId: string, params: MulePlayTurnRequest): Promise<MulePlayTurnResponse>;
}
