import { Promise } from 'q';
import { GameState } from '../../../types/mule';
import { GameStatesApi, UnknownType } from '../../../types/sdk';
export declare class MockGameStatesApi implements GameStatesApi {
    indexQ: () => Promise<GameState[]>;
    createQ: (params: UnknownType) => Promise<UnknownType>;
    readQ: (gameStateId: string) => Promise<GameState>;
}
export declare const gameStatesApi: GameStatesApi;
