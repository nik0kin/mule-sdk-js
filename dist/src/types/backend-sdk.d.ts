import { BoardSpace, PieceState, SpaceState, Turn } from './mule';
export interface BundleCode {
    boardGenerator?: Function;
    gameStart?: Function;
    progressTurn?: Function;
    progressRound?: Function;
    winCondition?: Function;
}
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
    getPlayerVariable: (playerRel: string, key: string) => any;
    getPlayerVariables: (playerRel: string) => any;
    setPlayerVariable: (playerRel: string, key: string, value: any) => void;
    addToPlayerVariable: (playerRel: string, key: string, additionValue: number) => void;
    getSpace: (locationId: string) => SpaceState;
    getSpaces: () => {
        [locationId: string]: SpaceState;
    };
    setSpace: (spaceId: string, spaceObject: SpaceState) => void;
    addPiece: (pieceObject: PieceState) => void;
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
    attrs: any;
}
