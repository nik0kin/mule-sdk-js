/// <reference types="q" />
import { Promise } from 'q';
import { GameBoard, GameBoardCache } from '../../../types/mule';
import { GameBoardsApi } from '../../../types/sdk';
export declare class MockGameBoardsApi implements GameBoardsApi {
    indexQ: () => Promise<GameBoard[]>;
    readQ: (userId: string) => Promise<GameBoard>;
    readGamesBoardQ(gameId: string): Promise<GameBoard>;
    gameBoardsCache: GameBoardCache;
    cacheGameBoard: (result: GameBoard) => void;
}
export declare const gameBoardsApi: GameBoardsApi;
