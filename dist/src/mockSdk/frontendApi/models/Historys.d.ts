import { Promise } from 'q';
import { History } from '../../../types/mule';
import { HistorysApi } from '../../../types/sdk';
export declare class MockHistorysApi implements HistorysApi {
    indexQ: () => Promise<any[]>;
    readQ: (gameStateId: string) => Promise<History>;
    readGamesHistoryQ: (gameId: string) => Promise<any>;
    readGamesFullHistoryQ: (gameId: string) => Promise<any>;
}
export declare const historysApi: HistorysApi;
