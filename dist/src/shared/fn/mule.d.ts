import { BoardSpace, GameBoard, GameState, PieceState, RoundRobinHistory } from '../../types/mule';
export interface MuleFnLibrary {
    getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace;
    getPiecesOnSpace(gameState: GameState, spaceId: string): PieceState[];
    getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): PieceState[];
    getPiece(gameState: GameState, pieceId: number): PieceState[];
    getClassesFromPieces(gameState: GameState, className: string): PieceState[];
    getWhosTurnIsIt(history: RoundRobinHistory): string;
}
export declare function getFullSpaceInfo(gameBoard: GameBoard, gameState: GameState, spaceId: string): BoardSpace;
export declare function getPiecesOnSpace(gameState: GameState, spaceId: string): PieceState[];
export declare function getPiecesByOwnerIdOnSpaceId(gameState: GameState, spaceId: string, ownerId: string): PieceState[];
export declare function getPiece(gameState: GameState, pieceId: number): PieceState[];
export declare function getClassesFromPieces(gameState: GameState, className: string): PieceState[];
export declare function getWhosTurnIsIt(history: RoundRobinHistory): string;
