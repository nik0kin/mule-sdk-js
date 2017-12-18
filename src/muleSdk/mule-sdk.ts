
import { SDK } from '../types/sdk';
import * as fn from '../shared/fn';

import { initUsersApi } from './models/Users';
import { initGamesApi } from './models/Games';
import { initRuleBundlesApi } from './models/RuleBundles';
import { initGameBoardsApi } from './models/GameBoards';
import { initGameStatesApi } from './models/GameStates';
import { initHistorysApi } from './models/Historys';
import { initTurnsApi } from './models/Turns';

import { initPlayTurnApi } from './methods/PlayTurn';


export function sdk(contextPath: string): SDK {
  return {
    fn: fn.allFn,

    Users: initUsersApi(contextPath),
    Games: initGamesApi(contextPath),
    RuleBundles: initRuleBundlesApi(contextPath),
    GameBoards: initGameBoardsApi(contextPath),
    GameStates: initGameStatesApi(contextPath),
    Historys: initHistorysApi(contextPath),
    Turns: initTurnsApi(contextPath),

    PlayTurn: initPlayTurnApi(contextPath),

    // Spinal: initSpinalApi(sdk),
  }
}
