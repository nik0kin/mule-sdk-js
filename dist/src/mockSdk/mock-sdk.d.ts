import { SDK, UsersApi, GamesApi, GameBoardsApi, RuleBundlesApi, GameStatesApi, HistorysApi, TurnsApi } from '../types/sdk';
import * as fn from '../shared/fn';
import { setLoggedInUser } from './frontendApi/models/Users';
import { MockPlayTurnApi } from './frontendApi/methods/PlayTurn';
import { addBundleCode } from './mockBackend/brain';
import { addMockData, resetMockData } from './mockBackend/data';
export declare class MockSdk implements SDK {
    contextPath: string;
    constructor(contextPath: string);
    fn: fn.FnLibrary;
    Users: UsersApi;
    Games: GamesApi;
    RuleBundles: RuleBundlesApi;
    GameBoards: GameBoardsApi;
    GameStates: GameStatesApi;
    Historys: HistorysApi;
    Turns: TurnsApi;
    PlayTurn: MockPlayTurnApi;
    static addBundleCode: typeof addBundleCode;
    static addMockData: typeof addMockData;
    static resetMockData: typeof resetMockData;
    static setLoggedInUser: typeof setLoggedInUser;
}
