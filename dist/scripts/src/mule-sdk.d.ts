import { UsersApi } from './models/Users';
import { GamesApi } from './models/Games';
import { RuleBundlesApi } from './models/RuleBundles';
import { GameBoardsApi } from './models/GameBoards';
import { GameStatesApi } from './models/GameStates';
import { HistorysApi } from './models/Historys';
import { TurnsApi } from './models/Turns';
import { PlayTurnApi } from './methods/PlayTurn';
export interface SDK {
    Q: any;
    utils: {
        getUrlParameter(obj: any): string | undefined;
    };
    Users: UsersApi;
    Games: GamesApi;
    RuleBundles: RuleBundlesApi;
    GameBoards: GameBoardsApi;
    GameStates: GameStatesApi;
    Historys: HistorysApi;
    Turns: TurnsApi;
    PlayTurn: PlayTurnApi;
}
export declare function sdk(contextPath: string): SDK;
