import { Promise } from 'q';
import { FullHistory, LiteHistory } from '../../../types/mule';
import { HistorysApi } from '../../../types/sdk';
export declare class MockHistorysApi implements HistorysApi {
    indexQ: () => Promise<LiteHistory[]>;
    readQ: (gameStateId: string) => Promise<LiteHistory>;
    readGamesHistoryQ: (gameId: string) => Promise<LiteHistory>;
    readGamesFullHistoryQ: (gameId: string) => Promise<FullHistory>;
}
export declare const historysApi: HistorysApi;
