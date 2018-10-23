import { GameBoard, GameState, PieceState, History, FullHistory, Turn, BoardSpace, TurnId } from '../../types/mule';
export interface MuleFnLibrary {
    getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace;
    getPiecesOnSpace(gameState: GameState, spaceId: string): PieceState[];
    getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): PieceState[];
    getPiecesFromId(gameState: GameState, pieceId: number): PieceState[];
    getClassesFromPieces(gameState: GameState, className: string): PieceState[];
    markAllTurnsRead(history: FullHistory): void;
    getLastUnreadTurn(history: History<Turn | TurnId>): Turn | undefined;
    getLastRoundMeta(history: History<Turn | TurnId>): Turn | undefined;
    getWhosTurnIsIt(history: History<Turn | TurnId>): string;
}
export declare function getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace;
export declare function getPiecesOnSpace(gameState: GameState, spaceId: string): PieceState[];
export declare function getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): PieceState[];
export declare function getPiecesFromId(gameState: GameState, pieceId: number): PieceState[];
export declare function getClassesFromPieces(gameState: GameState, className: string): PieceState[];
export declare function markAllTurnsRead(history: FullHistory): void;
export declare function getLastUnreadTurn(fullHistory: History<Turn | TurnId>): Turn | undefined;
export declare function getLastRoundMeta(history: History<Turn | TurnId>): Turn | undefined;
export declare function getWhosTurnIsIt(history: History<Turn | TurnId>): string;
