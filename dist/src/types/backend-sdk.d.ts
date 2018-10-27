import { BoardSpace, PieceState, SpaceState, Turn, VariableMap } from './mule';
export declare type BundleHooks = 'customBoardSettingsValidator' | 'boardGenerator' | 'gameStart' | 'progressTurn' | 'progressRound' | 'winCondition';
export interface BundleCode {
    customBoardSettingsValidator?: CustomBoardSettingsValidatorHook;
    boardGenerator?: BoardGeneratorHook;
    gameStart?: GameStartHook;
    validateTurn: ValidateTurnHook;
    progressTurn?: ProgressTurnHook;
    progressRound?: ProgressRoundHook;
    winCondition?: WinConditionHook;
    actions: {
        [actionName: string]: ActionCode;
    };
}
export interface ActionCode {
    validateQ: ActionValidateHook;
    doQ: ActionExecuteHook;
}
export declare type CustomBoardSettingsValidatorHook = (customBoardSettings: VariableMap) => VariableMap;
export declare type BoardGeneratorHook = (customBoardSettings: VariableMap, ruleBundleRules: VariableMap) => Promise<BoardSpace[]>;
export declare type GameStartHook = (M: MuleStateSdk) => Promise<void>;
export declare type ValidateTurnHook = (M: MuleStateSdk, lobbyPlayerId: string, actions: VariableMap[]) => Promise<void>;
export declare type ProgressTurnHook = (M: MuleStateSdk) => Promise<VariableMap>;
export declare type ProgressRoundHook = (M: MuleStateSdk) => Promise<VariableMap>;
export declare type WinConditionHook = (M: MuleStateSdk) => Promise<string | null>;
export declare type ActionValidateHook = (M: MuleStateSdk, lobbyPlayerId: string, actionParams: VariableMap) => Promise<void>;
export declare type ActionExecuteHook = (M: MuleStateSdk, lobbyPlayerId: string, actionParams: VariableMap) => Promise<any>;
export interface MuleStateSdk {
    getPlayerRels: () => string[];
    getBoardDefinition: () => BoardSpace[];
    getCustomBoardSettings: () => any;
    getCurrentTurnNumber: () => number;
    getCurrentRoundNumber: () => number;
    getCurrentTurn: () => Turn;
    getGlobalVariable: (key: string) => any;
    getGlobalVariables: () => any;
    setGlobalVariable: (key: string, value: any) => void;
    addToGlobalVariable: (key: string, additionValue: number) => void;
    getPlayerVariable: (lobbyPlayerId: string, key: string) => any;
    getPlayerVariables: (lobbyPlayerId: string) => any;
    setPlayerVariable: (lobbyPlayerId: string, key: string, value: any) => void;
    addToPlayerVariable: (lobbyPlayerId: string, key: string, additionValue: number) => void;
    getSpace: (locationId: string) => SpaceState;
    getSpaces: () => {
        [locationId: string]: SpaceState;
    };
    setSpace: (spaceId: string, spaceObject: SpaceState) => void;
    addPiece: (pieceObject: PieceState) => number;
    getPiece: (pieceId: string) => PieceState;
    getPieces: (_searchArgs: GetPiecesSearchArgs) => PieceState[];
    setPiece: (pieceId: string, pieceObject: PieceState) => void;
    deletePiece: (pieceId: string) => void;
    deletePieces: (pieceIds: string[]) => void;
    persistQ: () => Promise<void>;
    log: (message: string) => void;
}
export interface GetPiecesSearchArgs {
    ownerId?: string;
    spaceId?: string;
    locationId?: string;
    className?: string;
    class?: string;
    attrs?: any;
}
