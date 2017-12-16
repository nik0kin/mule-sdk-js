import * as Q from 'q';

import * as utils from './utils';

import { initUsersApi, UsersApi } from './models/Users';
import { initGamesApi, GamesApi } from './models/Games';
import { initRuleBundlesApi, RuleBundlesApi } from './models/RuleBundles';
import { initGameBoardsApi, GameBoardsApi } from './models/GameBoards';
import { initGameStatesApi, GameStatesApi } from './models/GameStates';
import { initHistorysApi, HistorysApi } from './models/Historys';
import { initTurnsApi, TurnsApi } from './models/Turns';

import { initPlayTurnApi, PlayTurnApi } from './methods/PlayTurn';

export interface SDK {
  Q: any;
  utils: {getUrlParameter(obj: any): string | undefined};

  Users: UsersApi;
  Games: GamesApi;
  RuleBundles: RuleBundlesApi;
  GameBoards: GameBoardsApi;
  GameStates: GameStatesApi;
  Historys: HistorysApi;
  Turns: TurnsApi;

  PlayTurn: PlayTurnApi;

  // Spinal: Spinal
}

export function sdk(contextPath: string): SDK {
  return {
    Q,
    utils,

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
