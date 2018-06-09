import { GameBoard, GameState, PieceState, History, Turn, BoardSpace } from '../../types/mule';
export interface MuleFnLibrary {
    getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace;
    getPiecesOnSpace(gameState: GameState, spaceId: string): PieceState[];
    getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): PieceState[];
    getPiecesFromId(gameState: GameState, pieceId: number): PieceState[];
    getClassesFromPieces(gameState: GameState, className: string): PieceState[];
    markAllTurnsRead(history: History): void;
    getLastUnreadTurn(history: History): Turn | undefined;
    getLastRoundMeta(history: History): Turn | undefined;
    getWhosTurnIsIt(history: History): string;
}
export declare function getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace;
export declare function getPiecesOnSpace(gameState: GameState, spaceId: string): PieceState[];
export declare function getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): PieceState[];
export declare function getPiecesFromId(gameState: GameState, pieceId: number): PieceState[];
export declare function getClassesFromPieces(gameState: GameState, className: string): PieceState[];
export declare function markAllTurnsRead(history: History): void;
export declare function getLastUnreadTurn(fullHistory: History): Turn | undefined;
export declare function getLastRoundMeta(history: History): Turn | undefined;
export declare function getWhosTurnIsIt(history: History): string;
