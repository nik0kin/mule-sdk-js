export interface User {
    _id: string;
    username: string;
}
export interface MuleUserCreateResponse {
    userId: string;
}
export declare type MuleUserSessionResponse = User;
export interface MuleUserLoginRequest {
    username: string;
    password: string;
}
export interface MuleUserLoginResponse {
    userId: string;
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
    Users = "Users",
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
    [playerNum: string]: {
        playerId: string;
        playerStatus: string;
        name?: string;
    };
}
export declare enum TurnProgressStyle {
    WaitProgress = "waitprogress",
    AutoProgress = "autoprogress",
    AutoBoot = "autoboot",
}
export interface RuleBundle extends Persistable {
    name: string;
    turnSubmitStyle: TurnSubmitStyle;
    canAutoProgress: boolean;
    staticBoardSettings: {
        boardStyle: string;
    };
    gameSettings: {
        playerLimit: number;
        customBoardSettings: VariableMap;
    };
}
export declare enum TurnSubmitStyle {
    RoundRobin = "roundRobin",
    PlayByMail = "playByMail",
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
        [playerNum: string]: VariableMap;
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
export interface History extends Persistable {
    currentPlayerIndexTurn: number;
    currentRound: number;
    currentTurn: number;
    currentTurnStatus: {
        [playerNum: string]: boolean;
    };
    gameId: string;
    turnOrder: string[];
    turnSubmitStyle: TurnSubmitStyle;
    turns: {
        meta?: Turn[];
        [turnIndex: number]: Turn[];
    };
}
export interface Turn extends Persistable {
    gameId: string;
    playerTurns: {
        [playerNum: string]: {
            actions: Action[];
            dateSubmitted: Date;
        };
    };
}
export interface Action {
}
export interface VariableMap {
    [variableName: string]: string | number | boolean | object;
}
