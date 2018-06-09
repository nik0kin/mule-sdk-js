import { Promise } from 'q';
import { History } from '../../../types/mule';
import { HistorysApi } from '../../../types/sdk';
export declare class MockHistorysApi implements HistorysApi {
    indexQ: () => Promise<History[]>;
    readQ: (gameStateId: string) => Promise<History>;
    readGamesHistoryQ: (gameId: string) => Promise<History>;
    readGamesFullHistoryQ: (gameId: string) => Promise<History>;
}
export declare const historysApi: HistorysApi;
