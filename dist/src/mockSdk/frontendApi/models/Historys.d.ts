/// <reference types="q" />
import { Promise } from 'q';
import { History, Turn, LiteHistory } from '../../../types/mule';
import { HistorysApi } from '../../../types/sdk';
export declare class MockHistorysApi implements HistorysApi {
    indexQ: () => Promise<History<string>[]>;
    readQ: (gameStateId: string) => Promise<LiteHistory>;
    readGamesHistoryQ: (gameId: string) => Promise<History<string>>;
    readGamesFullHistoryQ: (gameId: string) => Promise<History<Turn>>;
}
export declare const historysApi: HistorysApi;
