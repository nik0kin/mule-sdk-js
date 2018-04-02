/// <reference types="q" />
import { User, PlayersMap, MuleUserCreateResponse, MuleUserSessionResponse, MuleUserLoginRequest, MuleUserLoginResponse, Game, RuleBundle, GameBoard, GameState, History, Turn } from './mule';
import { FnLibrary } from '../shared/fn';
export interface UnknownType {
}
export interface UnknownErrorType {
}
export interface SDK {
    fn: FnLibrary;
    Users: UsersApi;
    Games: GamesApi;
    RuleBundles: RuleBundlesApi;
    GameBoards: GameBoardsApi;
    GameStates: GameStatesApi;
    Historys: HistorysApi;
    Turns: TurnsApi;
    PlayTurn: PlayTurnApi;
}
export interface GameBoardsApi {
    indexQ(): Q.Promise<GameBoard[]>;
    readQ(gameBoardId: string): Q.Promise<GameBoard>;
    readGamesBoardQ(gameId: string): Q.Promise<GameBoard>;
}
export interface GamesApi {
    indexQ(): Q.Promise<Game[]>;
    createQ(params: UnknownType): Q.Promise<UnknownType>;
    readQ(gameId: string): Q.Promise<Game>;
    readUsersGamesQ(userId: string): Q.Promise<Game[]>;
    readMyGamesQ(): Q.Promise<Game[]>;
    joinGameQ(gameId: string): Q.Promise<UnknownType>;
    getPlayersMapQ(game: Game): Q.Promise<PlayersMap>;
}
export interface GameStatesApi {
    indexQ(): Q.Promise<GameState[]>;
    createQ(params: UnknownType): Q.Promise<UnknownType>;
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
    createQ(params: UnknownType): Q.Promise<UnknownType>;
    readQ(ruleBundleId: string): Q.Promise<RuleBundle>;
}
export interface TurnsApi {
    readQ(historyId: string): Q.Promise<Turn>;
    readGamesTurnQ(gameId: string, turnNumber: number): Q.Promise<Turn>;
}
export interface UsersApi {
    getLoggedInUserId(): string | undefined;
    indexQ(): Q.Promise<User[]>;
    createQ(params: UnknownType): Q.Promise<MuleUserCreateResponse>;
    readQ(userId: string): Q.Promise<User>;
    sessionQ(): Q.Promise<MuleUserSessionResponse>;
    loginQ(params: MuleUserLoginRequest): Q.Promise<MuleUserLoginResponse>;
    readCacheQ(userId: string): Q.Promise<User | undefined>;
}
export interface PlayTurnApi {
    sendQ(params: UnknownType): Q.Promise<UnknownType>;
    sendGameTurnQ(gameId: string, params: UnknownType): Q.Promise<UnknownType>;
}