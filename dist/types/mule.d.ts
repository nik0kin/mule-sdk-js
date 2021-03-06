import { UnknownType } from './sdk';
export interface User {
    _id: string;
    username: string;
}
export interface UserCache {
    [userId: string]: User;
}
export declare enum DataModelTypes {
    Games = "Games",
    GameBoards = "GameBoards",
    Historys = "Historys",
    RuleBundles = "RuleBundles",
    GameStates = "GameStates",
    PieceStates = "PieceStates",
    SpaceStates = "SpaceStates",
    Turns = "Turns",
    Users = "Users"
}
export interface Persistable {
    _id: string;
}
export interface Game extends Persistable {
    gameBoard: string;
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
        customBoardSettings: VariableMap;
    };
    turnProgressStyle: TurnProgressStyle;
    turnTimeLimit: number;
}
export interface PlayersMap {
    [playerRel: string]: PlayersMapPlayer;
}
export interface PlayersMapPlayer {
    playerId: string;
    playerStatus: string;
    name?: string;
}
export declare enum TurnProgressStyle {
    WaitProgress = "waitprogress",
    AutoProgress = "autoprogress",
    AutoBoot = "autoboot"
}
export interface RuleBundle extends Persistable {
    name: string;
    turnSubmitStyle: TurnSubmitStyle;
    canAutoProgress: boolean;
    staticBoardSettings: {
        boardStyle: string;
    };
    gameSettings: {
        playerLimit: number | // maximum amount of players (1-x)
        number[] | // a set of allowed player amounts eg [2, 4, 6]
        {
            min: number;
            max: number;
        };
        customBoardSettings: VariableMap;
    };
    rules: {
        dynamicBoard: boolean;
    };
}
export declare enum TurnSubmitStyle {
    RoundRobin = "roundRobin",
    PlayByMail = "playByMail"
}
export interface GameBoardCache {
    [gameBoardId: string]: GameBoard;
}
export interface GameBoard extends Persistable {
    board: BoardSpace[];
    boardType: string;
    gameState: string;
    history: string;
    ruleBundle: {
        id: string;
        name: string;
    };
}
export interface BoardSpace {
    id: string;
    class: string;
    attributes?: VariableMap;
    edges: {
        id: string;
        moveableBy: string;
    }[];
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
    id: number;
    class: string;
    locationId: string;
    ownerId: string;
    attributes: VariableMap;
}
export interface SpaceState extends Persistable {
    _id: string;
    boardSpaceId: string;
    attributes: VariableMap;
}
export interface History<THistoryTurns> extends Persistable {
    currentPlayerIndexTurn: number;
    currentRound: number;
    currentTurn: number;
    currentTurnStatus: {
        [playerRel: string]: boolean;
    };
    gameId: string;
    turnOrder: string[];
    turnSubmitStyle: TurnSubmitStyle;
    turns: THistoryTurns;
    winner: string | undefined;
}
export declare type FullHistory = FullRoundRobinHistory | FullPlayByMailHistory;
export declare type LiteHistory = LiteRoundRobinHistory | LitePlayByMailHistory;
export declare type RoundRobinHistory = LiteRoundRobinHistory | FullRoundRobinHistory;
export declare type PlayByMailHistory = LitePlayByMailHistory | FullPlayByMailHistory;
export declare type LiteRoundRobinHistory = History<RoundRobinHistoryTurns<TurnId>>;
export declare type FullRoundRobinHistory = History<RoundRobinHistoryTurns<Turn>>;
export declare type LitePlayByMailHistory = History<PlayByMailHistoryTurns<TurnId>>;
export declare type FullPlayByMailHistory = History<PlayByMailHistoryTurns<Turn>>;
export interface RoundRobinHistoryTurns<T> {
    [turnNumber: number]: T[];
}
export interface PlayByMailHistoryTurns<T> {
    [turnNumber: number]: T;
}
export declare type TurnId = string;
export interface Turn extends Persistable {
    gameId: string;
    turnNumber: number;
    metaTurn?: UnknownType[];
    playerTurns: {
        [playerRel: string]: {
            actions: Action[];
            dateSubmitted: Date;
        };
    };
}
export interface Action {
    type: string;
    metadata?: VariableMap;
    params: VariableMap;
}
export interface VariableMap {
    [variableName: string]: string | number | boolean | object | Array<any> | undefined;
}
